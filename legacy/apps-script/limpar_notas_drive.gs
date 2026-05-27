/**
 * Importa o CSV mais recente de uma pasta do Drive,
 * mantém apenas colunas essenciais e grava na aba "Dados Limpos".
 */
function importarCSVLimpoDaPasta() {
  const FOLDER_ID = '1iL1f5CWUEtceU-iMm_kcNVQBhepo6Lnr';
  const ABA_DESTINO = 'Dados Limpos';
  const SEPARADORES = [',', ';'];

  const colunasDesejadas = [
    'Código da Loja',
    'Código do Fornecedor',
    'Nome do Fornecedor',
    'Número do Documento',
    'Data De Emissão',
    'Data de entrada',
    'Valor Total',
    'Código do produto',
    'Descrição Produto',
    'Unidade de medida',
    'Quantidade de itens na unidade',
    'Quantidade de itens',
    'Valor unitário',
    'Valor total do item'
  ];

  const aliases = {
    'Código da Loja': ['codigo da loja', 'cod loja', 'loja', 'cód. loja'],
    'Código do Fornecedor': ['codigo do fornecedor', 'cod fornecedor', 'cód fornecedor', 'fornecedor codigo'],
    'Nome do Fornecedor': ['nome do fornecedor', 'razao social fornecedor', 'fornecedor nome'],
    'Número do Documento': ['numero do documento', 'número documento', 'nf', 'nota fiscal', 'numero nf'],
    'Data De Emissão': ['data de emissao', 'data emissao', 'dt emissao'],
    'Data de entrada': ['data de entrada', 'dt entrada', 'entrada'],
    'Valor Total': ['valor total', 'valor nota', 'total nota'],
    'Código do produto': ['codigo do produto', 'cod produto', 'sku', 'ean'],
    'Descrição Produto': ['descricao produto', 'descrição produto', 'produto descricao', 'nome produto'],
    'Unidade de medida': ['unidade de medida', 'un', 'und', 'u.m.'],
    'Quantidade de itens na unidade': ['quantidade de itens na unidade', 'qtd itens unidade', 'embalagem qtd'],
    'Quantidade de itens': ['quantidade de itens', 'qtd itens', 'quantidade'],
    'Valor unitário': ['valor unitario', 'vl unitario', 'preco unitario'],
    'Valor total do item': ['valor total do item', 'total item', 'vl total item']
  };

  const arquivo = obterArquivoMaisRecente_(FOLDER_ID);
  if (!arquivo) {
    throw new Error('Nenhum arquivo encontrado na pasta informada.');
  }

  const resultadoLeitura = lerCsvComMelhorConfiguracao_(arquivo.getBlob(), colunasDesejadas, aliases, SEPARADORES);
  const matriz = resultadoLeitura.matriz;
  const cabecalhoOriginal = resultadoLeitura.cabecalhoOriginal;
  const mapaIndices = resultadoLeitura.mapaIndices;

  const linhasLimpas = [colunasDesejadas];

  for (let i = 1; i < matriz.length; i++) {
    const linha = matriz[i];
    if (linhaVazia_(linha)) continue;

    const novaLinha = colunasDesejadas.map((coluna) => {
      const idx = mapaIndices[coluna];
      return idx === -1 ? '' : normalizarValor_(coluna, linha[idx]);
    });

    if (linhaVazia_(novaLinha)) continue;
    linhasLimpas.push(novaLinha);
  }

  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(ABA_DESTINO) || planilha.insertSheet(ABA_DESTINO);

  const linhasInseridas = inserirSomenteNovasLinhas_(aba, colunasDesejadas, linhasLimpas.slice(1));
  Logger.log(`Arquivo processado: ${arquivo.getName()} | Linhas novas importadas: ${linhasInseridas}`);
}



function inserirSomenteNovasLinhas_(aba, cabecalhoEsperado, linhasCandidatas) {
  if (!linhasCandidatas.length) {
    garantirCabecalho_(aba, cabecalhoEsperado);
    return 0;
  }

  const ultimaLinha = aba.getLastRow();
  const ultimaColuna = cabecalhoEsperado.length;

  let cabecalhoAtual = [];
  let dadosExistentes = [];

  if (ultimaLinha > 0) {
    cabecalhoAtual = aba.getRange(1, 1, 1, ultimaColuna).getValues()[0];
  }

  if (!mesmoCabecalho_(cabecalhoAtual, cabecalhoEsperado)) {
    aba.clearContents();
    aba.getRange(1, 1, 1, cabecalhoEsperado.length).setValues([cabecalhoEsperado]);
  }

  const novaUltimaLinha = aba.getLastRow();
  if (novaUltimaLinha > 1) {
    dadosExistentes = aba.getRange(2, 1, novaUltimaLinha - 1, ultimaColuna).getValues();
  }

  const chavesExistentes = new Set(dadosExistentes.map((linha) => gerarChaveLinha_(linha)));
  const novasLinhas = [];

  linhasCandidatas.forEach((linha) => {
    const chave = gerarChaveLinha_(linha);
    if (!chave) return;
    if (chavesExistentes.has(chave)) return;

    chavesExistentes.add(chave);
    novasLinhas.push(linha);
  });

  if (!novasLinhas.length) return 0;

  const inicio = aba.getLastRow() + 1;
  aba.getRange(inicio, 1, novasLinhas.length, cabecalhoEsperado.length).setValues(novasLinhas);

  return novasLinhas.length;
}

function garantirCabecalho_(aba, cabecalhoEsperado) {
  if (aba.getLastRow() === 0) {
    aba.getRange(1, 1, 1, cabecalhoEsperado.length).setValues([cabecalhoEsperado]);
    return;
  }

  const atual = aba.getRange(1, 1, 1, cabecalhoEsperado.length).getValues()[0];
  if (!mesmoCabecalho_(atual, cabecalhoEsperado)) {
    aba.clearContents();
    aba.getRange(1, 1, 1, cabecalhoEsperado.length).setValues([cabecalhoEsperado]);
  }
}

function mesmoCabecalho_(atual, esperado) {
  if (!atual || atual.length < esperado.length) return false;
  for (let i = 0; i < esperado.length; i++) {
    if (String(atual[i] || '').trim() !== String(esperado[i] || '').trim()) return false;
  }
  return true;
}

function gerarChaveLinha_(linha) {
  return linha
    .map((v) => {
      if (Object.prototype.toString.call(v) === '[object Date]') {
        return Utilities.formatDate(v, 'UTC', "yyyy-MM-dd'T'HH:mm:ss");
      }
      return String(v == null ? '' : v).trim();
    })
    .join('||');
}

function lerCsvComMelhorConfiguracao_(blob, colunasDesejadas, aliases, separadores) {
  const codificacoes = ['UTF-8', 'ISO-8859-1'];

  let melhor = null;

  codificacoes.forEach((charset) => {
    const csv = blob.getDataAsString(charset);

    separadores.forEach((sep) => {
      const matriz = Utilities.parseCsv(csv, sep);
      if (!matriz.length) return;

      const cabecalhoOriginal = matriz[0].map((h) => corrigirMojibake_(h));
      const mapaIndices = mapearColunas_(cabecalhoOriginal, colunasDesejadas, aliases);
      const matchCount = colunasDesejadas.filter((c) => mapaIndices[c] !== -1).length;

      if (!melhor || matchCount > melhor.matchCount) {
        melhor = { charset, sep, matriz, cabecalhoOriginal, mapaIndices, matchCount };
      }
    });
  });

  if (!melhor || !melhor.matriz.length) {
    throw new Error('CSV vazio ou inválido.');
  }

  validarMapeamento_(melhor.mapaIndices, colunasDesejadas);
  return melhor;
}

function corrigirMojibake_(texto) {
  const original = String(texto || '');
  if (!/[ÃÂ�]/.test(original)) return original;

  try {
    const bytes = Utilities.newBlob(original).getBytes();
    const corrigido = Utilities.newBlob(bytes).getDataAsString('UTF-8');
    return corrigido || original;
  } catch (e) {
    return original;
  }
}

function obterArquivoMaisRecente_(folderId) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  let maisRecente = null;
  while (files.hasNext()) {
    const f = files.next();
    if (!/\.csv$/i.test(f.getName())) continue;
    if (!maisRecente || f.getLastUpdated() > maisRecente.getLastUpdated()) {
      maisRecente = f;
    }
  }
  return maisRecente;
}

function mapearColunas_(cabecalhoOriginal, colunasDesejadas, aliases) {
  const cabecalhoNormalizado = cabecalhoOriginal.map((c) => normalizarTexto_(c));

  const mapa = {};
  colunasDesejadas.forEach((coluna) => {
    const candidatos = [coluna, ...(aliases[coluna] || [])].map((c) => normalizarTexto_(c));

    let idx = -1;
    for (let i = 0; i < cabecalhoNormalizado.length; i++) {
      if (candidatos.includes(cabecalhoNormalizado[i])) {
        idx = i;
        break;
      }
    }
    mapa[coluna] = idx;
  });

  return mapa;
}

function validarMapeamento_(mapaIndices, colunasDesejadas) {
  const faltantes = colunasDesejadas.filter((col) => mapaIndices[col] === -1);
  if (faltantes.length) {
    throw new Error('Não encontrei estas colunas no CSV: ' + faltantes.join(' | '));
  }
}

function normalizarTexto_(txt) {
  return String(txt || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizarValor_(coluna, valor) {
  const v = String(valor == null ? '' : valor).trim();

  if (/^valor/i.test(coluna)) {
    return converterNumeroBrasil_(v);
  }

  if (/^data/i.test(coluna)) {
    return tentarData_(v);
  }

  if (/^quantidade/i.test(coluna)) {
    return converterNumeroBrasil_(v);
  }

  return v;
}

function converterNumeroBrasil_(texto) {
  if (!texto) return '';
  const limpo = texto
    .replace(/R\$/gi, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .replace(/\s/g, '');

  const n = Number(limpo);
  return Number.isNaN(n) ? texto : n;
}

function tentarData_(texto) {
  if (!texto) return '';

  const partes = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (partes) {
    const dia = Number(partes[1]);
    const mes = Number(partes[2]) - 1;
    const anoRaw = Number(partes[3]);
    const ano = anoRaw < 100 ? 2000 + anoRaw : anoRaw;
    return new Date(ano, mes, dia);
  }

  const d = new Date(texto);
  return isNaN(d.getTime()) ? texto : d;
}

function linhaVazia_(linha) {
  return !linha || linha.every((c) => String(c || '').trim() === '');
}

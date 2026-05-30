const ABA_PRODUTOS = 'PRODUTOS';
const ABA_CONFERENCIAS = 'CONFERENCIAS';

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('Conferência Hortifruti')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getProdutos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ABA_PRODUTOS);

  if (!sheet) {
    throw new Error(`A aba "${ABA_PRODUTOS}" não foi encontrada.`);
  }

  const dados = sheet.getDataRange().getValues();
  const cabecalho = dados.shift().map(h => String(h).trim().toLowerCase());

  const idxCodigo = cabecalho.indexOf('codigo');
  const idxProduto = cabecalho.indexOf('produto');
  const idxAtivo = cabecalho.indexOf('ativo');

  const idxUnidade = cabecalho.indexOf('unidade') !== -1
    ? cabecalho.indexOf('unidade')
    : cabecalho.indexOf('unidade_conferencia');

  if (idxCodigo === -1 || idxProduto === -1 || idxAtivo === -1) {
    throw new Error('A aba PRODUTOS precisa ter as colunas: codigo, produto, ativo');
  }

  return dados
    .filter(linha => String(linha[idxAtivo]).trim().toUpperCase() === 'SIM')
    .map(linha => ({
      codigo: linha[idxCodigo],
      produto: linha[idxProduto],
      unidade: idxUnidade !== -1 ? String(linha[idxUnidade] || '').trim() : ''
    }));
}

function salvarConferencia(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ABA_CONFERENCIAS);

  if (!sheet) {
    throw new Error(`A aba "${ABA_CONFERENCIAS}" não foi encontrada.`);
  }

  if (!payload || !payload.dataConferencia || !payload.itens) {
    throw new Error('Dados da conferência inválidos.');
  }

  const agora = new Date();
  const usuario = payload.usuario || '';
  const observacaoGeral = payload.observacaoGeral || '';

  const linhas = payload.itens
    .filter(item => {
      const caixas = Number(item.caixas || 0);
      const qtdPeso = Number(item.qtdPeso || 0);
      return caixas > 0 || qtdPeso > 0;
    })
    .map(item => [
      payload.dataConferencia,
      agora,
      item.codigo,
      item.produto,
      Number(item.caixas || 0),
      Number(item.qtdPeso || 0),
      item.unidade || '',
      item.observacao || '',
      usuario,
      observacaoGeral
    ]);

  if (linhas.length === 0) {
    throw new Error('Nenhum produto foi preenchido.');
  }

  sheet
    .getRange(sheet.getLastRow() + 1, 1, linhas.length, linhas[0].length)
    .setValues(linhas);

  return {
    sucesso: true,
    totalItens: linhas.length,
    dataConferencia: payload.dataConferencia,
    usuario: usuario,
    itens: linhas.map(linha => ({
      produto: linha[3],
      caixas: linha[4],
      qtdPeso: linha[5],
      unidade: linha[6],
      observacao: linha[7]
    }))
  };
}

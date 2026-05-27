const CONFIG_IMPORTACAO = {
  vendasFolderId: '1sD52S98S1vGgjpYR5enFS9soTDJhsOZk',
  comprasFolderId: '1iL1f5CWUEtceU-iMm_kcNVQBhepo6Lnr',
  processedFolderName: 'Processados',
};

const VENDAS_BASE_HEADERS = ['Data','Código','Descrição','Quantidade','Faturamento','Preço médio','Custo Total','Lucro','Margem','Markup','Participação','Acumulado','Classificação'];
const COMPRAS_BASE_HEADERS = ['Data De Emissão','Nome do Fornecedor','Número do Documento','Código do produto','Descrição Produto','Quantidade de itens na unidade','Quantidade de itens','Valor unitário (NF)','Valor unitário real','Valor total do item','Valor Total'];

function criarTemplateCruzamento() {
  const ss = SpreadsheetApp.create('Template - Cruzamento Vendas x Compras');
  ss.setSpreadsheetLocale('pt_BR');
  ss.setSpreadsheetTimeZone('America/Sao_Paulo');

  const names = ['VENDAS_RAW','COMPRAS_RAW','VENDAS_BASE','COMPRAS_BASE','VENDAS_STG','COMPRAS_STG','SKU_RESUMO','PAINEL','VALIDACOES'];
  ss.getSheets()[0].setName(names[0]);
  for (let i=1;i<names.length;i++) ss.insertSheet(names[i]);
  reaplicarEstrutura_(ss);
  Logger.log('Planilha criada: ' + ss.getUrl());
}

function reaplicarEstruturaNaPlanilhaAtual() { reaplicarEstrutura_(SpreadsheetApp.getActiveSpreadsheet()); }

function reaplicarEstrutura_(ss) {
  // Força locale pt-BR antes de aplicar fórmulas com separador ';' e funções em PT-BR.
  ss.setSpreadsheetLocale('pt_BR');
  SpreadsheetApp.flush();

  const vendasRaw = ss.getSheetByName('VENDAS_RAW');
  const comprasRaw = ss.getSheetByName('COMPRAS_RAW');
  const vendasBase = ss.getSheetByName('VENDAS_BASE');
  const comprasBase = ss.getSheetByName('COMPRAS_BASE');
  const vendasStg = ss.getSheetByName('VENDAS_STG');
  const comprasStg = ss.getSheetByName('COMPRAS_STG');
  const sku = ss.getSheetByName('SKU_RESUMO');
  const painel = ss.getSheetByName('PAINEL');
  const val = ss.getSheetByName('VALIDACOES');
  if (!vendasRaw||!comprasRaw||!vendasBase||!comprasBase||!vendasStg||!comprasStg||!sku||!painel||!val) throw new Error('Abas obrigatórias ausentes');

  vendasRaw.getRange(1,1,1,18).setValues([['Quebra','Quebra2','Código','Descrição','Quantidade','Faturamento','Preço médio','Custo Total','Imposto Estadual','Imposto Federal','Lucro','Margem','Markup','Participação','Acumulado','Classificação','ICMS ST','Fecop ST']]);
  comprasRaw.getRange(1,1,1,47).setValues([['Código da Loja','Código do Fornecedor','Nome do Fornecedor','Número do Documento','codigo da operacao','Operação','Situação','Data De Emissão','Data de entrada','Frete','Outros','Seguro','Desconto','IPI','DAE','ICMS Desonerado','FECOP','Valor FECOPST','FECOP Retido','Base de Cálculo ICMS','Valor BC do ICMS','Base de Cálculo ICMSST','Valor BC ICMSST','Valor Total','Código do produto','Descrição Produto','Unidade de medida','Quantidade de itens na unidade','Quantidade de itens','CFOP','Frete do item','Seguro do item','Desconto do item','IPI do item','Base de cálculo do ICMS do item','ICMS do item','Base de calculo do ICMS ST do item','ICMS ST do item','DAE Item','ICMS desonerado do item','ICMS antecipado do item','FECOP do item','FECOP ST do item','FECOP retido do item','Valor unitário','Outras despesas do item','Valor total do item']]);
  vendasBase.getRange(1,1,1,VENDAS_BASE_HEADERS.length).setValues([VENDAS_BASE_HEADERS]);
  comprasBase.getRange(1,1,1,COMPRAS_BASE_HEADERS.length).setValues([COMPRAS_BASE_HEADERS]);

  vendasStg.getRange('A1:L1').setValues([['data','codigo_raw','codigo_norm','descricao','quantidade','faturamento','preco_medio','custo_total','lucro','margem_pct','markup_pct','classificacao']]);
  vendasStg.getRange('A2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!B2:B="";"";VENDAS_BASE!A2:A))');
  vendasStg.getRange('B2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!B2:B="";"";VENDAS_BASE!B2:B))');
  vendasStg.getRange('C2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!B2:B="";"";REGEXREPLACE(TO_TEXT(VENDAS_BASE!B2:B);"^0+";"")))');
  vendasStg.getRange('D2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!B2:B="";"";VENDAS_BASE!C2:C))');
  vendasStg.getRange('E2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!D2:D="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!D2:D;".";""));0)))');
  vendasStg.getRange('F2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!E2:E="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!E2:E;".";""));0)))');
  vendasStg.getRange('G2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!F2:F="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!F2:F;".";""));0)))');
  vendasStg.getRange('H2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!G2:G="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!G2:G;".";""));0)))');
  vendasStg.getRange('I2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!H2:H="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!H2:H;".";""));0)))');
  vendasStg.getRange('J2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!I2:I="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!I2:I;".";""));0)/100)))');
  vendasStg.getRange('K2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!J2:J="";"";IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!J2:J;".";""));0)/100)))');
  vendasStg.getRange('L2').setFormula('=ARRAYFORMULA(IF(VENDAS_BASE!B2:B="";"";VENDAS_BASE!M2:M))');

  comprasStg.getRange('A1:J1').setValues([['data_emissao','fornecedor','documento','codigo_raw','codigo_norm','descricao','qtd_por_unidade','qtd_itens','qtd_compra_ajustada','valor_total_item']]);
  comprasStg.getRange('A2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!A2:A))');
  comprasStg.getRange('B2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!B2:B))');
  comprasStg.getRange('C2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!C2:C))');
  comprasStg.getRange('D2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!D2:D))');
  comprasStg.getRange('E2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";REGEXREPLACE(TO_TEXT(COMPRAS_BASE!D2:D);"^0+";"")))');
  comprasStg.getRange('F2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!E2:E))');
  comprasStg.getRange('G2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!F2:F))');
  comprasStg.getRange('H2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!G2:G))');
  comprasStg.getRange('I2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";IFERROR(COMPRAS_BASE!F2:F*COMPRAS_BASE!G2:G;0)))');
  comprasStg.getRange('J2').setFormula('=ARRAYFORMULA(IF(COMPRAS_BASE!D2:D="";"";COMPRAS_BASE!J2:J))');

  sku.getRange('A1:M1').setValues([['codigo_norm','descricao_venda','classe_abc','qtd_vendida','faturamento_total','custo_total_venda','preco_unit_venda','qtd_comprada_ajustada','valor_total_comprado','custo_unit_compra','spread_unit','margem_bruta_estimada','match_compra']]);
  sku.getRange('A2').setFormula('=SORT(UNIQUE(FILTER(VENDAS_STG!C:C;VENDAS_STG!C:C<>"")))');
  sku.getRange('B2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";IFERROR(VLOOKUP(A2:A;{VENDAS_STG!C:C\VENDAS_STG!D:D},2,FALSE);"")))');
  sku.getRange('C2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";IFERROR(VLOOKUP(A2:A;{VENDAS_STG!C:C\VENDAS_STG!L:L},2,FALSE);"")))');
  sku.getRange('D2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";SUMIF(VENDAS_STG!C:C;A2:A;VENDAS_STG!E:E)))');
  sku.getRange('E2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";SUMIF(VENDAS_STG!C:C;A2:A;VENDAS_STG!F:F)))');
  sku.getRange('F2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";SUMIF(VENDAS_STG!C:C;A2:A;VENDAS_STG!H:H)))');
  sku.getRange('G2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";IFERROR(E2:E/D2:D;0)))');
  sku.getRange('H2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";SUMIF(COMPRAS_STG!E:E;A2:A;COMPRAS_STG!I:I)))');
  sku.getRange('I2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";SUMIF(COMPRAS_STG!E:E;A2:A;COMPRAS_STG!J:J)))');
  sku.getRange('J2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";IFERROR(I2:I/H2:H;0)))');
  sku.getRange('K2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";G2:G-J2:J))');
  sku.getRange('L2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";IFERROR(K2:K/G2:G;0)))');
  sku.getRange('M2').setFormula('=ARRAYFORMULA(IF(A2:A="";"";IF(H2:H>0;"OK";"SEM_MATCH")))');

  painel.getRange('A1:B1').setValues([['Indicador','Valor']]);
  painel.getRange('A2:B5').setValues([
    ['SKUs vendidos','=COUNTA(SKU_RESUMO!A2:A)'],
    ['SKUs com match compra','=COUNTIF(SKU_RESUMO!M2:M;"OK")'],
    ['Cobertura de match (%)','=IFERROR(COUNTIF(SKU_RESUMO!M2:M;"OK")/COUNTA(SKU_RESUMO!A2:A);0)'],
    ['Margem bruta estimada ponderada (%)','=IFERROR(SUMPRODUCT(SKU_RESUMO!L2:L;SKU_RESUMO!E2:E)/SOMA(SKU_RESUMO!E2:E);0)']
  ]);

  val.getRange('A1:B1').setValues([['Validação','Valor']]);
  val.getRange('A2:B5').setValues([
    ['% códigos vazios em VENDAS_STG','=IFERROR(COUNTIF(VENDAS_STG!C2:C;"")/COUNTA(VENDAS_STG!B2:B);0)'],
    ['% códigos vazios em COMPRAS_STG','=IFERROR(COUNTIF(COMPRAS_STG!E2:E;"")/COUNTA(COMPRAS_STG!D2:D);0)'],
    ['linhas com custo_unit_compra = 0 e match OK','=COUNTIFS(SKU_RESUMO!M2:M;"OK";SKU_RESUMO!J2:J;0)'],
    ['linhas com preco_unit_venda = 0','=COUNTIF(SKU_RESUMO!G2:G;0)']
  ]);
}

function atualizarTudoDoDrive() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  importarMaisRecenteParaAba(ss, CONFIG_IMPORTACAO.vendasFolderId, 'VENDAS_RAW', 'VENDAS_BASE', mapVendasRow_);
  importarMaisRecenteParaAba(ss, CONFIG_IMPORTACAO.comprasFolderId, 'COMPRAS_RAW', 'COMPRAS_BASE', mapComprasRow_);
}

function importarMaisRecenteParaAba(ss, folderId, rawSheetName, baseSheetName, mapperFn) {
  const raw = ss.getSheetByName(rawSheetName), base = ss.getSheetByName(baseSheetName);
  if (!raw || !base) throw new Error('Aba não encontrada: '+rawSheetName+' ou '+baseSheetName);
  const folder = DriveApp.getFolderById(folderId);
  const file = getMostRecentCsvFile_(folder);
  if (!file) return;
  const csvRows = Utilities.parseCsv(file.getBlob().getDataAsString('UTF-8'), ';');
  if (!csvRows || csvRows.length < 2) return;
  const dataRows = csvRows.slice(1).filter(r => r.join('').trim() !== '');
  if (dataRows.length===0) { moveFileToProcessed_(folder, file); return; }
  appendUniqueRows_(raw, dataRows);
  appendUniqueRows_(base, dataRows.map(mapperFn));
  moveFileToProcessed_(folder, file);
}

function mapVendasRow_(r){ return [r[0],r[2],r[3],r[4],r[5],r[6],r[7],r[10],r[11],r[12],r[13],r[14],r[15]]; }
function mapComprasRow_(r){ const q=toNumber_(r[27]),qi=toNumber_(r[28]),vun=toNumber_(r[44]); return [r[7],r[2],r[3],r[24],r[25],q,qi,vun,q>0?vun/q:0,toNumber_(r[46]),toNumber_(r[23])]; }
function toNumber_(v){ const s=String(v||'').trim(); if(!s) return 0; return Number(s.replace(/\./g,'').replace(',','.'))||0; }
function appendUniqueRows_(sheet, rows){ const width=sheet.getLastColumn(); const ex=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,width).getValues():[]; const keys=new Set(ex.map(rowKey_)); const add=rows.filter(r=>!keys.has(rowKey_(r))); if(!add.length) return 0; sheet.getRange(sheet.getLastRow()+1,1,add.length,width).setValues(add); return add.length; }
function rowKey_(r){ return r.map(v=>String(v).trim()).join('||'); }
function getMostRecentCsvFile_(folder){ const files=folder.getFiles(); let latest=null,ts=-1; while(files.hasNext()){ const f=files.next(); if(!/\.csv$/i.test(f.getName())) continue; const t=f.getLastUpdated().getTime(); if(t>ts){latest=f;ts=t;} } return latest; }
function moveFileToProcessed_(parent,file){ const p=getOrCreateSubfolder_(parent,CONFIG_IMPORTACAO.processedFolderName); p.addFile(file); parent.removeFile(file); }
function getOrCreateSubfolder_(parent,name){ const fs=parent.getFoldersByName(name); return fs.hasNext()?fs.next():parent.createFolder(name); }

# Menu de ajuda no Google Sheets

## Objetivo

Incluir instruções operacionais dentro da própria planilha para reduzir dependência de documentação externa.

## Menu sugerido

```text
Hortifruti
├── Atualizar tudo do Drive
├── Ajuda
│   ├── Como baixar CSV de compras
│   ├── Como baixar CSV de vendas
│   └── Sobre a estrutura da planilha
```

## Código sugerido

Este código pode ser incorporado ao Apps Script principal, ajustando os nomes das funções já existentes.

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Hortifruti')
    .addItem('Atualizar tudo do Drive', 'atualizarTudoDoDrive')
    .addSeparator()
    .addSubMenu(
      ui.createMenu('Ajuda')
        .addItem('Como baixar CSV de compras', 'ajudaCsvCompras')
        .addItem('Como baixar CSV de vendas', 'ajudaCsvVendas')
        .addItem('Sobre a estrutura da planilha', 'ajudaEstruturaPlanilha')
    )
    .addToUi();
}

function ajudaCsvCompras() {
  SpreadsheetApp.getUi().alert(
    'Como baixar CSV de compras',
    'No Varejo Fácil, acesse:\n\n' +
    'Compra > Relatórios > Nota fiscal entrada\n\n' +
    'Filtros:\n' +
    '- Seção: 9 - Hortifruti\n' +
    '- Formato: Analítico\n' +
    '- Exibição: CSV\n\n' +
    'Depois salve o arquivo na pasta de compras do Google Drive.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function ajudaCsvVendas() {
  SpreadsheetApp.getUi().alert(
    'Como baixar CSV de vendas',
    'No Varejo Fácil, acesse:\n\n' +
    'Venda > Relatórios vendas > ABC Venda\n\n' +
    'Filtros:\n' +
    '- Seção: 9 - Hortifruti\n' +
    '- Quebra Nível 1: Data\n' +
    '- Opções: Classifica ABC\n' +
    '- Exibição: CSV\n\n' +
    'Depois salve o arquivo na pasta de vendas do Google Drive.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function ajudaEstruturaPlanilha() {
  SpreadsheetApp.getUi().alert(
    'Estrutura da planilha',
    'Abas principais:\n\n' +
    '- VENDAS_RAW e COMPRAS_RAW: entrada de dados\n' +
    '- VENDAS_BASE e COMPRAS_BASE: bases padronizadas\n' +
    '- VENDAS_STG e COMPRAS_STG: tratamento intermediário\n' +
    '- SKU_RESUMO: consolidação por produto\n' +
    '- PAINEL: indicadores\n' +
    '- VALIDACOES: alertas e conferências\n\n' +
    'Evite editar manualmente abas de fórmula.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
```

## Observação

A inclusão desse menu altera o código do Apps Script. Por isso, a recomendação é aplicar em uma etapa separada, após validar a reorganização documental.

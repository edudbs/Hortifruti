# Visão geral da arquitetura

## Contexto

O projeto Controle Compra x Vendas Hortifruti tem como objetivo transformar arquivos extraídos do Varejo Fácil em uma estrutura de análise gerencial no Google Sheets.

A finalidade não é apenas importar dados, mas criar uma rotina de controle para comparar:

- vendas realizadas;
- compras/notas fiscais de entrada;
- custo de reposição;
- margem por produto;
- produtos sem correspondência;
- indicadores de validação;
- perdas operacionais.

## Arquitetura lógica

```text
Varejo Fácil
   ├── Relatório ABC Venda
   └── Relatório Nota Fiscal Entrada
        ↓
Arquivos CSV
        ↓
Pastas no Google Drive
        ↓
Apps Script
        ↓
Google Sheets
   ├── VENDAS_RAW
   ├── COMPRAS_RAW
   ├── VENDAS_BASE
   ├── COMPRAS_BASE
   ├── VENDAS_STG
   ├── COMPRAS_STG
   ├── SKU_RESUMO
   ├── PAINEL
   └── VALIDACOES
```

## Componentes

### Varejo Fácil

Fonte dos relatórios operacionais em CSV.

### Google Drive

Local de entrada dos arquivos CSV exportados do Varejo Fácil.

Pastas atualmente usadas no script:

| Finalidade | ID da pasta |
|---|---|
| Vendas | `1sD52S98S1vGgjpYR5enFS9soTDJhsOZk` |
| Compras | `1iL1f5CWUEtceU-iMm_kcNVQBhepo6Lnr` |

### Apps Script

Automatiza criação da planilha, estrutura de abas, fórmulas, importação dos CSVs mais recentes e movimentação dos arquivos processados.

Script principal:

```text
apps-script/gerar_template_google_sheets.gs
```

### Google Sheets

Camada de análise operacional, com separação entre dados brutos, dados tratados, resumo por SKU, painel e validações.

## Script legado

O arquivo `legacy/apps-script/limpar_notas_drive.gs` foi preservado apenas como referência histórica. Ele pertence à primeira fase do projeto e não deve ser considerado a base da arquitetura atual.

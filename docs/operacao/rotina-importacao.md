# Rotina de importação

## Objetivo

Padronizar a rotina de atualização da planilha de controle de compras x vendas do hortifruti.

## Frequência sugerida

- Vendas: diariamente ou conforme necessidade de análise.
- Compras: após lançamento/fechamento das notas de entrada.
- Conferência gerencial: semanalmente.

## Passo a passo

1. Baixar o CSV de vendas no Varejo Fácil.
2. Baixar o CSV de compras no Varejo Fácil.
3. Salvar cada arquivo na pasta correta do Google Drive.
4. Abrir a planilha do Google Sheets.
5. Executar a rotina de atualização pelo menu ou pelo Apps Script.
6. Conferir:
   - `VENDAS_BASE`
   - `COMPRAS_BASE`
   - `SKU_RESUMO`
   - `VALIDACOES`
7. Usar o `PAINEL` para análise.

## Abas que o usuário pode consultar

- `SKU_RESUMO`
- `PAINEL`
- `VALIDACOES`

## Abas que devem ser evitadas manualmente

- `VENDAS_STG`
- `COMPRAS_STG`

Essas abas contêm fórmulas e tratamentos intermediários.

## Regra operacional

A planilha deve ser tratada como ferramenta de análise. O dado original continua sendo o Varejo Fácil; portanto, divergências relevantes devem ser investigadas na origem.

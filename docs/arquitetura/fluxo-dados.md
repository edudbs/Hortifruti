# Fluxo de dados

## Fluxo principal

```text
1. Usuário exporta CSVs no Varejo Fácil
2. Usuário salva os arquivos nas pastas corretas do Google Drive
3. Apps Script identifica o CSV mais recente
4. Dados são importados para abas RAW/BASE
5. Fórmulas normalizam campos nas abas STG
6. SKU_RESUMO consolida venda, compra e margem
7. PAINEL apresenta indicadores
8. VALIDACOES aponta inconsistências
9. Arquivo processado é movido para subpasta Processados
```

## Separação das camadas

### RAW

Recebe dados no formato mais próximo possível do CSV original.

- `VENDAS_RAW`
- `COMPRAS_RAW`

### BASE

Recebe dados padronizados para uso interno da planilha.

- `VENDAS_BASE`
- `COMPRAS_BASE`

### STG

Camada de tratamento, normalização e cálculo intermediário.

- `VENDAS_STG`
- `COMPRAS_STG`

### RESUMO

Camada consolidada por SKU.

- `SKU_RESUMO`

### PAINEL

Camada de leitura gerencial.

- `PAINEL`

### VALIDAÇÕES

Camada de controle de qualidade dos dados.

- `VALIDACOES`

## Ponto crítico

A comparação entre vendas e compras depende da consistência do código do produto/SKU. Produtos com código divergente, zeros à esquerda, cadastro diferente ou ausência de compra no período podem gerar falhas de correspondência.

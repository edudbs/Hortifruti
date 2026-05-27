# Estrutura da planilha

## Abas principais

| Aba | Função |
|---|---|
| `VENDAS_RAW` | Recebe cabeçalhos/dados brutos de vendas |
| `COMPRAS_RAW` | Recebe cabeçalhos/dados brutos de compras |
| `VENDAS_BASE` | Base padronizada de vendas |
| `COMPRAS_BASE` | Base padronizada de compras |
| `VENDAS_STG` | Tratamento intermediário de vendas |
| `COMPRAS_STG` | Tratamento intermediário de compras |
| `SKU_RESUMO` | Consolidação por SKU |
| `PAINEL` | Indicadores para leitura gerencial |
| `VALIDACOES` | Alertas e conferências |

## Camadas

### Entrada

- `VENDAS_RAW`
- `COMPRAS_RAW`

### Padronização

- `VENDAS_BASE`
- `COMPRAS_BASE`

### Tratamento

- `VENDAS_STG`
- `COMPRAS_STG`

### Decisão

- `SKU_RESUMO`
- `PAINEL`
- `VALIDACOES`

## Orientação prática

O usuário deve operar preferencialmente pelo menu da planilha e consultar as abas finais. Alterações manuais nas abas de fórmula podem quebrar a análise.

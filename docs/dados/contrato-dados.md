# Contrato de dados

Este documento resume os principais campos esperados nos CSVs de vendas e compras.

## Vendas

Origem: relatório ABC Venda.

Campos principais esperados:

| Campo | Uso |
|---|---|
| `Código` | Identificação do produto/SKU |
| `Descrição` | Nome do produto |
| `Quantidade` | Quantidade vendida |
| `Faturamento` | Valor total vendido |
| `Preço médio` | Preço médio de venda |
| `Custo Total` | Custo registrado no relatório |
| `Lucro` | Lucro registrado no relatório |
| `Margem` | Margem registrada |
| `Markup` | Markup registrado |
| `Participação` | Participação no total |
| `Acumulado` | Participação acumulada |
| `Classificação` | Classe ABC |

## Compras

Origem: relatório Nota fiscal entrada, formato Analítico.

Campos principais esperados:

| Campo | Uso |
|---|---|
| `Data De Emissão` | Data da nota |
| `Nome do Fornecedor` | Fornecedor |
| `Número do Documento` | Número da NF |
| `Código do produto` | Identificação do produto/SKU |
| `Descrição Produto` | Nome do produto |
| `Quantidade de itens na unidade` | Fator de conversão da embalagem |
| `Quantidade de itens` | Quantidade comprada |
| `Valor unitário` | Valor unitário informado na NF |
| `Valor total do item` | Valor total do item |
| `Valor Total` | Valor total da nota |

## Normalização crítica

O campo mais sensível é o código do produto. A comparação entre compra e venda depende da padronização do código, incluindo remoção de zeros à esquerda quando necessário.

## Atenção

Mudanças no layout do Varejo Fácil podem exigir ajuste das fórmulas e do Apps Script.

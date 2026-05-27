# Troubleshooting

## 1. O CSV não foi importado

Verifique:

- o arquivo está na pasta correta do Google Drive;
- o arquivo tem extensão `.csv`;
- existe apenas um arquivo mais recente esperado na pasta;
- a conta usada no Apps Script tem permissão de acesso à pasta;
- o arquivo não está corrompido.

## 2. Dados de venda não aparecem

Verifique:

- se o relatório baixado é o ABC Venda;
- se a seção selecionada foi `9 - Hortifruti`;
- se o relatório foi exportado como CSV;
- se o período escolhido tem vendas;
- se o arquivo foi salvo na pasta de vendas.

## 3. Dados de compra não aparecem

Verifique:

- se o relatório baixado é Nota fiscal entrada;
- se o formato escolhido foi Analítico;
- se a seção selecionada foi `9 - Hortifruti`;
- se o arquivo foi salvo na pasta de compras.

## 4. Produto vendido aparece sem compra

Possíveis causas:

- produto não foi comprado no período analisado;
- código do produto mudou;
- produto foi comprado com outro cadastro;
- venda usa SKU diferente da compra;
- compra foi lançada em data fora do período analisado;
- CSV de compras não foi atualizado.

## 5. Margem estranha ou custo zerado

Verifique:

- se `Quantidade de itens na unidade` está preenchida corretamente;
- se `Quantidade de itens` está correta;
- se `Valor total do item` está correto;
- se houve unidade diferente entre compra e venda;
- se existe divergência entre unidade de compra e unidade de venda.

## 6. Erro de fórmula no Google Sheets

Possíveis causas:

- localidade da planilha diferente de `pt_BR`;
- separador de argumento diferente;
- fórmula colada manualmente em célula errada;
- cabeçalho alterado;
- abas renomeadas.

## 7. Quando revisar a documentação

Revise a documentação sempre que:

- mudar o layout dos relatórios do Varejo Fácil;
- mudar nomes das abas;
- mudar IDs das pastas do Drive;
- alterar fórmulas principais;
- incluir nova métrica no painel;
- alterar rotina operacional da loja.

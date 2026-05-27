# Como obter os CSVs no Varejo Fácil

Este documento preserva a instrução operacional mais importante do projeto: onde e como obter os arquivos CSV usados na importação.

## 1. CSV de compras

### Caminho no Varejo Fácil

```text
Compra
→ Relatórios
→ Nota fiscal entrada
```

### Filtros recomendados

```text
Seção: 9 - Hortifruti
Formato: Analítico
Exibição: CSV
```

### Link operacional registrado

```text
https://laticiniodozuzu.varejofacil.com/app/#/vf?r=%2FrelatorioNotaFiscalCompra%2Findex&b=Compra,Relat%C3%B3rios,Nota%20fiscal%20entrada
```

### Destino no Google Drive

Salvar o CSV na pasta de compras configurada no Apps Script:

```text
1iL1f5CWUEtceU-iMm_kcNVQBhepo6Lnr
```

## 2. CSV de vendas

### Caminho no Varejo Fácil

```text
Venda
→ Relatórios vendas
→ ABC Venda
```

### Filtros recomendados

```text
Seção: 9 - Hortifruti
Quebra Nível 1: Data
Opções: Classifica ABC
Exibição: CSV
```

### Link operacional registrado

```text
https://laticiniodozuzu.varejofacil.com/app/#/vf?r=%2FrelatorioABCVenda%2Findex&b=Venda,Relat%C3%B3rios%20vendas,ABC%20venda
```

### Destino no Google Drive

Salvar o CSV na pasta de vendas configurada no Apps Script:

```text
1sD52S98S1vGgjpYR5enFS9soTDJhsOZk
```

## 3. Boas práticas

- Sempre conferir se o período do relatório está correto.
- Não alterar manualmente nomes de colunas no CSV.
- Evitar renomear arquivos de forma confusa.
- Não misturar CSV de vendas na pasta de compras, nem CSV de compras na pasta de vendas.
- Depois da importação, conferir a aba `VALIDACOES`.
- Em caso de erro de layout, comparar o cabeçalho do CSV com o contrato de dados.

## 4. Sugestão futura

Essas instruções devem aparecer também dentro do Google Sheets, em um menu:

```text
Hortifruti
→ Ajuda
   → Como baixar CSV de compras
   → Como baixar CSV de vendas
```

# Layout de planilha pronto para Google Sheets

Este modelo transforma o cruzamento entre **`relatorioABCVenda (3).csv`** (vendas) e **`relatorioAnaliticoDeNotasFiscaisCompra (1).csv`** (compras limpas) em uma planilha operacional com custo de reposição e margem por SKU.

---

## 1) Estrutura de abas (ordem recomendada)

1. `VENDAS_RAW`
2. `COMPRAS_RAW`
3. `VENDAS_STG`
4. `COMPRAS_STG`
5. `SKU_RESUMO`
6. `PAINEL`
7. `VALIDACOES`

---

## 2) Aba `VENDAS_RAW` (colar CSV de vendas)

- Cole o conteúdo de `relatorioABCVenda (3).csv` a partir da célula **A1**.
- Não altere nomes de colunas.

Colunas esperadas (principais):
- `Código`
- `Descrição`
- `Quantidade`
- `Faturamento`
- `Custo Total`
- `Lucro`
- `Margem`
- `Participação`
- `Acumulado`
- `Classificação`

---

## 3) Aba `COMPRAS_RAW` (colar CSV de compras limpas)

- Cole o conteúdo de `relatorioAnaliticoDeNotasFiscaisCompra (1).csv` a partir da célula **A1**.
- Não altere nomes de colunas.

Colunas esperadas (principais):
- `Código do produto`
- `Descrição Produto`
- `Quantidade de itens`
- `Quantidade de itens na unidade`
- `Valor total do item`
- `Valor unitário`
- `Data De Emissão`
- `Nome do Fornecedor`

---

## 4) Aba `VENDAS_STG` (normalização de vendas)

### Cabeçalhos (linha 1)

| Coluna | Nome sugerido |
|---|---|
| A | codigo_raw |
| B | codigo_norm |
| C | descricao |
| D | quantidade |
| E | faturamento |
| F | custo_total |
| G | lucro |
| H | margem_pct |
| I | classificacao |
| J | participacao_pct |
| K | acumulado_pct |
| L | preco_unit_venda |

### Fórmulas (linha 2, arrastar para baixo)

- **A2**
```gs
=VENDAS_RAW!C2
```

- **B2** (remove zeros à esquerda, mantém apenas dígitos)
```gs
=IF(A2="","",REGEXREPLACE(A2,"^0+",""))
```

- **C2**
```gs
=VENDAS_RAW!D2
```

- **D2** (converte número BR para número)
```gs
=IF(VENDAS_RAW!E2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!E2,".",""),",",".")))
```

- **E2**
```gs
=IF(VENDAS_RAW!F2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!F2,".",""),",",".")))
```

- **F2**
```gs
=IF(VENDAS_RAW!H2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!H2,".",""),",",".")))
```

- **G2**
```gs
=IF(VENDAS_RAW!K2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!K2,".",""),",",".")))
```

- **H2**
```gs
=IF(VENDAS_RAW!L2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!L2,".",""),",","."))/100)
```

- **I2**
```gs
=VENDAS_RAW!P2
```

- **J2**
```gs
=IF(VENDAS_RAW!N2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!N2,".",""),",","."))/100)
```

- **K2**
```gs
=IF(VENDAS_RAW!O2="","",VALUE(SUBSTITUTE(SUBSTITUTE(VENDAS_RAW!O2,".",""),",","."))/100)
```

- **L2**
```gs
=IFERROR(E2/D2,0)
```

---

## 5) Aba `COMPRAS_STG` (normalização de compras)

### Cabeçalhos (linha 1)

| Coluna | Nome sugerido |
|---|---|
| A | codigo_raw |
| B | codigo_norm |
| C | descricao |
| D | fornecedor |
| E | data_emissao |
| F | qtd_itens |
| G | qtd_por_unidade |
| H | qtd_compra_ajustada |
| I | valor_total_item |
| J | valor_unitario_nf |

### Fórmulas (linha 2, arrastar para baixo)

- **A2**
```gs
=COMPRAS_RAW!Y2
```

- **B2**
```gs
=IF(A2="","",REGEXREPLACE(A2,"^0+",""))
```

- **C2**
```gs
=COMPRAS_RAW!Z2
```

- **D2**
```gs
=COMPRAS_RAW!C2
```

- **E2**
```gs
=COMPRAS_RAW!H2
```

- **F2**
```gs
=IF(COMPRAS_RAW!AC2="","",VALUE(SUBSTITUTE(SUBSTITUTE(COMPRAS_RAW!AC2,".",""),",",".")))
```

- **G2**
```gs
=IF(COMPRAS_RAW!AB2="","",VALUE(SUBSTITUTE(SUBSTITUTE(COMPRAS_RAW!AB2,".",""),",",".")))
```

- **H2**
```gs
=IFERROR(F2*G2,0)
```

- **I2**
```gs
=IF(COMPRAS_RAW!AU2="","",VALUE(SUBSTITUTE(SUBSTITUTE(COMPRAS_RAW!AU2,".",""),",",".")))
```

- **J2**
```gs
=IF(COMPRAS_RAW!AS2="","",VALUE(SUBSTITUTE(SUBSTITUTE(COMPRAS_RAW!AS2,".",""),",",".")))
```

---

## 6) Aba `SKU_RESUMO` (consolidação por SKU)

### Cabeçalhos (linha 1)

| Coluna | Nome |
|---|---|
| A | codigo_norm |
| B | descricao_venda |
| C | classe_abc |
| D | qtd_vendida |
| E | faturamento_total |
| F | custo_total_venda |
| G | preco_unit_venda |
| H | qtd_comprada_ajustada |
| I | valor_total_comprado |
| J | custo_unit_compra |
| K | spread_unit |
| L | margem_bruta_estimada |
| M | match_compra |

### Base de SKUs (linha 2)

- **A2** (lista única de códigos de venda)
```gs
=SORT(UNIQUE(FILTER(VENDAS_STG!B:B,VENDAS_STG!B:B<>"")))
```

### Fórmulas por coluna (linha 2, arrastar para baixo)

- **B2**
```gs
=IFERROR(INDEX(FILTER(VENDAS_STG!C:C,VENDAS_STG!B:B=$A2),1),"")
```

- **C2**
```gs
=IFERROR(INDEX(FILTER(VENDAS_STG!I:I,VENDAS_STG!B:B=$A2),1),"")
```

- **D2**
```gs
=SUMIF(VENDAS_STG!B:B,$A2,VENDAS_STG!D:D)
```

- **E2**
```gs
=SUMIF(VENDAS_STG!B:B,$A2,VENDAS_STG!E:E)
```

- **F2**
```gs
=SUMIF(VENDAS_STG!B:B,$A2,VENDAS_STG!F:F)
```

- **G2**
```gs
=IFERROR(E2/D2,0)
```

- **H2**
```gs
=SUMIF(COMPRAS_STG!B:B,$A2,COMPRAS_STG!H:H)
```

- **I2**
```gs
=SUMIF(COMPRAS_STG!B:B,$A2,COMPRAS_STG!I:I)
```

- **J2**
```gs
=IFERROR(I2/H2,0)
```

- **K2**
```gs
=G2-J2
```

- **L2**
```gs
=IFERROR(K2/G2,0)
```

- **M2**
```gs
=IF(H2>0,"OK","SEM_MATCH")
```

---

## 7) Aba `PAINEL` (visão gerencial)

Crie cartões com fórmulas simples:

- **SKUs vendidos**
```gs
=COUNTA(SKU_RESUMO!A2:A)
```

- **SKUs com match compra**
```gs
=COUNTIF(SKU_RESUMO!M2:M,"OK")
```

- **Cobertura de match (%)**
```gs
=IFERROR(COUNTIF(SKU_RESUMO!M2:M,"OK")/COUNTA(SKU_RESUMO!A2:A),0)
```

- **Margem bruta estimada ponderada (%)**
```gs
=IFERROR(SUMPRODUCT(SKU_RESUMO!L2:L,SKU_RESUMO!E2:E)/SUM(SKU_RESUMO!E2:E),0)
```

Tabelas recomendadas:
1. **Top 20 faturamento**: ordenar `SKU_RESUMO` por coluna E (desc).
2. **Top 20 menor spread**: filtrar `M="OK"` e ordenar K (asc).
3. **Itens A sem match**: filtrar `C="A"` e `M="SEM_MATCH"`.

---

## 8) Aba `VALIDACOES` (auditoria rápida)

Campos sugeridos:

- `% códigos vazios em VENDAS_STG`
```gs
=IFERROR(COUNTIF(VENDAS_STG!B2:B,"")/COUNTA(VENDAS_STG!A2:A),0)
```

- `% códigos vazios em COMPRAS_STG`
```gs
=IFERROR(COUNTIF(COMPRAS_STG!B2:B,"")/COUNTA(COMPRAS_STG!A2:A),0)
```

- `linhas com custo_unit_compra = 0 e match OK`
```gs
=COUNTIFS(SKU_RESUMO!M2:M,"OK",SKU_RESUMO!J2:J,0)
```

- `linhas com preco_unit_venda = 0`
```gs
=COUNTIF(SKU_RESUMO!G2:G,0)
```

---

## 9) Boas práticas para não quebrar o modelo

1. Sempre colar novos CSVs nas abas `*_RAW`, mantendo cabeçalhos originais.
2. Não editar manualmente as abas `*_STG` e `SKU_RESUMO` (somente fórmulas).
3. Validar a aba `VALIDACOES` após cada atualização.
4. Se houver mudança de layout de CSV, revisar referências de coluna (ex.: `COMPRAS_RAW!AU`).

---

## 10) Entrega rápida (checklist)

- [ ] CSV vendas colado em `VENDAS_RAW`
- [ ] CSV compras colado em `COMPRAS_RAW`
- [ ] Fórmulas copiadas da linha 2 até o fim
- [ ] `SKU_RESUMO` preenchido
- [ ] `PAINEL` com indicadores
- [ ] `VALIDACOES` sem alertas críticos

Com isso, a planilha fica pronta para acompanhar **rentabilidade por SKU, cobertura de compras e prioridade ABC** em rotina diária/semanal.

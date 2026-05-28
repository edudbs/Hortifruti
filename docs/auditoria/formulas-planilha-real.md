# AUDITORIA DE FÓRMULAS DA PLANILHA REAL — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Documentar a auditoria estrutural da planilha operacional real do Projeto Hortifruti, confrontando o estado vivo da planilha com a arquitetura, os scripts e os documentos já versionados.

Esta auditoria foi realizada a partir do arquivo exportado da planilha real:

```text
Template - Cruzamento Vendas x Compras.xlsx
```

Nenhuma alteração foi executada na planilha.

---

## 2. Escopo analisado

Foram analisadas:

- abas existentes;
- ranges efetivos;
- fórmulas reais exportadas;
- fórmulas convertidas pelo Excel;
- dependências entre abas;
- camadas analíticas adicionais;
- sinais de divergência entre template e operação real.

---

## 3. Abas encontradas na planilha real

| Ordem | Aba | Range encontrado | Classificação |
|---|---|---|---|
| 1 | VENDAS_RAW | A1:R1745 | entrada bruta |
| 2 | COMPRAS_RAW | A1:AU438 | entrada bruta |
| 3 | VENDAS_BASE | A1:M1745 | base tratada |
| 4 | COMPRAS_BASE | A1:K438 | base tratada |
| 5 | VENDAS_STG | A1:M2170 | staging |
| 6 | COMPRAS_STG | A1:K1000 | staging |
| 7 | SKU_RESUMO | A1:M1000 | consolidação SKU |
| 8 | ANALISE_SKU_SEMANAL | A1:P1000 | análise operacional semanal |
| 9 | ANALISE_SKU_GERAL | A1:O1000 | análise operacional geral |
| 10 | AUDITORIA_OPERACIONAL | A1:P347 | auditoria operacional |
| 11 | CALENDARIO_OPERACIONAL | A1:H1000 | calendário operacional |
| 12 | PAINEL | A1:B5 | painel gerencial |
| 13 | VALIDACOES | A1:B5 | validações |

---

## 4. Descobertas principais

## 4.1 A planilha real evoluiu além do template inicial

Foram encontradas abas adicionais não contempladas no mapa inicial:

- `ANALISE_SKU_SEMANAL`;
- `ANALISE_SKU_GERAL`;
- `AUDITORIA_OPERACIONAL`;
- `CALENDARIO_OPERACIONAL`.

Essas abas indicam que a planilha real possui uma camada operacional e analítica mais madura do que a arquitetura inicialmente documentada.

## 4.2 Os ranges foram parcialmente limitados

Ao contrário do padrão inicial de colunas inteiras em todos os pontos, a planilha real utiliza diversos ranges limitados, como:

- `VENDAS_BASE!B2:B2170`;
- `COMPRAS_BASE!D2:D1000`;
- `SKU_RESUMO!A2:A1000`;
- `ANALISE_SKU_SEMANAL!A2:P1000`.

Isso sugere tentativa de estabilização de performance e redução de propagação infinita.

## 4.3 Fórmulas Google Sheets foram parcialmente convertidas no Excel

Algumas fórmulas aparecem no `.xlsx` como:

```text
__xludf.DUMMYFUNCTION(...)
```

Isso ocorre porque algumas funções nativas do Google Sheets não são plenamente convertidas pelo Excel.

Ainda assim, a estrutura lógica principal foi preservada o suficiente para auditoria.

---

## 5. Fórmulas reais por camada

## 5.1 VENDAS_STG

Exemplos encontrados:

```text
A2 = IF(VENDAS_BASE!B2:B2170="","",VENDAS_BASE!A2:A2170)
B2 = IF(VENDAS_BASE!B2:B2170="","",VENDAS_BASE!B2:B2170)
E2 = IF(VENDAS_BASE!D2:D2170="","",IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!D2:D2170,".","")),0))
J2 = IF(VENDAS_BASE!I2:I2170="","",IFERROR(VALUE(SUBSTITUTE(VENDAS_BASE!I2:I2170,".","")),0)/100)
M2 = IF(A2:A2170="","",YEAR(A2:A2170)&"-S"&TEXT(ISOWEEKNUM(A2:A2170),"00"))
```

### Observação

A camada `VENDAS_STG` confirma:

- parsing financeiro;
- uso de `IFERROR(...;0)`;
- dependência de ranges limitados;
- criação de semana operacional.

## 5.2 COMPRAS_STG

Exemplos encontrados:

```text
A2 = IF(COMPRAS_BASE!D2:D1000="","",COMPRAS_BASE!A2:A1000)
E2 = ARRAYFORMULA/REGEXREPLACE convertido via DUMMYFUNCTION
I2 = IF(COMPRAS_BASE!D2:D1000="","",IFERROR(COMPRAS_BASE!F2:F1000*COMPRAS_BASE!G2:G1000,0))
K2 = IF(A2:A1000="","",YEAR(A2:A1000)&"-S"&TEXT(ISOWEEKNUM(A2:A1000),"00"))
```

### Observação

A camada `COMPRAS_STG` confirma:

- cálculo de custo total por quantidade x valor;
- dependência de parsing;
- criação de semana operacional;
- uso de `IFERROR(...;0)`.

## 5.3 SKU_RESUMO

Exemplos encontrados:

```text
A2 = SORT/UNIQUE/FILTER sobre VENDAS_STG!C:C
B2 = IF(A2:A1000="","",IFERROR(VLOOKUP(A2:A1000,{VENDAS_STG!C:C,VENDAS_STG!D:D},2,FALSE),""))
D2 = IF(A2:A1000="","",SUMIF(VENDAS_STG!C:C,A2:A1000,VENDAS_STG!E:E))
H2 = IF(A2:A1000="","",SUMIF(COMPRAS_STG!E:E,A2:A1000,COMPRAS_STG!I:I))
J2 = IF(A2:A1000="","",IFERROR(I2:I1000/H2:H1000,0))
L2 = IF(A2:A1000="","",IFERROR(K2:K1000/G2:G1000,0))
M2 = IF(A2:A1000="","",IF(H2:H1000>0,"OK","SEM_MATCH"))
```

### Observação

`SKU_RESUMO` confirma papel central no cruzamento compras x vendas e na identificação de SKU sem compra correspondente.

---

## 6. Camadas analíticas adicionais encontradas

## 6.1 ANALISE_SKU_SEMANAL

A aba usa fórmulas com:

- `MAP`;
- `LAMBDA`;
- `SUMIFS`;
- `IFS`;
- semana operacional;
- status operacional.

Exemplos de regras encontradas:

```text
SEM_COMPRA
MARGEM_NEGATIVA
RISCO_RUPTURA
EXCESSO_COMPRA
VENDEU_MAIS_QUE_COMPROU
OK
```

### Impacto

Essa aba representa uma camada de análise operacional semanal real, não prevista na arquitetura inicial.

## 6.2 ANALISE_SKU_GERAL

A aba consolida análise geral a partir de `SKU_RESUMO`, com regras como:

```text
RISCO_RUPTURA
EXCESSO_COMPRA
MARGEM_NEGATIVA
VENDEU_MAIS_QUE_COMPROU
OK
```

### Impacto

Essa aba confirma a existência de uma camada analítica agregada para risco operacional e financeiro.

## 6.3 AUDITORIA_OPERACIONAL

A aba filtra riscos originados na análise semanal e classifica criticidade/status.

Foram encontrados conceitos como:

- criticidade;
- status;
- semana;
- código;
- produto;
- recomendação;
- situação aberta.

### Impacto

Existe uma camada embrionária de governança operacional dentro da própria planilha.

## 6.4 CALENDARIO_OPERACIONAL

A aba utiliza datas de compras para montar calendário operacional e identificar possíveis faltas.

Exemplos encontrados:

```text
SEQUENCE(MAX(COMPRAS_STG!A:A)-MIN(COMPRAS_STG!A:A)+1,1,MIN(COMPRAS_STG!A:A),1)
COUNTIF(COMPRAS_STG!A:A,D2:D1000)
FALTA_COMPRA
OK
```

### Impacto

A planilha real já contém lógica temporal/operacional além do cruzamento simples compra x venda.

---

## 7. PAINEL e VALIDACOES

## 7.1 PAINEL

Fórmulas encontradas:

```text
B2 = COUNTA(SKU_RESUMO!A2:A1000)
B3 = COUNTIF(SKU_RESUMO!M2:M1000,"OK")
B5 = IFERROR(COUNTIF(SKU_RESUMO!M2:M1000,"OK")/COUNTA(SKU_RESUMO!A2:A1000),0)
```

### Observação

O `PAINEL` é simples e depende fortemente da integridade de `SKU_RESUMO`.

## 7.2 VALIDACOES

Fórmulas encontradas:

```text
B2 = IFERROR(COUNTIF(VENDAS_STG!C2:C1000,"")/COUNTA(VENDAS_STG!B2:B1000),0)
B3 = IFERROR(COUNTIF(COMPRAS_STG!E2:E1000,"")/COUNTA(COMPRAS_STG!D2:D1000),0)
B4 = COUNTIFS(SKU_RESUMO!M2:M1000,"OK",SKU_RESUMO!J2:J1000,0)
B5 = COUNTIF(SKU_RESUMO!G2:G1000,0)
```

### Observação

`VALIDACOES` já contém governança básica, mas ainda depende de métricas simples e não bloqueantes.

---

## 8. Divergências relevantes em relação à arquitetura inicial

| Divergência | Impacto | Criticidade |
|---|---|---|
| Novas abas analíticas não documentadas inicialmente | arquitetura real maior que o template | ALTA |
| Existência de auditoria operacional interna | governança operacional já iniciada | ALTA |
| Calendário operacional presente | regra temporal real | MÉDIA/ALTA |
| Ranges parcialmente limitados | melhora estrutural | POSITIVO |
| Funções Google convertidas como DUMMYFUNCTION no Excel | limita leitura externa | MÉDIA |
| PAINEL mais simples que o esperado | lógica pesada está antes do painel | POSITIVO |
| VALIDACOES existente porém não bloqueante | risco ainda pode propagar | ALTA |

---

## 9. Riscos confirmados

- `IFERROR(...;0)` ainda pode mascarar falhas financeiras;
- SKU sem match continua crítico;
- custo zerado pode gerar margem artificial;
- validações não bloqueiam análise gerencial;
- parte da lógica operacional está distribuída em abas analíticas;
- exportação Excel não preserva perfeitamente todas as funções Google Sheets.

---

## 10. Decisão técnica

A planilha real deve ser tratada como versão operacional viva e mais avançada que o template inicial.

A arquitetura oficial precisa ser atualizada para incluir:

- `ANALISE_SKU_SEMANAL`;
- `ANALISE_SKU_GERAL`;
- `AUDITORIA_OPERACIONAL`;
- `CALENDARIO_OPERACIONAL`;
- camada de análise semanal;
- camada de auditoria operacional;
- camada de calendário operacional;
- validações reais existentes.

---

## 11. Próximos passos recomendados

1. atualizar o mapa arquitetural operacional v2;
2. revisar matriz de riscos para incluir abas analíticas reais;
3. mapear regras das abas `ANALISE_SKU_*`;
4. transformar `AUDITORIA_OPERACIONAL` em referência de governança;
5. avaliar quais validações devem virar bloqueantes futuramente.

---

## 12. Status

CONCLUÍDO

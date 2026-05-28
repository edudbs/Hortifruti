# CATÁLOGO DE FÓRMULAS CRÍTICAS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Catalogar as fórmulas críticas do Projeto Hortifruti como ativos técnicos governados.

Este documento transforma fórmulas relevantes em inventário técnico inicial, classificando:

- localização;
- domínio;
- impacto;
- criticidade;
- dependências;
- riscos silenciosos;
- prioridade de estabilização.

Este documento não altera fórmulas.

---

## 2. Contexto

Auditorias anteriores confirmaram que o Google Sheets não atua apenas como visualização.

Ele funciona também como:

- motor de transformação;
- camada de parsing;
- camada de consolidação;
- camada financeira parcial;
- camada de validação operacional.

Por isso, fórmulas críticas devem ser tratadas como código operacional.

---

## 3. Critérios de criticidade

| Criticidade | Definição |
|---|---|
| BAIXA | impacto localizado e reversível |
| MÉDIA | afeta operação parcial |
| ALTA | afeta pipeline, painel ou performance |
| CRÍTICA | pode comprometer resultado financeiro ou decisão gerencial |

---

## 4. Catálogo inicial de fórmulas críticas

| ID | Aba | Célula/intervalo | Funções/padrões | Domínio | Tipo | Criticidade | Risco principal |
|---|---|---|---|---|---|---|---|
| F-001 | VENDAS_STG | A2:L2 | ARRAYFORMULA, IF, REGEXREPLACE, VALUE, SUBSTITUTE, IFERROR | parsing / staging | financeira / operacional | CRÍTICA | erro monetário silencioso |
| F-002 | COMPRAS_STG | A2:J2 | ARRAYFORMULA, IF, REGEXREPLACE, cálculo qtd x unidade | parsing / staging | financeira / operacional | CRÍTICA | custo incorreto |
| F-003 | VENDAS_STG | colunas abertas | ARRAYFORMULA em ranges A2:A | staging | estrutural / performance | ALTA | propagação indevida |
| F-004 | COMPRAS_STG | colunas abertas | ARRAYFORMULA em ranges abertos | staging | estrutural / performance | ALTA | lentidão e propagação |
| F-005 | SKU_RESUMO | A2 | SORT, UNIQUE, FILTER | catalogo_sku | estrutural | ALTA | SKU omitido ou duplicado |
| F-006 | SKU_RESUMO | B2:C2 | VLOOKUP, IFERROR | catalogo_sku | estrutural / silenciosa | CRÍTICA | falso vazio em lookup |
| F-007 | SKU_RESUMO | D2:F2 | SUMIF | financeiro | financeira | CRÍTICA | soma incorreta de vendas/compras |
| F-008 | SKU_RESUMO | G2:L2 | divisões com IFERROR(...;0) | financeiro | financeira / silenciosa | CRÍTICA | erro convertido em zero |
| F-009 | PAINEL | A2:B5 | COUNTA, COUNTIF, IFERROR, SUMPRODUCT | painel | gerencial / financeira | CRÍTICA | indicador gerencial distorcido |
| F-010 | VALIDACOES | A2:B5 | COUNTIF, COUNTIFS, IFERROR | validacoes | operacional / silenciosa | ALTA | erro apenas alertado ou mascarado |
| F-011 | STG / BASE | fórmulas de conversão | NUMBERVALUE, VALUE, SUBSTITUTE | parsing | financeira | CRÍTICA | locale interpretado incorretamente |
| F-012 | STG / SKU_RESUMO | lookups cruzados | VLOOKUP, referências de coluna | catalogo_sku | estrutural | CRÍTICA | correspondência SKU incorreta |

---

## 5. Fórmulas de maior risco silencioso

As fórmulas com maior risco de falha não detectada são:

```text
F-001
F-006
F-008
F-009
F-011
F-012
```

Essas fórmulas possuem características críticas:

- mascaram erro com IFERROR;
- dependem de locale;
- alimentam indicadores financeiros;
- propagam dados para o PAINEL;
- dependem de correspondência entre abas.

---

## 6. Dependências estruturais identificadas

As fórmulas críticas dependem de:

- nomes fixos de abas;
- posições fixas de colunas;
- preenchimento contínuo;
- locale pt_BR;
- consistência dos CSVs;
- integridade das abas RAW, BASE e STG;
- ausência de edição manual indevida.

---

## 7. Restrições derivadas

Não alterar sem nova auditoria:

- ARRAYFORMULA críticas;
- fórmulas com IFERROR;
- fórmulas de parsing monetário;
- VLOOKUP estruturais;
- SUMIF financeiros;
- fórmulas do PAINEL;
- fórmulas de VALIDACOES;
- ranges abertos que alimentam SKU_RESUMO.

---

## 8. Prioridades de estabilização

## 8.1 Prioridade imediata

- mapear fórmulas reais célula a célula na planilha atual;
- confirmar se todas as fórmulas documentadas ainda estão ativas;
- identificar fórmulas divergentes entre template e planilha operacional.

## 8.2 Prioridade de curto prazo

- criar testes manuais para parsing monetário;
- validar lookup de SKU;
- validar indicadores principais do PAINEL;
- documentar ranges críticos.

## 8.3 Prioridade futura

- reduzir IFERROR silencioso;
- centralizar parsing;
- criar validações bloqueantes;
- desacoplar lógica financeira das fórmulas.

---

## 9. Próximo passo recomendado

Executar uma auditoria direta na planilha real para confirmar:

- fórmula real;
- célula exata;
- aba;
- divergência em relação ao template;
- impacto financeiro;
- risco de alteração.

Documento futuro sugerido:

```text
docs/auditoria/formulas-planilha-real.md
```

---

## 10. Status

CONCLUÍDO

# AUDITORIA DE FÓRMULAS DA PLANILHA REAL — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Preparar a auditoria da planilha operacional real do Projeto Hortifruti, comparando o estado efetivo em produção com o template e os Apps Script versionados.

Esta frente existe para responder:

```text
template oficial == planilha operacional real?
```

Este documento ainda não confirma fórmulas reais da planilha, pois depende da coleta direta no Google Sheets operacional.

---

## 2. Escopo planejado

A auditoria deve verificar:

- abas existentes;
- fórmulas reais por aba;
- células e ranges com fórmulas;
- divergências em relação ao template;
- fórmulas alteradas manualmente;
- fórmulas quebradas;
- ranges abertos;
- validações existentes;
- abas extras;
- colunas extras;
- dependências não documentadas.

---

## 3. Fontes de comparação

A auditoria deve comparar a planilha real contra:

- `apps-script/gerar_template_google_sheets.gs`;
- `docs/auditoria/catalogo-formulas-criticas.md`;
- `docs/auditoria/formulas-dependencias.md`;
- `docs/arquitetura/mapa-real-atual.md`;
- `docs/regras/regras-implicitas-negocio.md`.

---

## 4. Abas esperadas

| Aba esperada | Status na planilha real | Observação |
|---|---|---|
| VENDAS_RAW | A verificar |  |
| COMPRAS_RAW | A verificar |  |
| VENDAS_BASE | A verificar |  |
| COMPRAS_BASE | A verificar |  |
| VENDAS_STG | A verificar |  |
| COMPRAS_STG | A verificar |  |
| SKU_RESUMO | A verificar |  |
| PAINEL | A verificar |  |
| VALIDACOES | A verificar |  |

---

## 5. Fórmulas críticas a validar

| ID | Local esperado | Padrão esperado | Status | Observação |
|---|---|---|---|---|
| FR-001 | VENDAS_STG | ARRAYFORMULA / parsing / IFERROR | A verificar |  |
| FR-002 | COMPRAS_STG | ARRAYFORMULA / parsing / cálculo | A verificar |  |
| FR-003 | SKU_RESUMO | SORT / UNIQUE / FILTER | A verificar |  |
| FR-004 | SKU_RESUMO | VLOOKUP / IFERROR | A verificar |  |
| FR-005 | SKU_RESUMO | SUMIF | A verificar |  |
| FR-006 | SKU_RESUMO | divisões com IFERROR(...;0) | A verificar |  |
| FR-007 | PAINEL | COUNTA / COUNTIF / SUMPRODUCT | A verificar |  |
| FR-008 | VALIDACOES | COUNTIF / COUNTIFS / IFERROR | A verificar |  |

---

## 6. Evidências necessárias

Para concluir a auditoria, coletar da planilha real:

- lista de abas;
- fórmulas das abas STG;
- fórmulas do SKU_RESUMO;
- fórmulas do PAINEL;
- fórmulas da aba VALIDACOES;
- print ou exportação das fórmulas críticas;
- indicação de fórmulas editadas manualmente;
- indicação de abas adicionais não previstas.

---

## 7. Método recomendado de coleta

Preferencialmente usar uma destas opções:

### Opção A — exportação manual

No Google Sheets:

1. abrir a planilha real;
2. ativar visualização de fórmulas, se necessário;
3. copiar fórmulas críticas por aba;
4. registrar célula/range;
5. enviar para auditoria.

### Opção B — Apps Script auxiliar somente leitura

Criar futuramente script temporário de leitura que liste:

- aba;
- célula;
- fórmula;
- range;
- status.

Esse script deve ser somente leitura e só poderá ser criado com aprovação explícita.

---

## 8. Riscos que esta auditoria pretende detectar

- fórmula real divergente do template;
- fórmula apagada;
- fórmula sobrescrita manualmente;
- coluna adicionada sem documentação;
- aba extra com regra paralela;
- PAINEL calculando com fonte divergente;
- VALIDACOES incompleta;
- ranges contaminados;
- lógica financeira fora do inventário.

---

## 9. Classificação esperada das divergências

| Tipo | Definição |
|---|---|
| Divergência baixa | diferença visual ou sem impacto operacional |
| Divergência média | diferença estrutural localizada |
| Divergência alta | diferença que afeta pipeline ou validação |
| Divergência crítica | diferença que afeta financeiro, margem ou PAINEL |

---

## 10. Decisão atual

Esta frente está aberta como preparação de auditoria.

Ainda não há evidência suficiente para afirmar se a planilha real diverge ou não do template.

---

## 11. Próximo passo recomendado

Coletar as fórmulas reais da planilha operacional e atualizar este documento com:

- evidências;
- divergências;
- impacto;
- criticidade;
- decisão técnica.

---

## 12. Status

EM ANÁLISE

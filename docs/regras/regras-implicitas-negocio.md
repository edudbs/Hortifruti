# CATÁLOGO DE REGRAS IMPLÍCITAS DE NEGÓCIO — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Catalogar as principais regras implícitas de negócio identificadas no Projeto Hortifruti.

Este documento transforma conhecimento tácito, fórmulas, convenções operacionais e comportamentos esperados em regras documentadas.

Não implementa alterações.

---

## 2. Escopo

Este catálogo consolida regras relacionadas a:

- importação de CSVs;
- parsing monetário;
- normalização de SKU;
- cruzamento compras x vendas;
- deduplicação;
- fórmulas críticas;
- operação manual;
- validações e painéis.

Base documental:

- `docs/arquitetura/mapa-real-atual.md`
- `docs/auditoria/formulas-dependencias.md`
- `docs/auditoria/apps-script-automacoes.md`
- `docs/auditoria/triggers-instalados.md`
- `docs/riscos/matriz-riscos.md`
- `docs/operacao/checklist-importacao.md`

---

## 3. Classificação das regras

| Tipo | Definição |
|---|---|
| Operacional | depende da rotina humana ou ordem de execução |
| Técnica | depende de Apps Script, fórmulas, abas ou arquivos |
| Financeira | impacta custo, margem, venda ou análise gerencial |
| Estrutural | depende de colunas, abas, layout ou pipeline |
| Silenciosa | pode falhar sem alerta explícito |

---

## 4. Regras catalogadas

| ID | Regra implícita | Tipo | Evidência | Risco | Status |
|---|---|---|---|---|---|
| RN-001 | O pipeline deve seguir a ordem RAW → BASE → STG → SKU_RESUMO → PAINEL | Estrutural | arquitetura documentada | quebra de fórmulas e painel | Confirmada |
| RN-002 | CSVs devem manter layout esperado pelo Varejo Fácil | Técnica | dependência de colunas e parsing | importação incorreta | Confirmada |
| RN-003 | Locale pt_BR é pressuposto operacional | Técnica / Financeira | parsing monetário e NUMBERVALUE | valores incorretos | Confirmada |
| RN-004 | Erros de fórmula podem ser mascarados por IFERROR | Silenciosa | auditoria de fórmulas | inconsistência invisível | Confirmada |
| RN-005 | O sistema depende de execução manual controlada | Operacional | ausência de triggers instalados | erro humano | Confirmada |
| RN-006 | O arquivo CSV mais recente é tratado como candidato principal de importação | Operacional / Técnica | auditoria Apps Script | arquivo errado processado | Confirmada |
| RN-007 | SKU_RESUMO pressupõe integridade do STG | Estrutural / Financeira | mapa arquitetural | margem e consolidação incorretas | Confirmada |
| RN-008 | PAINEL pressupõe ausência de erro nas camadas anteriores | Gerencial | fluxo encadeado | decisão gerencial incorreta | Confirmada |
| RN-009 | Deduplicação atual depende de linha inteira ou estrutura equivalente | Técnica | auditoria Apps Script | duplicidade ou exclusão indevida | Confirmada |
| RN-010 | Operador deve conferir dados após importação | Operacional | checklist operacional | erro silencioso não detectado | Confirmada |
| RN-011 | Fórmulas matriciais pressupõem preenchimento contínuo | Estrutural | auditoria fórmulas | ranges contaminados | Confirmada |
| RN-012 | Produtos vendidos precisam encontrar correspondência analítica em compras/SKU | Financeira | cruzamento compras x vendas | margem inválida | Parcialmente confirmada |
| RN-013 | Datas operacionais precisam estar no período correto de análise | Operacional / Financeira | histórico operacional | semana errada | Parcialmente confirmada |
| RN-014 | Correções manuais em abas intermediárias não são rastreadas | Operacional | risco identificado | perda de auditoria | Parcialmente confirmada |
| RN-015 | Validações podem alertar sem bloquear consolidação | Operacional / Silenciosa | auditoria de regras | painel com erro conhecido | Parcialmente confirmada |

---

## 5. Regras críticas prioritárias

As regras mais críticas atualmente são:

```text
RN-003
RN-004
RN-005
RN-007
RN-008
RN-009
RN-012
```

Essas regras impactam diretamente:

- margem;
- custo;
- consolidação por SKU;
- confiabilidade do PAINEL;
- rastreabilidade operacional;
- prevenção de inconsistência silenciosa.

---

## 6. Restrições derivadas das regras

Não alterar sem nova auditoria:

- parsing monetário;
- locale;
- fórmulas com IFERROR;
- VLOOKUP ou lookup estrutural;
- estrutura das abas;
- ordem do pipeline;
- processo de deduplicação;
- fluxo de importação manual.

---

## 7. Próximas validações recomendadas

- validar regra real de correspondência SKU entre compras e vendas;
- documentar critério de margem e custo usado no PAINEL;
- validar tratamento de datas e semanas operacionais;
- mapear campos obrigatórios dos CSVs reais;
- identificar se existem produtos/categorias com regras específicas.

---

## 8. Status

CONCLUÍDO

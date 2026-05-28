# MATRIZ CENTRAL DE RISCOS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## Objetivo

Consolidar os principais riscos técnicos, operacionais, financeiros e arquiteturais identificados nas auditorias do Projeto Hortifruti.

Esta matriz atua como:
- backlog técnico oficial;
- referência de priorização;
- base para estabilização futura;
- apoio à governança arquitetural.

---

# 1. Matriz central de riscos

| ID | Risco | Origem | Criticidade | Impacto | Mitigação futura |
|---|---|---|---|---|---|
| R-001 | Parsing monetário dependente de locale | Fórmulas / STG | CRÍTICA | Financeiro | Centralização do parsing |
| R-002 | IFERROR mascarando falhas | Fórmulas | CRÍTICA | Inconsistência silenciosa | Validação explícita |
| R-003 | Deduplicação por linha inteira | Apps Script | CRÍTICA | Operacional | Chave operacional estruturada |
| R-004 | Dependência de locale pt_BR | Sheets / Apps Script | ALTA | Financeiro | Camada única de normalização |
| R-005 | Ranges abertos A:A | Fórmulas | ALTA | Performance | Ranges controlados |
| R-006 | Dependência de colunas fixas | Pipeline | CRÍTICA | Estrutural | Camada de abstração |
| R-007 | VLOOKUP estrutural | STG / SKU_RESUMO | ALTA | Operacional | Chaves estruturadas |
| R-008 | CSV mais recente automaticamente | Importação | ALTA | Operacional | Controle incremental |
| R-009 | clearContents destrutivo | Script legado | CRÍTICA | Perda de dados | Proteção transacional |
| R-010 | Triggers não versionados | Ambiente GAS | ALTA | Rastreabilidade | Inventário de triggers |

---

# 2. Prioridade oficial do projeto

```text
1. estabilização
2. documentação
3. governança
4. validação
5. modularização gradual
6. centralização de regras
7. evolução arquitetural
```

---

# 3. Conclusão

O Projeto Hortifruti já possui maturidade suficiente para governança arquitetural formal.

Os riscos mais relevantes concentram-se em:
- inconsistência silenciosa;
- dependência estrutural;
- parsing financeiro;
- automações invisíveis;
- dependência operacional humana.

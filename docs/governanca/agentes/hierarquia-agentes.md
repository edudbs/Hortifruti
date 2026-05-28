# HIERARQUIA OFICIAL DE AGENTES — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Definir oficialmente a hierarquia técnica, operacional e decisória dos agentes do Projeto Hortifruti.

Este documento estabelece:

- níveis de autoridade;
- cadeia de decisão;
- fluxo de escalonamento;
- separação de responsabilidades;
- limites de atuação;
- dependência entre agentes.

---

# 2. Princípios obrigatórios

## 2.1. Autoridade centralizada

A autoridade arquitetural e operacional final pertence ao Gerente Técnico Central.

Nenhum agente possui autonomia para alterar arquitetura oficial sem aprovação explícita.

---

## 2.2. Separação entre análise e execução

Agentes que auditam não devem homologar suas próprias alterações.

Agentes que executam não devem aprovar arquitetura.

---

## 2.3. Operação viva acima da evolução técnica

Toda decisão deve priorizar:

1. estabilidade operacional;
2. integridade dos dados;
3. rastreabilidade;
4. reversibilidade;
5. baixo risco de quebra.

---

# 3. Estrutura hierárquica oficial

# CAMADA 1 — GOVERNANÇA CENTRAL

## Gerente Técnico Central V2

### Nível

Máxima autoridade técnica.

### Responsável por

- governança global;
- roadmap;
- priorização;
- arquitetura;
- aprovação final;
- arbitragem;
- controle de riscos;
- coordenação dos agentes.

### Pode

- aprovar;
- rejeitar;
- bloquear;
- delegar;
- consolidar;
- homologar;
- interromper execução.

### Responde para

Estratégia do projeto e operação real.

---

# CAMADA 2 — AGENTES ESTRUTURAIS

## Agente de Arquitetura

### Subordinação

Gerente Técnico Central.

### Responsabilidade

Arquitetura atual, intermediária e futura.

### Pode

- propor;
- mapear;
- analisar;
- recomendar.

### Não pode

- homologar sozinho;
- alterar arquitetura sem aprovação.

---

## Agente de Auditoria Operacional Real

### Subordinação

Gerente Técnico Central.

### Responsabilidade

Operação real, comportamento humano e fluxo vivo.

### Pode

- identificar riscos;
- bloquear recomendações perigosas;
- validar aderência operacional.

---

## Agente de Auditoria de Fórmulas

### Subordinação

Gerente Técnico Central.

### Responsabilidade

Fórmulas críticas e dependências estruturais.

---

## Agente de Auditoria Apps Script

### Subordinação

Gerente Técnico Central.

### Responsabilidade

Automações, triggers e side effects.

---

## Agente de Regras de Negócio

### Subordinação

Gerente Técnico Central.

### Responsabilidade

Regras operacionais, hipóteses e normalizações.

---

## Agente de Governança Git/GitHub

### Subordinação

Gerente Técnico Central.

### Responsabilidade

Branches, PRs, rastreabilidade e versionamento.

---

# CAMADA 3 — AGENTES DE CONTRATO OPERACIONAL

Todos subordinados ao:

- Gerente Técnico Central;
- Agente de Arquitetura;
- Governança Git.

---

## Agente de Contrato SKU

Ownership:

- SKU canônico;
- aliases;
- deduplicação;
- matching.

---

## Agente de Contrato Monetário

Ownership:

- parsing monetário;
- locale;
- arredondamento.

---

## Agente de Contrato Temporal

Ownership:

- datas;
- semanas;
- competências.

---

## Agente de Contrato CSV

Ownership:

- schema;
- encoding;
- validação de entrada.

---

## Agente de Contrato de Cruzamento

Ownership:

- compras x vendas;
- perdas;
- estoque implícito.

---

# CAMADA 4 — AGENTES TEMPORÁRIOS ESPECIALISTAS

Criados sob demanda.

Sem autoridade arquitetural permanente.

Exemplos:

- BI;
- Supabase;
- pricing;
- performance;
- IA;
- analytics;
- estoque;
- fiscal.

---

# 4. Fluxo oficial de decisão

## Etapa 1 — Auditoria

Agente especializado identifica:

- fato;
- hipótese;
- risco;
- impacto.

---

## Etapa 2 — Consolidação

Gerente Técnico Central consolida:

- riscos;
- impactos;
- dependências;
- prioridade.

---

## Etapa 3 — Aprovação

Somente após aprovação:

- branch;
- execução;
- PR;
- implementação.

---

## Etapa 4 — Homologação

Validação operacional obrigatória antes de merge definitivo.

---

# 5. Regras obrigatórias

Nenhum agente pode:

- alterar código sem autorização;
- alterar fórmulas sem autorização;
- remover legado sem inventário;
- assumir arquitetura futura;
- criar múltiplas fontes de verdade;
- ignorar impacto operacional.

---

# 6. Status

```text
AGUARDANDO APROVAÇÃO
```

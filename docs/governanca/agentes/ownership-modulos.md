# OWNERSHIP OFICIAL DE MÓDULOS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Definir oficialmente o ownership técnico e operacional dos módulos, áreas, contratos e responsabilidades do Projeto Hortifruti.

Este documento existe para evitar:

- sobreposição de agentes;
- conflitos de responsabilidade;
- alterações sem ownership;
- múltiplas fontes de verdade;
- fragmentação arquitetural.

---

# 2. Regras gerais

## 2.1. Todo módulo deve possuir ownership explícito

Nenhuma área crítica do projeto deve permanecer sem responsável técnico definido.

---

## 2.2. Ownership não significa autonomia irrestrita

Mesmo possuindo ownership:

- alterações continuam dependendo de aprovação;
- arquitetura continua centralizada;
- mudanças continuam auditáveis.

---

## 2.3. Operação viva possui prioridade máxima

Módulos operacionais críticos devem priorizar:

- estabilidade;
- rastreabilidade;
- reversibilidade;
- segurança operacional.

---

# 3. Ownership estrutural oficial

| Área / Módulo | Ownership Principal | Apoio |
|---|---|---|
| Arquitetura atual | Agente de Arquitetura | Gerente Técnico Central |
| Arquitetura v2 | Gerente Técnico Central | Agente de Arquitetura |
| Operação viva | Auditoria Operacional Real | Regras de Negócio |
| Fórmulas críticas | Auditoria de Fórmulas | Arquitetura |
| Dependências estruturais | Auditoria de Fórmulas | Arquitetura |
| Apps Script | Auditoria Apps Script | Governança Git |
| Triggers | Auditoria Apps Script | Arquitetura |
| Side effects | Auditoria Apps Script | Operacional |
| Governança Git | Governança Git/GitHub | Gerente Técnico Central |
| PRs | Governança Git/GitHub | Gerente Técnico Central |
| Riscos técnicos | Gerente Técnico Central | Todos os agentes estruturais |
| Matriz de riscos | Gerente Técnico Central | Auditorias |

---

# 4. Ownership dos contratos operacionais

| Contrato | Ownership Principal | Apoio |
|---|---|---|
| SKU | Agente de Contrato SKU | Regras de Negócio |
| Monetário | Agente de Contrato Monetário | Fórmulas |
| Temporal | Agente de Contrato Temporal | Operacional |
| CSV | Agente de Contrato CSV | Apps Script |
| Cruzamento Compras x Vendas | Agente de Contrato de Cruzamento | Operacional |

---

# 5. Ownership dos fluxos operacionais

| Fluxo | Ownership Principal | Apoio |
|---|---|---|
| Importação CSV | Apps Script | Contrato CSV |
| Normalização | Regras de Negócio | Contrato SKU |
| STG | Arquitetura | Fórmulas |
| SKU_RESUMO | Regras de Negócio | Fórmulas |
| PAINEL | Operacional | BI futuro |
| VALIDACOES | Auditoria de Fórmulas | Operacional |
| ANALISE_SKU_* | Operacional | Regras de Negócio |
| AUDITORIA_OPERACIONAL | Auditoria Operacional | Gerente Técnico Central |

---

# 6. Ownership da arquitetura futura

## Supabase

Ownership provisório:

- Gerente Técnico Central;
- Agente de Arquitetura.

Implementação futura depende de:

- contratos operacionais homologados;
- estabilização operacional;
- redução de risco silencioso.

---

## APIs futuras

Ownership provisório:

- Arquitetura;
- Governança Git;
- Supabase futuro.

---

# 7. Ownership proibido

Nenhum agente pode possuir ownership exclusivo sobre:

- operação inteira;
- arquitetura inteira;
- múltiplos contratos conflitantes;
- homologação da própria alteração;
- decisão final arquitetural.

---

# 8. Regras obrigatórias

Todo ownership deve:

- informar impactos;
- manter rastreabilidade;
- respeitar branches oficiais;
- seguir protocolo do projeto;
- evitar breaking changes silenciosos.

---

# 9. Status

```text
AGUARDANDO APROVAÇÃO
```

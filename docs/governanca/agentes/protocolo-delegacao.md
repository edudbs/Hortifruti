# PROTOCOLO OFICIAL DE DELEGAÇÃO — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Definir o protocolo oficial de delegação de tarefas, auditorias, validações e implementações do Projeto Hortifruti.

Este documento padroniza:

- abertura de tarefas;
- cadeia de responsabilidade;
- critérios de delegação;
- limites de autonomia;
- fluxo de aprovação;
- rastreabilidade operacional.

---

# 2. Princípios obrigatórios

## 2.1. Toda tarefa deve possuir ownership

Nenhuma tarefa pode existir sem:

- agente responsável;
- escopo claro;
- branch recomendada;
- objetivo explícito.

---

## 2.2. Toda delegação deve ser rastreável

Toda tarefa deve registrar:

- quem delegou;
- quem executou;
- branch envolvida;
- arquivos impactados;
- riscos;
- decisão proposta.

---

## 2.3. Aprovação não é execução

O agente que aprova não deve ser o único responsável pela validação da própria alteração.

---

# 3. Fluxo oficial de delegação

## Etapa 1 — Definição do objetivo

Toda tarefa deve iniciar com:

- objetivo;
- contexto;
- restrições;
- branch oficial;
- dependências conhecidas.

---

## Etapa 2 — Escolha do agente correto

A delegação deve respeitar o ownership oficial.

Exemplos:

| Tema | Agente |
|---|---|
| Fórmulas | Auditoria de Fórmulas |
| Triggers | Auditoria Apps Script |
| Operação viva | Auditoria Operacional |
| SKU | Contrato SKU |
| Parsing monetário | Contrato Monetário |
| Datas | Contrato Temporal |
| CSV | Contrato CSV |
| Arquitetura | Agente de Arquitetura |
| Branches/PRs | Governança Git |

---

## Etapa 3 — Execução controlada

O agente executa apenas dentro do escopo autorizado.

Não deve:

- expandir escopo sem autorização;
- alterar áreas não delegadas;
- criar arquitetura paralela;
- modificar operação viva sem aprovação.

---

## Etapa 4 — Entrega protocolada

Toda entrega deve seguir o protocolo oficial do Projeto Hortifruti.

Blocos obrigatórios:

1. objetivo;
2. escopo analisado;
3. impacto identificado;
4. arquivos impactados;
5. branch recomendada;
6. dependências;
7. riscos;
8. decisão proposta;
9. próximo passo;
10. status.

---

## Etapa 5 — Consolidação central

O Gerente Técnico Central:

- consolida;
- aprova;
- rejeita;
- prioriza;
- bloqueia;
- solicita nova auditoria;
- autoriza execução futura.

---

# 4. Níveis de autonomia

## Nível 1 — Consultivo

Pode:

- analisar;
- auditar;
- sugerir.

Não pode:

- alterar código;
- alterar arquitetura;
- aprovar execução.

---

## Nível 2 — Operacional Controlado

Pode:

- executar alterações autorizadas;
- abrir PRs;
- atualizar documentação.

Depende de:

- branch autorizada;
- escopo explícito;
- validação superior.

---

## Nível 3 — Governança Central

Pode:

- homologar;
- bloquear;
- priorizar;
- arbitrar;
- consolidar decisões.

Representado pelo:

- Gerente Técnico Central.

---

# 5. Regras obrigatórias

Nenhuma delegação deve:

- usar `main` implicitamente;
- ignorar branch oficial;
- alterar legado sem inventário;
- assumir arquitetura futura;
- ocultar riscos operacionais;
- misturar auditoria e homologação.

---

# 6. Status

```text
AGUARDANDO APROVAÇÃO
```

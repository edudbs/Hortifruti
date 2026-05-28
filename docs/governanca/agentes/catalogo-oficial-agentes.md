# CATÁLOGO OFICIAL DE AGENTES — PROJETO HORTIFRUTI

## Branch oficial de análise

```text
docs/reorganizacao-documentacao
```

## Situação da consolidação

- branch oficial considerada: `docs/reorganizacao-documentacao`;
- divergências não avaliadas nesta criação inicial;
- arquivos fora da reorganização documental devem ser inventariados separadamente;
- este documento não altera código, fórmulas, Apps Script, abas ou estrutura operacional.

---

# 1. Objetivo

Consolidar o catálogo oficial de agentes do Projeto Hortifruti para a fase de estabilização arquitetural e validação operacional.

O objetivo deste documento é definir, em nível de governança, quais agentes existem ou são recomendados, qual sua função, qual sua autoridade e como devem interagir dentro do projeto.

---

# 2. Escopo analisado

Este catálogo cobre a estrutura de agentes vinculada a:

- coordenação técnica central;
- auditoria estrutural;
- auditoria operacional real;
- auditoria de fórmulas;
- auditoria de Apps Script;
- regras de negócio e normalização;
- governança Git/GitHub;
- contratos operacionais futuros;
- agentes especialistas temporários.

Não cobre execução técnica profunda, refatoração de código, alteração de planilhas, alteração de fórmulas ou implementação de arquitetura v2.

---

# 3. Princípios de governança dos agentes

## 3.1. Separação entre coordenação, análise e execução

O Projeto Hortifruti deve separar claramente:

- quem coordena;
- quem analisa;
- quem propõe;
- quem executa;
- quem aprova;
- quem homologa.

Um mesmo agente não deve executar e aprovar a própria alteração sem validação superior.

## 3.2. Autoridade arquitetural centralizada

A autoridade arquitetural final pertence ao Gerente Técnico Central.

Agentes especializados podem propor, auditar e recomendar, mas não devem alterar a arquitetura oficial sem aprovação explícita.

## 3.3. Operação viva como prioridade

Nenhum agente deve propor mudança que coloque em risco a operação viva sem:

- análise de impacto;
- plano de rollback;
- branch dedicada;
- validação operacional;
- aprovação explícita.

## 3.4. Documentação como parte do sistema

A documentação técnica deve ser tratada como componente crítico do sistema, especialmente porque o projeto depende de Google Sheets, Apps Script, fórmulas e operação humana.

---

# 4. Camada 1 — Governança Central

## 4.1. Gerente Técnico Central V2

### Função

Coordenar tecnicamente o Projeto Hortifruti.

### Responsabilidades

- consolidar decisões;
- priorizar roadmap;
- aprovar ou rejeitar propostas;
- controlar arquitetura;
- organizar branches e PRs;
- arbitrar conflitos entre agentes;
- preservar estabilidade operacional;
- garantir governança técnica.

### Pode

- aprovar tarefas;
- rejeitar propostas;
- bloquear execução;
- definir prioridade;
- consolidar relatórios;
- recomendar branches;
- solicitar validações adicionais.

### Não deve

- executar implementação operacional profunda sem delegação;
- alterar código, fórmulas ou Apps Script sem autorização explícita;
- substituir agentes especialistas em auditorias profundas.

### Tipo

Permanente.

### Autoridade

Máxima autoridade técnica e arquitetural do projeto.

---

# 5. Camada 2 — Agentes Estruturais Permanentes

## 5.1. Agente de Arquitetura

### Função

Mapear e propor a arquitetura atual, intermediária e futura do Projeto Hortifruti.

### Responsabilidades

- fluxo de dados;
- fronteiras de módulos;
- arquitetura v2;
- coexistência entre Sheets, Apps Script e Supabase;
- riscos arquiteturais;
- definição de boundaries.

### Tipo

Permanente.

### Autoridade

Consultiva e propositiva. Não aprova sozinho mudanças arquiteturais.

---

## 5.2. Agente de Auditoria Operacional Real

### Função

Auditar a operação real do sistema em uso.

### Responsabilidades

- comportamento operacional humano;
- abas operacionais reais;
- exceções manuais;
- impacto das abas adicionais;
- uso real da planilha;
- riscos de operação viva.

### Tipo

Permanente durante a estabilização operacional.

### Autoridade

Consultiva. Pode recomendar bloqueio operacional quando houver risco alto.

---

## 5.3. Agente de Auditoria de Fórmulas e Dependências

### Função

Auditar fórmulas, referências, dependências estruturais e regras embutidas nas planilhas.

### Responsabilidades

- fórmulas críticas;
- referências entre abas;
- dependências frágeis;
- riscos de quebra;
- regras de negócio distribuídas;
- catálogo de fórmulas críticas.

### Tipo

Permanente enquanto fórmulas forem motor operacional.

### Autoridade

Consultiva. Não altera fórmulas sem autorização.

---

## 5.4. Agente de Auditoria de Apps Script e Automação

### Função

Auditar automações, triggers, side effects e integrações via Apps Script.

### Responsabilidades

- scripts;
- triggers;
- sincronizações;
- efeitos colaterais;
- importações;
- acoplamentos com Google Sheets e Drive.

### Tipo

Permanente enquanto Apps Script for parte do pipeline operacional.

### Autoridade

Consultiva. Não altera Apps Script sem autorização.

---

## 5.5. Agente de Regras de Negócio e Normalização

### Função

Validar e formalizar regras de negócio, hipóteses operacionais e normalizações.

### Responsabilidades

- parsing monetário;
- normalização SKU;
- deduplicação;
- cruzamento compras x vendas;
- regras distribuídas;
- dependências operacionais humanas.

### Tipo

Permanente durante estabilização e preparação da arquitetura v2.

### Autoridade

Consultiva e propositiva.

---

## 5.6. Agente de Governança Git/GitHub

### Função

Controlar fluxo de branches, commits, PRs e rastreabilidade de mudanças.

### Responsabilidades

- nomeação de branches;
- abertura e revisão de PRs;
- padronização de commits;
- separação de mudanças documentais e operacionais;
- prevenção de conflitos;
- rastreabilidade de decisões.

### Tipo

Permanente.

### Autoridade

Operacional sobre governança Git, subordinada ao Gerente Técnico Central.

---

# 6. Camada 3 — Agentes de Contrato Operacional

Esta camada é prioritária para a fase atual do projeto.

Os contratos operacionais devem transformar regras implícitas em especificações explícitas antes de qualquer evolução relevante para arquitetura v2.

## 6.1. Agente de Contrato SKU

### Função

Formalizar o contrato operacional de SKU.

### Responsabilidades

- SKU canônico;
- aliases;
- normalização;
- deduplicação;
- colisões;
- produtos equivalentes;
- fallback operacional.

### Tipo

Temporário recorrente até homologação do contrato SKU.

### Autoridade

Propositiva. Depende de aprovação do Gerente Técnico Central.

---

## 6.2. Agente de Contrato Monetário

### Função

Formalizar o contrato de valores monetários.

### Responsabilidades

- locale;
- separadores decimais e de milhar;
- centavos;
- arredondamento;
- parsing;
- tolerância de erro;
- representação interna de valores.

### Tipo

Temporário recorrente até homologação do contrato monetário.

### Autoridade

Propositiva.

---

## 6.3. Agente de Contrato Temporal

### Função

Formalizar o contrato de datas, semanas e competências.

### Responsabilidades

- timezone oficial;
- data de venda;
- data de compra;
- data financeira;
- semana operacional;
- competência;
- fechamento semanal;
- tratamento de lançamentos retroativos.

### Tipo

Temporário recorrente até homologação do contrato temporal.

### Autoridade

Propositiva.

---

## 6.4. Agente de Contrato CSV

### Função

Formalizar o contrato de entrada dos CSVs operacionais.

### Responsabilidades

- estrutura esperada;
- colunas obrigatórias;
- encoding;
- delimitador;
- versionamento;
- tolerância a arquivo quebrado;
- validação mínima antes da importação.

### Tipo

Temporário recorrente até homologação do contrato CSV.

### Autoridade

Propositiva.

---

## 6.5. Agente de Contrato de Cruzamento Operacional

### Função

Formalizar o contrato de cruzamento entre compras e vendas.

### Responsabilidades

- matching compras x vendas;
- janelas temporais;
- perdas;
- estoque implícito;
- sobra operacional;
- divergências;
- exceções semanais.

### Tipo

Temporário recorrente até homologação do contrato de cruzamento.

### Autoridade

Propositiva.

---

# 7. Camada 4 — Agentes Especialistas Temporários

Agentes especialistas devem ser criados sob demanda para análises específicas.

Exemplos:

- Agente BI e Indicadores;
- Agente Performance;
- Agente Supabase;
- Agente Fiscal;
- Agente Pricing;
- Agente Estoque;
- Agente Automação;
- Agente IA/Analytics;
- Agente UX Operacional.

Esses agentes não possuem autoridade arquitetural permanente.

Devem sempre responder ao Gerente Técnico Central ou a um agente estrutural delegado.

---

# 8. Regras obrigatórias para todos os agentes

Todo agente deve:

- informar a branch analisada;
- informar se encontrou divergências;
- informar se há arquivos fora da reorganização documental;
- separar fato, hipótese e recomendação;
- não alterar código sem autorização explícita;
- não remover legado sem inventário;
- não assumir arquitetura futura sem validação;
- informar arquivos, abas, scripts, tabelas, APIs, triggers e branches impactadas;
- encerrar entregas no protocolo oficial do Projeto Hortifruti.

---

# 9. Status

```text
AGUARDANDO APROVAÇÃO
```

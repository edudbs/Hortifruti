# CONTRATO TEMPORAL — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Formalizar o contrato temporal do Projeto Hortifruti.

Este documento define:

- timezone oficial;
- semana operacional;
- competência;
- datas de compra;
- datas de venda;
- datas financeiras;
- fechamento operacional.

---

# 2. Timezone oficial

```text
America/Sao_Paulo
```

---

# 3. Conceitos operacionais

## Data operacional

Data efetiva considerada para cruzamento operacional.

---

## Semana operacional

Janela operacional utilizada para análise consolidada.

---

## Competência

Período contábil/financeiro de referência.

---

# 4. Problemas identificados

- compras e pagamentos em datas diferentes;
- vendas contínuas;
- diferenças entre data financeira e operacional;
- risco de fechamento inconsistente.

---

# 5. Regras obrigatórias

## 5.1. Toda regra deve declarar qual data utiliza

Exemplo:

- data de venda;
- data de compra;
- data financeira;
- data de competência.

---

## 5.2. Timezone deve ser explícito

Nenhum processamento deve depender implicitamente do timezone do ambiente.

---

# 6. Riscos

## Técnicos

- agregação incorreta;
- semana quebrada;
- inconsistência entre Apps Script e planilha.

## Operacionais

- lançamentos retroativos;
- fechamento inconsistente.

---

# 7. Próximo passo recomendado

Inventariar:

- regras semanais;
- competências;
- cálculos de fechamento;
- dependências temporais.

---

# 8. Status

```text
EM ANÁLISE
```

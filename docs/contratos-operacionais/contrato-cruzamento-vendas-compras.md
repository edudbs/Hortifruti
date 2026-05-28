# CONTRATO DE CRUZAMENTO VENDAS X COMPRAS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Formalizar oficialmente o contrato operacional de cruzamento entre compras e vendas do Projeto Hortifruti.

Este documento define:

- matching operacional;
- janelas temporais;
- perdas;
- estoque implícito;
- sobras;
- exceções;
- consistência operacional.

---

# 2. Escopo analisado

Fluxos impactados:

- compras;
- vendas;
- perdas;
- análises semanais;
- SKU_RESUMO;
- ANALISE_SKU_*;
- PAINEL;
- VALIDACOES.

---

# 3. Problemas identificados

## 3.1. Dependência de regras implícitas

Existem indícios de:

- matching manual;
- dependência operacional humana;
- regras distribuídas;
- tolerância implícita de estoque.

---

## 3.2. Estoque implícito

O sistema aparenta utilizar comportamento operacional implícito para:

- sobra;
- residual;
- reaproveitamento;
- continuidade semanal.

---

## 3.3. Diferença entre compra e pagamento

Já foi identificado:

- compra operacional em dias diferentes do pagamento;
- vendas contínuas;
- competência operacional diferente da financeira.

---

# 4. Conceitos oficiais

## Compra operacional

Entrada operacional considerada para abastecimento e cruzamento.

---

## Venda operacional

Saída operacional registrada no fluxo de vendas.

---

## Sobra operacional

Residual implícito utilizado na continuidade operacional.

---

## Perda operacional

Diferença não convertida em venda.

---

# 5. Regras obrigatórias

## 5.1. Cruzamento deve depender de SKU normalizado

Nenhum matching crítico deve depender apenas de texto bruto.

---

## 5.2. Toda janela temporal deve ser explícita

Toda análise deve informar:

- semana;
- competência;
- janela operacional;
- tolerância.

---

## 5.3. Regras de sobra devem ser documentadas

Nenhuma lógica implícita de residual deve permanecer oculta.

---

# 6. Riscos

## Técnicos

- matching incorreto;
- estoque implícito inconsistente;
- perda invisível.

## Operacionais

- lançamentos fora da competência;
- dependência humana excessiva.

## Financeiros

- margem incorreta;
- CMV inconsistente;
- análise semanal distorcida.

---

# 7. Decisão proposta

## Recomendado

Formalizar explicitamente:

- janelas semanais;
- regras de sobra;
- tratamento de residual;
- tolerância operacional.

## Não recomendado

Continuar dependendo apenas de interpretação humana.

---

# 8. Próximo passo recomendado

Executar validação operacional real contra:

- semanas históricas;
- compras reais;
- vendas reais;
- comportamento humano;
- estoque residual observado.

---

# 9. Status

```text
EM ANÁLISE
```

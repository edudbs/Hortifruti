# CONTRATO MONETÁRIO — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Formalizar oficialmente o contrato monetário do Projeto Hortifruti.

Este documento define:

- parsing monetário;
- locale oficial;
- separadores;
- arredondamento;
- representação numérica;
- tolerância de erro;
- normalização financeira.

---

# 2. Problemas identificados

Já foram identificados indícios de:

- dependência de locale;
- parsing inconsistente;
- mistura de formatos numéricos;
- comportamento diferente entre fórmulas e Apps Script.

---

# 3. Locale oficial

## Locale operacional oficial

```text
pt-BR
```

---

## Separadores oficiais

| Tipo | Símbolo |
|---|---|
| Decimal | , |
| Milhar | . |

---

# 4. Regras obrigatórias

## 4.1. Todo valor monetário deve ser normalizado

Nenhuma regra crítica deve depender do valor bruto textual.

---

## 4.2. Fórmulas e Apps Script devem convergir

Apps Script e Google Sheets devem interpretar números de forma equivalente.

---

## 4.3. Representação interna recomendada

Representação numérica real.

Evitar:

- texto monetário;
- concatenação textual;
- parsing implícito.

---

# 5. Riscos

## Técnicos

- erro silencioso;
- multiplicação incorreta;
- divisão incorreta;
- parsing parcial.

## Financeiros

- margem incorreta;
- DRE inconsistente;
- estoque valorizado incorretamente.

---

# 6. Próximo passo recomendado

Inventariar:

- todas as fórmulas monetárias;
- todos os pontos de parsing;
- todos os tratamentos Apps Script.

---

# 7. Status

```text
EM ANÁLISE
```

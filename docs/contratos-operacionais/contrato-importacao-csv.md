# CONTRATO DE IMPORTAÇÃO CSV — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Formalizar o contrato oficial de importação dos CSVs operacionais do Projeto Hortifruti.

Este documento define:

- estrutura esperada;
- encoding;
- delimitadores;
- colunas obrigatórias;
- validações mínimas;
- tolerância a falhas;
- versionamento operacional.

---

# 2. Escopo analisado

Fluxos impactados:

- exportação Varejo Fácil;
- Google Drive;
- Apps Script;
- RAW;
- BASE;
- STG;
- sincronizações futuras.

---

# 3. Problemas identificados

## 3.1. Dependência estrutural implícita

Existem indícios de dependência forte de:

- ordem de colunas;
- nomes específicos;
- locale;
- formatos textuais.

---

## 3.2. Falta de versionamento formal

Mudanças no CSV podem gerar:

- quebra silenciosa;
- parsing incorreto;
- colunas deslocadas;
- perda de consistência.

---

# 4. Regras obrigatórias

## 4.1. Todo CSV deve passar por validação mínima

Antes de qualquer importação:

- validar encoding;
- validar colunas obrigatórias;
- validar delimitador;
- validar integridade mínima.

---

## 4.2. Não depender de posição implícita

Sempre que possível:

- usar nomes de colunas;
- evitar dependência exclusiva de índice.

---

## 4.3. Falhas devem ser rastreáveis

Toda rejeição deve informar:

- motivo;
- etapa;
- coluna;
- origem.

---

# 5. Estrutura recomendada futura

## Metadados mínimos

- tipo CSV;
- data importação;
- origem;
- versão layout;
- hash opcional;
- responsável.

---

# 6. Riscos

## Técnicos

- quebra de parsing;
- encoding inconsistente;
- colunas alteradas;
- delimitador incorreto.

## Operacionais

- operadores importando arquivos inválidos;
- sobrescrita manual.

## Financeiros

- vendas/compras incorretas;
- cruzamento inconsistente.

---

# 7. Decisão proposta

## Recomendado

Transformar importação CSV em camada validada formalmente.

## Não recomendado

Continuar importando CSV diretamente sem validação mínima.

---

# 8. Próximo passo recomendado

Inventariar:

- layouts reais;
- variações históricas;
- CSVs inválidos já ocorridos;
- regras ocultas de importação.

---

# 9. Status

```text
EM ANÁLISE
```

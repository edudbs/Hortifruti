# CONTRATO OPERACIONAL DE SKU — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Formalizar oficialmente o contrato operacional de SKU do Projeto Hortifruti.

Este documento define:

- SKU canônico;
- aliases;
- normalização;
- deduplicação;
- matching;
- colisões;
- equivalência operacional;
- rastreabilidade.

O objetivo é transformar regras implícitas espalhadas em:

- fórmulas;
- Apps Script;
- operação humana;
- convenções históricas.

em um contrato explícito, auditável e reutilizável.

---

# 2. Escopo analisado

Fluxos impactados:

- RAW;
- BASE;
- STG;
- SKU_RESUMO;
- VALIDACOES;
- ANALISE_SKU_*;
- cruzamento compras x vendas;
- importações CSV;
- normalizações operacionais.

---

# 3. Problemas identificados

## 3.1. Ausência de SKU canônico formal

Atualmente existem fortes indícios de:

- aliases manuais;
- variações de escrita;
- diferenças de acentuação;
- diferenças de plural;
- inconsistência entre compras e vendas;
- dependência humana para matching.

---

## 3.2. Regras distribuídas

As regras aparentam estar espalhadas entre:

- fórmulas;
- Apps Script;
- convenções humanas;
- validações operacionais.

---

## 3.3. Risco silencioso

Problemas de SKU podem gerar:

- margem incorreta;
- perda oculta;
- cruzamento inconsistente;
- duplicação operacional;
- estoque implícito incorreto.

---

# 4. Definições oficiais

## 4.1. SKU canônico

SKU canônico é a representação oficial única de um item operacional.

Toda regra futura deve depender do SKU canônico.

---

## 4.2. Alias

Alias é qualquer representação alternativa do mesmo SKU.

Exemplo:

- BANANA PRATA;
- BANANA PRATA KG;
- BANANA PRATA CX.

---

## 4.3. Colisão de SKU

Colisão ocorre quando:

- dois itens distintos parecem equivalentes;
- um alias referencia múltiplos produtos;
- o matching se torna ambíguo.

---

# 5. Regras obrigatórias

## 5.1. Não depender de texto bruto

Nenhuma regra crítica futura deve depender diretamente do texto original do CSV sem normalização.

---

## 5.2. SKU canônico deve ser estável

Mudanças no nome operacional não devem quebrar histórico.

---

## 5.3. Toda equivalência deve ser rastreável

Aliases devem possuir:

- origem;
- justificativa;
- data;
- responsável.

---

# 6. Estrutura recomendada futura

## Tabela SKU_CANONICO

Campos sugeridos:

- id_sku;
- sku_canonico;
- categoria;
- unidade;
- status;
- data_criacao.

---

## Tabela SKU_ALIAS

Campos sugeridos:

- alias_original;
- sku_canonico;
- origem;
- confianca_matching;
- validado_por.

---

# 7. Dependências

Depende de:

- Auditoria Operacional;
- Regras de Negócio;
- Auditoria de Fórmulas;
- Contrato CSV;
- Contrato de Cruzamento.

---

# 8. Riscos

## Técnicos

- múltiplos SKUs para o mesmo item;
- matching ambíguo;
- explosão de aliases.

## Operacionais

- operadores criando novos padrões manuais;
- nomenclatura inconsistente.

## Financeiros

- margem incorreta;
- perda invisível;
- compra x venda inconsistente.

---

# 9. Decisão proposta

## Recomendado

Transformar SKU em entidade formal central do projeto.

## Opcional

Criar camada de confiança para matching automático.

## Não recomendado

Continuar dependendo apenas de texto livre operacional.

---

# 10. Próximo passo recomendado

Executar inventário real de:

- SKUs;
- aliases;
- colisões;
- equivalências;
- inconsistências históricas.

---

# 11. Status

```text
EM ANÁLISE
```

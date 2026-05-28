# AUDITORIA DE FÓRMULAS E DEPENDÊNCIAS ESTRUTURAIS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Documentar inventário estrutural de fórmulas críticas, dependências entre abas, riscos silenciosos, fragilidades estruturais, criticidade operacional, impacto financeiro e restrições técnicas antes de futuras refatorações.

Este documento não implementa alterações. Objetivo exclusivamente documental e analítico.

---

# 2. Escopo auditado

Pipeline atual auditado:

```text
CSV → RAW → BASE → STG → SKU_RESUMO → PAINEL → VALIDACOES
```

Escopo:

- fórmulas matriciais;
- referências cruzadas;
- dependências estruturais;
- ranges abertos;
- uso de IFERROR;
- VLOOKUP/PROCV;
- ARRAYFORMULA;
- dependência de locale;
- acoplamento estrutural;
- riscos de inconsistência silenciosa.

---

# 3. Visão estrutural do pipeline

```text
CSV Varejo Fácil
        ↓
RAW
        ↓
BASE
        ↓
STG
        ↓
SKU_RESUMO
        ↓
PAINEL
        ↓
VALIDACOES
```

O pipeline atual possui forte dependência de posição de colunas, referências cruzadas entre abas, lógica distribuída, regras implícitas em fórmulas, ranges abertos e ausência de validação transacional.

---

# 4. Inventário de fórmulas críticas

## 4.1 RAW

Recebe dados brutos importados. A maior criticidade está na importação, preservação estrutural e alinhamento do CSV.

Dependências críticas: layout do CSV, ordem das colunas, encoding e delimitadores.

Riscos: deslocamento de colunas, quebra de parsing, importação parcial e alteração silenciosa no exportador do Varejo Fácil.

## 4.2 BASE

### Conversão monetária

Exemplo auditado:

```gs
=ARRAYFORMULA(
 IF(
  VENDAS_BASE!D2:D="";
  "";
  IFERROR(
   NUMBERVALUE(TO_TEXT(VENDAS_BASE!D2:D);",";".");
   NUMBERVALUE(TO_TEXT(VENDAS_BASE!D2:D);".";",")
  )
 )
)
```

Criticidade: ALTA.

Responsável por parsing monetário, normalização numérica e compatibilidade de locale.

Riscos: locale inconsistente, erro silencioso via IFERROR, perda financeira invisível e conversão incorreta de decimal.

### Conversão percentual/centavos

Exemplo auditado:

```gs
=ARRAYFORMULA(
 IF(
  VENDAS_BASE!I2:I="";
  "";
  IFERROR(
   VALUE(SUBSTITUTE(VENDAS_BASE!I2:I;".";""));
   0
  )/100
 )
)
```

Criticidade: ALTA.

Riscos: divisão incorreta, erro mascarado, inconsistência financeira e perda de precisão.

## 4.3 STG

### VLOOKUP matricial

Exemplo auditado:

```gs
=ARRAYFORMULA(
 IF(
  A2:A="";
  "";
  IFERROR(
   VLOOKUP(
    A2:A;
    {VENDAS_STG!C:C\VENDAS_STG!D:D};
    2;
    FALSE
   );
   ""
  )
 )
)
```

Criticidade: MUITO ALTA.

Responsável por cruzamento operacional, enriquecimento e consolidação de dados.

Riscos: referência deslocada, falso vazio, perda silenciosa de correspondência, dependência estrutural de colunas e lookup inconsistente.

### ARRAYFORMULA em ranges abertos

Padrões recorrentes:

```text
A2:A
C:C
D:D
```

Criticidade: ALTA.

Riscos: processamento excessivo, propagação infinita, impacto de performance, contaminação por linhas futuras e efeitos colaterais invisíveis.

### IFERROR distribuído

Padrões recorrentes:

```gs
IFERROR(...;"")
IFERROR(...;0)
```

Criticidade: MUITO ALTA.

IFERROR atualmente pode mascarar falhas estruturais, falhas de lookup, parsing inválido, ranges quebrados e inconsistências operacionais.

---

# 5. Dependências estruturais identificadas

## 5.1 Colunas fixas

Grande parte do pipeline assume posições fixas, ordem invariável e ranges estáticos. Mudanças simples de coluna podem quebrar fórmulas, deslocar resultados e gerar inconsistências invisíveis.

## 5.2 Abas

Dependências cruzadas:

```text
RAW → BASE
BASE → STG
STG → SKU_RESUMO
SKU_RESUMO → PAINEL
```

Erro em camada inicial propaga até PAINEL.

## 5.3 Ranges abertos

Padrões recorrentes:

```text
A:A
B:B
C:C
```

Impactos: consumo excessivo, lentidão, propagação não controlada e risco operacional crescente.

## 5.4 Locale

Dependência identificada em decimal, milhar, NUMBERVALUE, VALUE e SUBSTITUTE.

---

# 6. Matriz de criticidade

| Elemento | Criticidade | Impacto | Tipo |
|---|---:|---|---|
| Parsing monetário | MUITO ALTA | Financeiro | Estrutural |
| IFERROR distribuído | MUITO ALTA | Operacional | Silencioso |
| VLOOKUP matricial | MUITO ALTA | Operacional | Estrutural |
| ARRAYFORMULA aberta | ALTA | Performance | Estrutural |
| Dependência de colunas | MUITO ALTA | Pipeline completo | Estrutural |
| Dependência de locale | ALTA | Financeiro | Parsing |
| Referências cruzadas | ALTA | Operacional | Arquitetural |
| CSV Varejo Fácil | MUITO ALTA | Pipeline completo | Origem |
| Ausência de validação | MUITO ALTA | Financeiro | Governança |

---

# 7. Impactos identificados

## Operacional

Risco elevado de inconsistência silenciosa, propagação de erro, falhas invisíveis e dependência humana.

## Financeiro

Possibilidade de parsing incorreto, valores zerados, arredondamentos invisíveis e divergência de indicadores.

## Estrutural

Arquitetura com forte acoplamento, baixa modularização, lógica distribuída e dependência implícita.

## Manutenção

Manutenção sensível a mudança de colunas, alteração de nomes, inclusão de linhas e modificação de ranges.

---

# 8. Riscos silenciosos identificados

## 8.1 IFERROR mascarando falhas

Maior risco atual. Pode esconder erro real, fórmula quebrada, lookup inexistente e parsing inválido.

## 8.2 Fórmulas distribuídas

Regras espalhadas em múltiplas abas, com baixa rastreabilidade e difícil auditoria.

## 8.3 Dependência implícita de sequência

Pipeline assume ordem obrigatória sem validação explícita:

```text
RAW → BASE → STG → SKU_RESUMO → PAINEL → VALIDACOES
```

## 8.4 Ausência de monitoramento estrutural

Não há validação automática, alerta de falha, auditoria de parsing ou verificação transacional.

---

# 9. Restrições antes de qualquer refatoração

Não realizar sem inventário completo: mudança de colunas, troca de ranges, remoção de fórmulas e modularização ampla.

Não alterar simultaneamente Apps Script, fórmulas, estrutura das abas, parsing e fluxo operacional.

Não iniciar migração estrutural ampla antes de estabilização, documentação, inventário completo, validação operacional e mapeamento de dependências.

---

# 10. Recomendações futuras

## Curto prazo

- inventário completo das fórmulas;
- mapeamento de dependências;
- documentação de regras implícitas;
- identificação de pontos críticos.

## Médio prazo

- validações estruturais;
- alertas de inconsistência;
- centralização gradual de regras;
- redução de IFERROR mascarador.

## Longo prazo

- modularização;
- camada de validação;
- persistência estruturada;
- possível banco relacional.

## Não recomendado agora

- refatoração ampla;
- remoção de legado sem inventário;
- migração simultânea de múltiplos domínios;
- substituição abrupta do pipeline atual.

---

# 11. Conclusão

O pipeline atual do Projeto Hortifruti é operacionalmente funcional, porém estruturalmente sensível.

Os maiores riscos atuais concentram-se em parsing monetário, IFERROR mascarando falhas, dependência estrutural de colunas, VLOOKUP matricial, ARRAYFORMULA em ranges abertos e ausência de validação automatizada.

A prioridade correta continua sendo estabilização, documentação, auditoria, inventário e modularização gradual.

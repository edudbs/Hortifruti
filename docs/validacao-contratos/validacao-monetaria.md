# VALIDAÇÃO DO CONTRATO MONETÁRIO — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Validar o contrato monetário contra a operação real do Projeto Hortifruti.

Esta validação deve confirmar aderência entre:

- fórmulas;
- Apps Script;
- locale;
- CSVs reais;
- parsing monetário;
- representação financeira.

---

# 2. Escopo analisado

Validar:

- separadores decimais;
- separadores de milhar;
- arredondamento;
- centavos;
- parsing Apps Script;
- parsing em fórmulas;
- consistência numérica.

---

# 3. Impacto identificado

## Financeiro

Erros monetários podem distorcer:

- margem;
- CMV;
- lucro;
- perdas;
- análises operacionais.

## Arquitetural

O contrato monetário é crítico para qualquer evolução futura.

---

# 4. Arquivos impactados

- `docs/contratos-operacionais/contrato-monetario.md`
- `docs/validacao-contratos/validacao-monetaria.md`

---

# 5. Branch recomendada

```text
docs/validacao-contratos-operacionais
```

---

# 6. Dependências

- auditoria Apps Script;
- auditoria de fórmulas;
- CSVs reais;
- locale operacional.

---

# 7. Riscos

- parsing silencioso incorreto;
- arredondamento inconsistente;
- valores interpretados como texto;
- divergência entre Apps Script e Sheets.

---

# 8. Decisão proposta

## Recomendado

Validar todos os pontos de parsing monetário antes da arquitetura v2.

## Não recomendado

Continuar aceitando parsing implícito.

---

# 9. Próximo passo recomendado

Inventariar:

- fórmulas monetárias;
- NUMBERVALUE;
- VALUE;
- SUBSTITUTE;
- parsing Apps Script.

---

# 10. Status

```text
EM ANÁLISE
```

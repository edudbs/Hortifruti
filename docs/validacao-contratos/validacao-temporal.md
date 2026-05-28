# VALIDAÇÃO DO CONTRATO TEMPORAL — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Validar o contrato temporal contra a operação real do Projeto Hortifruti.

Objetivo principal:

confirmar se as regras temporais documentadas representam corretamente:

- fechamento operacional;
- semana operacional;
- competências;
- compras;
- vendas;
- pagamentos;
- residual operacional.

---

# 2. Escopo analisado

Validar:

- timezone;
- datas de compra;
- datas de venda;
- competência financeira;
- competência operacional;
- regras semanais;
- residual entre semanas.

---

# 3. Impacto identificado

## Operacional

Datas inconsistentes podem distorcer semanas operacionais.

## Financeiro

Competência incorreta pode distorcer análises financeiras.

## Arquitetural

Contratos temporais são fundamentais para eventos futuros e sincronizações.

---

# 4. Arquivos impactados

- `docs/contratos-operacionais/contrato-temporal.md`
- `docs/validacao-contratos/validacao-temporal.md`

---

# 5. Branch recomendada

```text
docs/validacao-contratos-operacionais
```

---

# 6. Dependências

- operação real;
- regras semanais;
- auditoria operacional;
- contratos de cruzamento.

---

# 7. Riscos

- competência inconsistente;
- fechamento incorreto;
- agregação semanal errada;
- timezone implícito.

---

# 8. Decisão proposta

## Recomendado

Formalizar definitivamente:

- semana operacional;
- fechamento;
- competência oficial.

## Não recomendado

Misturar datas financeiras e operacionais sem distinção explícita.

---

# 9. Próximo passo recomendado

Executar validação em semanas reais da operação.

---

# 10. Status

```text
EM ANÁLISE
```

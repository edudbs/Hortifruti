# VALIDAÇÃO DO CONTRATO SKU — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Validar o contrato operacional de SKU contra a operação real do Projeto Hortifruti.

Esta validação deve confirmar se as regras documentadas em `docs/contratos-operacionais/contrato-sku.md` representam corretamente:

- planilha operacional real;
- CSVs reais;
- Apps Script real;
- fórmulas reais;
- comportamento humano real.

---

# 2. Escopo analisado

Escopo a validar:

- SKUs de venda;
- SKUs de compra;
- aliases;
- produtos equivalentes;
- divergências de nomenclatura;
- normalização;
- deduplicação;
- colisões;
- cruzamento compras x vendas.

Abas envolvidas:

- RAW;
- BASE;
- STG;
- SKU_RESUMO;
- ANALISE_SKU_SEMANAL;
- ANALISE_SKU_GERAL;
- VALIDACOES;
- AUDITORIA_OPERACIONAL.

---

# 3. Impacto identificado

## Operacional

SKU inconsistente pode impedir análise correta por produto.

## Arquitetural

SKU deve ser tratado como entidade central antes da arquitetura v2.

## Financeiro

Falhas de matching podem distorcer margem, CMV, perdas e rentabilidade.

## Manutenção

Sem SKU canônico, as regras permanecem espalhadas em fórmulas, scripts e operação humana.

## Risco de quebra

Alto, se houver mudança de nomenclatura sem camada de alias.

---

# 4. Arquivos impactados

Arquivos/documentos:

- `docs/contratos-operacionais/contrato-sku.md`
- `docs/validacao-contratos/validacao-sku.md`

Abas impactadas:

- RAW;
- BASE;
- STG;
- SKU_RESUMO;
- ANALISE_SKU_SEMANAL;
- ANALISE_SKU_GERAL;
- VALIDACOES;
- AUDITORIA_OPERACIONAL.

Scripts potencialmente relacionados:

- importações Apps Script;
- normalizações Apps Script;
- geração de template Google Sheets.

---

# 5. Branch recomendada

```text
docs/validacao-contratos-operacionais
```

---

# 6. Dependências

Depende de:

- contrato SKU;
- auditoria operacional real;
- auditoria de fórmulas;
- auditoria Apps Script;
- amostras reais de CSV;
- planilha real exportada.

---

# 7. Riscos

- aliases não inventariados;
- colisões não detectadas;
- produtos equivalentes tratados como diferentes;
- produtos diferentes tratados como equivalentes;
- dependência humana continuar fora do contrato;
- histórico ficar incompatível com normalização futura.

---

# 8. Decisão proposta

## Recomendado

Executar inventário real de SKUs e aliases antes de qualquer migração para arquitetura v2.

## Opcional

Criar tabela futura de confiança de matching.

## Não recomendado

Usar texto bruto como identificador definitivo de produto.

---

# 9. Próximo passo recomendado

Solicitar ao agente responsável a validação real com base em:

- lista de SKUs de venda;
- lista de SKUs de compra;
- divergências entre nomes;
- aliases observados;
- colisões possíveis.

---

# 10. Status

```text
EM ANÁLISE
```

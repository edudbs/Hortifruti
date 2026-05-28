# FRENTE — MOVIMENTAÇÃO OPERACIONAL DE ESTOQUE — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

---

# 1. Objetivo

Formalizar a nova frente de movimentação operacional de estoque do Projeto Hortifruti, incorporando o controle já existente de quebras, descartes, reaproveitamento e transferências internas.

Esta frente tem como objetivo responder operacionalmente:

```text
Para onde foi o estoque que não virou venda direta?
```

---

# 2. Escopo analisado

Fonte analisada:

- Google Sheets: `Analise Hortifruti`
- Aba: `Respostas ao formulário 1`
- Formulário: `Quebras Hortifruti`

Abas identificadas na planilha:

- `Produtos Full`
- `CADASTRO_PRODUTOS`
- `Respostas ao formulário 1`
- `PAINEL`

Campos identificados na aba de respostas:

- carimbo de data/hora;
- data;
- produto;
- unidade de medida;
- destino;
- quantidade;
- produto manual;
- reaproveitamento.

---

# 3. Classificação operacional inicial

## 3.1. Descarte

Representa perda definitiva.

Tratamento recomendado:

```text
saída operacional por perda
```

Não deve ser tratada como venda nem como reaproveitamento.

---

## 3.2. Quintal

Representa transferência interna para restaurante próprio.

Tratamento recomendado:

```text
transferência interna / reaproveitamento externo ao hortifruti
```

Não deve ser tratada como descarte definitivo.

---

## 3.3. Reaproveitado

Representa insumo separado para produção futura de outros itens/SKUs, como sucos, mousses ou itens preparados.

Tratamento recomendado:

```text
movimento intermediário aguardando transformação
```

Ainda não fecha o ciclo de produção porque falta registrar:

- produto destino;
- quantidade produzida;
- data de produção;
- relação entre origem e destino.

---

# 4. Impacto identificado

## Operacional

Alto.

A frente permite registrar saídas não comerciais que hoje explicam diferenças entre compra, venda, perda, reaproveitamento e produção.

## Arquitetural

Alto.

Esta frente introduz uma camada nova de eventos operacionais entre compra e venda.

## Financeiro

Alto.

Pode melhorar cálculo futuro de:

- CMV real;
- perdas;
- margem;
- reaproveitamento;
- custo de produção própria.

## Manutenção

Médio.

A frente exige disciplina operacional e padronização dos destinos.

## Risco de quebra

Baixo neste estágio, desde que a frente permaneça apenas documental e analítica, sem alterar o pipeline principal.

---

# 5. Modelo conceitual inicial

Fluxo atual simplificado:

```text
COMPRA → VENDA
```

Fluxo operacional real observado:

```text
COMPRA
→ VENDA
→ DESCARTE
→ QUINTAL
→ REAPROVEITADO
→ PRODUÇÃO FUTURA
```

---

# 6. Regras de governança

Nesta fase, a frente NÃO deve:

- alterar `SKU_RESUMO`;
- alterar `SKU_RESUMO_CANONICO`;
- alterar Apps Script;
- alterar CMV;
- alterar painel principal;
- substituir o controle atual.

Deve apenas:

- auditar;
- classificar;
- documentar;
- preparar integração futura.

---

# 7. Próxima modelagem recomendada

Criar contrato operacional específico para movimentos de estoque.

Nome sugerido:

```text
docs/contratos-operacionais/contrato-movimentacao-estoque.md
```

Deve definir:

- tipos de movimento;
- origem;
- destino;
- produto origem;
- produto destino;
- unidade;
- quantidade;
- data operacional;
- status do ciclo;
- impacto no estoque;
- impacto no CMV.

---

# 8. Próximo passo prático recomendado

Antes de integrar ao pipeline principal, criar uma análise simples da aba `Respostas ao formulário 1` para responder:

- quantidade descartada por produto;
- quantidade enviada ao Quintal por produto;
- quantidade reaproveitada por produto;
- produtos com maior perda;
- produtos com maior reaproveitamento;
- destinos mais frequentes.

---

# 9. Decisão proposta

## Recomendado

Formalizar a frente como módulo operacional próprio:

```text
Movimentação Operacional de Estoque
```

## Opcional

Criar posteriormente uma segunda etapa para fechar o ciclo de produção:

```text
Reaproveitado → Produto produzido
```

## Não recomendado

Integrar imediatamente ao cálculo de CMV, margem ou painel principal sem validação operacional.

---

# 10. Status

```text
EM ANÁLISE
```

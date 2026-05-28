# AUDITORIA DA OPERAÇÃO VIVA — ABAS ADICIONAIS — PROJETO HORTIFRUTI

## Nome/função do agente

Agente de Auditoria Operacional Real — Projeto Hortifruti

---

## 1. Objetivo

Consolidar a auditoria operacional real das abas adicionais encontradas na planilha viva do Projeto Hortifruti, avaliando seu papel no fluxo atual, impacto arquitetural, riscos, dependências e implicações para estabilização futura.

Abas analisadas:

- `ANALISE_SKU_SEMANAL`
- `ANALISE_SKU_GERAL`
- `AUDITORIA_OPERACIONAL`
- `CALENDARIO_OPERACIONAL`

Esta análise considera a planilha exportada:

```text
Template - Cruzamento Vendas x Compras.xlsx
```

Nenhuma alteração foi realizada na planilha, fórmulas ou Apps Script.

---

## 2. Escopo analisado

Escopo documental e operacional analisado:

- branch oficial: `docs/reorganizacao-documentacao`;
- planilha real exportada: `Template - Cruzamento Vendas x Compras.xlsx`;
- documento base: `docs/auditoria/formulas-planilha-real.md`;
- pipeline principal: `RAW → BASE → STG → SKU_RESUMO → PAINEL → VALIDACOES`;
- abas adicionais da operação viva;
- fórmulas e ranges exportados;
- regras operacionais e analíticas inferidas das abas reais.

---

## 3. Impacto identificado

### Operacional

ALTO.

As abas adicionais representam camadas reais de controle operacional, análise temporal, auditoria e apoio à decisão.

Elas não devem ser tratadas como abas auxiliares descartáveis.

### Arquitetural

ALTO.

A arquitetura documentada inicialmente estava incompleta diante da operação real.

O pipeline vivo inclui camadas analíticas e de auditoria além de `SKU_RESUMO`, `PAINEL` e `VALIDACOES`.

### Financeiro

ALTO.

As abas analisam margem negativa, venda maior que compra, falta de compra, excesso de compra e riscos de ruptura.

Essas regras influenciam diretamente leitura gerencial de custo, margem, compra e estoque operacional.

### Performance

MÉDIO.

As abas utilizam ranges amplos e fórmulas analíticas sobre até aproximadamente 1000 linhas.

Embora os ranges estejam parcialmente limitados, há dependência relevante de fórmulas agregadoras, filtros e análises por semana/SKU.

### Manutenção

ALTO.

As regras estão distribuídas em múltiplas abas e dependem da integridade de `SKU_RESUMO`, `VENDAS_STG`, `COMPRAS_STG` e datas operacionais.

Sem documentação, qualquer alteração futura pode quebrar análise semanal, auditoria ou calendário.

### Risco de quebra

ALTO em alterações futuras.

A exclusão, renomeação ou alteração dessas abas pode remover controles operacionais reais e mascarar riscos que hoje são parcialmente visíveis.

---

## 4. Arquivos/abas impactados

### Arquivo documental impactado

- `docs/auditoria/operacao-viva-abas-adicionais.md`

### Abas diretamente analisadas

- `ANALISE_SKU_SEMANAL`
- `ANALISE_SKU_GERAL`
- `AUDITORIA_OPERACIONAL`
- `CALENDARIO_OPERACIONAL`

### Abas dependentes ou relacionadas

- `VENDAS_STG`
- `COMPRAS_STG`
- `SKU_RESUMO`
- `VALIDACOES`
- `PAINEL`

### Scripts relacionados

- `apps-script/gerar_template_google_sheets.gs`

Nenhum script foi alterado.

---

## 5. Branch recomendada

```text
auditoria/abas-operacionais-reais
```

---

## 6. Dependências

Esta auditoria depende de:

- auditoria da planilha real já registrada em `docs/auditoria/formulas-planilha-real.md`;
- catálogo de fórmulas críticas;
- matriz central de riscos;
- mapa arquitetural atual;
- validação operacional futura com usuário responsável pela rotina;
- eventual atualização do mapa arquitetural para versão operacional v2.

Agentes relacionados:

- Gerente Técnico;
- Agente de Arquitetura e Fluxo de Dados;
- Agente de Auditoria de Fórmulas;
- Agente de Regras de Negócio e Normalização;
- Agente de Documentação Operacional.

---

## 7. Riscos

### Riscos técnicos

- dependência de fórmulas específicas não totalmente documentadas no Apps Script;
- funções Google Sheets convertidas parcialmente no Excel;
- uso de regras distribuídas entre abas analíticas;
- risco de quebra por renomeação de abas ou mudança de ranges.

### Riscos operacionais

- múltiplas fontes de leitura operacional;
- dependência de interpretação humana dos alertas;
- possibilidade de auditoria visual sem bloqueio efetivo;
- risco de operador ignorar status de auditoria operacional.

### Riscos de inconsistência

- `AUDITORIA_OPERACIONAL` pode indicar riscos que não bloqueiam o `PAINEL`;
- `ANALISE_SKU_SEMANAL` e `ANALISE_SKU_GERAL` podem divergir de `SKU_RESUMO` se houver falha em fórmulas;
- calendário operacional pode sinalizar falta de compra sem impedir análise financeira.

### Risco de perda de dados

Baixo no estado atual, pois a auditoria é documental.

Alto em caso de alteração futura não coordenada nas abas adicionais.

---

## 8. Decisão proposta

### Recomendado

- reconhecer as abas adicionais como parte oficial da operação viva;
- atualizar a arquitetura para incluir camada analítica semanal, geral, auditoria operacional e calendário;
- documentar regras específicas das abas `ANALISE_SKU_*`;
- tratar `AUDITORIA_OPERACIONAL` como camada de governança operacional;
- revisar matriz de riscos para incluir riscos derivados dessas abas.

### Opcional

- criar futuramente documento específico para regras da auditoria operacional;
- criar dicionário de status operacionais como `SEM_COMPRA`, `MARGEM_NEGATIVA`, `RISCO_RUPTURA`, `EXCESSO_COMPRA`, `VENDEU_MAIS_QUE_COMPROU` e `OK`;
- criar desenho visual do pipeline operacional v2.

### Não recomendado

- remover abas adicionais;
- simplificar a planilha sem inventário completo dessas camadas;
- migrar para Supabase ignorando essas regras operacionais;
- tratar `PAINEL` como única saída gerencial;
- alterar fórmulas dessas abas antes de mapear dependências reais.

---

## 9. Próximo passo recomendado

Criar o documento arquitetural atualizado:

```text
docs/arquitetura/mapa-real-operacional-v2.md
```

Branch sugerida:

```text
arquitetura/operacao-real-v2
```

Objetivo: atualizar o mapa real da arquitetura para refletir a operação viva, incluindo:

- pipeline principal;
- análise semanal;
- análise geral;
- auditoria operacional;
- calendário operacional;
- validações reais;
- dependências entre camadas.

---

## 10. Status

CONCLUÍDO

# OBSERVABILIDADE E LOGS OPERACIONAIS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Definir a estratégia inicial de observabilidade e rastreabilidade operacional do Projeto Hortifruti.

Este documento não implementa logs.

Ele especifica quais eventos, erros e execuções devem ser registrados futuramente para reduzir dependência de conferência visual e aumentar rastreabilidade.

---

## 2. Contexto

O projeto atualmente opera com:

```text
CSV Varejo Fácil
        ↓
Google Drive
        ↓
Apps Script
        ↓
Google Sheets
        ↓
PAINEL
```

Já foi confirmado que:

- não há triggers instalados;
- o fluxo depende de execução manual ou explícita;
- o Drive atua como fila operacional;
- há risco de inconsistência silenciosa;
- ainda não há log operacional estruturado;
- parte da validação depende de inspeção humana.

---

## 3. Princípios de observabilidade

Todo log futuro deve responder:

1. o que aconteceu;
2. quando aconteceu;
3. quem executou;
4. qual arquivo foi processado;
5. qual etapa foi afetada;
6. se houve erro;
7. qual ação deve ser tomada.

---

## 4. Eventos que devem ser registrados

| ID | Evento | Origem | Criticidade | Motivo |
|---|---|---|---|---|
| LOG-001 | Início de importação | Apps Script / Operação | ALTA | rastrear execução |
| LOG-002 | Fim de importação | Apps Script / Operação | ALTA | confirmar conclusão |
| LOG-003 | CSV selecionado para processamento | Drive | CRÍTICA | evitar arquivo errado |
| LOG-004 | CSV movido para Processados | Drive | ALTA | rastrear fluxo de arquivos |
| LOG-005 | Erro de parsing monetário | BASE / STG | CRÍTICA | proteger análise financeira |
| LOG-006 | SKU sem correspondência | STG / SKU_RESUMO | CRÍTICA | proteger margem |
| LOG-007 | Duplicidade detectada | RAW / BASE | ALTA | evitar distorção |
| LOG-008 | Fórmula com erro | STG / PAINEL | CRÍTICA | bloquear análise inconsistente |
| LOG-009 | PAINEL zerado ou inconsistente | PAINEL | CRÍTICA | proteger decisão gerencial |
| LOG-010 | Execução manual registrada | Operação | ALTA | rastreabilidade humana |
| LOG-011 | Importação cancelada | Operação / Script | ALTA | investigação futura |
| LOG-012 | Validação crítica falhou | VALIDACOES | CRÍTICA | impedir propagação silenciosa |

---

## 5. Campos mínimos recomendados

Um registro de log futuro deve conter:

| Campo | Descrição |
|---|---|
| timestamp | data/hora da execução |
| operador | usuário ou responsável |
| tipo_evento | importação, validação, erro, alerta |
| origem | Drive, Apps Script, aba, fórmula |
| arquivo | nome ou ID do arquivo processado |
| etapa | RAW, BASE, STG, SKU_RESUMO, PAINEL, VALIDACOES |
| status | sucesso, alerta, erro, bloqueado |
| mensagem | descrição resumida |
| ação_recomendada | próximo passo operacional |

---

## 6. Níveis de severidade

| Nível | Uso |
|---|---|
| INFO | evento normal |
| ALERTA | comportamento suspeito que exige conferência |
| ERRO | falha operacional ou técnica |
| CRÍTICO | falha que deve bloquear análise gerencial |

---

## 7. Eventos críticos que devem bloquear análise

Devem impedir uso do PAINEL até revisão:

- erro de parsing monetário;
- CSV sem cabeçalho válido;
- ausência de aba obrigatória;
- fórmula quebrada;
- PAINEL zerado sem justificativa;
- SKU crítico sem correspondência;
- falha de validação estrutural.

---

## 8. Possíveis destinos futuros dos logs

A implementação futura pode usar:

- aba `LOGS_OPERACIONAIS` no Google Sheets;
- arquivo separado no Google Drive;
- Apps Script Logger temporário;
- tabela em banco relacional futuro;
- Supabase em fase posterior.

Nenhum destino está implementado por este documento.

---

## 9. Restrições

Não implementar logs sem nova aprovação técnica.

Não alterar:

- Apps Script;
- fórmulas;
- abas;
- triggers;
- fluxo Drive;
- Supabase.

---

## 10. Próximos passos recomendados

1. definir se o primeiro destino de logs será Google Sheets ou arquivo externo;
2. criar desenho da aba `LOGS_OPERACIONAIS`;
3. priorizar logs de importação e parsing;
4. definir mensagens padronizadas;
5. implementar logs apenas após aprovação do Gerente Técnico.

---

## 11. Status

CONCLUÍDO

# VALIDAÇÕES ESTRUTURAIS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Definir o conjunto inicial de validações estruturais necessárias para reduzir inconsistência silenciosa no pipeline Hortifruti.

Este documento não implementa validações.

Ele especifica o que deve ser validado antes de futuras refatorações, automações ou migrações.

---

## 2. Contexto

O Projeto Hortifruti opera atualmente com o fluxo:

```text
CSV Varejo Fácil
        ↓
Google Drive
        ↓
Apps Script
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
```

Auditorias anteriores identificaram riscos relacionados a:

- parsing monetário;
- IFERROR mascarando falhas;
- dependência de locale pt_BR;
- deduplicação por linha inteira;
- ranges abertos;
- VLOOKUP estrutural;
- operação manual;
- ausência de triggers instalados.

---

## 3. Princípio das validações

Toda validação deve responder:

1. o que está sendo verificado;
2. onde ocorre no pipeline;
3. qual erro pretende detectar;
4. se o erro deve bloquear análise ou apenas alertar;
5. qual ação operacional deve ser tomada.

---

## 4. Matriz inicial de validações

| ID | Validação | Local | Tipo | Criticidade | Ação recomendada |
|---|---|---|---|---|---|
| V-001 | CSV vazio ou sem linhas úteis | Drive / RAW | Entrada | CRÍTICA | Bloquear importação |
| V-002 | Cabeçalho ausente ou divergente | CSV / RAW | Estrutural | CRÍTICA | Bloquear importação |
| V-003 | Colunas obrigatórias ausentes | CSV / RAW | Estrutural | CRÍTICA | Bloquear importação |
| V-004 | Valores monetários não parseáveis | BASE / STG | Financeira | CRÍTICA | Bloquear análise |
| V-005 | Valores 100x maiores ou menores | STG / PAINEL | Financeira | ALTA | Alertar e revisar |
| V-006 | Datas inválidas ou fora do período | BASE / STG | Operacional | ALTA | Alertar e revisar |
| V-007 | SKU sem correspondência esperada | STG / SKU_RESUMO | Negócio | CRÍTICA | Alertar e revisar |
| V-008 | Linhas duplicadas | RAW / BASE | Integridade | ALTA | Alertar antes de consolidar |
| V-009 | Totais zerados inesperadamente | PAINEL | Gerencial | CRÍTICA | Bloquear análise |
| V-010 | Fórmulas com erro visível | STG / SKU_RESUMO / PAINEL | Estrutural | CRÍTICA | Bloquear análise |
| V-011 | Aba obrigatória ausente | Sheets | Estrutural | CRÍTICA | Bloquear execução |
| V-012 | Arquivo não movido para Processados | Drive | Operacional | MÉDIA | Revisar execução |
| V-013 | Margem zerada ou negativa inesperada | SKU_RESUMO / PAINEL | Financeira | ALTA | Alertar e revisar |
| V-014 | Quantidade ou valor em branco em linha válida | BASE / STG | Integridade | ALTA | Alertar |
| V-015 | Alteração manual em aba intermediária | BASE / STG | Operacional | ALTA | Registrar e revisar |

---

## 5. Validações bloqueantes

Devem bloquear análise gerencial até revisão:

- CSV vazio;
- cabeçalho divergente;
- ausência de colunas obrigatórias;
- erro de parsing monetário;
- aba obrigatória ausente;
- fórmula quebrada;
- PAINEL zerado sem explicação;
- SKU crítico sem correspondência.

---

## 6. Validações de alerta

Devem gerar alerta, mas podem permitir continuidade com revisão humana:

- datas fora do período esperado;
- valores atípicos;
- margem negativa;
- duplicidade suspeita;
- arquivo não movido para `Processados`;
- divergência pontual de SKU.

---

## 7. Pontos futuros de implementação

As validações podem futuramente ser implementadas em:

- Apps Script;
- aba `VALIDACOES`;
- logs operacionais;
- checklist manual;
- camada de banco relacional futura;
- testes automatizados.

Nenhuma implementação está autorizada por este documento.

---

## 8. Restrições

Não implementar validações sem nova aprovação técnica.

Não alterar:

- Apps Script;
- fórmulas;
- abas;
- parsing;
- fluxo Drive;
- Supabase.

---

## 9. Próximos passos recomendados

1. priorizar validações bloqueantes;
2. validar quais já existem na aba `VALIDACOES`;
3. mapear quais podem ser conferidas manualmente;
4. definir quais devem virar Apps Script no futuro;
5. criar plano de implementação gradual.

---

## 10. Status

CONCLUÍDO

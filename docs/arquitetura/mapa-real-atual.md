# MAPA REAL ATUAL — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Documentar oficialmente a arquitetura real atual do Projeto Hortifruti, considerando fluxo operacional vigente, dependências reais, responsabilidades das camadas, comportamento atual do pipeline, limitações estruturais, riscos operacionais e regras de negócio implícitas existentes.

Este documento representa o estado operacional atual do projeto. Não representa arquitetura futura definitiva.

---

# 2. Visão geral

O Projeto Hortifruti atualmente opera com arquitetura baseada em Google Sheets, Google Apps Script, Google Drive, importação de CSVs do Varejo Fácil e processamento em múltiplas camadas de transformação.

O modelo atual possui forte dependência operacional de fórmulas, planilhas, padronização manual, organização de arquivos, consistência dos CSVs e execução correta dos scripts.

A arquitetura atual prioriza estabilidade operacional, rastreabilidade, simplicidade operacional, baixo custo operacional e facilidade de manutenção manual.

---

# 3. Fluxo operacional atual

Fluxo principal atual:

```text
CSV Varejo Fácil
        ↓
Google Drive
        ↓
Apps Script
        ↓
Google Sheets
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

Fluxo complementar atual:

```text
Operação manual
        ↓
Validação visual
        ↓
Correções pontuais
        ↓
Atualização de fórmulas
        ↓
Análise gerencial
```

---

# 4. Pipeline operacional

## 4.1 RAW

Camada de ingestão bruta, responsável por receber dados originais, preservar dados importados e manter proximidade máxima com a origem. Possui baixa transformação e forte dependência do layout do CSV do Varejo Fácil.

## 4.2 BASE

Camada de padronização inicial dos dados. Responsável por limpeza inicial, conversão de tipos, normalização básica e preparação estrutural para STG.

## 4.3 STG

Camada intermediária operacional. Responsável por enriquecimento operacional, compatibilização de dados e aplicação de regras auxiliares. É altamente dependente de fórmulas e referências cruzadas.

## 4.4 SKU_RESUMO

Camada de consolidação analítica por SKU. Responsável por agregações, consolidações, métricas operacionais e análises resumidas.

## 4.5 PAINEL

Camada de visualização gerencial e operacional. Depende da integridade completa do pipeline e pode propagar inconsistências anteriores.

## 4.6 VALIDACOES

Camada de conferência operacional. Identifica inconsistências, mas não deve ser assumida como bloqueio transacional automático.

---

# 5. Responsabilidades das camadas

| Camada | Responsabilidade principal |
|---|---|
| RAW | Preservação da origem |
| BASE | Padronização inicial |
| STG | Transformação operacional |
| SKU_RESUMO | Consolidação analítica |
| PAINEL | Visualização gerencial |
| VALIDACOES | Conferência operacional |

---

# 6. Dependências atuais

## Técnicas

- Google Sheets;
- Google Apps Script;
- Google Drive;
- CSVs do Varejo Fácil;
- fórmulas matriciais;
- VLOOKUP/PROCV;
- ARRAYFORMULA;
- normalizações numéricas;
- permissões Drive.

## Operacionais

- exportação correta dos CSVs;
- organização manual de arquivos;
- execução correta dos scripts;
- manutenção manual de fórmulas;
- padronização operacional humana.

## Futuras previstas

- Supabase;
- banco relacional;
- ingestão incremental;
- automação de validações;
- versionamento estruturado.

Nenhuma dependência futura está implementada atualmente como operação principal.

---

# 7. Regras de negócio implícitas atualmente no pipeline

Atualmente existem regras de negócio não formalizadas diretamente no pipeline. Elas existem de forma implícita em fórmulas, estrutura das abas, convenções operacionais, organização dos CSVs, nomenclaturas e ordem de execução.

## 7.1 Ordem obrigatória do pipeline

O pipeline assume a sequência:

```text
RAW → BASE → STG → SKU_RESUMO → PAINEL → VALIDACOES
```

Mudanças nessa sequência podem quebrar fórmulas, referências e análises.

## 7.2 Dependência estrutural de colunas

Grande parte das fórmulas assume posições fixas, colunas estáticas e layouts invariáveis.

## 7.3 Dependência de padronização dos CSVs

O sistema assume separadores consistentes, estrutura fixa, codificação previsível e campos obrigatórios.

## 7.4 Dependência de preenchimento contínuo

Fórmulas matriciais assumem ausência de linhas quebradas, continuidade dos dados e ausência de células manuais indevidas.

## 7.5 Regras implícitas de consolidação

SKU_RESUMO assume unicidade operacional dos SKUs, consistência dos códigos e integridade do STG.

## 7.6 Regras implícitas de análise gerencial

PAINEL assume ausência de duplicidade, ausência de falha de parsing, integridade numérica e consistência de datas.

---

# 8. Fluxo legado identificado

Existem comportamentos herdados no projeto atual, incluindo fórmulas acopladas, dependência estrutural alta, lógica distribuída entre abas, ausência de centralização de regras, baixa modularização e dependência operacional manual.

O legado não deve ser removido sem inventário e validação.

---

# 9. Riscos arquiteturais atuais

## 9.1 Inconsistência silenciosa

Maior risco atual do projeto. Pode ocorrer por falha de parsing, fórmulas quebradas, colunas deslocadas, importações incompletas e mudanças no CSV.

## 9.2 Alto acoplamento estrutural

Grande dependência de posições, abas, referências cruzadas e convenções implícitas.

## 9.3 Dependência operacional humana

Processos ainda dependem de validação manual, conferência visual e organização operacional.

## 9.4 Baixa rastreabilidade de erros

Alguns erros podem propagar até o PAINEL sem bloqueio automático.

## 9.5 Fragilidade de fórmulas

Mudanças pequenas podem impactar ARRAYFORMULA, VLOOKUP/PROCV, referências matriciais e normalizações.

---

# 10. Limitações atuais

## Técnicas

- ausência de banco relacional;
- ausência de validação transacional;
- ausência de versionamento de dados;
- ausência de auditoria estruturada;
- dependência de planilhas.

## Operacionais

- validações manuais;
- manutenção operacional sensível;
- dificuldade de escalabilidade;
- risco humano elevado.

## Arquiteturais

- modularização parcial;
- lógica distribuída;
- ausência de centralização de regras.

---

# 11. Fluxo futuro hipotético

Fluxo futuro apenas conceitual, ainda não implementado:

```text
CSV / API
   ↓
Camada de ingestão controlada
   ↓
Banco relacional / Supabase
   ↓
Validações automatizadas
   ↓
Google Sheets / Dashboard como consumo
```

Supabase ainda NÃO faz parte da arquitetura operacional atual.

---

# 12. Conclusão arquitetural

O Projeto Hortifruti possui pipeline operacional funcional, mas estruturalmente sensível. A operação atual depende de Google Drive, Apps Script, Google Sheets, fórmulas, CSVs e disciplina operacional humana.

Antes de qualquer migração ou refatoração ampla, é obrigatório consolidar regras implícitas, mapear dependências, validar riscos e preservar compatibilidade operacional.

# AUDITORIA DE APPS SCRIPT E AUTOMAÇÕES OPERACIONAIS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## Situação da análise

- branch confirmada explicitamente;
- nenhuma divergência estrutural confirmada durante esta consolidação;
- não utilizar `main` como referência implícita;
- caso existam scripts fora da reorganização documental, eles devem ser inventariados separadamente em auditoria futura.

---

# 1. Objetivo

Documentar a auditoria concreta das automações Apps Script do Projeto Hortifruti.

Esta auditoria possui objetivo exclusivamente documental e analítico. Nenhuma alteração operacional foi executada.

O foco é mapear scripts, identificar automações, localizar side effects, avaliar riscos operacionais, identificar fragilidades estruturais, documentar dependências ocultas e preparar futura estabilização arquitetural.

---

# 2. Escopo auditado

Itens auditados:

- Apps Script existentes no repositório;
- automações operacionais;
- importações;
- movimentação Drive;
- limpeza de abas;
- deduplicações;
- side effects estruturais;
- dependência de locale;
- dependência operacional implícita.

---

# 3. Inventário de scripts encontrados

## 3.1 `gerar_template_google_sheets.gs`

Objetivo aparente:

- geração estrutural de planilhas;
- preparação operacional;
- criação de layout inicial.

Categoria:

- automação estrutural;
- preparação operacional;
- automação crítica atual.

Funções identificadas:

- `criarTemplateCruzamento`;
- `reaplicarEstruturaNaPlanilhaAtual`;
- `reaplicarEstrutura_`;
- `atualizarTudoDoDrive`;
- `importarMaisRecenteParaAba`;
- `mapVendasRow_`;
- `mapComprasRow_`;
- `toNumber_`;
- `appendUniqueRows_`;
- `rowKey_`;
- `getMostRecentCsvFile_`;
- `moveFileToProcessed_`;
- `getOrCreateSubfolder_`.

Evidências principais:

- define IDs fixos das pastas de vendas e compras no Drive;
- usa subpasta `Processados`;
- cria planilha, força locale `pt_BR` e timezone `America/Sao_Paulo`;
- cria/depende das abas `VENDAS_RAW`, `COMPRAS_RAW`, `VENDAS_BASE`, `COMPRAS_BASE`, `VENDAS_STG`, `COMPRAS_STG`, `SKU_RESUMO`, `PAINEL`, `VALIDACOES`;
- reaplica estrutura e fórmulas com `setFormula` em STG, SKU_RESUMO, PAINEL e VALIDACOES;
- importa o CSV mais recente de vendas e compras para RAW/BASE;
- lê CSV com separador `;`, descarta cabeçalho, filtra linhas vazias, grava linhas únicas e move arquivo para `Processados`;
- faz parsing monetário brasileiro em `toNumber_` com remoção de ponto e troca de vírgula por ponto;
- deduplicação por chave textual da linha inteira;
- seleciona apenas o CSV mais recente por `getLastUpdated()`;
- move arquivo usando `addFile` na pasta Processados e `removeFile` da pasta original.

## 3.2 `limpar_notas_drive.gs`

Objetivo aparente:

- limpeza operacional;
- importação auxiliar/legada;
- manutenção do Drive e da aba `Dados Limpos`.

Categoria:

- automação operacional;
- manutenção de arquivos;
- automação legada/paralela.

Funções identificadas:

- `importarCSVLimpoDaPasta`;
- `inserirSomenteNovasLinhas_`;
- `garantirCabecalho_`;
- `mesmoCabecalho_`;
- `gerarChaveLinha_`;
- `lerCsvComMelhorConfiguracao_`;
- `corrigirMojibake_`;
- `obterArquivoMaisRecente_`;
- `mapearColunas_`;
- `validarMapeamento_`;
- `normalizarTexto_`;
- `normalizarValor_`;
- `converterNumeroBrasil_`;
- `tentarData_`;
- `linhaVazia_`.

Evidências principais:

- importa CSV mais recente da pasta de compras para aba `Dados Limpos`;
- usa aliases para reconhecer colunas do CSV;
- cria a aba destino se ela não existir;
- se o cabeçalho divergir, executa `clearContents()` e reescreve cabeçalho;
- testa UTF-8 e ISO-8859-1, vírgula e ponto e vírgula, escolhendo a melhor combinação por contagem de colunas reconhecidas;
- converte número brasileiro removendo `R$`, pontos, espaços e trocando vírgula por ponto;
- converte datas `dd/mm/aaaa` e usa fallback `new Date(texto)`.

---

# 4. Triggers e execução

Durante a auditoria realizada no escopo disponível, não foram encontrados:

- `onOpen`;
- `onEdit`;
- `ScriptApp.newTrigger`;
- triggers explícitos no repositório.

## Implicação

O comportamento operacional pode depender de triggers instalados manualmente, automações externas, execução manual ou scripts vinculados fora do repositório auditado.

## Pendência crítica

Validar diretamente no ambiente Apps Script:

- triggers ativos;
- responsáveis;
- frequência;
- escopo;
- side effects reais.

---

# 5. Mapa atual das automações

Fluxo operacional identificado:

```text
CSV Varejo Fácil
        ↓
Google Drive
        ↓
Apps Script
        ↓
Google Sheets
        ↓
Fórmulas
        ↓
Painéis
```

Fluxo complementar identificado:

```text
Operação humana
        ↓
Execução manual
        ↓
Movimentação de arquivos
        ↓
Atualização de planilhas
```

---

# 6. Side effects identificados

## 6.1 Importação

Possíveis efeitos:

- sobrescrita de dados;
- duplicação;
- perda de rastreabilidade;
- inconsistência parcial;
- importação incompleta.

Criticidade: MUITO ALTA.

## 6.2 Limpeza

Operações potencialmente perigosas:

- `clearContents`;
- limpeza ampla de ranges;
- reset operacional.

Riscos:

- perda silenciosa de dados;
- remoção acidental;
- quebra de rastreabilidade;
- destruição de histórico.

Criticidade: MUITO ALTA.

## 6.3 Movimentação Drive

Operações identificadas:

- movimentação de arquivos;
- remoção de arquivo da pasta original;
- reorganização operacional em `Processados`.

Riscos:

- perda de referência;
- arquivo órfão;
- inconsistência de origem;
- falha de importação futura.

Criticidade: ALTA.

## 6.4 Deduplicação

Deduplicação por linha inteira é insuficiente para garantir integridade operacional. Pode remover registros válidos, permitir duplicidade parcial, ocultar divergências reais ou destruir granularidade operacional.

Criticidade: MUITO ALTA.

---

# 7. Dependência de locale `pt_BR`

O pipeline atual demonstra forte dependência de locale `pt_BR`, separador decimal, separador de milhar e parsing brasileiro.

Componentes afetados:

- Google Sheets;
- Apps Script;
- CSVs;
- `NUMBERVALUE`;
- `VALUE`;
- `SUBSTITUTE`;
- `toNumber_`;
- `converterNumeroBrasil_`.

Mudanças de locale podem causar parsing incorreto, valores inválidos, números multiplicados/divididos incorretamente e inconsistência financeira silenciosa.

---

# 8. Riscos operacionais identificados

## 8.1 Inconsistência silenciosa

Maior risco identificado. Pode ocorrer por limpeza indevida, parsing incorreto, deduplicação agressiva, importação parcial e movimentação incorreta de arquivos.

## 8.2 Dependência operacional humana

O pipeline atual ainda depende fortemente de execução manual, organização humana, disciplina operacional e conferência visual.

## 8.3 Fragilidade de automações

Ausência de validação transacional, rollback estruturado, auditoria automática e rastreamento de execução.

## 8.4 `clearContents`

Uso amplo de limpeza pode apagar histórico, quebrar fórmulas, gerar inconsistência parcial e inviabilizar auditoria posterior.

---

# 9. Matriz função → side effect → risco → criticidade

| Função/ação | Side effect | Risco | Criticidade |
|---|---|---|---|
| Importação CSV | Sobrescrita/append | Inconsistência silenciosa | MUITO ALTA |
| `clearContents` | Remoção ampla | Perda de dados | MUITO ALTA |
| Movimentação Drive | Perda de referência | Falha operacional | ALTA |
| Deduplicação por linha inteira | Exclusão/permissão indevida | Perda operacional/duplicidade | MUITO ALTA |
| Parsing locale | Conversão incorreta | Impacto financeiro | MUITO ALTA |
| Execução manual | Erro humano | Inconsistência | ALTA |
| `setFormula` | Propagação de regra invisível | Quebra estrutural | ALTA |
| Ausência de triggers versionados | Automação invisível | Baixa rastreabilidade | MUITO ALTA |
| CSV mais recente | Escolha automática | Arquivo errado ou pendente | ALTA |

---

# 10. Dependências estruturais

## Técnicas

- Google Apps Script;
- Google Sheets;
- Google Drive;
- locale `pt_BR`;
- CSV Varejo Fácil;
- nomes de abas;
- posições de colunas;
- pastas Drive.

## Operacionais

- execução manual;
- organização de pastas;
- integridade do Drive;
- manutenção humana.

## Invisíveis potenciais

- triggers instalados manualmente;
- permissões externas;
- automações não versionadas.

---

# 11. Restrições antes de qualquer refatoração

Não alterar simultaneamente:

- Apps Script;
- parsing;
- fórmulas;
- estrutura de abas;
- importações;
- movimentação Drive.

Não remover legado sem inventário de triggers, automações ocultas, dependências operacionais e side effects existentes.

Não iniciar modularização ampla antes de estabilização, auditoria completa, inventário de triggers, documentação operacional e validação humana.

---

# 12. Recomendações futuras

## Curto prazo

- inventariar triggers instalados;
- mapear execução manual;
- documentar side effects reais;
- validar comportamento de importação.

## Médio prazo

- criar logs estruturados;
- criar validações;
- reduzir limpeza destrutiva;
- revisar deduplicações.

## Longo prazo

- modularização gradual;
- centralização operacional;
- rastreabilidade completa;
- validação transacional.

## Não recomendado agora

- refatoração ampla;
- substituição abrupta do pipeline;
- remoção de automações legadas;
- migração estrutural simultânea.

---

# 13. Conclusão

A arquitetura atual de automações do Projeto Hortifruti apresenta forte dependência operacional, baixa rastreabilidade, automações parcialmente invisíveis, alto risco de inconsistência silenciosa e dependência significativa de execução humana.

Os maiores riscos concentram-se em importações, `clearContents`, deduplicações, locale `pt_BR`, ausência de triggers versionados e movimentação Drive.

A prioridade correta permanece estabilização, documentação, inventário, auditoria e modularização gradual.

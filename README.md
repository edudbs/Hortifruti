# Controle Compra x Vendas Hortifruti

Repositório de documentação, scripts e modelos para apoiar a gestão de compras, vendas, perdas e análise de rentabilidade do setor de hortifruti.

O projeto deixou de ser apenas um importador simples de CSV e passou a funcionar como uma base operacional para cruzar dados de **vendas**, **compras**, **custos**, **margem**, **perdas** e **indicadores por SKU**.

## Objetivo

Organizar o fluxo de dados do hortifruti para responder perguntas práticas de gestão:

- quanto foi vendido por produto;
- quanto foi comprado por produto;
- qual o custo de reposição;
- qual a margem por SKU;
- quais produtos têm maior peso na venda;
- onde há perda, sobra, ruptura ou compra excessiva;
- quais dados precisam ser conferidos antes da análise.

## Arquitetura resumida

```text
Varejo Fácil
   ↓
CSV de vendas e compras
   ↓
Pastas no Google Drive
   ↓
Apps Script
   ↓
Google Sheets
   ↓
Abas RAW / BASE / STG / RESUMO / PAINEL
   ↓
Análise operacional e tomada de decisão
```

## Estrutura atual recomendada

```text
apps-script/
  gerar_template_google_sheets.gs

legacy/
  apps-script/
    limpar_notas_drive.gs

docs/
  arquitetura/
    visao-geral.md
    fluxo-dados.md

  operacao/
    como-obter-csv-varejo-facil.md
    rotina-importacao.md
    troubleshooting.md

  apps-script/
    menu-ajuda-google-sheets.md

  dados/
    contrato-dados.md
    estrutura-planilha.md

  analises/
    cruzamento-vendas-compras.md

  perdas/
    controle-perdas.md
    modelos/
      modelo-formulario-planilha-perdas.md

samples/
  arquivos CSV de exemplo, quando necessário
```

## Documentação principal

- [Visão geral da arquitetura](docs/arquitetura/visao-geral.md)
- [Fluxo de dados](docs/arquitetura/fluxo-dados.md)
- [Como obter CSVs no Varejo Fácil](docs/operacao/como-obter-csv-varejo-facil.md)
- [Rotina de importação](docs/operacao/rotina-importacao.md)
- [Estrutura da planilha](docs/dados/estrutura-planilha.md)
- [Contrato de dados](docs/dados/contrato-dados.md)
- [Análise de cruzamento vendas x compras](docs/analises/cruzamento-vendas-compras.md)
- [Controle de perdas](docs/perdas/controle-perdas.md)
- [Menu de ajuda no Google Sheets](docs/apps-script/menu-ajuda-google-sheets.md)
- [Troubleshooting](docs/operacao/troubleshooting.md)

## Scripts

### Atual

- `apps-script/gerar_template_google_sheets.gs`

Script principal para criação/estruturação da planilha de cruzamento entre vendas e compras, com abas de base, staging, resumo, painel e validações.

### Legado

- `legacy/apps-script/limpar_notas_drive.gs`

Script criado na fase inicial do projeto para importar o CSV mais recente de uma pasta do Drive para uma aba `Dados Limpos`. Foi preservado por possível reutilização futura, mas **não representa mais a arquitetura atual do projeto**.

## Status dos arquivos antigos

| Arquivo antigo | Tratamento |
|---|---|
| `README.md` | substituído por este README |
| `README_APPS_SCRIPT.md` | conteúdo útil dividido em documentos operacionais/técnicos |
| `limpar_notas_drive.gs` | movido para legado |
| `gerar_template_google_sheets.gs` | mantido como script principal |
| `analise_cruzamento_vendas_compras.md` | movido para `docs/analises/` |
| `DOCUMENTACAO_OPERACIONAL_PERDAS_HORTIFRUTI.md` | movido para `docs/perdas/` |
| `modelo_formulario_planilha_perdas.md` | movido para `docs/perdas/modelos/` |

## Próximas melhorias recomendadas

1. Incluir menu de ajuda no Google Sheets.
2. Separar funções do Apps Script em módulos, quando o projeto crescer.
3. Padronizar nomes dos CSVs de exemplo.
4. Evitar versionar arquivos CSV reais com dados sensíveis.
5. Criar documentação de decisões técnicas em `docs/decisoes/`.

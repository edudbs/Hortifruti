# Changelog

Todas as mudanças relevantes do projeto Controle Compra x Vendas Hortifruti devem ser documentadas aqui.

## [Unreleased]

### Planejado
- Incluir menu de ajuda no Google Sheets.
- Criar rotina orientada para importação de vendas e compras.
- Revisar nomenclatura dos arquivos CSV de exemplo.
- Avaliar separação futura do Apps Script em módulos.

## [2026-05-27]

### Changed
- Reorganização proposta da documentação do projeto.
- Classificação de `limpar_notas_drive.gs` como script legado.
- Separação da documentação operacional, técnica, arquitetura, dados, análises e perdas.
- Criação de documentação própria para obtenção dos CSVs no Varejo Fácil.

### Preserved
- Caminhos operacionais para baixar os CSVs de compras e vendas no Varejo Fácil.
- Documentação de controle de perdas.
- Modelo de formulário/planilha de perdas.
- Análise de cruzamento entre vendas e compras.

## [2026-05-26]

### Added
- Script inicial de importação/limpeza de CSV no Apps Script.
- Seleção de colunas essenciais, normalização de números/datas e gravação na aba `Dados Limpos`.
- Documentação operacional inicial em `README_APPS_SCRIPT.md`.

### Changed
- Leitura de CSV robusta com múltiplas codificações (`UTF-8`, `ISO-8859-1`) e separadores (`,` e `;`).
- Tratamento de mojibake em cabeçalhos.
- Importação incremental com deduplicação.

# Changelog

Todas as mudanças relevantes deste fluxo de importação são documentadas aqui.

## [Unreleased]

## [2026-05-26]
### Added
- Script inicial de importação/limpeza de CSV no Apps Script.
- Seleção de colunas essenciais, normalização de números/datas e gravação na aba `Dados Limpos`.
- Documentação operacional inicial em `README_APPS_SCRIPT.md`.

### Changed
- Leitura de CSV robusta com múltiplas codificações (`UTF-8`, `ISO-8859-1`) e separadores (`,` e `;`).
- Tratamento de mojibake em cabeçalhos (ex.: `CÃ³digo da Loja`).
- Importação incremental com deduplicação: adiciona apenas linhas novas na próxima linha vazia.

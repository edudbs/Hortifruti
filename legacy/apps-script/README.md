# Script legado: limpar_notas_drive.gs

Este script foi criado em uma etapa inicial do projeto.

## Status

Legado / obsoleto para a arquitetura atual.

## Por que foi preservado

Embora não represente mais o fluxo atual de compra x venda, ele contém soluções que podem ser reutilizadas em situações específicas:

- leitura do CSV mais recente em uma pasta do Drive;
- tentativa de múltiplos separadores;
- tentativa de múltiplas codificações;
- correção de mojibake;
- deduplicação de linhas;
- normalização básica de números e datas.

## Quando não usar

Não usar como base principal do projeto atual, pois o projeto evoluiu para uma estrutura mais ampla com:

- vendas;
- compras;
- bases;
- staging;
- resumo por SKU;
- painel;
- validações;
- importação por pastas específicas.

## Localização

```text
legacy/apps-script/limpar_notas_drive.gs
```

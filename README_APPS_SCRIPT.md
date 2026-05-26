# Importação e limpeza de CSV no Google Sheets (Apps Script)

## Objetivo

Automatizar a entrada de notas de compra em uma base consolidada para análise, com foco em:

- padronização de colunas;
- tolerância a variações de encoding e separador;
- prevenção de duplicidades (importação incremental).

## Fluxo operacional

1. Envie um arquivo `.csv` para a pasta do Drive:
   - `1iL1f5CWUEtceU-iMm_kcNVQBhepo6Lnr`
   - Caminho para obter o arquivo: https://laticiniodozuzu.varejofacil.com/app/#/vf?r=%2FrelatorioNotaFiscalCompra%2Findex&b=Compra,Relat%C3%B3rios,Nota%20fiscal%20entrada (Varejo Facil > Compras > Relatórios / Nota fiscal entrada > Filtros [Seção / 9 - Hortifruti] > Formato [Analítico] > Exibição [CSV])
2. Abra a planilha no Google Sheets.
3. Execute a função `importarCSVLimpoDaPasta` via Apps Script.
4. O script processa o CSV mais recente e adiciona somente dados novos na aba `Dados Limpos`.

## Contrato de dados (colunas obrigatórias)

| Coluna esperada | Obrigatória | Exemplo | Regra de tratamento |
|---|---|---|---|
| Código da Loja | Sim | 101 | Texto/identificador |
| Código do Fornecedor | Sim | 9001 | Texto/identificador |
| Nome do Fornecedor | Sim | Fornecedor XPTO | Texto |
| Número do Documento | Sim | 123456 | Texto/identificador |
| Data De Emissão | Sim | 26/05/2026 | Convertida para Date quando possível |
| Data de entrada | Sim | 27/05/2026 | Convertida para Date quando possível |
| Valor Total | Sim | R$ 1.234,56 | Convertido para número |
| Código do produto | Sim | 7891234567890 | Texto/identificador |
| Descrição Produto | Sim | Maçã Gala 18kg | Texto |
| Unidade de medida | Sim | CX | Texto |
| Quantidade de itens na unidade | Sim | 18 | Convertido para número |
| Quantidade de itens | Sim | 2 | Convertido para número |
| Valor unitário | Sim | 12,34 | Convertido para número |
| Valor total do item | Sim | 24,68 | Convertido para número |

## Comportamento técnico

- Seleciona o **CSV mais recente** da pasta configurada.
- Tenta múltiplas combinações de leitura para melhorar robustez:
  - separadores: `,` e `;`
  - codificações: `UTF-8` e `ISO-8859-1`
- Corrige texto corrompido por encoding (ex.: `CÃ³digo` → `Código`) quando detectado padrão de mojibake.
- Mapeia cabeçalhos por nome principal e aliases.
- Valida todas as colunas obrigatórias; se faltar alguma, interrompe com erro.
- Faz importação incremental:
  - não duplica linhas já existentes;
  - insere apenas linhas inéditas na próxima linha vazia.

## Como instalar e executar

1. Abra sua planilha no Google Sheets.
2. Vá em **Extensões > Apps Script**.
3. Cole o conteúdo de `limpar_notas_drive.gs` em um arquivo de script.
4. Salve.
5. Execute `importarCSVLimpoDaPasta`.
6. Autorize permissões (Drive + Sheets) na primeira execução.

## Troubleshooting

### Erro: "Não encontrei estas colunas no CSV"
Causas comuns:
- cabeçalhos realmente diferentes do contrato;
- arquivo com estrutura incorreta (linhas extras antes do cabeçalho);
- coluna ausente na exportação do sistema de origem.

Ações recomendadas:
- valide o cabeçalho do CSV com a tabela de colunas obrigatórias;
- confirme se o cabeçalho está na primeira linha;
- inclua alias adicional no script, se for variação legítima do nome.

### Texto quebrado (ex.: `CÃ³digo da Loja`)
- O script já tenta corrigir automaticamente via leitura por encoding alternativo e ajuste de mojibake.
- Se persistir, valide como o sistema de origem está exportando o arquivo.

### Não inseriu nada
- Pode significar que todas as linhas do CSV já existem na aba `Dados Limpos`.
- Confira o log da execução para o contador de "Linhas novas importadas".

## Boas práticas de operação

- Subir arquivos com nomes e estrutura consistentes.
- Evitar editar manualmente o cabeçalho da aba `Dados Limpos`.
- Registrar mudanças no processo em `CHANGELOG.md`.

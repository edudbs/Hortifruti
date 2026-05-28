# CHECKLIST OPERACIONAL DE IMPORTAÇÃO — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Formalizar o procedimento operacional mínimo para importação de CSVs no Projeto Hortifruti.

Este checklist existe porque foi confirmado que:

- não há triggers instalados no Apps Script;
- o fluxo depende de execução manual ou explícita;
- o Google Drive atua como fila operacional;
- há risco de inconsistência silenciosa por importação incorreta, duplicidade, parsing ou ordem operacional.

---

## 2. Escopo

Este checklist cobre a rotina manual envolvendo:

- exportação de CSVs do Varejo Fácil;
- conferência dos arquivos;
- organização no Google Drive;
- execução do Apps Script;
- validação pós-importação;
- conferência do painel.

Não altera código, fórmulas, abas ou automações.

---

## 3. Checklist antes da importação

### 3.1 Validar origem dos arquivos

- [ ] Confirmar que o CSV veio do Varejo Fácil.
- [ ] Confirmar se o arquivo é de vendas ou compras.
- [ ] Confirmar que o período exportado está correto.
- [ ] Confirmar que não há arquivo antigo mais recente por engano na pasta.

### 3.2 Validar nome/local do arquivo

- [ ] Arquivo de vendas está na pasta correta de vendas.
- [ ] Arquivo de compras está na pasta correta de compras.
- [ ] Não há CSV duplicado na pasta de entrada.
- [ ] Não há arquivos temporários ou testes na pasta de entrada.

### 3.3 Validar estrutura mínima do CSV

- [ ] CSV abre corretamente.
- [ ] Separador parece correto.
- [ ] Cabeçalho está presente.
- [ ] Colunas esperadas existem.
- [ ] Valores monetários parecem legíveis.
- [ ] Datas aparecem no formato esperado.

---

## 4. Checklist durante a importação

- [ ] Executar apenas uma importação por vez.
- [ ] Não editar abas durante a execução.
- [ ] Não mover arquivos manualmente durante a execução.
- [ ] Aguardar finalização completa do Apps Script.
- [ ] Registrar se houve erro visível na execução.

---

## 5. Checklist após a importação

### 5.1 Validar movimentação de arquivos

- [ ] Arquivo processado foi movido para `Processados`.
- [ ] Arquivo correto foi processado.
- [ ] Não ficou CSV pendente indevido na pasta de entrada.

### 5.2 Validar abas RAW/BASE/STG

- [ ] RAW recebeu dados novos.
- [ ] BASE foi atualizada.
- [ ] STG não apresenta linhas vazias inesperadas.
- [ ] Não houve aparente duplicidade grosseira.
- [ ] Datas importadas parecem coerentes.
- [ ] Valores monetários parecem coerentes.

### 5.3 Validar SKU_RESUMO e PAINEL

- [ ] SKU_RESUMO foi atualizado.
- [ ] PAINEL apresenta totais coerentes.
- [ ] Margens não ficaram zeradas de forma inesperada.
- [ ] Produtos principais aparecem no resumo.
- [ ] Não há queda ou salto abrupto sem explicação.

### 5.4 Validar VALIDACOES

- [ ] Verificar alertas existentes na aba VALIDACOES.
- [ ] Confirmar se há produtos sem correspondência.
- [ ] Confirmar se há divergência de SKU.
- [ ] Confirmar se há valores zerados inesperados.

---

## 6. Sinais de alerta

Interromper análise gerencial e investigar se ocorrer:

- valores 100x maiores ou menores;
- margem zerada sem explicação;
- ausência de produtos esperados;
- arquivo errado em `Processados`;
- dados duplicados;
- erros visíveis em fórmulas;
- PAINEL incoerente com a operação real;
- importação de período errado.

---

## 7. Conduta em caso de erro

Se houver erro:

1. não executar nova importação imediatamente;
2. identificar qual CSV foi usado;
3. verificar se o arquivo foi movido para `Processados`;
4. registrar o problema observado;
5. evitar edição manual nas abas intermediárias;
6. acionar revisão técnica antes de corrigir dados críticos.

---

## 8. Restrições operacionais

Não recomendado:

- editar RAW manualmente;
- editar BASE/STG sem rastreio;
- apagar dados para tentar corrigir importação;
- reprocessar CSV sem entender a deduplicação;
- mover arquivos manualmente sem registro;
- alterar fórmulas durante rotina operacional.

---

## 9. Registro mínimo recomendado

Após cada importação, registrar manualmente:

| Campo | Informação |
|---|---|
| Data da importação |  |
| Operador |  |
| Tipo de CSV | vendas/compras |
| Período do CSV |  |
| Arquivo processado |  |
| Resultado | sucesso/erro |
| Observações |  |

---

## 10. Próximas melhorias futuras

- criar log automático de importação;
- registrar arquivo processado com hash ou ID;
- validar estrutura do CSV antes da importação;
- bloquear importação se houver erro crítico;
- criar painel de auditoria operacional;
- reduzir dependência de conferência visual.

---

## 11. Status

CONCLUÍDO

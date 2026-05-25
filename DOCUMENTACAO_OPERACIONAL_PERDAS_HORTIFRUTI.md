# Documentação Operacional — Controle de Perdas Hortifruti (Google Forms + Sheets)

## 1) Objetivo
Padronizar um processo simples, rápido e executável pelo celular para registrar perdas no hortifruti e transformar os lançamentos em indicadores semanais de gestão.

---

## 2) Estrutura final do formulário (produção)

**Ferramenta:** Google Forms (preenchimento pelo celular)

### Campos obrigatórios
1. **Data da perda** (tipo: Data)
2. **Produto** (tipo: Lista suspensa)
3. **Unidade de medida** (tipo: Múltipla escolha)
   - KG
   - UN
   - MAÇO
   - BANDEJA
   - CX
4. **Quantidade** (tipo: Resposta curta)
5. **Destino** (tipo: Múltipla escolha)
   - DESCARTE
   - REBAIXA
   - REAPROVEITAMENTO

### Campo extra opcional
6. **Produto manual (preencher se Produto = OUTRO)** (tipo: Resposta curta)

> Observação: o carimbo de data/hora do Forms permanece útil para auditoria de lançamento; a análise operacional deve priorizar o campo **Data da perda**.

---

## 3) Regra do campo OUTRO + campo manual

### Recomendação prática
- Incluir **OUTRO** no final da lista da pergunta **Produto**.
- Manter o campo **Produto manual (preencher se Produto = OUTRO)** para os casos fora do cadastro.

### Comportamento na planilha de respostas
- A coluna `Produto` armazenará o valor selecionado (inclusive `OUTRO`).
- O texto digitado manualmente ficará em outra coluna (`Produto manual...`).

### Coluna de consolidação (Produto_Final)
Na planilha, criar uma coluna calculada para análise única de produto.

Exemplo (ajuste letras conforme sua aba):

```excel
=ARRAYFORMULA(SE(LIN(B:B)=1;"Produto_Final";SE(B:B="";;SE(B:B="OUTRO";F:F;B:B))))
```

---

## 4) Script final de sincronização da lista de produtos

Objetivo do script:
- Ler produtos da aba `CADASTRO_PRODUTOS` (coluna A)
- Remover vazios
- Deduplicar com normalização (maiúsculas, acentos e espaços)
- Ordenar alfabeticamente
- Garantir `OUTRO` sempre no final
- Atualizar a pergunta `Produto` no Google Forms

```javascript
function sincronizarProdutosNoFormulario() {
  // ===== CONFIGURAÇÕES =====
  const FORM_ID = 'COLE_AQUI_O_ID_DO_FORM';
  const NOME_ABA = 'CADASTRO_PRODUTOS';
  const COLUNA = 1; // A=1
  const LINHA_INICIAL = 2; // dados começam na linha 2
  const TITULO_PERGUNTA = 'Produto';
  // =========================

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName(NOME_ABA);
  if (!aba) throw new Error(`Aba "${NOME_ABA}" não encontrada.`);

  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha < LINHA_INICIAL) throw new Error('Sem produtos para sincronizar.');

  const valoresBrutos = aba
    .getRange(LINHA_INICIAL, COLUNA, ultimaLinha - LINHA_INICIAL + 1, 1)
    .getValues()
    .flat();

  const chaveNormalizada = (txt) =>
    txt
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();

  const ehOutro = (txtNorm) => /^OUTRO(S)?$/.test(txtNorm);

  const mapa = new Map();

  for (const v of valoresBrutos) {
    const original = String(v ?? '').replace(/\s+/g, ' ').trim();
    if (!original) continue;

    const key = chaveNormalizada(original);
    if (!key) continue;
    if (ehOutro(key)) continue;

    if (!mapa.has(key)) {
      mapa.set(key, original);
    }
  }

  let produtos = Array.from(mapa.values());
  produtos.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  produtos.push('OUTRO');

  if (produtos.length === 0) throw new Error('Lista final de produtos vazia.');

  const form = FormApp.openById(FORM_ID);
  const itemProduto = form.getItems().find(
    i => i.getTitle().trim().toLowerCase() === TITULO_PERGUNTA.trim().toLowerCase()
  );

  if (!itemProduto) throw new Error(`Pergunta "${TITULO_PERGUNTA}" não encontrada no formulário.`);

  const tipo = itemProduto.getType();
  if (tipo === FormApp.ItemType.LIST) {
    itemProduto.asListItem().setChoiceValues(produtos);
  } else if (tipo === FormApp.ItemType.MULTIPLE_CHOICE) {
    itemProduto.asMultipleChoiceItem().setChoiceValues(produtos);
  } else {
    throw new Error('A pergunta "Produto" deve ser Lista suspensa ou Múltipla escolha.');
  }

  Logger.log(`OK: ${produtos.length} opções sincronizadas.`);
  Logger.log(`Última opção: ${produtos[produtos.length - 1]}`);
}
```

---

## 5) Regras de preenchimento da equipe (simples)

1. **Perdeu produto = lançou no formulário na hora.**
2. Se selecionar `OUTRO`, preencher obrigatoriamente `Produto manual`.
3. Quantidade deve refletir a unidade escolhida (kg/un/maço/cx).
4. Fechamento diário do encarregado às 17h30 (2–5 minutos).
5. Sábado: revisão do painel antes do fechamento financeiro semanal.

---

## 6) Estrutura da planilha e fórmulas do painel

### Aba de respostas
Gerada automaticamente pelo Forms (normalmente `Respostas ao formulário 1`).

> Recomendação: não editar estrutura (cabeçalhos/colunas) da aba de respostas.

### Aba `PAINEL`

#### 6.1 Registros totais
```excel
=CONT.VALORES('Respostas ao formulário 1'!A:A)-1
```

#### 6.2 Quantidade total lançada
(ajuste coluna da quantidade conforme sua aba)
```excel
=SOMA('Respostas ao formulário 1'!E:E)
```

#### 6.3 Contagem por destino
```excel
=CONT.SES('Respostas ao formulário 1'!F:F;"DESCARTE")
=CONT.SES('Respostas ao formulário 1'!F:F;"REBAIXA")
=CONT.SES('Respostas ao formulário 1'!F:F;"REAPROVEITAMENTO")
```

#### 6.4 Percentual por destino
Exemplo (se B5, B6 e B7 forem as contagens por destino):
```excel
=SEERRO(B5/SOMA($B$5:$B$7);0)
=SEERRO(B6/SOMA($B$5:$B$7);0)
=SEERRO(B7/SOMA($B$5:$B$7);0)
```

#### 6.5 Alerta de OUTRO sem descrição
Exemplo de coluna `Status_OUTRO` (ajuste letras):
```excel
=ARRAYFORMULA(SE(LIN(B:B)=1;"Status_OUTRO";SE(B:B="";;SE(E(B:B="OUTRO";G:G="");"PENDENTE";"OK"))))
```

---

## 7) Procedimento de virada TESTE → PRODUÇÃO

1. Finalizar testes em formulário/aba de teste.
2. Confirmar formulário final com campos obrigatórios.
3. Garantir que perguntas e ordem das colunas estão corretas.
4. Limpar dados de teste (ou iniciar nova aba de respostas para produção).
5. Atualizar links no time (WhatsApp + atalho na tela + QR Code no setor).

---

## 8) Rotina de governança semanal (30 minutos)

- Revisar top produtos em DESCARTE.
- Revisar volume em REBAIXA e REAPROVEITAMENTO.
- Ajustar compra dos itens com recorrência de perda.
- Atualizar `CADASTRO_PRODUTOS` e rodar sincronização do formulário.


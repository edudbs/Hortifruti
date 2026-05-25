# Modelo Prático (Plano B): Controle de Perdas Hortifruti

Este modelo foi desenhado para uso rápido no celular, com apenas 4 campos no formulário:

1. Produto
2. Unidade de medida
3. Quantidade
4. Destino

---

## 1) Google Forms (entrada de dados)

### Título do formulário
**Perdas Hortifruti - Lançamento Rápido**

### Descrição
"Registre toda perda no momento em que acontecer. Leva menos de 30 segundos."

### Perguntas (todas obrigatórias)

1. **Produto**
   - Tipo: `Lista suspensa` (Dropdown)
   - Sugestão inicial de opções:
     - ALFACE CRESPA UN.
     - COUVE UN.
     - CHEIRO VERDE UN.
     - COENTRO UN.
     - SALSINHA UN
     - TOMATE CARMEM KG
     - TOMATE ITALIANO KG
     - BATATA LISA KG
     - CEBOLA GRAUDA KG
     - CENOURA KG
     - BANANA PRATA KG
     - MAMAO FORMOSA KG
     - MARACUJA KG
     - QUIABO KG
     - OUTRO

2. **Unidade de medida**
   - Tipo: `Múltipla escolha`
   - Opções:
     - KG
     - UN
     - MAÇO
     - BANDEJA
     - CX

3. **Quantidade**
   - Tipo: `Resposta curta`
   - Validação: `Número` maior que `0`
   - Exemplo: `1,5` ou `2`

4. **Destino**
   - Tipo: `Múltipla escolha`
   - Opções:
     - DESCARTE
     - REBAIXA

---

## 2) Google Sheets (base automática)

Ao vincular o Forms ao Sheets, será criada uma aba com os envios (normalmente `Respostas ao formulário 1`) com a coluna de data/hora automática.

### Colunas esperadas na aba de respostas
- Carimbo de data/hora
- Produto
- Unidade de medida
- Quantidade
- Destino

> **Importante:** Não editar manualmente essa aba. Use uma aba separada para análises.

---

## 3) Aba `PAINEL` (resumo simples)

Crie uma nova aba chamada `PAINEL` e monte:

- **A2:** `Perdas hoje (registros)`
- **B2:** `=CONT.VALORES('Respostas ao formulário 1'!A:A)-1`

- **A4:** `Perdas por destino`
- **A5:** `DESCARTE`
- **A6:** `REBAIXA`
- **B5:** `=CONT.SES('Respostas ao formulário 1'!E:E;A5)`
- **B6:** `=CONT.SES('Respostas ao formulário 1'!E:E;A6)`

- **A8:** `Top produtos com mais ocorrências`
  - Use Tabela dinâmica com:
    - Linhas: Produto
    - Valores: Contagem de Produto
    - Filtro opcional: período

- **A10:** `Quantidade total perdida (somada)`
- **B10:** `=SOMA('Respostas ao formulário 1'!D:D)`

---

## 4) Passo a passo rápido (implantação em 15 min)

1. Acesse `forms.google.com`.
2. Crie formulário com os 4 campos acima (todos obrigatórios).
3. Em `Respostas`, clique em `Vincular ao Planilhas`.
4. Abra a planilha gerada e crie a aba `PAINEL`.
5. Cole as fórmulas.
6. Envie o link do Forms no grupo da equipe.
7. Faça 2 lançamentos de teste.

---

## 5) Regras operacionais (para garantir execução)

- Regra 1: perdeu, lançou.
- Regra 2: sem lançamento, perda não considerada.
- Regra 3: conferência diária às 17h30 (2 minutos).
- Regra 4: sábado revisar painel antes de fechar pagamentos da semana.

---

## 6) Evolução futura (sem complicar)

Quando o time estiver adaptado, adicionar apenas **1 campo extra**:
- `Motivo` (lista curta), para melhorar negociações com fornecedor e ajuste de compra.


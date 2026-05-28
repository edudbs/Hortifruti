# MODULARIZAÇÃO DE DOMÍNIOS — PROJETO HORTIFRUTI

## Branch oficial analisada

```text
docs/reorganizacao-documentacao
```

## 1. Objetivo

Definir a separação lógica de domínios do Projeto Hortifruti para reduzir acoplamento estrutural e preparar evolução arquitetural segura.

Este documento não implementa modularização.

Ele estabelece fronteiras conceituais entre responsabilidades operacionais, técnicas e analíticas do sistema atual.

---

## 2. Contexto atual

O sistema atual opera com:

```text
CSV Varejo Fácil
        ↓
Google Drive
        ↓
Apps Script
        ↓
Google Sheets
        ↓
RAW → BASE → STG → SKU_RESUMO → PAINEL
```

As auditorias já confirmaram:

- forte acoplamento estrutural;
- regras distribuídas;
- parsing duplicado;
- dependência de locale;
- dependência operacional humana;
- inconsistência silenciosa potencial;
- ausência de modularização formal.

---

## 3. Objetivo estratégico da modularização

A modularização busca:

- separar responsabilidades;
- reduzir propagação de erro;
- melhorar rastreabilidade;
- facilitar validações;
- permitir evolução incremental;
- preparar persistência estruturada futura;
- evitar transportar acoplamento atual para Supabase.

---

## 4. Domínios identificados

| Domínio | Responsabilidade principal |
|---|---|
| ingestao | entrada de CSVs e arquivos |
| parsing | normalização de dados e locale |
| staging | limpeza e preparação operacional |
| catalogo_sku | correspondência e consolidação de SKU |
| financeiro | custo, margem e indicadores financeiros |
| validacoes | verificações estruturais e operacionais |
| observabilidade | logs, rastreabilidade e eventos |
| operacional | execução humana e checklist |
| painel | consolidação gerencial e indicadores |
| auditoria | governança, risco e rastreabilidade técnica |

---

## 5. Descrição dos domínios

## 5.1 ingestao

### Responsabilidade

- receber CSVs;
- localizar arquivos corretos;
- organizar Drive;
- iniciar processamento.

### Dependências atuais

- Google Drive;
- CSV Varejo Fácil;
- execução manual.

### Riscos atuais

- arquivo incorreto;
- CSV duplicado;
- período errado;
- importação fora da ordem.

---

## 5.2 parsing

### Responsabilidade

- normalizar números;
- tratar locale pt_BR;
- converter datas;
- interpretar CSV.

### Riscos atuais

- parsing monetário incorreto;
- locale inconsistente;
- IFERROR mascarando falhas.

### Observação estratégica

Este domínio deve futuramente centralizar toda regra de parsing.

---

## 5.3 staging

### Responsabilidade

- estruturar dados;
- preparar cruzamentos;
- consolidar informações intermediárias.

### Camadas atuais

- RAW;
- BASE;
- STG.

### Riscos atuais

- ranges abertos;
- propagação silenciosa;
- dependência de colunas.

---

## 5.4 catalogo_sku

### Responsabilidade

- relacionar compras e vendas;
- consolidar SKU;
- permitir análise de margem.

### Riscos atuais

- SKU sem correspondência;
- dependência textual;
- divergência operacional.

### Importância

Domínio central para margem e consolidação financeira.

---

## 5.5 financeiro

### Responsabilidade

- cálculo de custo;
- margem;
- indicadores;
- consolidação financeira.

### Riscos atuais

- valores zerados silenciosamente;
- parsing incorreto;
- erro propagado até PAINEL.

---

## 5.6 validacoes

### Responsabilidade

- detectar inconsistências;
- validar integridade;
- bloquear análises inválidas.

### Situação atual

Parcialmente distribuído em:

- VALIDACOES;
- fórmulas;
- conferência humana.

---

## 5.7 observabilidade

### Responsabilidade

- registrar eventos;
- criar rastreabilidade;
- facilitar auditoria.

### Situação atual

Ainda não implementado.

---

## 5.8 operacional

### Responsabilidade

- checklist;
- execução humana;
- conferência pós-importação.

### Situação atual

Domínio crítico devido à ausência de triggers.

---

## 5.9 painel

### Responsabilidade

- consolidação gerencial;
- visão operacional;
- indicadores finais.

### Dependência estrutural

Depende da integridade de todos os domínios anteriores.

---

## 5.10 auditoria

### Responsabilidade

- governança;
- riscos;
- inventário;
- rastreabilidade técnica.

### Situação atual

Domínio já formalizado documentalmente.

---

## 6. Relação entre domínios

```text
ingestao
    ↓
parsing
    ↓
staging
    ↓
catalogo_sku
    ↓
financeiro
    ↓
painel
```

Domínios transversais:

```text
validacoes
observabilidade
operacional
auditoria
```

---

## 7. Problemas atuais de acoplamento

As auditorias identificaram:

- parsing espalhado;
- regras duplicadas;
- validações distribuídas;
- dependência implícita entre abas;
- lógica financeira misturada com estrutura operacional;
- ausência de fronteiras claras.

---

## 8. Estratégia recomendada

## Curto prazo

- consolidar entendimento dos domínios;
- evitar novas regras distribuídas;
- impedir refatoração ampla.

## Médio prazo

- centralizar parsing;
- centralizar validações;
- reduzir ranges abertos;
- separar lógica financeira.

## Longo prazo

- persistência estruturada;
- modularização gradual;
- APIs;
- Supabase incremental;
- observabilidade automatizada.

---

## 9. Restrições

Não autorizado neste momento:

- reescrever pipeline;
- migrar domínio completo para Supabase;
- substituir Google Sheets;
- modularizar múltiplos domínios simultaneamente;
- alterar fórmulas estruturais sem inventário completo.

---

## 10. Conclusão

O Projeto Hortifruti já possui maturidade suficiente para modelagem arquitetural por domínios.

A modularização correta deve ocorrer:

1. incrementalmente;
2. com rastreabilidade;
3. preservando estabilidade operacional;
4. sem transportar acoplamento atual para futuras camadas.

A prioridade correta continua sendo:

```text
estabilizar → separar domínios → validar → modularizar → persistir
```

---

## 11. Status

CONCLUÍDO

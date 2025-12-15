# 🎯 Análise de Viabilidade - FlowCloser Multi-Conta + Dashboard

## ✅ O QUE JÁ TEMOS (Base Sólida)

1. ✅ **Bot Instagram funcionando** (1 conta)
2. ✅ **Agente AI qualificando leads** (via @iqai/adk)
3. ✅ **Sessões SQLite** (histórico de conversas)
4. ✅ **Webhook recebendo mensagens**
5. ✅ **Envio de mensagens** funcionando
6. ✅ **Conversions API** (rastreamento Meta)

---

## ❌ O QUE FALTA (Crítico para Você Receber Dados)

### 🔴 **PRIORIDADE MÁXIMA: Armazenamento de Leads**

**Problema atual:**
- ✅ Sessões são salvas (conversas)
- ❌ **Dados estruturados de leads NÃO são salvos**
- ❌ Você não recebe os dados para fazer a parte humana

**Solução necessária:**
```typescript
// Criar tabela de leads no SQLite
interface Lead {
  id: string;
  name?: string;
  company?: string;
  instagram_id: string;
  page_id: string; // Para múltiplas contas
  platform: 'instagram' | 'messenger';
  score?: number;
  qualified: boolean;
  budget?: string;
  urgency?: string;
  project_type?: string;
  contact_preference?: string;
  created_at: Date;
  updated_at: Date;
}
```

**Tempo:** 2-3 horas

---

### 🔴 **PRIORIDADE MÁXIMA: Extrair Dados da Conversa**

**Problema atual:**
- Agente conversa mas não extrai dados estruturados
- Você precisa: nome, empresa, budget, urgência, score

**Solução necessária:**
```typescript
// Após cada resposta do agente, extrair dados:
async function extractLeadData(userId: string, conversation: string[]) {
  // Usar AI para extrair:
  // - Nome mencionado
  // - Empresa mencionada
  // - Budget mencionado
  // - Urgência mencionada
  // - Score de qualificação
}
```

**Tempo:** 3-4 horas

---

### 🟡 **PRIORIDADE ALTA: Dashboard Básico**

**O que precisa:**
- Lista de leads (nome, empresa, score, status)
- Métricas básicas (total, qualificados, hoje)
- **Exportar dados** (CSV/JSON para você usar)

**Tempo:** 4-5 horas

---

### 🟡 **PRIORIDADE ALTA: Notificações**

**Opção mais rápida: Telegram**
- Bot Telegram simples
- Enviar quando lead qualificado (score >= 70)
- Dados: nome, empresa, score, budget

**Tempo:** 2 horas

---

### 🟢 **PRIORIDADE MÉDIA: Múltiplas Contas**

**Viabilidade:** ✅ **TOTALMENTE POSSÍVEL**

**O que precisa:**
1. Configurar múltiplas páginas no Meta Developer
2. Gerar tokens para cada uma
3. Modificar webhook para identificar qual conta
4. Salvar `page_id` junto com lead

**Tempo:** 3-4 horas

**Complexidade:** Baixa (mesma API, só identificar conta)

---

### 🟢 **PRIORIDADE MÉDIA: Follow-up Automático**

**Viabilidade:** ✅ **POSSÍVEL**

**O que precisa:**
- Tabela de follow-ups
- Cron job (node-cron)
- Lógica de tentativas (3x)

**Tempo:** 4-5 horas

---

## 📊 TEMPO TOTAL DE EXECUÇÃO

### **Fase 1: Você Receber Dados (CRÍTICO)**
- Armazenamento de leads: **2-3h**
- Extração de dados: **3-4h**
- Dashboard básico: **4-5h**
- Notificações Telegram: **2h**

**Total Fase 1: 11-14 horas** (1.5-2 dias)

### **Fase 2: Multi-Conta + Follow-up**
- Múltiplas contas: **3-4h**
- Follow-up automático: **4-5h**

**Total Fase 2: 7-9 horas** (1 dia)

---

## 🔧 O QUE EU MUDARIA NO PLANO

### ❌ **NÃO usar Supabase agora**
**Motivo:** Adiciona complexidade desnecessária
**Solução:** SQLite já está funcionando, usar ele mesmo

### ✅ **Focar em Extração de Dados Primeiro**
**Motivo:** Você precisa dos dados para trabalhar
**Solução:** Extrair dados da conversa e salvar estruturado

### ✅ **Dashboard Simples (HTML + API)**
**Motivo:** Mais rápido que React/Vue
**Solução:** HTML simples com Tailwind CDN (como no exemplo)

### ✅ **Telegram > Email para Notificações**
**Motivo:** Mais rápido, mais direto
**Solução:** Bot Telegram simples

---

## 🎯 PLANO DE EXECUÇÃO RECOMENDADO

### **DIA 1: Você Receber Dados (Prioridade Máxima)**

1. **Manhã (3-4h):**
   - Criar tabela de leads no SQLite
   - Função para salvar lead após qualificação
   - Extrair dados da conversa (nome, empresa, budget, etc.)

2. **Tarde (3-4h):**
   - Dashboard básico (HTML + API)
   - Endpoint `/api/leads` para listar
   - Endpoint `/api/leads/export` para CSV

3. **Noite (2h):**
   - Notificação Telegram quando lead qualificado
   - Testar fluxo completo

**Resultado:** Você já recebe dados estruturados ✅

### **DIA 2: Multi-Conta + Follow-up**

1. **Manhã (3-4h):**
   - Configurar múltiplas contas
   - Modificar webhook para identificar conta
   - Testar com 2-3 contas

2. **Tarde (4-5h):**
   - Sistema de follow-up
   - Cron jobs
   - Testes

**Resultado:** Sistema completo funcionando ✅

---

## ⚠️ O QUE FALTA NA MINHA VISÃO

### **1. Extração de Dados Estruturados** 🔴

**Problema:**
- Agente conversa mas não extrai dados de forma estruturada
- Você precisa: nome, empresa, budget, urgência, score

**Solução:**
```typescript
// Após qualificação, extrair dados:
const leadData = {
  name: extractName(conversation),
  company: extractCompany(conversation),
  budget: extractBudget(conversation),
  urgency: extractUrgency(conversation),
  score: calculateScore(conversation),
  qualified: score >= 70
};

// Salvar no banco
await saveLead(leadData);
```

### **2. Armazenamento Persistente de Leads** 🔴

**Problema:**
- Sessões são salvas (conversas)
- Mas dados estruturados de leads NÃO são salvos

**Solução:**
- Criar tabela `leads` no SQLite
- Salvar após cada qualificação
- Permitir consulta e exportação

### **3. Formato de Dados para Você** 🔴

**Problema:**
- Você precisa receber dados em formato útil
- Precisa exportar para usar

**Solução:**
- Dashboard com lista de leads
- Export CSV/JSON
- Notificação com dados completos

---

## ✅ CONCLUSÃO: VIABILIDADE

**Status:** ✅ **TOTALMENTE VIÁVEL**

**Tempo total:** 18-23 horas (2.5-3 dias de trabalho focado)

**Prioridades:**
1. 🔴 **Armazenamento de leads** (você receber dados)
2. 🔴 **Extração de dados** (estruturar informações)
3. 🟡 **Dashboard** (visualizar leads)
4. 🟡 **Notificações** (alerta em tempo real)
5. 🟢 **Multi-conta** (escalar)
6. 🟢 **Follow-up** (automatizar)

**Recomendação:** Focar em Fase 1 primeiro (você receber dados), depois expandir.

---

**Próximo passo:** Implementar armazenamento de leads + extração de dados? 🚀


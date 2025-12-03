# 🚀 Checklist de Ativação - FlowCloser em Produção

## 🎯 Objetivo: Colocar o FlowCloser em USO REAL

---

## ✅ O que JÁ ESTÁ PRONTO

- ✅ Código completo e funcionando
- ✅ Build sem erros
- ✅ Deploy no Railway
- ✅ Health check funcionando
- ✅ Endpoints configurados

---

## ⚠️ O que FALTA para COLOCAR EM USO

### 1. 🔴 CRÍTICO: Aprovação do Meta

**Status:** ⏳ Aguardando aprovação

**O que fazer:**

- [ ] Verificar status da aprovação no Meta Developer Console
- [ ] Se rejeitado, corrigir e reenviar
- [ ] Se aprovado, continuar para próximo passo

**Link:** https://developers.facebook.com/apps/2706639773011042

---

### 2. 🔴 CRÍTICO: Configurar Webhooks no Meta

**Instagram Webhook:**
- [ ] Acessar Meta Developer Console
- [ ] Ir em **Produtos** → **Instagram** → **Configurações**
- [ ] Configurar Webhook:
  - URL: `https://flowcloser-agent-production.up.railway.app/api/webhooks/instagram`
  - Token: `flowcloser_webhook_neo`
  - Campo: `messages`
- [ ] Verificar se webhook está **ATIVO** (deve aparecer como verificado)

**WhatsApp Webhook:**
- [ ] Acessar WhatsApp Business Manager
- [ ] Configurar Webhook:
  - URL: `https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp`
  - Token: `flowcloser_webhook_neo`
  - Campo: `messages`
- [ ] Verificar se webhook está **ATIVO**

**Guia:** Ver `META_SIMPLIFICADO.md` ou `GUIA_META_STEP_BY_STEP.md`

---

### 3. 🔴 CRÍTICO: Testar Webhooks

**Teste Instagram:**
- [ ] Enviar mensagem para sua conta Instagram conectada
- [ ] Verificar logs do Railway: `railway logs`
- [ ] Verificar se bot respondeu
- [ ] Se não responder, verificar:
  - Webhook está ativo?
  - URL está correta?
  - Token está correto?

**Teste WhatsApp:**
- [ ] Enviar mensagem para número do WhatsApp Business
- [ ] Verificar logs do Railway
- [ ] Verificar se bot respondeu

---

### 4. 🟡 IMPORTANTE: Configurar Conversions API

**Status:** Código pronto, falta credenciais

**O que fazer:**
- [ ] Pegar Pixel ID (ver `COMO_PEGAR_PIXEL_ID.md`)
- [ ] Gerar Access Token (ver `META_SIMPLIFICADO.md`)
- [ ] Adicionar no Railway:
  - `META_PIXEL_ID` = seu pixel id
  - `META_ACCESS_TOKEN` = seu token
- [ ] Fazer redeploy
- [ ] Testar se eventos aparecem no Events Manager

**Não é crítico para funcionar, mas melhora ROI**

---

### 5. 🟡 IMPORTANTE: Conectar Conta Instagram

**O que fazer:**
- [ ] No Meta Developer Console, ir em **Instagram** → **Configurações**
- [ ] Conectar sua conta Instagram ao App
- [ ] Autorizar permissões necessárias
- [ ] Verificar se conta aparece como conectada

**Sem isso, o bot não recebe mensagens do Instagram**

---

### 6. 🟡 IMPORTANTE: Configurar Número WhatsApp Business

**O que fazer:**
- [ ] Criar conta WhatsApp Business (se não tiver)
- [ ] Verificar número no Meta Business Manager
- [ ] Conectar número ao App
- [ ] Configurar webhook (passo 2)

**Sem isso, o bot não recebe mensagens do WhatsApp**

---

### 7. 🟢 OPCIONAL: Monitoramento

**O que fazer:**
- [ ] Configurar alertas no Railway
- [ ] Verificar logs regularmente
- [ ] Monitorar métricas de conversão
- [ ] Acompanhar eventos no Meta Events Manager

---

## 🎯 Passo a Passo para ATIVAR AGORA

### Se Meta JÁ APROVOU:

1. **Configurar Webhooks** (15 minutos)
   - Instagram: Ver passo 2 acima
   - WhatsApp: Ver passo 2 acima

2. **Conectar Contas** (10 minutos)
   - Instagram: Ver passo 5 acima
   - WhatsApp: Ver passo 6 acima

3. **Testar** (5 minutos)
   - Enviar mensagem teste
   - Verificar resposta

4. **Configurar Conversions API** (10 minutos)
   - Pegar Pixel ID
   - Gerar Token
   - Adicionar no Railway

**Total: ~40 minutos para ativar completamente**

---

### Se Meta AINDA NÃO APROVOU:

1. **Verificar Status** (5 minutos)
   - Acessar Meta Developer Console
   - Ver status das permissões
   - Ver se há pendências

2. **Corrigir Pendências** (varia)
   - Se rejeitado, corrigir e reenviar
   - Se pendente, aguardar

3. **Quando Aprovar:**
   - Seguir passos acima

---

## 🔍 Como Verificar se Está FUNCIONANDO

### Teste 1: Health Check
```bash
curl https://flowcloser-agent-production.up.railway.app/health
```
**Esperado:** `{"status":"ok","timestamp":"..."}`

### Teste 2: Webhook Instagram (Verificação)
```bash
curl "https://flowcloser-agent-production.up.railway.app/api/webhooks/instagram?hub.mode=subscribe&hub.verify_token=flowcloser_webhook_neo&hub.challenge=test123"
```
**Esperado:** `test123`

### Teste 3: API Direta
```bash
curl -X POST https://flowcloser-agent-production.up.railway.app/api/agents/flowcloser/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Quero um site", "channel": "instagram"}'
```
**Esperado:** Resposta JSON com mensagem do bot

### Teste 4: Mensagem Real
- Enviar mensagem no Instagram/WhatsApp
- Verificar se bot responde
- Verificar logs no Railway

---

## 🚨 Problemas Comuns

### Bot não responde no Instagram
- ✅ Webhook está ativo?
- ✅ Conta Instagram conectada?
- ✅ Permissões aprovadas?
- ✅ Verificar logs do Railway

### Bot não responde no WhatsApp
- ✅ Número WhatsApp Business configurado?
- ✅ Webhook configurado?
- ✅ Token correto?
- ✅ Verificar logs do Railway

### Webhook não verifica
- ✅ URL está correta?
- ✅ Token está correto?
- ✅ Servidor está acessível?
- ✅ Health check funciona?

---

## 📊 Status Atual

**Código:** ✅ Pronto e funcionando
**Deploy:** ✅ No Railway
**Webhooks:** ⏳ Aguardando configuração no Meta
**Aprovação:** ⏳ Aguardando Meta
**Conversions API:** ⏳ Falta credenciais

---

## 🎯 Próximo Passo Imediato

1. **Verificar se Meta aprovou:**
   - https://developers.facebook.com/apps/2706639773011042
   - Ir em **App Review** → **Permissions and Features**

2. **Se aprovou:**
   - Configurar webhooks (passo 2)
   - Conectar contas (passos 5 e 6)
   - Testar (passo 3)

3. **Se não aprovou:**
   - Verificar pendências
   - Corrigir e reenviar
   - Aguardar aprovação

---

## ✅ Checklist Rápido

- [ ] Meta aprovou permissões?
- [ ] Webhook Instagram configurado e ativo?
- [ ] Webhook WhatsApp configurado e ativo?
- [ ] Conta Instagram conectada?
- [ ] Número WhatsApp Business configurado?
- [ ] Teste de mensagem funcionou?
- [ ] Bot respondeu corretamente?
- [ ] Logs aparecendo no Railway?
- [ ] Conversions API configurada? (opcional)

---

**Status:** Código pronto, aguardando configuração no Meta para ativar! 🚀


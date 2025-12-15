# 🐛 Troubleshooting - Twilio WhatsApp Não Responde

## ⚠️ Problema: Mensagem Enviada mas Sem Resposta

Se você enviou uma mensagem para `+1 415 523 8886` mas não recebeu resposta, vamos diagnosticar:

---

## 🔍 Diagnóstico Passo a Passo

### 1. Verificar se o Webhook Está Recebendo

**Teste manual do webhook:**

```bash
curl -X POST https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=whatsapp:+55628323110&Body=teste&MessageSid=SMtest123&MessageStatus=received"
```

**Resposta esperada:** `OK` (status 200)

Se retornar erro, o problema é no servidor.

---

### 2. Verificar Logs do Railway

```bash
# Login primeiro
railway login

# Ver logs
railway logs --tail
```

**Procure por:**
- `📨 WhatsApp Twilio message from +55628323110: [sua mensagem]` → Webhook recebeu
- `✅ WhatsApp Twilio Response: [resposta]` → Agente processou
- `✅ WhatsApp Twilio enviado: SM...` → Resposta enviada
- `❌ Erro ao enviar WhatsApp via Twilio` → Problema no envio

---

### 3. Verificar Configuração do Sandbox

**No console do Twilio:**

1. Vá em **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Vá na aba **"Sandbox settings"**
3. Verifique se o webhook está:
   - **When a message comes in**: `https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio`
   - **Status callback URL**: `https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio/status`
4. Clique em **"Save"** se fez alterações

---

### 4. Verificar Se Você Está Conectado ao Sandbox

**Importante:** Para receber mensagens do Sandbox, você precisa:

1. **Ter enviado o código de join:**
   - Envie `join shadow-horn.` para `+1 415 523 8886`
   - Você deve receber confirmação

2. **Verificar na página do Sandbox:**
   - Vá em **Messaging** → **Try it out** → **Send a WhatsApp message**
   - Na seção **"Sandbox Participants"**
   - Seu número deve aparecer: `whatsapp:+55628323110`

**Se não estiver conectado:**
- Envie `join shadow-horn.` para `+1 415 523 8886`
- Aguarde confirmação
- Tente novamente

---

### 5. Verificar Variáveis no Railway

```bash
railway variables | grep TWILIO
```

**Deve mostrar:**
- `TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- `TWILIO_AUTH_TOKEN=your_auth_token_here`
- `TWILIO_WHATSAPP_FROM=whatsapp:+14155238886`
- `WHATSAPP_PROVIDER=twilio`

---

## 🔧 Problemas Comuns e Soluções

### Problema 1: Webhook Não Recebe Mensagens

**Sintomas:**
- Mensagem enviada mas nada acontece
- Logs não mostram `📨 WhatsApp Twilio message`

**Soluções:**
1. Verifique se o webhook está correto no Twilio
2. Verifique se o servidor está online: `curl https://flowcloser-agent-production.up.railway.app/health`
3. Verifique se o webhook termina com `/twilio` (não apenas `/whatsapp/`)

---

### Problema 2: Webhook Recebe mas Não Responde

**Sintomas:**
- Logs mostram `📨 WhatsApp Twilio message`
- Mas não mostra `✅ WhatsApp Twilio enviado`

**Soluções:**
1. Verifique se `WHATSAPP_PROVIDER=twilio` no Railway
2. Verifique se todas as variáveis Twilio estão configuradas
3. Verifique os logs para erros específicos

---

### Problema 3: Erro ao Enviar Resposta

**Sintomas:**
- Logs mostram `❌ Erro ao enviar WhatsApp via Twilio`

**Soluções:**
1. Verifique se `TWILIO_WHATSAPP_FROM` está correto: `whatsapp:+14155238886`
2. Verifique se o número inclui o prefixo `whatsapp:`
3. Verifique se as credenciais estão corretas

---

### Problema 4: Sandbox Não Funciona

**Sintomas:**
- Mensagem não chega no webhook
- Twilio não envia para o webhook

**Soluções:**
1. Verifique se você enviou `join shadow-horn.` para o Sandbox
2. Verifique se seu número está na lista de participantes
3. Aguarde alguns minutos após enviar o join (pode demorar)

---

## 📱 Sandbox vs Número Real

### Twilio Sandbox (Atual)

**Vantagens:**
- ✅ Funciona imediatamente
- ✅ Sem aprovação de documentos
- ✅ Grátis para testes

**Limitações:**
- ⚠️ Apenas números que enviaram `join` podem receber mensagens
- ⚠️ Janela de 24 horas após última mensagem
- ⚠️ Número fixo: `+1 415 523 8886`

**Para usar:**
1. Envie `join shadow-horn.` para `+1 415 523 8886`
2. Aguarde confirmação
3. Envie mensagens normalmente

---

### Número WhatsApp Business Real (Produção)

**Vantagens:**
- ✅ Funciona com qualquer número
- ✅ Sem janela de 24 horas
- ✅ Número personalizado

**Limitações:**
- ⚠️ Requer aprovação de documentos
- ⚠️ Pode demorar dias/semanas
- ⚠️ Pode ter custos

**Para solicitar:**
1. Vá em **Messaging** → **Settings** → **WhatsApp senders**
2. Clique em **"Add new sender"**
3. Preencha o formulário
4. Aguarde aprovação

---

## 🧪 Teste Completo

### Passo 1: Verificar Servidor
```bash
curl https://flowcloser-agent-production.up.railway.app/health
```
Deve retornar: `{"status":"ok",...}`

### Passo 2: Testar Webhook Manualmente
```bash
curl -X POST https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=whatsapp:+55628323110&Body=teste&MessageSid=SMtest123&MessageStatus=received"
```

### Passo 3: Verificar Logs
```bash
railway logs --tail
```

### Passo 4: Enviar Mensagem Real
1. Envie `join shadow-horn.` para `+1 415 523 8886` (se ainda não fez)
2. Aguarde confirmação
3. Envie uma mensagem: `Olá, preciso de ajuda`
4. Verifique os logs

---

## 🎯 Próximos Passos

1. **Verifique os logs do Railway** para ver o que está acontecendo
2. **Teste o webhook manualmente** com o curl acima
3. **Confirme que enviou o join** para o Sandbox
4. **Se nada funcionar**, considere solicitar um número WhatsApp Business real

---

## 📞 Se Ainda Não Funcionar

Me envie:
1. O resultado do teste do webhook (curl)
2. Os logs do Railway (últimas 50 linhas)
3. Confirmação se enviou o `join shadow-horn.`

Com essas informações, consigo diagnosticar melhor o problema!


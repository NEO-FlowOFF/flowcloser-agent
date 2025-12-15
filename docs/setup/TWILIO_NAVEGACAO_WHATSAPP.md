# 🧭 Como Navegar até a Configuração do WhatsApp no Twilio

## ⚠️ Importante

A página que você está vendo é do serviço **Verify** (verificação de códigos), que é diferente do **WhatsApp Messaging**. Para o FlowCloser, precisamos configurar o WhatsApp.

---

## 📍 Passo a Passo para Configurar WhatsApp

### 1. **Sair da Página Atual**

- Clique em **"Twilio Home"** no topo esquerdo, OU
- Clique no menu lateral esquerdo em **"Account Dashboard"**

### 2. **Acessar Messaging**

No menu lateral esquerdo, procure por:

- **"Messaging"** ou **"SMS & Messaging"**
- Clique nele

### 3. **Configurar WhatsApp**

Você tem duas opções:

#### **Opção A: Twilio Sandbox (Para Testes Rápidos)**

1. Dentro de **Messaging**, procure por:
   - **"Try it out"** ou **"Sandbox"**
   - Ou **"Send a WhatsApp message"**
2. Siga as instruções para conectar seu número pessoal
3. O número do Sandbox será algo como: `whatsapp:+14155238886`

#### **Opção B: Número Verificado (Produção - Recomendado)**

1. Dentro de **Messaging**, vá em:
   - **"Settings"** → **"WhatsApp senders"**
   - Ou **"WhatsApp"** → **"Senders"**
2. Clique em **"Add new sender"** ou **"Request WhatsApp number"**
3. Preencha o formulário para solicitar um número WhatsApp Business
4. Após aprovação, você receberá um número no formato: `whatsapp:+5511999999999`

---

## 🔧 Configurar o Webhook (Após ter o Número)

1. Ainda em **Messaging** → **Settings** → **WhatsApp senders**
2. Clique no seu número WhatsApp configurado
3. Role até **"Webhook Configuration"** ou **"A message comes in"**
4. Configure:
   - **When a message comes in**: 
     ```
     https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio
     ```
   - **Status callback URL** (opcional):
     ```
     https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio/status
     ```
5. Clique em **"Save"**

---

## 🎯 Resumo da Navegação

```
Twilio Home
  └─ Messaging (menu lateral)
      └─ Settings → WhatsApp senders
          └─ [Seu número WhatsApp]
              └─ Webhook Configuration
```

---

## ⚠️ Diferença: Verify vs WhatsApp

| Serviço | Para que serve | Usamos no FlowCloser? |
|---------|----------------|----------------------|
| **Verify** | Enviar códigos de verificação (2FA, OTP) | ❌ Não |
| **WhatsApp Messaging** | Enviar/receber mensagens WhatsApp | ✅ Sim |

---

## 📝 Próximos Passos Após Configurar

1. ✅ Número WhatsApp configurado
2. ✅ Webhook configurado
3. ✅ Variáveis de ambiente no `.env` (já fez)
4. 🧪 Testar enviando uma mensagem

---

## 🐛 Se Não Encontrar a Opção

Se você não vê **"Messaging"** ou **"WhatsApp senders"**:

1. Verifique se sua conta está ativa (não apenas trial)
2. Procure por **"Products"** no menu e depois **"Messaging"**
3. Ou acesse diretamente: `https://console.twilio.com/us1/develop/sms`

---

## 🔗 Links Diretos

- **WhatsApp Senders**: https://console.twilio.com/us1/develop/sms/whatsapp/senders
- **Messaging Settings**: https://console.twilio.com/us1/develop/sms/settings/general
- **Account Dashboard**: https://console.twilio.com/us1/home


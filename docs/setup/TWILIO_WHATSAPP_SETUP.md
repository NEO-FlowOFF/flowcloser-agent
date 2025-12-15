# 📱 Configuração do Twilio WhatsApp

Este guia explica como configurar o Twilio WhatsApp para usar com o FlowCloser.

## 📋 Pré-requisitos

1. Conta no Twilio (crie em: https://www.twilio.com/try-twilio)
2. Número de WhatsApp aprovado no Twilio (Sandbox ou número verificado)

## 🔧 Passo 1: Obter Credenciais do Twilio

1. Acesse o [Console do Twilio](https://console.twilio.com/)
2. No dashboard, você encontrará:
   - **Account SID**: Começa com `AC...`
   - **Auth Token**: Token de autenticação (clique em "show" para revelar)

## 📞 Passo 2: Configurar Número WhatsApp

### Opção A: Usar Twilio Sandbox (Teste)

1. No console do Twilio, vá em **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Siga as instruções para conectar seu número pessoal ao Sandbox
3. O número do Sandbox será algo como: `whatsapp:+14155238886`

### Opção B: Número Verificado (Produção)

1. No console, vá em **Messaging** → **Settings** → **WhatsApp senders**
2. Solicite um número WhatsApp Business verificado
3. Após aprovação, você receberá um número no formato: `whatsapp:+5511999999999`

## 🔐 Passo 3: Configurar Variáveis de Ambiente

Adicione as seguintes variáveis no seu arquivo `.env`:

```env
# === TWILIO WHATSAPP ===
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+5511999999999

# Provedor preferido: 'twilio' ou 'meta' (padrão: 'meta' se ambos estiverem configurados)
WHATSAPP_PROVIDER=twilio
```

**Importante:**
- O `TWILIO_WHATSAPP_FROM` deve incluir o prefixo `whatsapp:` (ex: `whatsapp:+5511999999999`)
- Se você configurar ambos Twilio e Meta, use `WHATSAPP_PROVIDER` para escolher qual usar

## 🌐 Passo 4: Configurar Webhook no Twilio

1. No console do Twilio, vá em **Messaging** → **Settings** → **WhatsApp senders**
2. Clique no seu número WhatsApp
3. Em **Webhook Configuration**, configure:
   - **When a message comes in**: `https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio`
   - **Status callback URL** (opcional): `https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio/status`

**Para desenvolvimento local:**
- Use ngrok ou similar para expor sua aplicação local
- Exemplo: `https://abc123.ngrok.io/api/webhooks/whatsapp/twilio`

## ✅ Passo 5: Testar Configuração

### Teste Manual

Envie uma mensagem para o número do Twilio configurado. O sistema deve:
1. Receber a mensagem no webhook
2. Processar com o agente FlowCloser
3. Enviar resposta de volta via Twilio

### Verificar Logs

```bash
# Verificar se o Twilio está configurado
npm run dev

# Você deve ver:
# ✅ WhatsApp Twilio enviado: SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔄 Alternando entre Twilio e Meta

O sistema suporta ambos os provedores simultaneamente. Para alternar:

1. **Usar Twilio:**
   ```env
   WHATSAPP_PROVIDER=twilio
   ```

2. **Usar Meta:**
   ```env
   WHATSAPP_PROVIDER=meta
   ```

3. **Detecção automática:**
   - Se `WHATSAPP_PROVIDER` não estiver definido, o sistema usa o primeiro provedor configurado
   - Prioridade: Twilio → Meta

## 📊 Endpoints Disponíveis

- **Webhook de mensagens**: `POST /api/webhooks/whatsapp/twilio`
- **Status callbacks**: `POST /api/webhooks/whatsapp/twilio/status`

## 🐛 Troubleshooting

### Erro: "Twilio não configurado"
- Verifique se todas as variáveis `TWILIO_*` estão no `.env`
- Certifique-se de que o arquivo `.env` está sendo carregado

### Erro: "Invalid phone number"
- Certifique-se de que o número inclui o prefixo `whatsapp:`
- Formato correto: `whatsapp:+5511999999999`

### Webhook não recebe mensagens
- Verifique se a URL do webhook está correta no console do Twilio
- Certifique-se de que a aplicação está acessível publicamente
- Verifique os logs do servidor para erros

### Mensagens não são enviadas
- Verifique se o número está aprovado no Twilio
- No Sandbox, certifique-se de enviar a mensagem de join primeiro
- Verifique os logs para erros específicos do Twilio

## 📚 Recursos Adicionais

- [Documentação Twilio WhatsApp](https://www.twilio.com/docs/whatsapp)
- [Twilio Console](https://console.twilio.com/)
- [Twilio Sandbox Guide](https://www.twilio.com/docs/whatsapp/sandbox)


# 🛠️ Twilio WhatsApp - Modo Desenvolvedor (Sem Aprovação de Documentos)

Para desenvolvedores que querem testar e desenvolver sem passar pelo processo de aprovação de documentos no dashboard.

## 🎯 Opções Disponíveis

### ✅ Opção 1: Twilio Sandbox (Recomendado para Desenvolvimento)

**Vantagens:**

- ✅ **Sem aprovação de documentos** necessária
- ✅ Funciona imediatamente
- ✅ Grátis para testes
- ✅ Pode usar via API/CLI normalmente

**Limitações:**

- ⚠️ Apenas números pré-aprovados podem receber mensagens
- ⚠️ Precisa enviar código de join para o Sandbox primeiro
- ⚠️ Número do Sandbox é fixo (ex: `whatsapp:+14155238886`)

**Como configurar:**

1. **Via Dashboard (uma vez só):**
   - Vá em **Messaging** → **Try it out** → **Send a WhatsApp message**
   - Envie o código de join para o número do Sandbox
   - Conecte seu número pessoal ao Sandbox

2. **Depois disso, use via API normalmente:**

   ```bash
   # O número do Sandbox já está configurado
   # Basta usar nas variáveis de ambiente
   ```

3. **Configurar no `.env`:**

   ```env
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   # (ou o número que aparecer no Sandbox)
   ```

---

### ✅ Opção 2: Usar API Diretamente (Sem Dashboard)

Você pode configurar tudo via código/API, mas ainda precisa:

1. **Ter um número WhatsApp aprovado** (isso requer aprovação)
2. **OU usar o Sandbox** (não requer aprovação)

**Exemplo de código para configurar webhook via API:**

```typescript
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Configurar webhook via API (se o número já estiver aprovado)
async function configureWebhook(phoneNumberSid: string) {
  await client.incomingPhoneNumbers(phoneNumberSid).update({
    smsUrl: "https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio",
    statusCallback: "https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio/status",
  });
}
```

**Mas atenção:** Isso só funciona se você já tiver um número aprovado.

---

### ✅ Opção 3: Usar Twilio CLI

Você pode gerenciar tudo via CLI:

```bash
# Instalar Twilio CLI
npm install -g twilio-cli

# Login
twilio login

twilio status

# Listar números WhatsApp
twilio api:core:incoming-phone-numbers:list

# Configurar webhook via CLI
twilio api:core:incoming-phone-numbers:update \
  --sid PN6065f2beefa93a5de3ae4cb96c1ca302 \
  --sms-url "https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio"
```

**Mas ainda precisa:** Ter um número aprovado primeiro.

---

## 🎯 Recomendação para Desenvolvimento

### Para Desenvolvimento/Testes (Agora):

**Use o Twilio Sandbox:**
1. Configure uma vez no dashboard (só para conectar seu número)
2. Depois use normalmente via API
3. Sem necessidade de aprovação de documentos

**Passos:**
1. Vá em **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Envie o código de join para o número do Sandbox (ex: `join <código>`)
3. Anote o número do Sandbox (ex: `whatsapp:+14155238886`)
4. Configure no `.env`:
   ```env
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   ```
5. Pronto! Pode usar via API normalmente

### Para Produção (Depois):

Quando precisar de produção:
1. Solicite número WhatsApp Business verificado
2. Aí sim precisará de aprovação de documentos
3. Mas para desenvolvimento, o Sandbox é suficiente

---

## 📝 Configuração Atual do Seu Projeto

Você já tem configurado:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+17575749737
```

**Pergunta:** O número `+17575749737` é:
- ✅ Um número do Sandbox? → Funciona imediatamente
- ⚠️ Um número que você solicitou? → Precisa de aprovação

---

## 🔍 Como Verificar se é Sandbox

1. No console, vá em **Messaging** → **Try it out**
2. Veja qual número aparece lá
3. Se for `+17575749737`, é Sandbox e já funciona!

---

## 🚀 Próximos Passos

### Se for Sandbox:
1. ✅ Configure o webhook (pode fazer via dashboard ou API)
2. ✅ Teste enviando uma mensagem
3. ✅ Pronto para desenvolvimento!

### Se não for Sandbox:
1. ⚠️ Use o Sandbox para desenvolvimento
2. ⚠️ Solicite número verificado quando precisar de produção
3. ⚠️ Aí sim precisará de aprovação

---

## 💡 Dica

**Para desenvolvimento, o Sandbox é perfeito:**
- Funciona imediatamente
- Sem burocracia
- Pode testar tudo
- Quando precisar de produção, aí sim solicita aprovação

**O código que você já tem funciona igual para Sandbox ou número verificado!** A diferença é só o número usado.


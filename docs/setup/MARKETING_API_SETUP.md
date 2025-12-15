# 📊 Setup da Meta Conversions API - FlowCloser

## 🎯 Por que Implementar?

A **Conversions API** do Meta permite:
- ✅ Rastrear quando leads fecham vendas
- ✅ Otimizar anúncios automaticamente (Meta aprende quais anúncios geram vendas)
- ✅ Reduzir CAC em 20-40%
- ✅ Retargeting inteligente de leads qualificados
- ✅ Attribution completa (saber qual anúncio gerou a venda)

---

## 📋 Passo a Passo de Configuração

### ⚡ Guia Simplificado

**📖 Se a interface do Meta estiver confusa, veja `META_SIMPLIFICADO.md` para guia ultra-direto**

### 1. Criar Pixel no Meta (se não tiver)

**📖 Guia Completo:** Veja `COMO_PEGAR_PIXEL_ID.md` para passo a passo detalhado

**Resumo rápido:**
1. Acesse: https://business.facebook.com/events_manager2
2. Clique em **Conectar dados** → **Web**
3. Selecione **Conversions API**
4. Clique em **Criar Pixel**
5. Dê um nome: `FlowCloser Pixel`
6. **COPIE O PIXEL ID** (número longo de 15-16 dígitos)
   - Exemplo: `123456789012345`

**💡 Dica:** Se não encontrar, use Ctrl+F e procure por "Pixel" ou "Conectar dados"

### 2. Obter Access Token

**Método 1 (Recomendado):**

1. No Meta Developer Console: https://developers.facebook.com/apps/
2. Selecione seu App (`2706639773011042`)
3. No menu lateral, procure **Tools** ou **Ferramentas**
4. Clique em **Conversions API**
5. Clique em **Generate Access Token** ou **Gerar Token**
6. **COPIE O TOKEN** (você só verá uma vez!)
7. Selecione permissões:
   - ✅ `ads_management`
   - ✅ `business_management`

**Método 2 (Alternativo):**
1. Vá em: https://business.facebook.com/settings/system-users
2. Crie um System User (se não tiver)
3. Clique em **Generate New Token**
4. Selecione seu Pixel
5. Marque permissões: `ads_management`, `business_management`
6. **COPIE O TOKEN**

**💡 Dica:** Use Ctrl+F e procure por "Token" ou "Conversions"

### 3. Adicionar Variáveis no Railway

Adicione ao `railway-variables.json`:

```json
{
  "META_PIXEL_ID": "seu_pixel_id_aqui",
  "META_ACCESS_TOKEN": "seu_access_token_aqui"
}
```

Ou adicione manualmente no Railway:

- `META_PIXEL_ID` = seu Pixel ID
- `META_ACCESS_TOKEN` = seu Access Token

---

## 🚀 Eventos Rastreados Automaticamente

O sistema já está configurado para rastrear:

### 1. Lead Qualificado
**Quando:** Tool `qualify_lead` é usada
**Evento:** `Lead`
**Dados:** Intent, budget, timeline, pain points

### 2. Visualização de Portfólio
**Quando:** Link do Canva é enviado
**Evento:** `ViewContent`
**Dados:** Tipo de conteúdo (portfolio)

### 3. Início de Checkout
**Quando:** Lead vai para WhatsApp
**Evento:** `InitiateCheckout`
**Dados:** Canal, método (whatsapp)

### 4. Venda Fechada
**Quando:** Lead fecha no WhatsApp (manual ou via webhook)
**Evento:** `Purchase`
**Dados:** Valor, moeda, canal

---

## 📝 Como Usar Manualmente

### Rastrear Venda Fechada

```typescript
import { trackPurchase } from "./agents/flowcloser/conversions.js";

// Quando lead fecha no WhatsApp
await trackPurchase(
  "user_12345",
  "whatsapp",
  5000, // valor da venda
  "BRL",
  {
    email: "lead@email.com",
    phone: "+5511999999999",
    name: "João Silva"
  }
);
```

### Rastrear Lead Qualificado

```typescript
import { trackLeadQualified } from "./agents/flowcloser/conversions.js";

await trackLeadQualified(
  "user_12345",
  "instagram",
  {
    email: "lead@email.com",
    phone: "+5511999999999",
    name: "Maria"
  }
);
```

---

## ✅ Verificar se Está Funcionando

1. **Events Manager:**
   - Acesse: https://business.facebook.com/events_manager2
   - Selecione seu Pixel
   - Vá em **Test Events**
   - Envie uma mensagem para o bot
   - Você deve ver eventos aparecendo em tempo real

2. **Logs do Servidor:**
   - Procure por: `✅ Conversão rastreada: Lead`
   - Se aparecer, está funcionando!

---

## 🎯 ROI Esperado

| Métrica | Antes | Depois Conversions API |
|---------|-------|------------------------|
| **CAC** | R$ 100 | R$ 60-80 (-20 a -40%) |
| **Taxa de Conversão** | 15% | 18-20% (+15 a +30%) |
| **Otimização** | Manual | Automática |
| **Attribution** | Incompleta | Completa |

---

## 🔧 Troubleshooting

### Eventos não aparecem no Events Manager

1. Verifique se `META_PIXEL_ID` está correto
2. Verifique se `META_ACCESS_TOKEN` tem permissões corretas
3. Verifique logs do servidor para erros
4. Teste manualmente com `trackLeadQualified()`

### Erro 401 (Unauthorized)

- Token expirado ou inválido
- Gere novo token no Developer Console
- Verifique se tem permissões `ads_management`

### Erro 400 (Bad Request)

- Pixel ID incorreto
- Formato de dados inválido
- Verifique logs para detalhes do erro

---

## 📚 Documentação

- **Conversions API:** https://developers.facebook.com/docs/marketing-api/conversions-api
- **Events Manager:** https://business.facebook.com/events_manager2
- **Test Events:** https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api#testEvents

---

## ✅ Checklist de Implementação

- [ ] Pixel criado no Meta
- [ ] Access Token gerado
- [ ] Variáveis adicionadas no Railway
- [ ] Redeploy feito
- [ ] Teste de evento enviado
- [ ] Evento apareceu no Events Manager
- [ ] Logs confirmando rastreamento

---

**Status:** ✅ Código implementado e pronto para configurar credenciais!


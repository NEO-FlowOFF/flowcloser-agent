# 🎯 Meta - Guia Simplificado (Sem Enrolação)

## ⚡ O que você REALMENTE precisa (só 2 coisas):

1. **Pixel ID** (número longo)
2. **Access Token** (texto longo que começa com letras)

---

## 📍 PASSO 1: Pegar Pixel ID (2 minutos)

### Opção A: Se você JÁ TEM um Pixel
1. Vá em: https://business.facebook.com/events_manager2
2. Clique no primeiro Pixel da lista
3. **COPIE O NÚMERO** que aparece no topo (exemplo: `123456789012345`)

### Opção B: Se você NÃO TEM Pixel
1. Vá em: https://business.facebook.com/events_manager2
2. Clique no botão verde **"Conectar dados"** (ou "Connect Data")
3. Escolha **"Web"**
4. Escolha **"Conversions API"**
5. Clique em **"Criar"** (ou "Create")
6. **COPIE O NÚMERO** que aparece

**✅ Pronto! Você tem o Pixel ID**

---

## 📍 PASSO 2: Pegar Access Token (3 minutos)

### Método Mais Simples:

1. Vá em: https://developers.facebook.com/apps/
2. Clique no seu App (o que tem ID `2706639773011042`)
3. No menu lateral esquerdo, procure por **"Tools"** ou **"Ferramentas"**
4. Clique em **"Conversions API"**
5. Se aparecer um botão **"Generate Token"** ou **"Gerar Token"**, clique nele
6. **COPIE O TOKEN** (é um texto longo, começa com letras)

### Se não encontrar "Conversions API":

1. Ainda no Developer Console
2. No menu lateral, procure **"Settings"** ou **"Configurações"**
3. Clique em **"Basic"** ou **"Básico"**
4. Role até encontrar **"Access Tokens"** ou **"Tokens de Acesso"**
5. Clique em **"Generate Token"** ou **"Gerar Token"**
6. Selecione permissões:
   - ✅ `ads_management`
   - ✅ `business_management`
7. **COPIE O TOKEN**

**✅ Pronto! Você tem o Access Token**

---

## 🚨 Se AINDA não conseguir encontrar:

### Pixel ID - Método Alternativo:
1. Vá em: https://business.facebook.com/adsmanager
2. No menu lateral, clique em **"Events Manager"**
3. Na lista, clique no primeiro item (seu Pixel)
4. O número aparece no topo

### Access Token - Método Alternativo:
1. Vá em: https://business.facebook.com/settings/system-users
2. Se você tem um System User, clique nele
3. Vá em **"Generate New Token"**
4. Selecione o Pixel que você criou
5. Marque as permissões: `ads_management`, `business_management`
6. **COPIE O TOKEN**

---

## ✅ Depois de Pegar os 2:

### Adicionar no Railway:

1. Acesse seu projeto no Railway
2. Vá em **Variables**
3. Adicione 2 variáveis:

**Variável 1:**
- Nome: `META_PIXEL_ID`
- Valor: `seu_pixel_id_aqui` (cole o número)

**Variável 2:**
- Nome: `META_ACCESS_TOKEN`
- Valor: `seu_token_aqui` (cole o token)

4. Clique em **Save**
5. Faça **Redeploy**

---

## 🎯 Resumo Ultra-Rápido:

```
1. Events Manager → Copiar número (Pixel ID)
2. Developer Console → Tools → Conversions API → Gerar Token
3. Railway → Adicionar 2 variáveis
4. Redeploy
```

**Tempo total: 5-10 minutos**

---

## 💡 Dica Pro:

Se a interface do Meta estiver confusa (e geralmente está), use **Ctrl+F** (ou Cmd+F no Mac) para procurar:
- "Pixel" → para encontrar Pixel ID
- "Token" → para encontrar Access Token
- "Conversions" → para encontrar Conversions API

---

## 🆘 Se NADA funcionar:

**Pixel ID:**
- Pode usar qualquer Pixel que você já tenha
- Ou criar um novo só para isso

**Access Token:**
- Se não conseguir gerar, pode usar um token temporário primeiro
- Depois você gera um permanente

**O importante é:** Ter os 2 valores para colar no Railway. O resto você ajusta depois.

---

**Foco:** Pegar 2 valores e colar no Railway. É só isso! 🎯


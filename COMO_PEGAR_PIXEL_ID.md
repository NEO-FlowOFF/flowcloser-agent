# 🎯 Como Pegar o Pixel ID do Meta - Passo a Passo

## 📍 Método 1: Via Events Manager (Recomendado)

### Passo 1: Acessar Events Manager
1. Acesse: **https://business.facebook.com/events_manager2**
2. Faça login com sua conta do Facebook Business

### Passo 2: Selecionar ou Criar Pixel

**Se você JÁ TEM um Pixel:**
- Na lista de **Pixels**, clique no seu Pixel
- O **Pixel ID** aparece no topo da página (exemplo: `123456789012345`)

**Se você NÃO TEM um Pixel:**
1. Clique em **Conectar dados** (botão verde no topo)
2. Selecione **Web**
3. Selecione **Conversions API**
4. Clique em **Criar Pixel**
5. Dê um nome: `FlowCloser Pixel` (ou qualquer nome)
6. Clique em **Criar**
7. O **Pixel ID** será exibido (exemplo: `123456789012345`)

### Passo 3: Copiar o Pixel ID
- O Pixel ID é um número longo (geralmente 15-16 dígitos)
- Exemplo: `123456789012345`
- **COPIE ESSE NÚMERO** - você vai precisar dele!

---

## 📍 Método 2: Via Meta Developer Console

### Passo 1: Acessar Developer Console
1. Acesse: **https://developers.facebook.com/apps/**
2. Selecione seu App (`2706639773011042`)

### Passo 2: Ir para Conversions API
1. No menu lateral, clique em **Tools**
2. Clique em **Conversions API**
3. Se você já tem um Pixel, o ID aparecerá aqui
4. Se não tem, clique em **Create Pixel** e siga as instruções

---

## 📍 Método 3: Via Ads Manager

### Passo 1: Acessar Ads Manager
1. Acesse: **https://business.facebook.com/adsmanager**
2. No menu lateral, clique em **Events Manager**

### Passo 2: Encontrar Pixel
- Na lista de **Data Sources**, encontre seu Pixel
- Clique nele
- O **Pixel ID** aparece no topo

---

## ✅ Onde Usar o Pixel ID?

Depois de pegar o Pixel ID, adicione no Railway:

### Opção 1: Via Interface do Railway
1. Acesse seu projeto no Railway
2. Vá em **Variables**
3. Clique em **New Variable**
4. Nome: `META_PIXEL_ID`
5. Valor: `seu_pixel_id_aqui` (cole o número que você copiou)
6. Clique em **Add**

### Opção 2: Via JSON (se usar import)
Adicione ao seu arquivo de variáveis:
```json
{
  "META_PIXEL_ID": "123456789012345"
}
```

---

## 🔍 Como Identificar o Pixel ID?

O Pixel ID é sempre:
- ✅ Um número longo (15-16 dígitos)
- ✅ Apenas números (sem letras ou caracteres especiais)
- ✅ Exemplo: `123456789012345` ou `987654321098765`

**NÃO é:**
- ❌ O nome do Pixel (ex: "FlowCloser Pixel")
- ❌ O Access Token (começa com letras)
- ❌ O App ID (já temos: `2706639773011042`)

---

## 📸 Onde Aparece Visualmente?

No Events Manager, o Pixel ID aparece assim:

```
┌─────────────────────────────────────┐
│  FlowCloser Pixel                   │
│  Pixel ID: 123456789012345          │ ← ESTE É O NÚMERO QUE VOCÊ PRECISA
│  Status: Active                     │
└─────────────────────────────────────┘
```

---

## 🚨 Problemas Comuns

### "Não vejo nenhum Pixel"
- Você precisa criar um primeiro
- Siga o **Método 1** e clique em **Criar Pixel**

### "Vejo vários Pixels, qual usar?"
- Use o Pixel da sua conta Business principal
- Ou crie um novo especificamente para o FlowCloser

### "O número não funciona"
- Certifique-se de copiar apenas os números
- Não inclua espaços ou caracteres especiais
- Deve ter 15-16 dígitos

---

## ✅ Checklist

- [ ] Acessei o Events Manager
- [ ] Encontrei ou criei um Pixel
- [ ] Copiei o Pixel ID (número longo)
- [ ] Adicionei como `META_PIXEL_ID` no Railway
- [ ] Verifiquei que são apenas números

---

## 🎯 Próximo Passo

Depois de pegar o Pixel ID, você precisa do **Access Token**:
- Veja o arquivo `MARKETING_API_SETUP.md` para obter o Access Token

---

**Link Direto:** https://business.facebook.com/events_manager2


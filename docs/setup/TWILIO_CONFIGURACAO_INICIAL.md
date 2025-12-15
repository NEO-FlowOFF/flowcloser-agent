# ⚙️ Configuração Inicial do Twilio - General Messaging Settings

Este guia explica como configurar as opções de "General Messaging Settings" no Twilio para o FlowCloser.

## 📋 Recomendações por Opção

### 1. **Alphanumeric Sender ID**

**Status:** Disabled (padrão)

**O que é:** Permite enviar mensagens SMS com um nome de marca (ex: "FLOWCLOSER") ao invés de um número de telefone.

**Recomendação:** 

- ✅ **Deixe Disabled** por enquanto
- Só é útil para SMS (não WhatsApp)
- Requer upgrade da conta
- Para WhatsApp, você já tem um número verificado

---

### 2. **MMS Converter**

**Status:** Enabled (recomendado)

**O que é:** Converte MMS em SMS com link quando o provedor não suporta MMS.

**Recomendação:**

- ✅ **Deixe Enabled** (padrão)
- Útil se você enviar mídia (imagens, vídeos) via SMS
- Para WhatsApp, não é necessário (WhatsApp suporta mídia nativamente)
- Não causa problemas se deixar habilitado

---

### 3. **Compliance Toolkit Settings**

**Status:** Disabled (padrão)

**O que é:** Ferramenta de IA para ajudar com compliance e regulamentações locais.

**Recomendação:**

- ⚠️ **Deixe Disabled** por enquanto
- É um produto Beta com custos adicionais
- Só ative se precisar de ajuda com compliance específico
- Para uso básico de WhatsApp, não é necessário

---

### 4. **SMS Pumping Protection**

**Status:** Enabled (recomendado)

**O que é:** Proteção automática contra fraudes de SMS pumping (tentativas de gerar custos fraudulentos).

**Recomendação:**

- ✅ **Deixe Enabled** (padrão)
- **Importante:** Protege sua conta contra fraudes
- Para EUA e Canadá é grátis
- Não afeta o funcionamento normal
- **Recomendado manter habilitado**

---

### 5. **HTTP Basic Authentication for media access**

**Status:** Disabled (padrão)

**O que é:** Protege mídia (imagens, áudios) armazenada no Twilio exigindo autenticação para acessar.

**Recomendação:**

- ✅ **Recomendado: Enabled**
- Protege dados sensíveis (fotos de leads, etc.)
- Requer Account SID e Auth Token para acessar mídia
- **Importante para privacidade de dados**
- Pode ativar depois se preferir

**Como funciona:**

- Com Enabled: URLs de mídia exigem autenticação
- Com Disabled: Qualquer pessoa com a URL pode acessar

---

### 6. **Phone number redaction**

**Status:** Disponível sob solicitação

**O que é:** Ofusca os últimos 4 dígitos de números de telefone antes de armazenar.

**Recomendação:**

- ⚠️ **Não necessário agora**
- Só ative se tiver requisitos específicos de privacidade
- Requer solicitação via formulário

---

### 7. **Message Body Redaction**
**Status:** Disponível sob solicitação

**O que é:** Remove o conteúdo das mensagens antes de armazenar (apenas metadados são mantidos).

**Recomendação:**

- ⚠️ **Não necessário agora**
- Útil para compliance extremo (ex: HIPAA)
- Remove o conteúdo das mensagens (você não conseguirá ver o histórico)
- Só ative se tiver requisitos regulatórios específicos

---

### 8. **Message Records Data Access and Backup**

**Status:** 400 dias (padrão)

**O que é:** Define por quanto tempo você pode acessar mensagens via Console e API.

**Recomendação:**

- ✅ **Deixe 400 dias** (padrão)
- Ou ajuste para **30-90 dias** se quiser economizar espaço
- Mensagens mais antigas ainda ficam disponíveis via Bulk Export (backup grátis)
- Para qualificação de leads, 90 dias geralmente é suficiente

**Opções:**

- **7 dias:** Mínimo (muito curto para leads)
- **30-90 dias:** Bom para uso geral
- **400 dias:** Padrão (recomendado se não tiver restrições)

**Nota importante:**

- Mídia (imagens, áudios) é deletada 30 dias após o período de acesso
- Dados podem persistir no backend do Twilio por até 30 dias após o período

---

### 9. **Turn Off Backup Storage**

**Status:** Backup habilitado (padrão)

**O que é:** Backup grátis e ilimitado das suas mensagens.

**Recomendação:**

- ✅ **Deixe habilitado** (NÃO desative)
- Backup é **grátis** e **ilimitado**
- Permite download via Bulk Export
- Útil para análise de leads e histórico
- **Nunca desative a menos que tenha certeza absoluta**

---

## ✅ Configuração Recomendada Final

Para o FlowCloser, recomendo:

| Opção | Configuração | Motivo |
|-------|-------------|--------|
| Alphanumeric Sender ID | **Disabled** | Não necessário para WhatsApp |
| MMS Converter | **Enabled** | Não causa problemas, pode ser útil |
| Compliance Toolkit | **Disabled** | Não necessário para uso básico |
| SMS Pumping Protection | **Enabled** | Proteção importante contra fraudes |
| HTTP Basic Auth | **Enabled** | Protege dados sensíveis |
| Phone Number Redaction | **Não ativar** | Não necessário agora |
| Message Body Redaction | **Não ativar** | Remove histórico (não recomendado) |
| Data Access Period | **90-400 dias** | 90 dias é suficiente, 400 é padrão |
| Backup Storage | **Habilitado** | Grátis e útil |

---

## 🎯 Configuração Mínima Recomendada

Se quiser manter simples:

1. ✅ **SMS Pumping Protection: Enabled** (proteção)
2. ✅ **HTTP Basic Auth: Enabled** (privacidade)
3. ✅ **Data Access: 90 dias** (ou 400 se preferir)
4. ✅ **Backup: Habilitado** (sempre)
5. ⚠️ **Resto: Padrão** (deixe como está)

---

## 📝 Próximos Passos

Após configurar essas opções:

1. Configure o número WhatsApp (se ainda não fez)
2. Configure o webhook: `https://flowcloser-agent-production.up.railway.app/api/webhooks/whatsapp/twilio`
3. Teste enviando uma mensagem

---

## 🔗 Referências

- [Twilio Messaging Settings](https://console.twilio.com/us1/develop/sms/settings/general)
- [Twilio Security Best Practices](https://www.twilio.com/docs/usage/best-practices/security)


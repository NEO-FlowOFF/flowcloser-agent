# 🔒 Valores para Preencher no GitHub Ruleset

## 📝 Preencha Exatamente Assim:

---

### 1. Ruleset Name
```
FlowCloser Production Protection
```

---

### 2. Enforcement status
**Selecione:** `Active`

---

### 3. Bypass list
**Deixe vazio** (ou adicione "Administrators" se quiser poder fazer hotfixes diretos)

---

### 4. Target branches

**Clique em:** `Add rule`

**Selecione:** `Branch name pattern`

**Digite:** `main`

**Clique em:** `Add`

---

### 5. Rules

Marque **APENAS** estas opções:

#### ✅ Restrict creations
- **Marcar:** ✅ (checkbox marcado)

#### ✅ Restrict updates
- **Marcar:** ✅ (checkbox marcado)

#### ✅ Restrict deletions
- **Marcar:** ✅ (checkbox marcado)

#### ❌ Require linear history
- **NÃO marcar** (deixar desmarcado)

#### ❌ Require deployments to succeed
- **NÃO marcar** (deixar desmarcado por enquanto)

#### ❌ Require signed commits
- **NÃO marcar** (deixar desmarcado)

#### ✅ Require a pull request before merging
- **Marcar:** ✅ (checkbox marcado)
- **Abaixo, configure:**
  - **Require approvals:** `1`
  - **Dismiss stale pull request approvals when new commits are pushed:** ✅ (marcar)
  - **Require review from Code Owners:** ❌ (deixar desmarcado)
  - **Require last push approval:** ❌ (deixar desmarcado)

#### ⚠️ Require status checks to pass
- **Marcar:** ✅ (se você tiver GitHub Actions configurado)
- **Se marcar:** Deixe a lista vazia por enquanto (pode adicionar depois)

#### ✅ Block force pushes
- **Marcar:** ✅ (checkbox marcado)

#### ❌ Require code scanning results
- **NÃO marcar** (deixar desmarcado)

#### ❌ Require code quality results
- **NÃO marcar** (deixar desmarcado)

#### ❌ Automatically request Copilot code review
- **NÃO marcar** (deixar desmarcado)

---

## ✅ Resumo Visual

```
┌─────────────────────────────────────────┐
│ Ruleset Name                            │
│ FlowCloser Production Protection        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Enforcement status                      │
│ ● Active                                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Bypass list                             │
│ [vazio]                                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Target branches                         │
│ Branch name pattern: main               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Rules                                   │
│ ✅ Restrict creations                   │
│ ✅ Restrict updates                     │
│ ✅ Restrict deletions                   │
│ ❌ Require linear history               │
│ ❌ Require deployments                  │
│ ❌ Require signed commits               │
│ ✅ Require a pull request (1 approval)  │
│ ⚠️ Require status checks (opcional)     │
│ ✅ Block force pushes                   │
│ ❌ Require code scanning                │
│ ❌ Require code quality                 │
│ ❌ Copilot code review                  │
└─────────────────────────────────────────┘
```

---

## 🎯 Configuração Mínima (Recomendada para Começar)

Se quiser começar simples, marque **APENAS** estas 5:

1. ✅ **Restrict creations**
2. ✅ **Restrict updates**
3. ✅ **Restrict deletions**
4. ✅ **Require a pull request before merging** (1 approval)
5. ✅ **Block force pushes**

Deixe **TUDO MAIS** desmarcado por enquanto.

---

## 📋 Checklist Antes de Criar

- [ ] Nome preenchido: `FlowCloser Production Protection`
- [ ] Enforcement: `Active` selecionado
- [ ] Target branch: `main` configurado
- [ ] 5 regras essenciais marcadas
- [ ] Require PR: 1 approval configurado
- [ ] Tudo mais desmarcado

---

## 🚀 Após Criar

1. **Teste:** Crie um PR de teste para verificar se funciona
2. **Ajuste:** Adicione mais regras conforme necessário
3. **Bypass:** Se precisar fazer hotfix urgente, adicione seu usuário ao bypass temporariamente

---

**Pronto para colar no GitHub!** ✅


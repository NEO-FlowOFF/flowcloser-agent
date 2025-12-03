# 🔒 Configuração de Ruleset no GitHub - FlowCloser

## 📋 Configuração Recomendada para Produção

### 1. Ruleset Name

```
FlowCloser Production Protection
```

### 2. Enforcement Status

- ✅ **Active** (selecione esta opção)
  - Isso aplica as regras imediatamente

### 3. Bypass List
Adicione (se aplicável):

- ✅ **Administrators** (você precisa poder fazer hotfixes)
- ✅ **GitHub Actions** (para CI/CD automático)
- ✅ Seu usuário pessoal (para emergências)

**Nota:** Deixe vazio se quiser que TODOS sigam as regras, incluindo admins.

---

### 4. Target Branches

**Branch targeting criteria:**

- Selecione: **Branch name pattern**
- Padrão: `main` ou `master`
- Ou selecione: **All branches** (mais restritivo)

**Recomendação:** Use `main` para proteger apenas a branch principal.

---

### 5. Rules (Regras)

#### ✅ Restrict creations
- **Marcar:** ✅ Sim
- **Motivo:** Previne criação acidental de branches protegidas

#### ✅ Restrict updates
- **Marcar:** ✅ Sim
- **Motivo:** Força uso de Pull Requests

#### ✅ Restrict deletions
- **Marcar:** ✅ Sim
- **Motivo:** Protege contra exclusão acidental

#### ⚠️ Require linear history
- **Marcar:** ⚠️ Opcional (recomendo NÃO marcar inicialmente)
- **Motivo:** Pode complicar merges. Deixe desmarcado se usa merge commits.

#### ⚠️ Require deployments to succeed
- **Marcar:** ⚠️ Opcional
- **Ambientes:** Se você tiver ambientes configurados (ex: `production`, `staging`)
- **Motivo:** Garante que deploy funcione antes de merge

#### ⚠️ Require signed commits
- **Marcar:** ⚠️ Opcional (recomendo NÃO marcar inicialmente)
- **Motivo:** Requer configuração de GPG. Pode complicar para equipe pequena.

#### ✅ Require a pull request before merging
- **Marcar:** ✅ Sim (OBRIGATÓRIO)
- **Configurações:**
  - ✅ **Require approvals:** 1 (ou mais se tiver equipe)
  - ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - ✅ **Require review from Code Owners** (se tiver CODEOWNERS file)
  - ⚠️ **Require last push approval** (opcional)

#### ✅ Require status checks to pass
- **Marcar:** ✅ Sim (se você tiver CI/CD)
- **Status checks:**
  - Se você tiver GitHub Actions configurado, adicione:
    - `build` (se tiver)
    - `test` (se tiver)
    - `lint` (se tiver)
- **Motivo:** Garante que código compile e testes passem antes de merge

#### ✅ Block force pushes
- **Marcar:** ✅ Sim (OBRIGATÓRIO)
- **Motivo:** Previne sobrescrita de histórico

#### ⚠️ Require code scanning results
- **Marcar:** ⚠️ Opcional
- **Ferramentas:** Se você usar GitHub Advanced Security ou ferramentas externas
- **Motivo:** Adiciona camada extra de segurança

#### ⚠️ Require code quality results
- **Marcar:** ⚠️ Opcional
- **Severity levels:** Se você usar ferramentas de qualidade de código
- **Motivo:** Mantém qualidade do código

#### ⚠️ Automatically request Copilot code review
- **Marcar:** ⚠️ Opcional (se você tem GitHub Copilot)
- **Motivo:** Adiciona revisão automática de IA

---

## 🎯 Configuração Mínima Recomendada (Essencial)

Para começar rápido, marque apenas o essencial:

### Obrigatórias:
- ✅ **Restrict creations**
- ✅ **Restrict updates**
- ✅ **Restrict deletions**
- ✅ **Require a pull request before merging**
  - Require approvals: 1
- ✅ **Block force pushes**

### Opcionais (adicionar depois):
- ⚠️ Require status checks (se tiver CI/CD)
- ⚠️ Require deployments (se tiver ambientes configurados)

---

## 📝 Configuração Completa Sugerida

```
Ruleset Name: FlowCloser Production Protection

Enforcement: Active

Bypass List:
- Administrators (opcional, para emergências)

Target Branches:
- Pattern: main

Rules:
✅ Restrict creations
✅ Restrict updates  
✅ Restrict deletions
❌ Require linear history (deixar desmarcado)
❌ Require deployments (adicionar depois se configurar)
❌ Require signed commits (deixar desmarcado)
✅ Require a pull request before merging
   - Require approvals: 1
   - Dismiss stale approvals: ✅
✅ Require status checks to pass (se tiver CI/CD)
✅ Block force pushes
❌ Require code scanning (opcional)
❌ Require code quality (opcional)
❌ Copilot code review (opcional)
```

---

## 🚀 Passo a Passo no GitHub

1. **Ruleset Name:**
   ```
   FlowCloser Production Protection
   ```

2. **Enforcement status:**
   - Selecione: **Active**

3. **Bypass list:**
   - Deixe vazio OU adicione "Administrators" se quiser poder fazer hotfixes diretos

4. **Target branches:**
   - Clique em **Add rule**
   - Selecione **Branch name pattern**
   - Digite: `main`
   - Clique em **Add**

5. **Rules:**
   - Marque as regras essenciais listadas acima
   - Clique em **Create ruleset**

---

## ✅ Checklist Final

Antes de criar, verifique:

- [ ] Nome do ruleset definido
- [ ] Enforcement: Active
- [ ] Target branch: `main` configurado
- [ ] Restrict creations: ✅
- [ ] Restrict updates: ✅
- [ ] Restrict deletions: ✅
- [ ] Require PR before merging: ✅ (com 1 approval)
- [ ] Block force pushes: ✅
- [ ] Status checks configurados (se aplicável)

---

## 🔧 Após Criar o Ruleset

1. **Teste criando um PR:**
   - Faça uma mudança em uma branch
   - Crie um Pull Request
   - Verifique se as regras estão sendo aplicadas

2. **Ajuste conforme necessário:**
   - Se precisar fazer hotfixes urgentes, adicione seu usuário ao bypass
   - Se CI/CD não estiver funcionando, desmarque "Require status checks" temporariamente

---

**Configuração recomendada para FlowCloser v1.2 em produção** ✅


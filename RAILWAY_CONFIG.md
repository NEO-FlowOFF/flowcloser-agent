# 🚂 Configuração Railway - FlowCloser Agent

**Última atualização:** 2025-01-27

---

## 📋 Configuração Atual (`railway.json`)

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build",
    "nixpacksConfig": {
      "phases": {
        "setup": {
          "nixPkgs": ["nodejs_20"]
        }
      }
    }
  },
  "deploy": {
    "runtime": "V2",
    "numReplicas": 1,
    "startCommand": "NODE_OPTIONS='--experimental-global-customevent' node dist/main.js",
    "sleepApplication": false,
    "useLegacyStacker": false,
    "multiRegionConfig": {
      "us-east4-eqdc4a": {
        "numReplicas": 1
      }
    },
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🔍 Explicação das Configurações

### Build

- **builder:** `NIXPACKS` - Sistema de build do Railway
- **buildCommand:** Instala dependências e compila TypeScript
- **nixpacksConfig:** Força uso do Node.js 20

### Deploy

- **runtime:** `V2` - Runtime mais recente do Railway (melhor performance)
- **numReplicas:** `1` - Uma instância do serviço
- **startCommand:** Comando para iniciar o servidor com opções Node.js
- **sleepApplication:** `false` - Mantém aplicação sempre ativa (sem sleep)
- **useLegacyStacker:** `false` - Usa stacker moderno
- **multiRegionConfig:** Configuração multi-região (US East)
- **restartPolicyType:** `ON_FAILURE` - Reinicia apenas em caso de falha
- **restartPolicyMaxRetries:** `10` - Máximo de tentativas de reinício

---

## ✅ Benefícios da Configuração

1. **Runtime V2:** Melhor performance e recursos mais recentes
2. **Multi-Region:** Preparado para expansão geográfica
3. **No Sleep:** Aplicação sempre disponível (sem cold start)
4. **Restart Policy:** Reinicia automático em caso de falha
5. **Node.js 20:** Versão LTS mais recente

---

## 🔧 Opções Node.js

O `startCommand` inclui:
```
NODE_OPTIONS='--experimental-global-customevent'
```

Isso garante compatibilidade com APIs experimentais do Node.js que podem ser necessárias para algumas dependências.

---

## 📊 Monitoramento

### Verificar Status
```bash
railway status
```

### Ver Logs
```bash
railway logs --tail
```

### Verificar Métricas
- Acesse: https://railway.com/project/95ed3bcd-2e20-4477-b50c-43cd9ec04c41

---

## 🚀 Escalabilidade Futura

Se precisar escalar no futuro, você pode:

1. **Aumentar Replicas:**
   ```json
   "numReplicas": 2
   ```

2. **Adicionar Regiões:**
   ```json
   "multiRegionConfig": {
     "us-east4-eqdc4a": { "numReplicas": 1 },
     "eu-west1": { "numReplicas": 1 }
   }
   ```

---

**Status:** ✅ Configuração otimizada e funcionando


---
name: factory-providers
description: Manage LLM provider authentication and API keys dynamically via HTTP endpoints.
---

# Provider API Keys Management

You can inspect configured providers and set API keys for Anthropic, OpenAI, Google, Groq, DeepSeek, Mistral, and other supported providers.

### List Providers
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/providers
```

### Set Provider API Key
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"apiKey": "sk-ant-api03-..."}'   http://localhost:3000/api/providers/anthropic/key
```

### Revoke Provider Key
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --method=DELETE   http://localhost:3000/api/providers/anthropic/key
```

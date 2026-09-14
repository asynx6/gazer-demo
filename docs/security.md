# 🔐 Keamanan

- `MODEL_PROVIDER_API_KEY` hanya di backend, tidak pernah dikirim ke browser
- Data cerita tersimpan lokal di SQLite — no cloud sync
- Single-user, tanpa login. Untuk ekspos publik: tambahkan reverse-proxy + basic auth
- Input limits: `MAX_MESSAGE_CONTENT=20000`, per-field `STORY_FIELD_MAX_LENGTH`, body 1 MB
- Avatar URL validation: http/https only, max 2048 chars, valid URL parse

---

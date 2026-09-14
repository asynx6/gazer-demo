# 🛠️ API Reference

Base: `http://localhost:3000/api`

### Health & Models

| Method | Path | Deskripsi |
|---|---|---|
| `GET` | `/health` | Status server |
| `GET` | `/models` | Echo: `{ models: [], default_model_id, provider_base_url }` (no live listing; satu-satunya model adalah DEFAULT_MODEL_ID dari .env) |

### Character Generator

| Method | Path | Body | Deskripsi |
|---|---|---|---|
| `POST` | `/generate/character` | `{prompt}` | Auto-derive karakter dari ide singkat |

### Stories CRUD

| Method | Path | Deskripsi |
|---|---|---|
| `POST` | `/stories` | Buat story baru |
| `GET` | `/stories` | List semua story |
| `GET` | `/stories/:id` | Detail story |
| `PATCH` | `/stories/:id` | Update (title, persona, roleplay, avatar, font, voice, dll). Body `active_model_id` di-strip silently (model fixed via .env) |
| `DELETE` | `/stories/:id` | Soft-delete (arsip) |
| `DELETE` | `/stories/:id/permanent` | Hard-delete (cascade messages + TTS cache) |

### Messages & Chat

| Method | Path | Deskripsi |
|---|---|---|
| `GET` | `/stories/:id/messages` | Riwayat pesan (+ pagination `limit`/`offset`) |
| `POST` | `/stories/:id/messages` | Kirim pesan → SSE stream (`meta` → `token`*N → `done`) |
| `POST` | `/stories/:id/messages/fallback` | Fallback message saat provider error |
| `DELETE` | `/stories/:id/messages/rollback` | Rollback atomik: hapus user+AI msg + TTS cache + restore memory |

### TTS

| Method | Path | Deskripsi |
|---|---|---|
| `GET` | `/stories/:id/messages/tts-latest` | TTS cache terbaru (pre-populate replay) |
| `GET` | `/stories/:id/messages/:msgId/tts-cache` | TTS cache per message (owner check) |
| `POST` | `/tts` | Synthesize `{text, voice?, gender?}` → audio/mpeg |
| `POST` | `/tts/warmup` | Pre-warm TTS cache (fire-and-forget / blocking) |

### Voice Presets

| Method | Path | Deskripsi |
|---|---|---|
| `GET` | `/stories/:id/voice-presets` | List voice presets |
| `PATCH` | `/stories/:id/voice-presets/:tag` | Update voice preset |

---

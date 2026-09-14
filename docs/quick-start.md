# 🚀 Quick Start

### Prasyarat

- **Node.js ≥ 20** ([download](https://nodejs.org))
- Provider base URL + key + model id dari OpenRouter / 9Router / atau OpenAI-compatible

### Konfigurasi Provider (.env-only)

`backend/.env` adalah **satu-satunya** tempat konfigurasi provider. Tidak ada UI picker dan tidak ada override per-story. Backend **tidak akan start** kalau salah satu dari tiga nilai ini kosong atau masih placeholder:

```bash
MODEL_PROVIDER_BASE_URL=https://openrouter.ai/api/v1   # atau http://localhost:20128/v1 (9Router)
MODEL_PROVIDER_API_KEY=sk-...
DEFAULT_MODEL_ID=openrouter/auto                       # atau im/DeepSeek-V4-Flash (9Router)
DEFAULT_SHORT_TERM_WINDOW=4            # 3–5, jumlah pesan terakhir yang dikirim ke AI
```

### Fallback chain (model alternatif, opsional)

Tambahkan `DEFAULT_MODEL_ID_1` … `DEFAULT_MODEL_ID_10` di `.env` untuk daftar model cadangan. Maks **11 slot total** (slot 0 + `_1`..`_10`). Slot kosong di-skip otomatis — isi hanya yang lo punya.

```bash
DEFAULT_MODEL_ID_1=im/another-model        # model 1 (dipakai kalau DEFAULT_MODEL_ID error)
DEFAULT_MODEL_ID_2=im/backup-cheap-model   # model 2
# DEFAULT_MODEL_ID_3= ...                  # kosong → di-skip
DEFAULT_MODEL_ID_10=im/safety-net
```

Backend mencoba slot 0 dulu, kalau provider balikan error (bukan AbortError) → otomatis coba slot 1, slot 2, dst., sampai salah satu berhasil atau semua habis.

### Jalankan

```bash
cd /path/to/FictionFlow
npm start
```

Dev mode (auto-reload `.env` & source, incremental CSS rebuild):

```bash
npm run dev
```

> `npm start` otomatis: install deps (kalau belum) → copy `.env.example` → cek API key → build CSS → start server. Buka **http://localhost:3000**.

### Watch triggers

| Edit | Efek |
|---|---|
| `backend/.env` | Backend restart otomatis (env baru ke-load) |
| `backend/src/**/*.js` | Backend restart otomatis |
| `frontend/public/css/**` | Tailwind CSS di-rebuild incremental saja |
| `frontend/public/{story,index}.html`, `js/**` | Browser refresh saja (static serve picks up) |

---

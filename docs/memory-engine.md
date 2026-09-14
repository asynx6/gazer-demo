# 🧠 Memory Engine

| Layer | Mekanisme |
|---|---|
| **Short-term** | N pesan terakhir (`short_term_window`, 3–5) dikirim ke LLM setiap request |
| **Long-term** | `extractAndMergeFacts` — LLM kedua ekstrak fakta dari user+AI message pair, merge + dedup (max 60 fakta), simpan ke `dynamic_memory` JSON |
| **4 Kategori Fakta** | `user`, `ai`, `world`, `relationship` |
| **Prompt Builder** | 6-bagian: Role → Output Spec → Voice Rules → Story Identity → Konteks Saat Ini → Dynamic Facts → Output Rules |

### Pipeline (`dynamic_memory` empty? iku steps jawap.)

```
[user chat submit]
    ↓
POST /api/stories/:id/messages → inserted into `messages` table
    ↓
messages.controller.streamChat:
   - LLM provider streaming (SSE: meta, token*, done)
   - kalau respon kosong → SSE 'error / EMPTY_RESPONSE' → NO assistant row, NO extractor
   - kalau respon isi → write 1 assistant row + tts cache + finalize
    ↓
extractAndMergeFacts  (services/memoryExtractor.js#L314)
   - skip kalau userMessage.length<8 & assistantMessage.length<16
   - prompt kedua ke LLM → parse {user,ai,world,relationship}
   - merge tagged facts (relationship: [STATUS], [AI_PANGGILAN], dst.) + narrative
   - simpan hanya kalau ada perubahan
    ↓
(total ≥ 50) auditor → bersihkan konflik
(total ≥ 50) summarizer → compress, pertahankan tagged facts
```

**Catatan perilaku kosong terlihat:**
- Provider kosong (respons nol token) → no extractor fire → `dynamic_memory=[]` tetap. Itu benar (kita tidak bikin memory dari response yang tidak sampai).
- Model provider lambat >> 30 detik (contoh DeepSeek-V4-Flash di 9Router) bisa kena **timeout eksplisit** atau `EMPTY_RESPONSE`. Ganti ke model yang lebih represif dalam `.env`:
   ```bash
   DEFAULT_MODEL_ID=im/Qwen3.6-35B-A3B     # fallback cepat 9Router
   # DEFAULT_MODEL_ID_1=im/DeepSeek-V4-Flash  # lanjutan kalau ada budget
   ```

### Tagged State Facts (Relationship khusus)

Khusus `[STATUS]`, `[AI_PANGGILAN]`, `[USER_PANGGILAN]`, `[SEJAK]`, `[KONTEKS_PERILAKU]`:
- SINGULAR — paling baru **replace** yang lama. Tidak ada konflik fakta ganda.
- `[KONTEKS_PERILAKU]` ditulis LLM dinamis dari `ai[]` [persona] + `[STATUS]` + kejadian terbaru. Tidak ada daftar mode hardcoded sesuai skenario apapun.
- Prompt builder inject blok `## KONTEKS SAAT INI` di antara STORY IDENTITY dan DYNAMIC FACTS pada prompt default dan casual.

---

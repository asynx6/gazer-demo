# ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🧠 **Two-Tier Memory** | Long-term (`dynamic_memory`, fakta inti cerita) + Short-term (N pesan terakhir ke LLM). AI tidak pernah lupa nama, sifat, atau target ending. |
| 📡 **Streaming Chat (SSE)** | Token demi token via event chain `meta` → `token`*N → `done`, abortable. |
| 🎙️ **Hybrid Multi-Voice TTS** | 4 Neural voices Microsoft Edge TTS (`id-ID-ArdiNeural/GadisNeural`, `en-US-GuyNeural/JennyNeural`) + prosody 4-tuple `(type × gender)` + Web Speech fallback. |
| 🛑 **Stop + Rollback** | Abort SSE, hapus bubble user+AI, restore teks ke chatbar, rollback atomik ke DB. |
| 🎨 **3 Tema** | `dark` / `light` / `coffee` (warm latte). |
| 🔌 **Pluggable Provider** | API base/key/model dari `backend/.env`. Tidak ada UI picker, tidak ada per-story override. |
| 🔤 **Font Customization** | 6 font families (`serif`, `lora`, `slab`, `nunito`, `sans`, `system`) + adjustable size (14–22px) per story. |
| 📖 **Reading Mode** | Immersive view tanpa toolbar, toggle on/off per story. |
| 🖼️ **Avatar Profile** | Custom URL avatar + preview, enable/disable toggle, fallback ke initial huruf. |
| 📱 **PWA Ready** | Service worker (cache-first + stale-while-revalidate), manifest, icon 192/512. |
| 🤖 **Character Generator** | Auto-derive nama, kepribadian, gaya bahasa, dan target ending dari prompt singkat. |
| 🛡️ **Crash-safe** | `uncaughtException` filter — 403 dari Microsoft TTS endpoint tidak membunuh server. |

---

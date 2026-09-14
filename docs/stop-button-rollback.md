# 🛑 Stop Button & Rollback

```
[User kirim] → tombol send jadi stop (red tint), AbortController dibuat
       │
[SSE: meta] → userMessageId tercatat
[SSE: token*N] → bubble AI update real-time
       │
[User klik stop] →
  1. AbortController.abort() — cancel fetch
  2. Hapus bubble user + AI dari DOM
  3. Restore teks ke chatbar
  4. DELETE /messages/rollback (atomic transaction):
     - Hapus message_tts rows
     - Hapus messages (user + AI)
     - Restore dynamic_memory snapshot
```

---

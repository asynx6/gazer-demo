# 🎙️ TTS & Audio System

AI membalas dengan struktur hybrid via 2 voice pack:

| Pack | Locale | Narration (male) | Dialogue (female) |
|---|---|---|---|
| Indonesian | `id-ID` | `ArdiNeural` | `GadisNeural` |
| English (US) | `en-US` | `GuyNeural` | `JennyNeural` |

### SSE Response Format

```jsonc
{
  "message_id": 17,
  "full_content": "Malam itu hujan turun perlahan...",
  "audio_segments": [
    { "text": "Malam itu...",       "gender": "male",   "type": "narration", "voice_config": {"locale":"id-ID","voice_name":"id-ID-ArdiNeural"} },
    { "text": "Kamu kenapa diam?",  "gender": "female", "type": "dialogue",  "voice_config": {"locale":"id-ID","voice_name":"id-ID-GadisNeural"} }
  ],
  "used_fallback_parse": false
}
```

### Pipeline

1. **Backend** `edgeTts.service.js` — `edge-tts-universal` v1.4.0 (Chrome 143 + MUID cookie auth), per-segment synthesis, prosody 4-tuple `(type × gender)`, 8s timeout, retry with backoff
2. **Frontend** `ttsQueueManager.js` — fetch via `apiClient.synthesizeTts()` → `<audio>` element, queue + skip/abort + 25s timeout + 3× retry + Blob URL lifecycle
3. **Fallback** → `window.speechSynthesis` per-segment di browser
4. **Cache** → `message_tts` table, replay tanpa re-synthesize, pre-populated saat load story

---

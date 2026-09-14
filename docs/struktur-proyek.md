# 🗂️ Struktur Proyek

```
FictionFlow/
├── package.json                  # Root scripts (npm start / npm run dev)
├── scripts/run.mjs               # Bootstrap + start (cross-platform)
├── scripts/watch.mjs             # Dev watch: fs.watch + debounced rebuild/restart
├── README.md                     # File ini
├── LICENSE                       # MIT
├── GEMINI.md                     # Gemini CLI config
├── data/                         # SQLite db auto-generated (gitignored)
├── docs/
│   ├── FictionFlow.md            # Spesifikasi lengkap (Bab 1–17)
│   ├── task.md                   # Task tracker
│   └── img/                      # Screenshots README
├── tests/                        # E2E & smoke test suite
│   ├── fictionflow-chat.spec.js
│   ├── test-chat-endpoint.mjs
│   ├── test-provider.mjs
│   └── test-story-stream.mjs
├── scratch/                      # One-off scripts & debug
│   ├── smoke.mjs                 # 13-endpoint E2E smoke
│   └── visual-test.js
│
├── backend/                      # Node.js + Express + SQLite
│   ├── package.json              # edge-tts-universal v1.4.0
│   ├── .env.example
│   └── src/
│       ├── server.js             # Entry point + crash filter
│       ├── app.js                # Express wiring + static serve
│       ├── config/               # env loader (fail-fast on missing keys)
│       │   └── env.js
│       ├── db/                   # schema.sql, database.js, migrate.js, seed.js
│       ├── routes/               # stories, messages, models, tts, generator, voicePresets
│       ├── controllers/          # stories, messages (streamChat SSE), models
│       ├── services/             # promptBuilder (6-bagian), memoryManager, memoryExtractor,
│       │                         # modelProvider, edgeTts (+ test)
│       ├── middlewares/          # errorHandler (HttpError), requestLogger
│       └── util/                 # text (stripReasoningContent), time (normalizeTimestamps)
│
└── frontend/                     # Vanilla JS + Tailwind (static, no bundler)
    ├── tailwind.config.js
    ├── package.json              # Tailwind build deps only
    └── public/
        ├── index.html            # Dashboard page
        ├── story.html            # Story chat page
        ├── robots.txt
        ├── sw.js                 # Service worker (PWA)
        ├── manifest.webmanifest  # PWA manifest
        ├── css/
        │   ├── tailwind.input.css   # Source (edit here)
        │   └── tailwind.output.css  # Built (gitignored, wajib build:css)
        └── js/
            ├── api/
            │   └── apiClient.js     # REST + SSE + TTS client (single source)
            ├── core/
            │   ├── eventBus.js      # Events constants + on/off/emit
            │   ├── themeManager.js  # dark/light/coffee cycle singleton
            │   ├── markdownRenderer.js  # markdown-it wrapper
            │   ├── textUtils.js     # stripReasoningContent (shared)
            │   ├── ttsEngine.js     # Web Speech API wrapper
            │   └── ttsQueueManager.js   # Edge TTS queue + Audio playback + retry
            ├── pages/
            │   ├── dashboard.page.js    # Story list + create + character generator
            │   └── story.page.js        # Chat UI + TTS toolbar + settings + memory
            └── state/              # (reserved untuk future state management)
```

---

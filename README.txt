Upload everything inside this folder to GitHub.

Render setup:
1. New Web Service
2. Connect the GitHub repo
3. Environment: Node
4. Build Command: npm install
5. Start Command: npm start

After Render deploys, your replay raw URL will be:

https://YOUR-RENDER-SITE.onrender.com/u-turn-replay-only.lua

Then put that URL inside u-turn-small-loader.lua:

local REPLAY_URL = "https://YOUR-RENDER-SITE.onrender.com/u-turn-replay-only.lua"

Do not open u-turn-replay-only.lua if it freezes your editor. Just upload it.

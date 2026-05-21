# Deploy to Vercel — MaOs AI Agency

## Prerequisites

- GitHub / GitLab / Bitbucket repository with this project
- [Vercel](https://vercel.com) account (free tier is enough)

## Quick deploy

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MaOs AI Agency site"
   git remote add origin https://github.com/YOUR_USER/maos-ai-agency.git
   git push -u origin main
   ```

2. Open [vercel.com/new](https://vercel.com/new) → **Import** your repository.

3. Vercel auto-detects **Next.js**. Leave defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** (default, leave empty)
   - **Install Command:** `npm install`

4. Click **Deploy**.

5. After deploy, open the site — root `/` redirects to `/uk` (default locale).

## Environment variables (optional)

| Variable | Required | Example |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | No | `https://maos-agency.vercel.app` |
| `TELEGRAM_BOT_TOKEN` | For contact form | From [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | For contact form | Your user or group chat ID |

Set in: **Project → Settings → Environment Variables** → add for Production (and Preview if needed).

Used for: `sitemap.xml`, `robots.txt`, Open Graph `metadataBase`; contact form posts to Telegram via `POST /api/contact`.

### Telegram bot setup (contact form)

1. Create a bot with [@BotFather](https://t.me/BotFather) → copy **token**.
2. Open a chat with your bot (or add the bot to a team group).
3. Send any message to the bot.
4. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` and find `"chat":{"id":...}`.
5. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel (and locally in `.env.local` for testing).

## Routes

| URL | Page |
|-----|------|
| `/` | → redirects to `/uk` |
| `/uk`, `/en` | Home |
| `/uk/services`, `/en/services` | Services |
| `/uk/about`, `/en/about` | About & Contact |

## Verify locally before deploy

```bash
npm install
npm run build
npm run start
```

Open http://localhost:3000

## CLI deploy (alternative)

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts. Production: `vercel --prod`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Vercel | Run `npm run build` locally and fix errors |
| 404 on routes | Check `src/middleware.ts` is deployed |
| Wrong locale | Default is `uk`; middleware handles `/` redirect |
| Fonts not loading | Geist loads from Google Fonts; no extra config needed |

## Post-deploy checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain
- [ ] Test `/uk` and `/en` + language switcher
- [ ] Test Telegram links
- [ ] Test contact form (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` set)
- [ ] Test mobile layout
- [ ] Add custom domain in Vercel (optional)

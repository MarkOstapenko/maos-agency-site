# MaOs AI Agency

Premium marketing site for **MaOs AI Agency** — AI automation systems for business.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react
- next-intl (Ukrainian `uk` + English `en`)

## Pages

| Route | Description |
|-------|-------------|
| `/uk`, `/en` | Home |
| `/uk/services`, `/en/services` | Services |
| `/uk/about`, `/en/about` | About & Contact |

Default locale: **Ukrainian** (`uk`). Root `/` redirects to `/uk`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Deploy on Vercel

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step instructions.

Summary:

1. Push repo to GitHub
2. Import on [Vercel](https://vercel.com/new)
3. Deploy (Next.js auto-detected)
4. Optionally set `NEXT_PUBLIC_SITE_URL` → your production URL

Public links are in `src/lib/constants.ts`. For the **contact form** (sends leads to Telegram), set in `.env.local` or Vercel:

- `TELEGRAM_BOT_TOKEN` — from [@BotFather](https://t.me/BotFather)
- `TELEGRAM_CHAT_ID` — your chat or group ID (see `.env.example`)

Without these variables the form shows a friendly error and links to Telegram.

## Project structure

See **[STRUCTURE.md](./STRUCTURE.md)**.

## Brand

- **Telegram:** [@MaOs_Agency](https://t.me/MaOs_Agency)
- **Colors:** `#050505`, `#111111`, `#E32A39`, `#FBFBEF`

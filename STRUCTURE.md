# MaOs AI Agency — структура проєкту

```
Site MaOs/
├── messages/                 # i18n (uk, en)
│   ├── uk.json
│   └── en.json
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx        # root passthrough
│   │   └── [locale]/
│   │       ├── layout.tsx    # shell: Navbar + Footer
│   │       ├── page.tsx      # Home → HomePage
│   │       ├── services/
│   │       │   └── page.tsx  # Services → ServicesPage
│   │       └── about/
│   │           └── page.tsx  # About → AboutPage
│   │
│   ├── components/
│   │   ├── layout/           # глобальний каркас
│   │   │   ├── index.ts
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── SubpageHero.tsx
│   │   │
│   │   ├── ui/               # перевикористовувані UI
│   │   │   ├── index.ts
│   │   │   ├── Container.tsx
│   │   │   ├── GlowOrb.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── TelegramButton.tsx
│   │   │
│   │   ├── home/             # секції головної
│   │   │   ├── index.ts
│   │   │   ├── Hero.tsx
│   │   │   ├── DashboardPreview.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── AutomationFlow.tsx
│   │   │   └── CtaSection.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── index.ts
│   │   │   ├── ServicesHero.tsx
│   │   │   ├── ServicesCore.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── ServicesProcess.tsx
│   │   │   ├── ServicesIntegrations.tsx
│   │   │   └── ServicesCta.tsx
│   │   │
│   │   ├── about/
│   │   │   ├── index.ts
│   │   │   ├── AboutHero.tsx
│   │   │   ├── AboutStats.tsx
│   │   │   ├── AboutStory.tsx
│   │   │   ├── AboutValues.tsx
│   │   │   └── AboutContact.tsx
│   │   │
│   │   └── pages/            # композиція сторінок
│   │       ├── index.ts
│   │       ├── HomePage.tsx
│   │       ├── ServicesPage.tsx
│   │       └── AboutPage.tsx
│   │
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   │
│   ├── lib/
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   └── middleware.ts
│
├── package.json
├── next.config.ts
└── README.md
```

## Правила

| Шар | Відповідальність |
|-----|------------------|
| `app/[locale]/*/page.tsx` | маршрут, metadata, `setRequestLocale` |
| `components/pages/*` | збір секцій однієї сторінки |
| `components/home|services|about/*` | одна секція / блок |
| `components/layout/*` | Navbar, Footer, SubpageHero, LanguageSwitcher |
| `components/ui/*` | кнопки, контейнер, glow, заголовки |

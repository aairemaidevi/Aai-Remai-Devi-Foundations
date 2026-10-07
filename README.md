# आई रेमाई देवी — Aai Remai Devi Foundation Website

A Next.js (App Router) landing page for the Aai Remai Devi rural
empowerment foundation, styled after the structure of the reference
site with a sticky orange header, dropdown navigation, hero, stats
bar, four work-pillar cards, and a footer — built with plain CSS
(CSS Modules), no Tailwind or UI library required.

## Folder structure

```
aai-remai-devi/
├── app/
│   ├── layout.js        Root layout, fonts, metadata
│   ├── globals.css      Design tokens (colors/fonts) + resets
│   └── page.js          Assembles all sections
├── components/
│   ├── Header.js / .module.css      Sticky header + dropdown nav
│   ├── Hero.js / .module.css        Hero section
│   ├── Stats.js / .module.css       Impact stats bar
│   ├── BranchDivider.js / .module.css  Scroll-reveal tree divider
│   ├── Work.js / .module.css        Four work-pillar cards
│   ├── About.js / .module.css       Who We Are + Get Involved
│   └── Footer.js / .module.css      Footer with CIN + links
├── public/
│   └── logo.jpg          Your org logo
├── package.json
├── next.config.js
└── jsconfig.json         Enables the "@/components/..." import alias
```

## What to install

You need **Node.js 18.18 or newer** (Node 20 LTS recommended) and npm.
Check with:

```bash
node -v
npm -v
```

Then, from inside the `aai-remai-devi` folder:

```bash
npm install
```

This installs everything listed in `package.json`:
- `next` — the framework
- `react` and `react-dom` — required by Next.js

No other packages are required — the styling is hand-written CSS
(CSS Modules), and the Google Fonts are loaded via a `<link>` tag in
`app/layout.js`, so nothing extra needs installing for fonts.

## Run it

```bash
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Supabase and Vercel

The site reads public Supabase settings from these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Copy `.env.example` to `.env.local` and fill in the values from **Supabase →
Project Settings → API** for local development. Do not use a service-role key
for either variable or commit real keys to the repository.

For Vercel, add both variables under **Project → Settings → Environment
Variables**. Enable **Production** for the live site, and **Preview** if you
test preview deployments. After saving the variables, redeploy the
corresponding environment: `NEXT_PUBLIC_` values are included in the browser
bundle when Next.js builds, so changing them does not update an existing
deployment. Use the Supabase publishable/anon key only; never use the
service-role key in a `NEXT_PUBLIC_` variable.

The volunteer and donation forms insert into `volunteer_submissions` and
`donations`. Run [`supabase/setup.sql`](./supabase/setup.sql) in the Supabase
SQL Editor if those tables or their public insert policies have not yet been
created. The donation form saves a pending donation record; it does not collect
payment.

The awards gallery can still display the currently uploaded award photos when
Vercel has no Supabase variables. Add both variables in Vercel to let the
gallery automatically discover future files added to the `AWARD` folder.

## Things you'll likely want to customize next

- Replace the placeholder stats in `components/Stats.js` with your
  real numbers once you have them.
- Swap the `#` links in `Header.js`, `Work.js`, `About.js`, and
  `Footer.js` for real pages/routes as you build them out
  (e.g. `/who-we-are/our-story`, `/donate`).
- Add real photos: drop them in `/public` and swap the `<Image>`
  sources in `Hero.js`.
- Hook up the "Donate" button to your payment gateway (Razorpay/
  Instamojo are common for Indian NGOs).

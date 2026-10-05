# PROJECT_CONTEXT.md — Aai Remai Devi Foundation Website

Single-file briefing document. Read this before touching any code. It describes the
whole project: what it is, how it is structured, the conventions any new code must
follow, the exact data/behaviour of every file, and the known gaps.

---

## 1. What this project is

A marketing/informational website for **Aai Remai Devi Education And Social
Foundation** — a rural empowerment NGO based in Ghonse, Maharashtra, registered
under Section 8 of the Maharashtra Societies Act (CIN `U88900MH2026NPL474190`).

The foundation works across four pillars: WASH (water, sanitation, green
initiatives), Health, Education, and Economic Development / livelihoods, plus
community leadership. The site's job is to present the impact numbers, explain the
"Dream Village" model, introduce the committee, and capture donations and
volunteer sign-ups.

The site is bilingual-flavored: English copy with Devanagari (Marathi) accents —
the organisation name (आई रेमाई देवी), the tagline
(सेवा · संस्कार · समर्पण · विकास = service · values · dedication · development),
Marathi role labels, and Marathi member names.

## 2. Tech stack and hard constraints

| Item | Value |
|---|---|
| Framework | Next.js **14.2.35**, App Router |
| React | 18.3.x |
| Language | JavaScript only (`.js` / `.jsx`). **No TypeScript.** |
| Styling | **CSS Modules only.** No Tailwind, no CSS-in-JS, no UI library. |
| Icons | `lucide-react` (the only runtime dependency besides next/react) |
| Fonts | Google Fonts loaded via `<link>` in `app/layout.js` (no `next/font`) |
| Import alias | `@/*` → project root, defined in `jsconfig.json` |
| `next.config.js` | only `reactStrictMode: true`. No image domains configured. |
| Node | 18.18+ (20 LTS recommended) |

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
There are **no tests and no test runner** — verification is manual in the browser.

### Rules an AI agent must not break
1. Do **not** introduce TypeScript, Tailwind, or a component library.
2. Do **not** add npm dependencies without an explicit request. Icons come from `lucide-react`.
3. Do **not** use `next/image` for remote URLs — `images.remotePatterns` is not configured. Remote images in `Work.js` deliberately use plain `<img>`.
4. Do **not** edit `.next/**` (it is unfortunately committed to git) or `node_modules`.
5. Every visual change must go through the component's own `*.module.css`, or through the shared tokens/utilities in `app/globals.css`.
6. `"use client"` is required only where there is interactivity (`Header`, `Hero`, `Impact`, `Work`, `About`). `Dream`, `Stories`, `BranchDivider`, `Footer`, and the whole `app/people/[slug]` route are Server Components — keep them that way unless state or effects are added.

## 3. Directory layout

```
aai-remai-devi/
├── app/
│   ├── layout.js                  Root layout: metadata, Google Fonts <link>, body
│   ├── globals.css                Design tokens + resets + shared utility classes
│   ├── page.js                    Composes the one-page home, in order
│   └── people/[slug]/page.js      Static profile page per committee member
│   └── people/[slug]/page.module.css
├── components/
│   ├── BranchDivider.js           Tiny reusable section divider (label + 2 rules)
│   ├── BranchDivider.module.css
│   ├── Header/Header.js           Sticky orange nav, hide-on-scroll-down, burger menu
│   ├── Hero/Hero.js               Full-bleed brand image on orange
│   ├── Impact/impact.js           Tabbed impact-stats section  ← note lowercase filename
│   ├── Work/Work.js               Infinite auto-advancing pillar carousel
│   ├── Dream/Dream.js             "Dream Village" 6-point diagram around a photo
│   ├── Stories/Stories.js         Committee member cards → /people/[slug]
│   ├── About/About.js             Video panel + Donate/Volunteer form (id="get-involved", id="donate")
│   └── Footer/Footer.js           Footer with CIN + link columns (also id="donate")
├── lib/
│   └── committeeMembers.js        The 4 committee members + getCommitteeMember(slug)
├── public/
│   ├── BATCH.jpg                  Logo (header + footer)
│   ├── main.png                   Hero image (1536×1024)
│   ├── Village.jpeg               Dream Village centre photo
│   ├── President.jpeg  secretary.jpeg  treasurer.jpeg  trustee.jpeg
│   ├── donations.webp  1.jpeg … 5.jpeg  Village.jpeg
├── jsconfig.json                  "@/*" alias
├── next.config.js
├── package.json
└── README.md                      Stale (describes an older flat-file structure)
```

**Known filename inconsistency:** `components/Impact/impact.js` and
`impact.module.css` are lowercase while every other component folder is
`PascalCase`. The import in `app/page.js` is `from "@/components/Impact/impact"`.
Keep the existing casing when editing; renaming is a separate, deliberate change.

## 4. Design system (`app/globals.css`)

CSS custom properties on `:root` — **always use these tokens instead of hardcoding
brand colors**.

Color tokens:
```
--navy        #0f1b3d   --navy-soft  #16265a   (dark sections: Stories, Footer, people page)
--marigold    #e8871e   --marigold-deep #c76d0f (primary CTA accent)
--leaf        #3f7d42   --leaf-deep  #2c5c2e
--gold        #c9a227   (focus ring)
--maroon      #7a2e2e
--cream       #fdf8ef   --cream-deep #f6ecd9   (page background)
--ink         #241d12   (body text)
--paper       #ffffff
```

Type tokens:
```
--font-display    Poppins (headings)
--font-devanagari "Noto Sans Devanagari" (Marathi text)
--font-body       Hind (body)
--font-utility    Inter (labels, small UI text)
```

Shape/layout tokens: `--radius-s 8px`, `--radius-m 16px`, `--radius-l 28px`,
`--container 1180px`.

Global utilities available everywhere:
- `.container` — max-width `--container`, 24px side padding (16px under 600px)
- `.eyebrow` — uppercase, letterspaced, `--marigold-deep`
- `.btn` + `.btn-primary` / `.btn-outline` / `.btn-navy` — pill buttons
- `:focus-visible` → `3px solid var(--gold)` outline
- `prefers-reduced-motion` globally kills animations/transitions and smooth scroll

Note: a few components deliberately bypass the tokens and hardcode their own
palette (`#F47600` header/Hero orange, `#fecc27` Work yellow, `#f58211` Dream
orange, `#f5f3f1` Impact grey). Keep those local values when editing those
components; do not "normalize" them unless asked.

## 5. Home page composition (`app/page.js`)

Sections render in exactly this order:

1. `Header`
2. `Hero` (`#top`)
3. `Impact` (`#aim`)
4. `BranchDivider label="Our Work"`
5. `Work` (`#work`)
6. `Dream` (`#dream`)
7. `Stories` (`#people-behind-the-promise`)
8. `BranchDivider label="Get Involved"`
9. `About` (`#get-involved`, inner card `#donate`)
10. `Footer` (also `id="donate"`)

Header nav anchors map 1:1 to those ids. Any new section needs an id, a nav entry
in `Header.js`'s `NAV` array, and its position in `page.js`.

## 6. Component-by-component behaviour

### `components/Header/Header.js` — client
- `position: sticky`, `z-index: 1000`, background `#F47600` (orange).
- **Hide-on-scroll-down:** a passive `scroll` listener compares `window.scrollY`
  with a `lastScrollY` ref; header hides when scrolling down past 80px, reappears
  when scrolling up or near the top (`.visible` / `.hidden`, `translateY(-120%)`).
- `NAV` array of 5 anchors. Every entry currently has `items: null` — the
  **dropdown machinery is fully built but dormant** (hover-open, caret, click to
  toggle hash). To add a dropdown, give an entry an `items: [{label, href}]` array;
  both desktop and mobile rendering already handle it.
- Logo `/BATCH.jpg` at 84×84 with `priority`. Brand text: "Aai Remai Devi" /
  "Education And Social Foundation".
- White pill **Donate ♥** button → `#donate`.
- Burger appears ≤1100px, toggles `.mobileMenu` (darker orange `#d86800`).
  Mobile menu links do **not** close the menu on click — known rough edge.
- Breakpoints: 1100px (switch to burger), 600px (smaller bar/logo/text).

### `components/Hero/Hero.js` — client
Just a full-width rounded card containing `/main.png` via `next/image`
(1536×1024, `object-fit: contain`, aspect-ratio box, 28px radius, drop shadow) on
the orange background. No copy, no CTA. Class is still named `videoWrapper`
(leftover from an earlier video hero).

### `components/Impact/impact.js` — client
The stats engine. `impactData` maps a tab key → `{label, accent, cardBg, cards[5]}`,
where each card is `{value, label, desc, icon}` with a `lucide-react` icon
component stored directly in the data.

Five tabs: `community`, `water`, `health`, `education`, `economy`.
`activeTab` state **defaults to `"economy"`**. Tab buttons take inline styles from
`accent` / `cardBg`; the active tab gets `background: accent, color: #fff`.

Content per tab (5 cards each):
- **community** — "Community Leadership", accent `#f59d32`, bg `#f5e3d4`:
  13,200+ community volunteers; 1,417+ Village Development Committees; 2,372
  specialised eco-system builders; 14,135+ women across 1,417 SHGs; 6 Farmer
  Producer Organisations.
- **water** — "Water, Sanitation & Green Initiatives", `#1f9ae2` / `#dfeef7`:
  298,855 lives via 763 drinking water schemes; 177,080 individual toilets;
  39,222 household toilets; 437 schools with WASH; 1503+ ODF hamlets.
- **health** — "Health", `#f59d32` / `#f4e2d0`: 549,895 screened by Swades
  Mitras; 2,700+ health volunteers; 146,655 spectacles; 24,971 cataract surgeries;
  400+ village health camps covering 19,000+ individuals.
- **education** — "Education", `#f2b928` / `#f7e8b0`: 317,705 students impacted;
  10,649 scholarships; 4,500+ teachers trained; 659+ school libraries; 18,800+
  students with solar infrastructure in 365+ schools.
- **economy** — "Economic Development", `#1fa76a` / `#dff2e7`: **"Donation" /
  "million"** (placeholder value — a real ₹ figure is missing and must be supplied);
  50,800+ entrepreneurs; 10,500+ youth skilled; 103,000+ farmers trained; 21,352
  women empowered.

A "View Our AIM" button at the bottom has **no handler** (placeholder). Grid is
5 columns → 3 (≤1100px) → 2 (≤760px) → 1 (≤500px). `.subtitle` and `.whatsapp`
CSS classes exist but are unused.

### `components/Work/Work.js` — client
Infinite carousel of 4 pillars on a `#fecc27` yellow background.
- `PILLARS`: Economic Development, Our Approach, Water and Sanitation, Health —
  each with Unsplash URLs (`?auto=format&fit=crop&w=1000&q=85`) and a description.
- The card list is **tripled** (`[...PILLARS, ...PILLARS, ...PILLARS]`) and
  `activeIndex` starts at `PILLARS.length` (4) so the user begins in the middle
  copy. Movement is a single increment/decrement; a `transitionend` listener snaps
  the index back into `[len, 2*len-1]` to fake infinite scroll.
- Auto-advance every **5200ms**, paused on `onMouseEnter` of the carousel.
- Transform is driven by a CSS custom property: the track sets
  `style={{ "--active-index": activeIndex }}` and CSS computes
  `translateX(calc(var(--active-index) * -1 * (min(30vw,414px) + 20px)))`.
  **Any change to card width must also update that calc.**
- Arrow buttons (`ArrowLeft`/`ArrowRight`) below the track. "Read More ↗" links
  point at `#about`, an id that does not exist (dead link).
- Plain `<img>` is used deliberately (remote hosts are not whitelisted in
  `next.config.js`). Alt text is empty — decorative.
- Responsive ≤700px: card becomes `calc(100vw - 48px)` and the translate calc
  changes accordingly.

### `components/Dream/Dream.js` — server
"Dream Village" explainer. Six points, three per side, arranged by a 3-column ×
3-row CSS grid with a circular centre photo `/Village.jpeg`:
`Swacch (Clean)`, `Sundar (Beautiful)`, `Swasth (Healthy)` on the left;
`Sakshar (Literate)`, `Samruddh (Prosper)`, `Shristi (Climate)` on the right.
Each data item carries `side` ("left"/"right") and `position`
("top"/"middle"/"bottom") which map to CSS-module class names. Dashed curved
connectors (`.point::after`) are drawn toward the centre image and are hidden
≤1050px. "Know More" pill button → `#about` (also a dead link).

### `components/Stories/Stories.js` — server
Dark navy section, id `people-behind-the-promise`. Maps `committeeMembers` into
`next/link` cards at `/people/${member.slug}`. Each card shows the portrait, a
circular sequence badge (`initials`, "01"–"04"), a designation chip (English role +
Marathi role), the name, and an `ArrowUpRight`. Tones alternate via
`styles[`tone${index % 3}`]` for badge colour variety. Cards are a horizontal
scroll-snap row (3-up, `min(46vw,330px)` ≤800px, `82vw` ≤520px). Photos use plain
`<img>` with `object-fit: contain` and a desaturate filter that lifts on hover.

### `components/About/About.js` — client
"Get Involved" — a 7fr/3fr two-column layout:
- **Left**: full-bleed autoplaying muted looping `<video>` (`/TP.mp4`) with a
  gradient shade and overlay copy: eyebrow आई रेमाई देवी, heading "Empowering
  rural lives in India", and three pill chips (सेवा — Service, समर्पण — Dedication,
  विकास — Development).
- **Right** (`id="donate"`): the donation/volunteer card. A native `<form>` with
  cause `<select>` (Education, Livelihoods, Health and wellbeing, Women-led
  communities), then Donate/Volunteer radios.
  **Donate vs Volunteer field switching is pure CSS** using
  `.form:has(input[name="supportType"][value="volunteer"]:checked)` — `.donationFields`
  is hidden, `.volunteerFields` becomes `flex`. No JS involved.
  - Donation fields: frequency radios (once / monthly ♥), amount radios ₹1000–₹5000
    (₹1000 default), a custom INR amount input, a "tell me about volunteering"
    checkbox, and a Continue button (`btn btn-navy`).
  - Volunteer fields: name, email, mobile, address — all `required`.
- `handleSubmit` only intercepts the **volunteer** path: it prevents default and
  stores the name in state, which swaps the form for a thank-you panel
  (`.successMessage`, `role="status"`). **The donation path performs a real form
  POST to `action="#"`** — there is no payment gateway wired up. Wiring Razorpay /
  Instamojo is an open task.
- Both panels are `height: 590px` with `.form { overflow-y: auto }` — the card does
  not grow with content. Raise this when adding fields.
- Breakpoints: 860px (single column), 480px (auto height).

### `components/Footer/Footer.js` — server
Navy footer. Brand column (logo + आई रेमाई देवी + tagline + CIN) plus three link
columns: Who We Are, Our Work, Get Involved. **Every footer link is `href="#"`** —
all placeholders. Bottom bar uses `new Date().getFullYear()` and notes Section 8
registration. The footer also carries `id="donate"`, duplicating the About card's
id — only one should keep it.

### `lib/committeeMembers.js` — data module
Array of 4 members + `getCommitteeMember(slug)` helper. Fields: `slug`, `name`,
`role`, `marathiRole`, `marathiName` (absent on the Secretary), `initials`,
`image`, `institution` (absent on the Secretary), `paragraphs[]`.

| slug | Name | Role | Marathi role | Image |
|---|---|---|---|---|
| `trustee` | Shri. Megeshyam Dattaram Khedekar | Trustee | विश्वस्त | `/trustee.jpeg` |
| `president` | Shri. Santosh Waman Kate | President | अध्यक्ष | `/President.jpeg` |
| `secretary` | Shri. Sagar Keshav Khedekar | Secretary | सचिव | `/secretary.jpeg` |
| `treasurer` | Shri. Tejas Dipak Darge | Treasurer | खजिनदार | `/treasurer.jpeg` |

Each has 5–6 long paragraphs of first-person text about the institution's values
(transparency, accountability, collective effort, service). Treat this prose as
verbatim source content — do not rewrite, summarise, or "improve" it unless asked.

### `app/people/[slug]/page.js` — server, statically generated
- `generateStaticParams()` returns all four slugs (pure SSG, no runtime lookup).
- `notFound()` for an unknown slug.
- Layout: back link to `/#people-behind-the-promise`, then a 2-column profile —
  left photo panel with the sequence badge, right the member's message
  (institution eyebrow, name, "Designation: Role · मराठी", Marathi name, rule, all
  `paragraphs`). A bottom nav links across all four roles, highlighting the
  current one.
- The route deliberately has **no Header or Footer** — it is a bare standalone page.

## 7. Assets in `public/`

`BATCH.jpg` (logo), `main.png` (hero), `Village.jpeg` (Dream centre + person page
backdrop), `President.jpeg`, `secretary.jpeg`, `treasurer.jpeg`, `trustee.jpeg`,
`donations.webp`, `1.jpeg`–`5.jpeg` (unused). `.next/cache/images/**` contains
generated webp variants — ignore.

## 8. Known gaps / TODOs (verified, not guesses)

1. **`public/TP.mp4` does not exist.** `About.js` references it, so the video panel
   renders as a plain navy block. Supply the file or swap in a poster image.
2. **No payment gateway.** The donation form posts to `#`. Needs Razorpay/Instamojo
   or a server action.
3. **Duplicate `id="donate"`** on both `About`'s card and the `Footer`.
4. **Dead anchors:** `#about` is used by `Work` and `Dream` but no element defines it.
5. **`#` placeholder links** throughout `Footer` and all footer-style columns.
6. **Header dropdown code is unused** (`items: null` everywhere).
7. **Mobile menu does not close** after navigating.
8. **`economy` tab first card reads "Donation / million"** — a real number is needed.
9. **"View Our AIM" button has no handler.**
10. **`.next/` is committed to git** and `.gitignore` only lists `node_modules`.
    Untrack it and add `.next` to `.gitignore`.
11. **`README.md` is out of date** — it describes a flat `components/*.js` layout
    with a `Stats.js` component that no longer exists.
12. Unused CSS classes: `.subtitle` and `.whatsapp` in `impact.module.css`,
    `.eyebrow`/`.btn-primary`/`.btn-outline` in `globals.css`.
13. Several components carry `"use client"` without needing it (`Hero`, `Impact`'s
    only state is the tab, though it does need it).

## 9. How to make common changes

**Add a homepage section:** create `components/Foo/Foo.js` + `Foo.module.css`
(matching the existing PascalCase folder pattern), give the root element an `id`,
import and render it in `app/page.js`, add the anchor to `NAV` in `Header.js`.

**Add an impact stat:** append an object to the relevant tab's `cards` array in
`impact.js` with `{value, label, desc, icon}` — the icon is imported from
`lucide-react` and referenced directly. Keep exactly 5 per tab unless the grid CSS
is updated.

**Add a committee member:** append to `lib/committeeMembers.js` with a unique
`slug`, `initials` as the next sequential number (`"05"`, `"06"`, …), an
`/image.jpeg` path, and `paragraphs`. Drop the portrait in `public/`. The home grid
and the person page update automatically via `generateStaticParams`.

**Change branding colors:** edit the `:root` tokens in `app/globals.css` — but
audit Header, Hero, Work, Dream and Impact first, since they hardcode their own
palette.

**Rebrand fonts:** change the four `--font-*` tokens plus the Google Fonts URL in
`app/layout.js`.

## 10. Verification checklist

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # must succeed; catches RSC/client-boundary errors
```

Then manually confirm: all five header anchors scroll to their sections; the Impact
tab switches and re-colors the cards; the Work carousel auto-advances, pauses on
hover, and wraps without a jump; the Dream grid stays aligned at 1050px/760px/480px;
each committee card opens its `/people/[slug]` page; the Donate/Volunteer radio
toggles the correct field set; the volunteer submit shows the thank-you panel.

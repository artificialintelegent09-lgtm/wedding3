# Digital Wedding Invitation

A premium, mobile-first digital wedding invitation built with Next.js (App Router), TypeScript,
Tailwind CSS, Framer Motion and Lucide. It is a **fully static site**: no backend, no database,
no server runtime. `next build` produces plain HTML/CSS/JS that any static host can serve.

The flagship template is **Royal Romance**, art-directed as *Cinematic Botanical Romance*: oxblood and
antique ivory carry the contrast, champagne gold and dusty rose are accents, with a Bodoni Moda / Jost
type pairing, line-drawn botanicals that draw themselves in, and printed-stationery event and gift cards.

## How guest responses work (no backend)

| Feature | How it works | What the couple receives |
| --- | --- | --- |
| **RSVP** | Guest fills the form → a prefilled `wa.me` link opens WhatsApp with the reply written out. | A WhatsApp message in the couple's chat, **once the guest presses Send**. |
| **Wishes** | If `wishes.formUrl` is set (e.g. a Google Form) the guestbook card opens it in a new tab. Otherwise the guest writes a wish that opens in WhatsApp, prefilled. | A form response, or a WhatsApp message. |
| **Guestbook wall** | Shows the messages listed in `wishes.featured` in the data file. Entries flagged `sample: true` get a visible "Sample" tag and an explanatory note, so demo content can never pass for real messages. | n/a: it is content you curate. |

Nothing is stored by the site, and the UI never says a reply was "saved": after the WhatsApp
hand-off it tells the guest to press **Send** in WhatsApp. To show new wishes on the wall, add
them to `featured` and redeploy.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Personalise the cover for each guest with `?to=` (works in both languages):
`http://localhost:3000/amelia-rafael/?to=Budi+Santoso`

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export into `./out` |
| `npm run preview` | Serve `./out` locally (via `npx serve`) |
| `npm run typecheck` / `npm run lint` | TypeScript and ESLint |
| `npm run images:optimize -- <in> <out>` | Resize/compress photos and strip GPS metadata |

## Creating an invitation

1. Copy `src/data/invitations/amelia-rafael.ts`, edit the content (names, events, bank accounts…).
2. Put photos in `public/images/<your-slug>/` and point the data file at them.
   Run `npm run images:optimize -- ./originals public/images/<your-slug>` first: there is no image
   optimizer on a static site, so photos are served exactly as you provide them (aim for ≲ 300 KB each).
3. Register it in `src/data/invitations/index.ts`. It is then built at `/<slug>/`.

### RSVP and wishes configuration

```ts
rsvp: {
  whatsappNumber: "6281234567890", // international format; "+62 812-3456-7890" also works
  maxGuests: 4,
},
wishes: {
  formUrl: "https://forms.gle/your-form-id", // optional; https only. Omit to use WhatsApp.
  // whatsappNumber: "...",                  // optional; defaults to the RSVP number
  featured: [{ name: "Aunt Maya", message: "…", date: "2027-01-12" /* , sample: true for placeholders */ }],
},
```

- No valid `rsvp.whatsappNumber` → the RSVP section is hidden (never a dead form).
- No `formUrl` and no WhatsApp number → no way to send wishes, so the wishes section only appears
  if there are `featured` messages.
- The demo number `6281234567890` is fictional. Replace it.

**Google Form tip:** create a form with *Name* and *Message*, click Send → link icon, and paste
the URL (`https://forms.gle/…` or `https://docs.google.com/forms/…`).

## Languages

The invitation ships bilingual: **Bahasa Indonesia is the default**, and guests can switch to
English with the ID/EN toggle (top-right). Switching re-renders in place (no reload), persists in
`localStorage`, updates `<html lang>`, and carries through everything: section titles, forms,
validation, countdown labels, calendar menus, date formats (`20 Maret 2027` ↔ `20 March 2027`)
and the prefilled WhatsApp RSVP/wish messages. Personal data (names, dates, numbers, addresses)
never changes with the language.

- UI strings live in `src/lib/i18n.ts` (one `Copy` dictionary per language; the type keeps them in sync).
- Invitation content uses `LocalizedText`: a plain string, or `{ id: "…", en: "…" }` per field,
  resolved with `lt()` — see `src/data/invitations/amelia-rafael.ts` for examples.
- The default language per invitation is its `locale` field.

## Design system

- **Tokens** (palette, fonts) live in `src/app/globals.css`; sections use semantic names (`bg-primary`, `text-gold`, `bg-rose-light`…). Surfaces (`surface-paper`, `-aged`, `-rose`, `-oxblood`, `-espresso`) share one grain texture.
- **Botanicals:** `components/ornaments/botanical-line.tsx` (line art, animated on scroll) is the everyday ornament; the filled roses in `botanical.tsx` appear only in the opening and the closing.
- **Motion** is Framer Motion, transform/opacity/clip-path only, and honours `prefers-reduced-motion`.
- Bodoni Moda is a variable optical-size font; see the note in `globals.css` before changing its `opsz` settings (hairlines vanish at 1x density).

## Project structure

```
src/
  app/                    Routes ([slug] is generated at build time), layout, fonts
  components/             Shared building blocks: motion, ornaments (SVG florals), ui, forms
  data/invitations/       ← Content: one TypeScript file per invitation + registry
  lib/                    i18n, date/calendar helpers, WhatsApp/contact helpers, validation
  templates/              ← Visual designs. royal-romance/ = Shell, nav and 11 sections
  types/invitation.ts     The data contract every template reads
```

Content, design and logic are separate: a new template (Ivory Bloom, Editorial Love…) is a new
folder in `src/templates/` plus one line in `src/templates/registry.ts`.

## Deploying (static)

`next.config.ts` sets `output: "export"` and `trailingSlash: true`; `next build` writes `./out`.

**Vercel:** import the repo (framework preset *Next.js* is detected and handles the export), add
`NEXT_PUBLIC_SITE_URL` in Project → Settings → Environment Variables, deploy.

**Any static host** (Netlify, Cloudflare Pages, GitHub Pages, S3…): run `npm run build` and upload
`./out`. Because of `trailingSlash`, `/amelia-rafael/` resolves to a real `index.html`, so no rewrite
rules are needed.

### Environment variables

Only one, and it is public: `NEXT_PUBLIC_SITE_URL` (see `.env.example`). Without it, link previews
(WhatsApp, Facebook) point at `localhost` for the preview image.

## Notes and limitations

- **Maps:** the venue map uses Google's keyless embed (`maps.google.com/maps?q=…&output=embed`).
  The "Open in Google Maps" button uses the official URL scheme. No API key is needed.
- **Responses are not collected by the site.** They arrive via WhatsApp / your form. There is no
  dashboard and no counting of RSVPs; that lives in your WhatsApp chat or Google Form.
- **Demo photos are real wedding photography from Pexels** (free license; see `public/images/amelia-rafael/CREDITS.txt`). Replace them with the couple's own photos for a real invitation.
- Invitations are `noindex` (private to guests); change `robots` in `src/lib/metadata.ts` if you want otherwise.
- Cache Components / partial prefetching are not enabled: they are server-rendering features
  and are incompatible with `output: "export"`.

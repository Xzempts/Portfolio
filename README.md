# Mohammad Ebrahim — Cyber Security Researcher Portfolio

An immersive, interactive portfolio for **Mohammad Ebrahim**, a Cyber Security Researcher focused on vulnerability research, reverse engineering, and offensive security. Built with **Next.js 16**, **React Three Fiber**, and **Tailwind CSS v4**, it features a 3D mechanical keyboard hero scene themed around a security toolkit, seasonal themes, smooth scroll animations, bilingual support (EN/ES), and a fully responsive design.

The content — hero, security stack, experience, education, and research projects — is driven by Mohammad's résumé (`public/cv.pdf`).

> This portfolio is based on the open-source [3d-portfolio](https://github.com/Txemalon/3d-portfolio) template by Txema Albero, re-themed and re-populated for a cybersecurity researcher.

---

## Highlights

- **Interactive 3D Keyboard** — A full mechanical keyboard rendered with React Three Fiber and Three.js. Keys react to real keypresses with physics-based animations and sound effects.
- **Seasonal Themes** — Four complete visual themes (Winter, Spring, Summer, Autumn) that re-skin the entire UI — colours, gradients, and 3D scene lighting — with a single click.
- **Project Showcases** — Modal dialogs with image carousels, tech stack chips, and links to live demos and source code.
- **Bilingual (ES/EN)** — Lightweight custom i18n layer with zero external dependencies. Language toggle persists across sections.
- **Smooth Scroll & Reveal Animations** — Powered by [Lenis](https://github.com/darkroomengineering/lenis) for buttery smooth scrolling with intersection-observer-based reveal effects.
- **Custom Cursor & Magnetic Targets** — A custom cursor that morphs on interactive elements, with magnetic snap behaviour on buttons.
- **Responsive & Mobile-First** — Optimised for recruiters reviewing on phones. WebGL performance and touch interactions are first-class concerns.
- **Security Headers** — HSTS, X-Frame-Options, Content-Type-Options, Referrer-Policy, and Permissions-Policy configured out of the box.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | [Simple Icons](https://simpleicons.org/) (tech logos on 3D keycaps) |
| Language | TypeScript |
| Deploy | Vercel / Docker |

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 10+

### Installation

```bash
# From the project root

# Install dependencies
npm install

# Start the development server (any free port; example below)
npm run dev -- -p 43127
```

Open [http://localhost:43127](http://localhost:43127) in your browser (or
`http://localhost:3000` if you run `npm run dev` without a port).

### Build for Production

```bash
npm run build
npm start
```

### Docker

The project includes a multi-stage Dockerfile optimised for production (standalone output, ~100 MB final image):

```bash
docker build -t 3d-portfolio .
docker run -p 3000:3000 3d-portfolio
```

## Project Structure

```
├── app/
│   ├── globals.css        # Tailwind + CSS custom properties (seasonal themes)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page with all sections
├── components/
│   ├── FrozenKeyboard.tsx # 3D keyboard scene (R3F)
│   ├── FrozenBackground.tsx # Animated background particles
│   ├── Carousel.tsx       # Image carousel for project modals
│   ├── ProjectModal.tsx   # Fullscreen project detail dialog
│   ├── SeasonProvider.tsx # Seasonal theme context
│   ├── SeasonPicker.tsx   # Theme switcher UI
│   ├── LanguageProvider.tsx # i18n context
│   ├── LanguagePicker.tsx # Language toggle
│   ├── CustomCursor.tsx   # Custom cursor with hover states
│   ├── MagneticTargets.tsx# Magnetic snap on interactive elements
│   ├── Reveal.tsx         # Scroll-triggered reveal animations
│   ├── SectionNav.tsx     # Dot navigation sidebar
│   ├── ScrollProgress.tsx # Scroll progress indicator
│   ├── CopyEmail.tsx      # Copy-to-clipboard button
│   └── smooth-scroll.tsx  # Lenis smooth scroll wrapper
├── lib/
│   ├── i18n.ts            # Bilingual dictionary (ES/EN)
│   └── seasons.ts         # Season theme definitions
├── public/
│   ├── fonts/             # 3D text typefaces
│   ├── projects/          # Project screenshots
│   └── sounds/            # Keyboard sound effects
├── Dockerfile             # Multi-stage production build
├── next.config.ts         # Standalone output + security headers
└── package.json
```

## Customisation

### Adding a Project

Projects are defined in `app/page.tsx` in the `projects` array. Each entry supports:

```typescript
{
  num: "05",
  name: { es: "Mi Proyecto", en: "My Project" },
  stack: ["Next.js", "TypeScript"],
  desc: { es: "Descripción corta", en: "Short description" },
  details: { es: "Descripción larga...", en: "Long description..." },
  url: "https://myproject.com",          // optional — adds "View Site" button
  github: "https://github.com/user/repo", // optional — adds "View Code" button
  media: ["/projects/my-project/1.png"], // optional — carousel screenshots
  highlights: ["nextdotjs", "typescript"], // simple-icons slugs for 3D keyboard
  badge: { es: "En desarrollo", en: "In progress" }, // optional status badge
  align: "left",                         // card alignment
  section: "project5",                   // data attribute for scroll nav
}
```

### Changing Themes

Seasonal colour tokens are defined as CSS custom properties in `app/globals.css` under `[data-season="..."]` selectors. Edit or add new seasons there.

### Translations

All UI strings live in `lib/i18n.ts` as a flat dictionary with `{ es, en }` leaves. Add new keys or languages by extending the structure.

## Deployment

### GitHub Pages (free, current setup)

This repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that
builds a **static export** and publishes it to GitHub Pages on every push to the
default branch.

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source: GitHub Actions**.
3. (Optional custom domain) Under **Settings → Pages → Custom domain**, enter
   your domain and save. GitHub provisions a free HTTPS certificate
   automatically once DNS resolves. A `CNAME` file is committed for you.
4. Point your registrar's DNS at GitHub Pages:
   - **Apex** (`example.com`) — four `A` records to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and the matching `AAAA` records for IPv6).
   - **www** — a `CNAME` to `<your-github-username>.github.io`.

The static build is produced with `EXPORT=true npm run build`, which writes the
site to `out/`. To preview it locally: `npx serve out` (or
`python3 -m http.server --directory out`).

> Note: static hosts like GitHub Pages can't apply the Next.js `headers()`
> security headers. They're only emitted for the server/Docker build. Configure
> equivalent headers at your CDN if needed.

### Vercel

Vercel auto-detects Next.js with zero config and keeps the security headers
working. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).

### Docker / Self-Hosted

The included `Dockerfile` produces a standalone Next.js image (server build,
no `EXPORT`). Works with any container platform (Railway, Fly.io, Coolify, etc.):

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Performance

- **Standalone output** — No `node_modules` in production; the Docker image is ~100 MB.
- **Lazy loading** — Project screenshots use native lazy loading.
- **Font optimisation** — Uses `next/font` for zero-layout-shift web fonts.
- **Turbopack** — Sub-300ms dev server cold starts.

## License

This project is open source and available under the [MIT License](LICENSE).

## Content owner

**Mohammad Ebrahim** — Cyber Security Researcher

- Email: msackran@umich.edu
- Phone: 734.883.2142
- Location: Ypsilanti, MI

Résumé content is rendered from `public/cv.pdf`. To update the portfolio, edit
the `projects`, `experiences`, `education`, and `coursework` arrays in
`app/page.tsx`, the security toolkit in `lib/skills.ts`, and the copy in
`lib/i18n.ts`.

## Template credit

Based on the open-source [3d-portfolio](https://github.com/Txemalon/3d-portfolio)
template by **Jose Maria Albero Belamendia (Txema)**, available under the MIT License.

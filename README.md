# Lambert Badong — portfolio site

Static, dependency-free site (no build step). Design: "Switchgear Render" — CSS-3D switchgear line-up with interactive balloons, office cut-away and home room scenes.

## Structure

```
index.html        page markup (fully rendered; works without JavaScript)
404.html          not-found page (GitHub Pages serves it automatically)
css/style.css     all styles: design, CSS-3D models, animations, responsive rules
js/main.js        interactions: camera views, door/explode/rotate, section cut, HUD boot,
                  laptop screens, part spins, Tool Hub rows, agent nodes, bots, mobile menu,
                  motion toggle, stage scaling, scroll-reveal fallback
assets/img/       Daybook screenshots + icon (WebP with PNG fallback), og.png share image
favicon.svg       "LB" monogram
robots.txt, sitemap.xml, .nojekyll
```

Notes
- Fonts: IBM Plex Sans / Mono from Google Fonts (`display=swap`, system fallbacks).
- Motion: honours `prefers-reduced-motion`; the "Motion on/off" button in the nav turns all animation off and is remembered in `localStorage`.
- Scroll reveals use CSS scroll-driven animations where supported and an IntersectionObserver fallback elsewhere; without JS everything is simply visible.

## Deploy to GitHub Pages

1. Create a repository named `LamboProjects.github.io` (user site) — or any repo for a project site.
2. Copy the contents of this `site/` folder to the repository root (keep `.nojekyll`).
3. Commit and push to `main`.
4. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
5. The site will be live at `https://lamboprojects.github.io/` within a minute or two.

If you publish as a project site instead (e.g. `https://lamboprojects.github.io/portfolio/`), update the `canonical`, `og:url`, `og:image`, `twitter:image` URLs in `index.html`, the URL in `sitemap.xml`/`robots.txt`, and change the absolute `/css/…` and `/` links in `404.html` to the project path.

# Rashmi Rathore — Portfolio (GitHub Pages)

This repository is a static portfolio site intended to be published via GitHub Pages.

Quick notes
- Resume PDF: `assets/Rashmi Resume.pdf` (download linked from the site).
- Images: stay in `assets/` subfolders (`logo-design`, `photography`, `poster`, `sketch`).
- Styles: `css/style.css` — minimal, modern layout.
- Scripts: `js/main.js` loads `js/projects.json` to render the gallery.

Run locally

```bash
# Serve site locally from repo root
python3 -m http.server 8000
# then open http://localhost:8000/
```

Deploy to GitHub Pages

1. Push to the `main` branch.
2. In repo settings -> Pages, set source to `main` branch (root) and save.

If you want thumbnails or resized images, generate them into `assets/thumbs/` and update `js/projects.json` to point to the smaller images for faster load.

Accessibility & privacy
- No contact forms are included.
- All images should have alt text defined in `js/projects.json` or generated from project titles.
# Rashmi Rathore — Portfolio (GitHub Pages)

This repository contains a static portfolio website for Rashmi Rathore, built as a single-page responsive site using HTML, CSS, and a small JavaScript file.

Preview (after publishing): https://rathorerashmi.github.io

## Files included
- `index.html` — main site
- `css/style.css` — styles
- `js/main.js` — small interactions (menu, smooth scroll, lightbox)
- `assets/avatar.svg`, `assets/project1.svg`, `assets/project2.svg`, `assets/project3.svg` — placeholder images
- `resume.md` — your resume content (editable)
- `README.md` — this file

## Deploy (quick)
1. Commit these files to the root of your repository named `rathorerashmi.github.io` on the `main` branch.
2. GitHub Pages will publish automatically (no special settings needed when repo name matches `username.github.io`).
3. Visit: `https://rathorerashmi.github.io`

Commands:
```bash
git clone https://github.com/rathorerashmi/rathorerashmi.github.io
# copy site files into the repo directory, then:
git add .
git commit -m "Add portfolio site"
git push origin main
```

## Customize
- Replace SVG placeholders in `assets/` with your high-resolution JPEG/PNG files. Keep the same filenames or update file references in `index.html`.
- Replace `resume.md` with `resume.pdf` if you prefer a downloadable PDF; update the link in `index.html`.
- Edit contact details (phone, email, location) directly in `index.html`.
- For a contact form that doesn't open the user's email client, integrate Formspree, Netlify Forms, or a backend endpoint.

## Accessibility & SEO
- Update `<title>`, `<meta name="description">`, and Open Graph metadata if you add social sharing.
- Use descriptive alt text for images.

## Help
If you want, I can:
- convert `resume.md` into a PDF file,
- create a downloadable high-res portfolio PDF,
- add analytics or a contact form with Formspree,
- convert this to a small multi-page site or use a static-site generator (Jekyll, Eleventy).

Just tell me which tasks you'd like next.
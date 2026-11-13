# Ozih Uddin Al Fuzayel: portfolio ("The Test Report")
Files: `index.html`, `style.css`, `script.js`. No build step.

## Edit content
- Text, links, projects, timeline: `index.html`.
- Results strip numbers: `data-count` attributes (currently PLACEHOLDERS: set your real figures or relabel).
- Skills list: the `SKILLS` object at the top of `script.js`.
- Colors: CSS variables at the top of `style.css`.
- Add your CV as `cv.pdf` next to `index.html` (the Download CV button links to `/cv.pdf`).
- Add `og-image.png` and an `og:image` meta tag if you want link-preview art.

## Deploy on Netlify
1. Drag this folder onto app.netlify.com/drop, or push to Git and connect the repo (no build command, publish directory `.`).
2. Forms: Netlify detects the `contact` form on deploy. Enable email notifications under Site settings > Forms.
3. If the form POST fails (for example locally), the page opens a mailto link instead.

## Profile photo
Save your photo as `img/profile.jpg` (portrait, about 480x600, under 200 KB). Until it exists, a striped placeholder is shown. Edit the alt text in `index.html` if you change the file.

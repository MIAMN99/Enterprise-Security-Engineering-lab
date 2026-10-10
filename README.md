# Enterprise Security Engineering Lab — Portfolio Website

A responsive, static GitHub Pages portfolio for a Cisco ISE / enterprise network access control lab.

## Website features
- Professional responsive dark theme
- Project overview and technology areas
- Six implementation stages
- **Automatic screenshot gallery**: reads public PNG/JPG/WEBP files from the GitHub repository through the public GitHub API, including screenshots already uploaded to the repository root
- Full-screen image viewer
- No frameworks, build step, or paid hosting required

## Publish on GitHub Pages

1. Download and extract the website ZIP.
2. In your GitHub repository `MIAMN99/Enterprise-Security-Engineering-lab`, choose **Add file → Upload files**.
3. Upload `index.html`, `styles.css`, and `script.js` **directly to the repository root** (same level as `.github/`). You may also upload this README, but consider merging it with your existing project README instead of overwriting it.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages** and choose **Deploy from a branch**, branch `main`, folder `/(root)`, then **Save**. If you keep an existing GitHub Actions Pages deployment, ensure that workflow publishes these three files from the site root instead.
6. Wait for deployment, then visit `https://miamn99.github.io/Enterprise-Security-Engineering-lab/`.

**Important:** If the website displays a 404, check the Pages source and ensure the published root contains a lowercase `index.html`. If GitHub Actions is selected as the Pages source, the workflow must publish the files from the right directory.

## Updating the portfolio

- To add more screenshots, upload images anywhere in the same repository (except `assets/` and `site-assets/` folders). The gallery will find them automatically.
- To edit descriptions and project stages, edit `index.html`.
- To customize appearance, edit `styles.css`.
- To use a different GitHub username or repository name, edit `OWNER`, `REPOSITORY`, and `BRANCH` at the top of `script.js`, and update the GitHub links in `index.html`.
- If the repository becomes private, the screenshot gallery will not load through the public API.
- GitHub API anonymous rate limits may temporarily prevent the gallery from loading. The repository link remains available.

## Accuracy and security

The template uses cautious wording based on visible screenshot filenames, not independently verified test results. Replace descriptions with your actual topology, methods, and validation evidence. Never publish real passwords, tokens, secret keys, private customer information, or unapproved production configurations.

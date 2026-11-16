# codeBims.github.io
Portofolio data dan analitik Henry Abimanyu Dewandani

Static HTML/CSS/JavaScript, published through GitHub Pages. Run locally with `python -m http.server 4186 --bind 127.0.0.1`.

Before publishing: `python scripts/check_site.py`, `node --check app.js`, `node --check i18n.js`, `node --check comments.js`, and `node --check analytics.js`. Then exercise the real browser flow in both themes and languages, including a phone width, galleries/video, media dialog, direct case URLs, and CV download. After publishing, confirm deployment and the public assets.

Product facts and claim boundaries: [PRODUCT.md](PRODUCT.md). Analytics activation: [ANALYTICS.md](ANALYTICS.md). User test protocol: [USER_TEST_PLAN.md](USER_TEST_PLAN.md).

Interactive figures: also run `node scripts/check_motion.cjs` and `node --check motion.js`. Video seeking requires a preview server supporting HTTP byte ranges, as GitHub Pages does; Python's basic `http.server` alone does not reproduce that behavior. Shared-element transitions use native CSS with ordinary navigation as the fallback. Respect the device's reduced-motion setting when reviewing automatic motion.

Exhibition styling: `immersive.css` and `immersive.js` share `effects-policy.js` with the existing gallery/figure scripts. Check `node scripts/check_effects.cjs`, `node --check effects-policy.js` and `node --check immersive.js`. The header animation picker stores device/full/paused preferences. Device reduced motion is the default; full effects require an explicit site-level choice. Reduced-mode clicks receive short opacity feedback, and paused mode stays still. Manrope/Newsreader fonts are served locally with source/checksum/license records in `assets/fonts/`.

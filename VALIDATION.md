# Validation, 15 November 2026

Environment: actual checkout `E:\AI\sites\codeBims.github.io`; local Python server and browser. No framework migration or backend-policy change.

Verified before release:

- Four public HTML pages pass the local asset/anchor and duplicate-ID check. JavaScript syntax checks and `git diff --check` pass.
- Desktop and phone appearance inspected in Indonesian/English and light/dark themes. Layout overflow checked at actual browser widths 342, 361, 430, 771, 1026, 1263, and 1444 CSS pixels. No horizontal page overflow observed.
- All six projects select correctly, all six next-slide controls change the visible slide. World Happiness renders the two sourced chart previews.
- Automatic rotation verified with reduced motion disabled in a local fixture. User pause is separate from temporary viewport/focus pauses. Default reduced-motion environment keeps auto controls hidden and media still.
- Native thesis video reaches readyState 4 and plays; ArrowRight on the video keeps slide 3 selected. Switching project pauses the video.
- Media enlargement opens a native modal, Escape closes it, and focus returns to the original enlarge button.
- Browser Back restores the selected case. All three independent detail URLs render without broken loaded images and keep header before content.
- SQL downloaded through the browser has the same SHA-256 as the source artifact. Existing CV is unchanged.
- A local fetch fixture tested 20-row pagination, a failed second request, preservation of existing rows, retry, and a final 23-row list in a bounded scroll container. Form failure/success feedback and reset were tested locally. No comments were inserted into the public database during this validation.
- No JavaScript console errors observed on exercised flows.
- Previously weak text accent combinations were recalculated after changes: 6.21–9.09:1 for the checked light/dark pairs. Hero 800 px WebP is 21,130 bytes versus the original 1,977,572-byte JPEG. Responsive source descriptors match actual image dimensions.

Limits: desktop browser viewport checks are not physical iOS/Android device tests. No Lighthouse score or field Core Web Vitals result is claimed. User testing with 3–5 people has not occurred. Analytics is prepared but disabled at the owner's request until account configuration is available. Public deployment is verified separately after publishing.

Public smoke check: GitHub Pages deployment succeeded. The public homepage loaded the versioned stylesheet and WebP hero, existing comments loaded, Telkom media enlargement and Escape worked, and the published Online Retail detail page opened with five narrative sections. No console error was observed in those public flows. Analytics remained disabled.

## Interactive motion pass, 15 November 2026

- Added `motion.css`, `motion.js` and a small deterministic figure model. No animation package or backend changes.
- Hero raw/organized/readable selection tested. An isolated local HTML fixture with reduced motion disabled demonstrated automatic stage changes and a stable stage while offscreen. Pause state and reduced-motion control visibility were checked. The fixture is excluded from publication.
- Retail's four stages, Home/ArrowRight keyboard navigation, and Indonesian/English number formatting exercised. Telkom's field stage and derived read 4/write 2/login 2 summary exercised, including its independent page.
- Native thesis video loaded to readyState 4. On a byte-range-capable local server, its range control sought to 50% (3.243 seconds), 75% (4.864 seconds on the detail page), and responded to keyboard navigation. A basic Python server initially produced a zero seekable range; this was an environment limitation, not treated as a passing video test.
- Shared-element names are unique within each document. Featured card navigation, independent detail pages and browser Back exercised. The default browser requests reduced motion, so no claim is made that every browser's cross-document animation has been visually tested.
- Journey links changed the year/photo. Fixed photo cropping and added mobile scroll offset for the sticky chapter navigation. Copy-email action displayed success feedback. Both language/theme combinations inspected.
- No horizontal overflow observed at actual widths 342, 361, 430, 771, 1026 and 1444 CSS pixels. Desktop and phone screenshots inspected. No broken loaded media with a source URL found on exercised pages.
- Existing Telkom next-slide control, original video and related case selection were exercised. No public test comments were submitted; analytics remains disabled. Physical iOS/Android devices and field performance remain untested.

Public verification for this motion pass is recorded after deployment.

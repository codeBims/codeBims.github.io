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

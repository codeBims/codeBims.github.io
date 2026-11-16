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

## Pantau Asap case, 15 November 2026

Added project 07 to the selector and additional-project links, using three real dated screenshots compressed to WebP (85,312 bytes total). The app and repository remain private; the portfolio offers previews and a contact link. Its data limitations and Indonesian/English copy were checked against the project's current README and implementation.

Local browser checks: direct hash selection, switching between projects, discovery through the additional-project disclosure, all three slides, keyboard wraparound, enlargement/Escape/focus return, Indonesian/dark desktop and English/light phone appearance. All three full images loaded. At 361 and 430 CSS-pixel phone widths, no page overflow was observed. No JavaScript errors appeared in the exercised flows.

An isolated local fixture with reduced motion disabled showed automatic advancement from slide 1 to slide 3; an explicitly paused slide stayed at 1 across subsequent checks. The fixture and instrumented script were removed before publication. Normal reduced-motion controls stayed hidden. Existing project selection and model checks still pass. Physical device testing was not performed; no Pantau Asap production settings or public comments were changed.

## Immersive exhibition pass

Implemented self-hosted licensed typography, a layered orbital hero, exhibition-style cards, staggered entrances and project transitions, symmetric contact composition, and a shared persistent motion-pause control. No scroll interception, audio, account changes or analytics activation. Existing project facts, media, CV and private-access boundaries are retained.

- `check_effects.cjs` exercises manual pause/resume, persistence, device priority, language labels and denied storage. All public pages load the policy before the existing gallery/figure consumers.
- In an isolated motion-enabled local fixture, both CSS orbits were running; after the hero left the viewport their play state was paused. The header control stopped effects, restored full-opacity content and hid automatic controls; its pause choice survived reload. Normal device reduced motion kept effects disabled. The temporary HTML/CSS fixture was removed before publication.
- Desktop dark and light layouts and English/Indonesian copy inspected. At actual widths 342, 361, 430, 771, 1026 and 1444 CSS pixels, no page overflow was observed. Fixed a tablet name overflow and a hero focus-note overlap, then rechecked those conditions. Decorative scene numerals are hidden from assistive technology.
- All seven project selectors and next-slide controls exercised. The original video played to readyState 4, sought to 50% (3.243 s), and paused when switching projects. The independent thesis page sought to 75% (4.864 s). Media enlargement/Escape returned focus to its trigger. Retail/derived log stages and email copy feedback remained functional.
- All three independent case pages loaded their visible media without overflow. Existing public comments loaded without submitting test content. No JavaScript errors observed in exercised flows. Strengthened Telkom light-theme lab contrast and dark-theme comment-button contrast; six checked text/accent pairs exceed 4.5:1 (6.06 to 14.08:1).

Limits: browser viewport simulation is not physical iOS/Android testing. No FPS, battery, Lighthouse, field performance or screen-reader score is claimed. Cross-page navigation is exercised; native cross-document animation remains a progressive enhancement whose appearance depends on browser and motion preferences.

## Motion interaction repair, 16 November 2026

Reproduced the public failure: the device preference set the site to paused, disabled the motion button, and made hero point positions jump straight to their targets. Multiple unconditional reduced-motion CSS blocks also prevented a site-level override. The header now has a native accessible animation picker: follow device, full effects, or pause. Device reduction remains the default; an explicit full-effects choice is saved across all four pages. Reduced-mode interactions use brief opacity feedback, with no spatial animation or automatic playback.

The new policy regression failed before the fix, then passed for device default, explicit opt-in, manual pause, system preference changes, persistence, language, invalid stored values and unavailable storage. All existing static-site and motion-model checks pass.

Local browser checks used the real reduced-motion environment, without an overridden media query or temporary CSS fixture. Explicit full mode restored CSS transitions and orbits. Captured intermediate hero coordinates and retail token transforms, then confirmed their final positions; rapid hero clicks and retail End-key selection ended on the selected stage. Training badge entry and its visible-only ring ran; contact copy displayed confirmation and replayed the signal stroke.

Found and fixed a separate hit-target defect: the portrait covered the hero play/pause control. Pointer clicks now change its state. With focus and pointer outside the illustration, the automatic hero advanced after 4.5 seconds. The FitTrack gallery advanced from slide 1 to 2 after 6.2 seconds. All seven project selectors and their next-slide controls worked with the gallery entrance animation. Enlargement/Escape returned focus, and the original thesis video sought to its end through the keyboard range control. Full and paused preferences survived reload. All three detail pages retained full mode without horizontal overflow; no JavaScript errors appeared in the exercised flows.

English/light phone inspection exposed a narrow-width name overflow at an actual 317 CSS pixels. The corrected name sizing and grid produced no horizontal overflow; the stage, play/pause and global pause controls worked there. Indonesian/dark desktop was also exercised. Physical iOS/Android devices and frame-rate measurements remain untested. Comments, analytics and private project access were unchanged.

## Sculpted exhibition, 16 November 2026

Implemented the six agreed extensions using the existing CSS, SVG, native animation and gallery code: converging hero data planes; an aperture reveal with staggered copy on project selection; original per-project decorative motifs; real neighboring-image glimpses around the center gallery; a scroll-drawn gutter thread; and stationary tactile button surfaces with a short ink impression. No new dependency, external art, fabricated data, audio or scroll interception was introduced.

Local browser verification:

- Default device-reduced mode kept the extra planes hidden and spatial animation disabled. Full mode restored layered transforms and CSS motion. Hero front/depth points shared their interpolated positions, and the selected stage converged correctly. The phone version hides the back plane. Found and repaired an English phone hit-target overlap by reserving more heading space; pointer play/pause then worked with no portrait/control intersection.
- All seven project selectors and next-slide controls worked. Both adjacent previews loaded for every case, reusing genuine media; a thesis-video preview uses its poster. Observed the project reveal starting at a 7% circle and settling to its ordinary layout. Only the visible motif ran; other motifs were paused. The observer watches the decorative artwork itself rather than the full case article.
- The FitTrack gallery advanced from 1 to 2 after 6.2 seconds when pointer/focus were outside it, and stopped when global pause was selected. Reserved caption space kept its controls at the same document position across all three slides after the entrance settled. A pointer click produced the ink impression, which cleaned itself up.
- Media enlargement showed the selected original image; Escape restored focus. The thesis range control selected the real video slide and sought to its 6.485-second end. All three detail pages loaded their gallery, decorative motif and saved full-motion preference without overflow or JavaScript errors.
- Inspected Indonesian/light and English/dark layouts. At actual widths 317, 330, 674, 898 and 1263 CSS pixels, no page overflow was observed. Phone gallery inspection retained the full proportional internship photo, readable caption and native controls. The gutter thread stayed outside the main content and updated with navigation.

Checks: JavaScript syntax, motion-model assertions (including adjacent-slide wraparound), policy assertions, static asset/anchor/ID checks and script dependency order. Physical phones, screen-reader operation, frame rate and field performance were not measured. Public comments, analytics, CV content and private project access remain unchanged.

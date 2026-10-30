# Validation record — October 30, 2026

## Automated checks

- 13 Node tests pass: Takeout JSON and microsecond timestamps, CSV quoting, timestamp validation, URL credential/query/fragment handling, deduplication, ChatGPT user/assistant/quote separation, sensitive category suppression, inference minimums, product ranking and negative feedback, malformed inputs, extension caller allowlist, permission denial, visit-period filtering and revocation.
- TypeScript strict compilation passes.
- Vite production bundle builds. No runtime CDN, fonts, remote image requests or external AI dependencies.
- Extension ZIP includes manifest, worker, popup, CSS, JS and original PNG icons. No broad host, cookies, tabs, scripting or credential permissions.

## Browser checks

Tested in the Codex in-app browser against the local Vite server, with a deliberately named `QA-fixture.json` synthetic file in /tmp. The app displayed a DEVELOPMENT TEST FIXTURE banner. No real user records were used.

- Desktop overview and responsive narrow panel rendered; dark/light toggle checked.
- Connect/import modal opened and communicated unpacked-extension limitations.
- File chooser imported 18 synthetic visits and one explicitly labeled test product.
- D3 network rendered category, brand and website nodes with real counts from that fixture.
- Negative feedback changed the recommendation to an excluded/insufficient state.
- Digital footprint rendered the radial timeline, weekly grid, observed website/brand records and activity calendar.
- Individual deletion changed source count from 18 to 17.
- Full reset cleared all records, products and feedback and showed zero real records.
- Reload restored an empty session.

The preview tool's explicit viewport override did not reliably switch an existing desktop tab to 390px. A 615px narrow panel was visually inspected; a physical mobile device was not tested. No claim of complete mobile-device coverage is made.

## Not verified yet

- Real Chrome installation, permission prompt and real browsing-history transfer require explicit approval; not performed.
- Chrome Web Store submission/review is external and has not occurred. Package is ready for unpacked testing, with submission preparation notes; owner assets/contact and review remain.
- Repository made public with explicit owner approval; GitHub Pages configured to use GitHub Actions. Earlier CI runs passed install, 13 tests and build, then failed because Pages was not yet enabled. A fresh deployment is being triggered after configuration; live verification remains pending.
- No automatic live retailer extraction or price verification. Product links/catalogs are supported; prices are supplied snapshots and availability is unknown.
- No personal records analyzed: 0. No personalized products can be recommended without authorized data and real catalog entries.

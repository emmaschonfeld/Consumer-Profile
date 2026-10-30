# Orbit — Consumer Intelligence Lab

React, TypeScript, Vite, D3 force networks, Graphology and Louvain communities. A classroom laboratory for explainable, non-sensitive consumer profiling using only voluntarily supplied records. No example profile or personal data is shipped.

## Run

Node 22+, pnpm 11.25.0: `pnpm install`, `pnpm test`, `pnpm dev`. Dashboard: http://localhost:5173/Consumer-Profile/. `pnpm build` creates `dist/` for GitHub Pages. Base path is `/Consumer-Profile/`.

## Connect Chrome (unpublished testing extension)

1. Download the extension ZIP from Connect data, unzip it, open `chrome://extensions`, enable Developer mode, click Load unpacked, select the extracted folder.
2. Copy its 32-letter extension ID into Connect data. Open the extension toolbar popup and approve history access through Chrome's permission prompt.
3. Select 7, 30, or 90 days in the dashboard and click Analyze history. This only reads history after an explicit dashboard action. No continuous collection.

Chrome Web Store publication has NOT occurred. No listing URL exists. Publishing requires the owner's developer account, submission, and Google review. Unpacked extensions cannot be silently installed. Real installation testing requires explicit user approval and Chrome.

The connector accepts only the configured dashboard path on the exact production origin and localhost/127.0.0.1 port 5173 for testing. Production submissions should remove the two localhost matches. An extension ID is required until a stable Web Store ID exists; insert that verified ID into the UI after publication to remove the manual step. Neither browser automation nor Google login grants history permission.

## Imports

Drop JSON or CSV (up to 30 MB; unzip exports first). Supported: Google Takeout `Browser History` array; Google My Activity JSON records with title/titleUrl/time; ChatGPT conversations.json; arrays or `records` arrays of timestamped browsing / orders; `products` catalogs.

Browsing/order fields: `url`, `title`, `time` (ISO, Unix seconds or Unix milliseconds), optional `kind: "order"`. Records without valid dates are skipped and counted. The app reports skipped rows. It does not invent purchase amounts or infer that a retailer visit is a purchase. Schema aliases include date/timestamp/lastVisitTime and Google Takeout time_usec (microseconds). ChatGPT imports only user-role messages, removes marked blockquotes, quoted strings and code fences. Unmarked quoted content cannot reliably be separated and requires review.

Product fields: `kind: "product"` (or `productName`), `productName`, `url`, `category`, optional `brand`, `price` (number), `currency`, `observedAt`. Known category names: Technology, Style & beauty, Home & living, Outdoors & sport, Food & cooking, Travel, Arts & learning. Product URLs alone are stored as unclassified links; detailed catalog records enable matching. No scraping, anti-bot bypass, remote image requests, price verification, ratings, or availability claims. Imported prices are clearly labeled supplied snapshots.

## Methods and limitations

All analysis is deterministic and runs locally; no external AI model is used. Fixed lexical rules classify interest evidence. Sensitive keyword matches are unclassified and excluded from interest/brand graphs and scoring. This conservative dictionary is not a complete sensitive-content detector; unclassified records can still appear in explicit record review. Inferences never target sensitive traits. Queries and fragments are removed from URLs; titles may retain personal information.

Category interest and segment threshold: 3 records. Segment strength = category count / all records. Style proxies require 10 visits. Research intensity = titles matching review/compare/versus/vs/best divided by visits. Exploration = unique sites / visits; repetition = 1 minus that share. Price sensitivity, novelty seeking, premium/value and convenience remain INSUFFICIENT DATA because these records do not validate them. No psychological personality claims.

Network edge weight counts record co-occurrences; node radius grows as 8 + 3 × square root of evidence count. Louvain community detection groups connected nodes. At most 180 nodes are displayed for performance. Network records are period-filtered. Unclassified records are omitted from inferred networks. Text search highlights nodes; clicking any node opens records; zoom, pan, and drag are enabled.

Matching score is 35 + min(45, category share × 80) + min(15, brand mentions × 3), capped at 95. At least 3 category records required. Scores are heuristics, not probabilities. Negative feedback excludes that category from segments and recommendations; positive feedback remains a separate self-report label.

History search caps at 5,000 URLs and explicitly reports truncation. Each URL is expanded using getVisits and timestamps are filtered to the requested interval; lifetime visitCount is never treated as period activity. This can take time on large histories. Time displays use the viewer's timezone. Deleted or Chrome-expired history cannot be recovered.

## Privacy

Raw records, profiles, products and feedback are held only in tab memory, never localStorage or a server. Reload clears them. Only extension ID is saved locally. No accounts, analytics, third-party fonts/images, telemetry, external AI requests, or data uploads. Static hosting necessarily serves public application assets and may retain normal hosting request logs; personal records are never included in requests. Outbound product links use noreferrer. CSP blocks external connections and images.

Delete individual records, delete sources, reset the session, or disconnect and revoke Chrome permission in Connections & privacy. Disconnect removes imported Chrome records even when the extension is unavailable; in that case revoke manually in Chrome. Reset does not revoke Chrome's permission: use Disconnect as well. Exported sensitive files must never be copied into this checkout.

## Deployment

GitHub Actions tests/builds on main and publishes `dist`. In repository Settings → Pages choose GitHub Actions if not already enabled. Workflow uses pages:write and id-token:write. This application requires no backend or secrets. Production URL is expected at https://emmaschonfeld.github.io/Consumer-Profile/ only after a successful Pages deployment. Do not interpret this expected URL as verification.

## QA

`pnpm test` covers imports, conversation authorship, sensitive suppression, deduplication, scoring/feedback, unsafe URLs, extension allowlisting, denied permissions, visit periods and revocation with mocked APIs. Tests are synthetic fixtures excluded from production bundles. Browser visual/interactivity testing and real extension installation must be reported separately; mocked tests do not establish Chrome installation success.

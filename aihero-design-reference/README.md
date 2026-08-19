# AIHero design reference inventory

Captured on 2026-08-18 from public pages on `https://www.aihero.dev`. These files are design-analysis references only. They are not portfolio assets and must not be published as part of marvinjb.dev.

## Captures

| File | Source | Page/state | Why it matters | Patterns visible |
|---|---|---|---|---|
| `01-learn-map.png` | https://www.aihero.dev/learn | Learning map, desktop | Shows the broad information architecture and the strongest overview composition. | Announcement bar, global navigation, sectional jump links, question-led groups, resource cards, next-step links, footer. |
| `02-skills-list.png` | https://www.aihero.dev/skills | Skills collection, desktop | Demonstrates how a large catalog can remain understandable through numbered groups and supporting narrative. | Category rail, grouped cards, metadata, explanatory sections, change log, repeated calls to action. |
| `03-skill-detail.png` | https://www.aihero.dev/skills-grill-me | Skill detail, desktop | Shows a documentation-like detail template. | Left navigation, article table of contents, narrow reading column, install action, related reading, previous/next flow. |
| `04-guides-list.png` | https://www.aihero.dev/posts | All posts / guide index, desktop | Useful for a dense notes or writing archive. | Compact repeated rows, type/date metadata, summaries, chronological scan pattern. |
| `05-guide-detail.png` | https://www.aihero.dev/tracer-bullets | Article detail, desktop | Shows long-form technical reading hierarchy. | Article header, contents navigation, prose column, subheadings, inline terminology, calls to action, related content. |
| `06-topic-detail.png` | https://www.aihero.dev/topics/get-better-results | Topic detail, desktop | Demonstrates a concise thematic landing page. | Topic title, curated related-resource list, shared global/footer structures. |
| `07-roadmap-guide.png` | https://www.aihero.dev/ai-engineer-roadmap | Ordered guide / roadmap, desktop | Useful for presenting a deliberate progression rather than a flat collection. | Numbered lesson sequence, overview copy, diagram promotion, ordered cards, next action. |
| `08-open-source.png` | https://www.aihero.dev/open-source | Open-source projects, desktop | Closest reference for a portfolio project collection. | Large project rows, alternating media/content rhythm, external actions, short evidence-led descriptions. |
| `09-search-open.png` | Global header | Search dialog, initial state | Reveals the site's keyboard-oriented discovery pattern. | Modal command palette, suggested destinations, keyboard hints, background dimming. |
| `10-search-results.png` | Global header, query `RAG` | Search dialog with results | Shows how mixed content types are returned in one compact search surface. | Live result list, minimal chrome, keyboard navigation, persistent promotion. |
| `11-mobile-navigation.png` | https://www.aihero.dev/learn | Mobile navigation open | Shows how the broad desktop navigation becomes a layered mobile directory. | Full-screen dialog, grouped links, topic accordions, search and theme actions. |

## Access notes

- All captured pages were publicly accessible without authentication.
- `/search` is not a standalone public page; it returns a not-found page. Search exists as a global header dialog, so its open and result states were captured instead.
- The site uses “Map” where the supplied brief referred to the Learn landing page, and “All posts” rather than a separate Guides index.
- A separate topics index was not exposed in the main navigation. The topic detail layout and the topic groups in mobile navigation were enough to document that system without inventing a redundant capture.
- Login, account, checkout, subscriptions, cohorts, and private material were intentionally excluded.

## Usage boundary

Use the screenshots to discuss hierarchy, spacing, interaction, and reusable systems. Do not reuse AIHero branding, copy, screenshots, graphics, course structure, or proprietary content in the finished portfolio.

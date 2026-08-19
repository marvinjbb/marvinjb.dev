# Reusable component analysis

## 1. Global site header

**Reference pattern:** Compact header with a promotion, primary links, search, account actions, and a richer learning directory.

**Portfolio adaptation:** A quieter portfolio header with Marvin's wordmark, Work, Expertise, Notes, About, Search, and Contact. Avoid the education-product promotion and account actions.

**Structure:** Brand; primary navigation; search trigger; primary contact action; mobile menu trigger.

**Important states:** Current route, search open, mobile menu open, keyboard focus, scrolled header.

**Responsive behavior:** Condense links into a full-screen grouped menu; keep search and menu visible.

## 2. Question-led pathway

**Reference pattern:** Visitors choose the question that sounds like their situation.

**Portfolio adaptation:** A “What are you looking for?” section that routes visitors to shipped systems, technical depth, collaboration history, or current experiments.

**Structure:** Short prompt; three or four outcomes; supporting line; anchor or route destination.

**Important states:** Hover, focus, selected anchor.

**Responsive behavior:** Horizontal or grid layout becomes stacked, preserving sequence.

## 3. Resource card

**Reference pattern:** Type metadata, title, description, and link arranged as a repeatable learning item.

**Portfolio adaptation:** Project card containing project name, problem statement, Marvin's role, capability tags, status or result, and case-study/repository actions.

**Important states:** Default, hover/focus, featured, unavailable/private repository.

**Responsive behavior:** Grid cards become single-column rows; actions remain comfortably tappable.

## 4. Dense archive row

**Reference pattern:** Chronological post list with compact metadata and summary.

**Portfolio adaptation:** Notes index or engineering log using topic, date, title, thesis, and reading time.

**Important states:** Hover/focus and optional topic filter.

**Responsive behavior:** Metadata wraps above the title; summaries may shorten but should not disappear completely.

## 5. Project showcase row

**Reference pattern:** Large open-source entries with media, explanation, and external action.

**Portfolio adaptation:** Featured project modules with a product image or architecture diagram, concise outcome, role, stack, and measurable evidence.

**Important states:** Alternate visual alignment on desktop; consistent focus treatment; graceful missing-image state.

**Responsive behavior:** Media moves above copy on mobile.

## 6. Detail-page shell

**Reference pattern:** Local collection navigation plus narrow long-form article and contents links.

**Portfolio adaptation:** Case-study shell with project navigation, overview facts, sticky section index, and a reading column.

**Suggested sections:** Context, challenge, constraints, architecture, decisions, evaluation, outcome, lessons, links.

**Important states:** Active section, collapsed mobile contents, previous/next case study.

**Responsive behavior:** Side navigation becomes a compact disclosure above the article.

## 7. Ordered roadmap

**Reference pattern:** A guide presents lessons in an explicit sequence.

**Portfolio adaptation:** “How I build AI systems” process: frame the outcome, establish a baseline, design the system, evaluate, observe, and iterate.

**Important states:** Optional active step; links into supporting case studies.

**Responsive behavior:** Vertical sequence on small screens.

## 8. Topic collection

**Reference pattern:** A focused landing page curates resources under one theme.

**Portfolio adaptation:** Expertise pages for RAG, agents, evaluations, MCP, and AI platforms, each joining projects, notes, capabilities, and evidence.

**Important states:** Empty or emerging topic should show current experiments rather than an empty grid.

**Responsive behavior:** Single-column content stream with compact filters.

## 9. Search dialog

**Reference pattern:** Global keyboard-friendly search with suggestions and mixed results.

**Portfolio adaptation:** Search across projects, notes, expertise, and experience. Each result should declare its type.

**Important states:** Suggested, typing, results, no results, keyboard selection, closed.

**Responsive behavior:** Near-full-screen sheet on mobile.

## 10. Evidence strip

**Reference pattern:** Repeated supporting metadata and social proof around learning offers.

**Portfolio adaptation:** A deliberately original proof module showing shipped systems, open-source contributions, performance improvements, users supported, or evaluation results. Only use verifiable metrics.

**Important states:** Omit the component when credible metrics are unavailable.

## 11. Footer directory

**Reference pattern:** Multi-column site map plus utility controls.

**Portfolio adaptation:** Compact directory for Work, Expertise, Notes, Profile, GitHub, LinkedIn, email, résumé, and theme.

**Responsive behavior:** Two-column or stacked groups with clear labels.

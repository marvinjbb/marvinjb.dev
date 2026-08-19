# Portfolio mapping for marvinjb.dev

## Product idea

marvinjb.dev should feel like a living AI-engineering knowledge base anchored by proof of work. It is not a course catalog and should not masquerade as one. The primary visitor should understand within seconds what Marvin builds, see credible work, and choose an appropriate depth of exploration.

## Recommended first-release architecture

### Home

Purpose: Establish positioning and route different audiences quickly.

Recommended composition:

1. Original hero with a precise role statement and one sentence about outcomes.
2. Two actions: view selected work and contact Marvin.
3. Three featured case studies.
4. Question-led pathway: “Explore by what you need” or “How can I help?”
5. Expertise overview linking to AI Engineering.
6. Recent technical notes.
7. Short profile and proof strip.
8. Contact invitation and directory footer.

Reference ideas to adapt: clear map, strong hierarchy, reusable resource cards, curated next steps.

### Work

Purpose: Make projects the strongest evidence surface.

Use a featured-project treatment followed by a complete, filterable collection. Suggested filters: LLM applications, RAG, agents, evaluations, platform/backend, and experiments. Filters should appear only when there are enough projects to justify them.

Reference ideas to adapt: open-source showcase rows, dense collection rhythm, concise metadata.

### Case studies

Purpose: Demonstrate judgment, system design, and measurable results—not merely list technologies.

Recommended template:

- Project summary and outcome
- Context and problem
- Marvin's role and collaborators
- Constraints
- Architecture
- Key decisions and alternatives
- Evaluation strategy
- Implementation highlights
- Results and evidence
- Lessons and future work
- Repository, demo, or contact action

Reference ideas to adapt: detail-page shell, contents navigation, related reading, previous/next flow.

### AI Engineering

Purpose: Explain capabilities across projects and writing.

Recommended themes: LLM applications, RAG and retrieval, agents and tool calling, MCP and integrations, evaluations and observability, model gateways, Python/backend systems, and APIs.

Each theme should combine a plain-language capability statement, selected work, engineering principles, and relevant notes. This replaces a shallow keyword-heavy Skills page.

Reference ideas to adapt: topic landing pages and ordered roadmaps.

### Notes

Purpose: Show how Marvin thinks and keep the portfolio current.

Use a compact archive with topic, date, title, short thesis, and reading time. Individual notes can use the same reading shell as case studies while remaining visually distinct.

Reference ideas to adapt: all-posts density, search, related content.

### About / Resume / Contact

Purpose: Provide the human and professional context needed to act.

For the first release, combine these into one Profile page unless Marvin has enough material to justify separate routes. Include biography, selected experience, principles, current interests, downloadable résumé, contact details, and professional links.

Reference ideas to adapt: clear sections and restrained calls to action. Discard education-product enrollment and account patterns.

## Navigation recommendation

Primary navigation:

- Work
- AI Engineering
- Notes
- Profile
- Search
- Contact

This is intentionally simpler than AIHero's navigation. A portfolio does not need separate global navigation layers, course directories, or account actions. On mobile, group destinations by “Explore” and “Connect,” and expose topic links only when they materially help discovery.

## Pattern decisions

### Adapt

- Task- or question-led entry points
- Strong typographic hierarchy
- Reusable content metadata
- Curated related content
- Documentation-style case-study navigation
- Keyboard-friendly global search
- Mobile navigation as a structured directory

### Simplify

- Reduce dual desktop navigation to one primary header.
- Use fewer card variants.
- Keep one clear action per content module.
- Combine About, Résumé, and Contact initially.
- Show only a handful of featured topics on Home.

### Combine

- Merge topic pages and a traditional skills matrix into AI Engineering expertise pages.
- Merge guide-detail and skill-detail shells into one flexible long-form template.
- Let one content record power project cards, search results, related work, and navigation.

### Redesign

- Replace learning progression with an engineering-process narrative.
- Replace lesson metadata with role, system type, stage, and outcome.
- Replace promotional announcements with an optional availability or current-focus indicator.
- Develop an original visual identity using a different type system, accent palette, graphic language, and motion style.

### Discard

- Course, cohort, subscription, login, and checkout patterns
- Subscriber-count social proof
- AIHero naming, copy, illustrations, promotional graphics, and exact card styling
- A large taxonomy before the portfolio has enough content to support it
- Search as a launch requirement if the initial content set is small

## Content model

### Project

Title, slug, summary, problem, role, collaborators, dates, status, capabilities, stack, architecture media, decisions, evaluation, outcomes, repository/demo links, featured flag, and related notes.

### Note

Title, slug, thesis, published date, reading time, topics, body, related projects, and optional code or diagram assets.

### Expertise area

Name, plain-language promise, principles, tools used, representative projects, related notes, and current learning.

This shared model supports cards, archive rows, search, related modules, and social metadata without duplicating content.

## Visual identity direction

Aim for “engineering field notebook meets modern systems portfolio.” Keep the reference site's clarity while establishing a separate identity through:

- A distinctive display face paired with a highly readable text face
- A darker graphite or ink foundation with one memorable technical accent
- Diagram-led imagery instead of course illustrations
- Fine grid lines, restrained code-like annotations, and measured motion
- Original project screenshots and architecture diagrams as the primary visuals

Avoid generic neon-AI gradients, glowing robot imagery, and decorative circuitry unless they communicate real system structure.

## Minimum content required before building

1. Approved name, title, positioning sentence, and short biography.
2. Three strong featured projects with Marvin's actual role and outcomes.
3. At least one architecture diagram or product image for each featured project.
4. Skills and technologies supported by evidence.
5. Work history and résumé source.
6. GitHub, LinkedIn, email, and any live-demo links.
7. Two or three technical notes, or approval to launch Notes as “coming later.”

## Recommended build order after approval

1. Confirm content inventory and positioning.
2. Approve sitemap and original design tokens.
3. Build the Home hero plus one featured project as the first meaningful preview.
4. Complete the shared navigation, cards, and footer.
5. Build Work and the case-study template.
6. Add AI Engineering, Notes, and Profile.
7. Add search only if content volume justifies it.
8. Validate responsive behavior, keyboard use, performance, metadata, and accessibility.
9. Publish only after content and visual review.

## Success criteria

- A visitor can explain Marvin's specialty after the first viewport.
- Every major technical claim links to evidence.
- Projects emphasize decisions and outcomes over tool lists.
- The site remains useful with three excellent projects and scales cleanly as notes and case studies grow.
- The design feels inspired by a polished knowledge platform but cannot be mistaken for AIHero.

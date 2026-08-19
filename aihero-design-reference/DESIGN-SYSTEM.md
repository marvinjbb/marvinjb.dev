# Design-system observations

These are approximate observations from public rendered pages, not extracted implementation specifications. The goal is to understand the visual logic and translate it into an original system.

## Layout

- A pale neutral page canvas supports white or subtly separated content surfaces. The captured background was approximately `rgb(241, 242, 245)` with near-black text.
- Desktop content commonly resolves to a centered shell around 1,140px wide, while collection pages sometimes use a broader presentation. Long-form prose remains substantially narrower than the shell.
- The global header and secondary learning navigation establish context before the page-specific hero. Detail pages then add a persistent local navigation or table of contents.
- Large sections are separated mostly by whitespace and borders, not by heavy shadows or decorative backgrounds.
- Overview pages alternate between an introductory block, grouped collections, supporting explanation, and a closing action. Detail pages use a documentation pattern: local navigation, reading column, and contextual actions.
- The map uses question-led sections rather than generic categories. This creates a task-oriented journey and gives each resource group a reason to exist.
- On mobile, multi-column layouts collapse into a single reading stream. The broad navigation moves into a full-screen dialog with grouped links and expandable topic headings.

## Typography

- The observed UI uses DM Sans with system fallbacks. Marvin's site should select its own type pairing rather than copying this choice automatically.
- Desktop overview H1s are approximately 52px, bold, and tightly led. Detail-page H1s are approximately 44px. Topic titles can be lighter and slightly smaller, showing that weight is also used to distinguish page type.
- H2s carry major content transitions. H3s title individual resources and explanatory subsections.
- Body text is direct, compact, and high contrast. Supporting descriptions use lower contrast while retaining comfortable line height.
- Uppercase or compact labels carry content type, reading time, date, and sequence information. They are visually subordinate to titles.
- Numerals are used as structural signposts in maps, categories, and ordered lessons.

## Recurring components

### Global navigation

A slim announcement strip sits above a compact primary header. A second, richer learning navigation supplies the site's real information architecture. On small screens this becomes a grouped menu dialog.

### Resource cards and rows

The same information model appears at different densities: content type, optional duration/date, title, short description, and destination. Overview cards are roomy; archive rows are compact.

### Local navigation

Detail pages expose nearby items and an article-level contents list. The pattern makes deep material feel explorable and gives users a clear position in a larger system.

### Buttons and links

Primary actions are visually solid or strongly bordered. Secondary actions are often text links with directional cues. Labels are action-oriented and specific.

### Badges and metadata

Metadata is compact, usually uppercase, and separated from the title. Content taxonomy is helpful but never allowed to dominate the card.

### Search

Search appears as a command-palette dialog. It starts with suggested destinations, updates to mixed results, and advertises keyboard navigation. Search is global rather than a separate page.

### Footer

The footer repeats the primary learning collections, account destination, machine-readable resources, theme control, and compact utility navigation. It works as a final site map.

## Visual styling

- Corners are modest rather than highly rounded.
- Fine borders create most component separation.
- Shadows are restrained; hierarchy comes from spacing, surface contrast, and type.
- The palette is largely neutral, with accent color reserved for interactive or promotional emphasis.
- Repeated vertical spacing creates a dependable rhythm: tight within card metadata, moderate between title and description, and generous between page sections.
- Icons are functional and sparse. Text and numerals do most of the navigational work.
- Interactive states appear designed around both pointer and keyboard use. Search explicitly exposes keyboard controls.
- The overall density is medium: much more structured than an editorial blog, but less compressed than an application dashboard.

## Principles worth carrying forward

1. Organize material around visitors' questions, not around the owner's internal taxonomy.
2. Let one content model support cards, rows, search results, and related-content modules.
3. Make deep pages feel connected to a larger body of work.
4. Use spacing and type before decoration.
5. Treat mobile navigation as a designed information surface, not a collapsed list of desktop links.

## Elements not to inherit directly

- The exact neutral palette, DM Sans typography, announcement treatment, and dual-navigation composition.
- Course language, lesson numbering, promotional blocks, subscriber counts, and education-product calls to action.
- AIHero-specific labels, graphics, screenshots, and copy.

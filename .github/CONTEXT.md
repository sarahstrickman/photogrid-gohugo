# Repository Context — Perceocrity Gallery

Hugo-based art portfolio/gallery site. Content is stored in a separate repo and pulled in via script.

## Tech Stack

- **Hugo** (≥ 0.116.0) — static site generator
- **Theme:** `photogrid` (custom, in `themes/photogrid/`)
- **Libraries:** Flickr justified-layout, PhotoSwipe, photoswipe-video-plugin (cloned into `assets/references/`)

## Project Structure

```
hugo.toml                   # Site config (title: Perceocrity, theme: photogrid)
fetch-content.sh            # Clones/pulls content from perceocrity/perceocrity-contents repo
fetch-references.sh         # Clones/pulls third-party JS libraries into assets/references/

content/posts/              # Page bundles — one folder per post (separate Git repo)
layouts/                    # Empty — no theme overrides yet
themes/photogrid/           # Custom theme (layouts, assets, config)
assets/references/          # Third-party library source (justified-layout, PhotoSwipe)
static/                     # Empty
data/                       # Empty
i18n/                       # Empty
public/                     # Built output (committed)
```

## Content Model

Each post is a **Hugo page bundle**: `content/posts/<slug>/index.md` + one image file.

### Frontmatter Structure

```yaml
---
date: YYYY-MM-DD
description: This is a placeholder description.
title: Unique Title            # MUST be unique
categories: [...]              # from a known set (see below)

params:
  private: false               # true = hidden/private post

resources:
  - src: filename.png          # image in the same folder
    params:
      display: true            # whether to show in the gallery
---
```

### Categories

| Group       | Values                                                            |
|-------------|-------------------------------------------------------------------|
| Type        | `artwork`, `doodles`, `sketchbook`, `illustrations`, `commission`, `logo` |
| Subject/OC  | `oc`, `percy`, `stella`, `clementine`, `vocaloid`                 |
| Fandom      | `sky cotl`, `splatoon`, `pokemon`, `kirby`                        |

Nearly every post uses `"artwork"` plus at least one more.

### New Post Workflow

1. Copy `content/posts/[ BLANK ] - copy for new posts/` to a new folder
2. Rename the folder to the post slug
3. Replace the placeholder image with the actual image
4. Update frontmatter: `date`, `title`, `src`, uncomment relevant `categories`, set `display: true`

## Theme — `photogrid`

### Layouts (`themes/photogrid/layouts/`)

| Template         | Purpose                                          |
|------------------|--------------------------------------------------|
| `baseof.html`    | Base skeleton: head, header, main block, footer  |
| `home.html`      | Lists all regular pages with title links          |
| `list.html`      | Section/taxonomy listing                          |
| `single.html`    | Single post: title, date, content, tags           |

### Key Partials

| Partial          | Purpose                                        |
|------------------|------------------------------------------------|
| `head.html`      | Meta tags, CSS/JS includes                     |
| `head/css.html`  | Loads `css/main.css` (minified in prod)        |
| `head/js.html`   | Loads `js/main.js` via Hugo js.Build pipeline  |
| `header.html`    | Site title + main menu                         |
| `footer.html`    | Copyright with dynamic year                    |
| `menu.html`      | Recursive menu walker                          |
| `terms.html`     | Renders taxonomy terms (tags)                  |

### JavaScript

- `main.js` — Placeholder (`console.log`)
- `gallery.js` — Justified grid layout logic (reads aspect ratios, positions items). **Not wired into templates yet.**
- `justified-layout-wasm.ts` — Reference file for WASM alternative (not integrated)

### CSS

`main.css` — Minimal: sans-serif, 768px max-width, 1.5 line-height. Gallery-specific styles not yet implemented.

## Menu (from theme config)

- Home → `/`
- Posts → `/posts/`
- Tags → `/tags/`

## Commented-Out Artifacts

Several frontmatter fields are remnants from a previous "Hugo Gallery" theme:
- `weight` — old sorting mechanism
- `menus` — old menu assignment
- `params.theme` — old light/dark toggle
- `resources[].params.cover` — old cover image flag

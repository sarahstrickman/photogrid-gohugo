# Photogrid Hugo Theme

A Hugo theme for photo gallery and art portfolio sites. Features a responsive justified image grid layout, category filtering, PhotoSwipe lightbox, and dark/light mode toggle.

## Features

- **Justified photo grid** — column-based layout that fills available width, adapting to screen size
- **PhotoSwipe lightbox** — full-screen image viewer with zoom, swipe, and keyboard navigation
- **Category filtering** — filter gallery items by taxonomy with a dropdown checkbox UI
- **Dark/light mode** — toggle persisted in `localStorage`, dark by default
- **Responsive hamburger menu** — collapsible navigation for mobile
- **Page bundles** — each post is a folder with `index.md` + image files
- **Hugo Pipes asset pipeline** — CSS and JS processed, bundled, and minified by Hugo
- **No JavaScript frameworks** — vanilla JS only

## Prerequisites

- [Hugo](https://gohugo.io/installation/) ≥ 0.116.0 (extended edition not required)
- [Git](https://git-scm.com/) (for fetching reference libraries)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/photogrid-gohugo.git
cd photogrid-gohugo

# Fetch reference JS libraries (PhotoSwipe, justified-layout)
./fetch-references.sh

# Start the dev server
hugo serve
```

The theme ships with example content in `themes/photogrid/content/` so you can preview it immediately.

## Project Structure

```
hugo.toml                     # Site configuration
fetch-all.sh                  # Runs both fetch scripts
fetch-content.sh              # Clones/pulls content from an external repo
fetch-references.sh           # Clones PhotoSwipe + justified-layout into assets/references/
content/                      # Your site content (gitignored — managed separately or inline)
layouts/                      # Hugo layout overrides (empty by default)
static/                       # Static assets served as-is
data/                         # Hugo data files
i18n/                         # Internationalization strings
assets/
  jsconfig.json               # Editor path mapping for theme assets
  references/                 # Vendored JS libraries (gitignored, fetched via script)
themes/photogrid/             # The theme
  layouts/                    # All HTML templates
  assets/css/                 # Stylesheets (main.css, photoswipe.css)
  assets/js/                  # JavaScript modules (gallery, lightbox, filter)
  content/                    # Example/demo content
  static/                     # Theme static files (favicon)
```

## Configuration

### Site Config (`hugo.toml`)

```toml
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My Gallery'
theme = 'photogrid'

[markup.goldmark.renderer]
  unsafe = true
```

Set `unsafe = true` to allow raw HTML in Markdown content (e.g., embedded images).

### Menu

The theme reads menu entries from the theme's own `hugo.toml` or your site-level config. Default menu:

```toml
[[menus.main]]
name = 'Home'
pageRef = '/'
weight = 10

[[menus.main]]
name = 'Posts'
pageRef = '/posts'
weight = 20
```

Add or modify entries in your site's `hugo.toml` to customize navigation.

## Content Model

Each post is a [Hugo page bundle](https://gohugo.io/content-management/page-bundles/): a folder containing `index.md` and one or more image files.

### Creating a Post

```
content/posts/my-photo/
  index.md
  photo.jpg
```

### Frontmatter

```yaml
---
title: My Photo
date: 2024-01-15
categories: [landscape, nature]

resources:
  - src: photo.jpg
    params:
      display: true
---
```

| Field | Description |
|-------|-------------|
| `title` | Post title (must be unique) |
| `date` | Publication date |
| `categories` | List of categories for filtering |
| `params.private` | Set to `true` to hide from the gallery |
| `resources[].src` | Image filename in the same folder |
| `resources[].params.display` | Set to `true` to show in the gallery grid |

## Scripts

| Script | Purpose |
|--------|---------|
| `fetch-all.sh` | Runs both scripts below |
| `fetch-content.sh` | Clones/pulls content from an external Git repo into `content/` |
| `fetch-references.sh` | Clones [justified-layout](https://github.com/flickr/justified-layout), [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe), and [photoswipe-video-plugin](https://github.com/dimsemenov/photoswipe-video-plugin) into `assets/references/` |

Edit `fetch-content.sh` to point `REPO_URL` at your own content repository, or manage content directly in the `content/` directory.

## Customization

### Theme Overrides

Place files in the root `layouts/` directory to override any theme template. For example, to customize the footer:

```
layouts/partials/footer.html
```

### Styling

The theme uses CSS custom properties for colors. Override them in a custom stylesheet or in `layouts/partials/head/css.html`:

```css
:root {
  --bg: #1e1e22;
  --text: #e0e0e0;
  --link: #7dacf5;
  --hover: #333;
}

[data-theme="light"] {
  --bg: #f5f5f5;
  --text: #222;
  --link: #1a5bb5;
  --hover: #ddd;
}
```

## License

MIT
# Photogrid Hugo Theme

**Demo:** <https://photogrid-gohugo.pages.dev/>

A Hugo theme for pinterest-style photo gallery and art portfolio sites with a responsive masonry image grid, PhotoSwipe lightbox, category filtering, and dark/light mode.

## Features

- Responsive masonry photo grid with dynamic columns
- PhotoSwipe lightbox with zoom, swipe, and keyboard nav
- Category filtering via dropdown checkboxes
- Dark/light mode toggle (persisted in `localStorage`)
- Responsive hamburger menu
- Hugo Pipes asset pipeline — no JS frameworks



## Configuration

In `hugo.toml`:

```toml
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My Gallery'
theme = 'photogrid'

[markup.goldmark.renderer]
  unsafe = true          # allows raw HTML in Markdown
```

Customize navigation by adding `[[menus.main]]` entries in your site's `hugo.toml`.

## Content

Each post is a [page bundle](https://gohugo.io/content-management/page-bundles/) — a folder with `index.md` and image files. See <https://github.com/sarahstrickman/gallery.sarahstrickman.com> for an example.

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
      display: true      # show in gallery grid
  - src: photo2.jpg
    params:
      display: false      # don't show in gallery grid
---
```

| Field | Description |
|-------|-------------|
| `title` | Post title (must be unique) |
| `date` | Publication date |
| `categories` | Categories for filtering |
| `params.private` | `true` to hide from gallery |
| `resources[].params.display` | `true` to show in grid |

## Scripts

| Script | Purpose |
|--------|---------|
| `fetch-all.sh` | Runs both scripts below |
| `fetch-content.sh` | Clones/pulls content from an external repo  into `content/` |
| `fetch-references.sh` | Fetches [justified-layout](https://github.com/flickr/justified-layout), [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe), and [photoswipe-video-plugin](https://github.com/dimsemenov/photoswipe-video-plugin) into `assets/references/` |

Edit `REPO_URL` in `fetch-content.sh` to point at your own content repo, or manage `content/` directly.

## Customization

Override any theme template by placing a file at the same path in the root `layouts/` directory (e.g., `layouts/partials/footer.html`).

Colors use CSS custom properties — override them in a custom stylesheet:

```css
:root {
  --bg: #1e1e22; --text: #e0e0e0; --link: #7dacf5; --hover: #333;
}
[data-theme="light"] {
  --bg: #f5f5f5; --text: #222; --link: #1a5bb5; --hover: #ddd;
}
```

## License

MIT
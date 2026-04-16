#!/usr/bin/env bash
set -euo pipefail

# Replace this URL with the actual repository URL where your content is stored.
REPO_URL="git@github.com:sarahstrickman/gallery.sarahstrickman.com.git"
CONTENT_DIR="$(cd "$(dirname "$0")" && pwd)/content"

if [ -d "$CONTENT_DIR/.git" ]; then
  echo "Updating existing content..."
  git -C "$CONTENT_DIR" pull
else
  echo "Cloning content into $CONTENT_DIR..."
  rm -rf "$CONTENT_DIR"
  git clone "$REPO_URL" "$CONTENT_DIR"
fi

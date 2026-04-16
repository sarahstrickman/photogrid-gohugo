#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REFS_DIR="$SCRIPT_DIR/assets/references"

mkdir -p "$REFS_DIR"

clone_or_pull() {
  local repo_url="$1"
  local name
  name="$(basename "$repo_url" .git)"
  local dest="$REFS_DIR/$name"

  if [ -d "$dest/.git" ]; then
    echo "Updating $name..."
    git -C "$dest" pull
  else
    echo "Cloning $name..."
    rm -rf "$dest"
    git clone "$repo_url" "$dest"
  fi
}

clone_or_pull "https://github.com/flickr/justified-layout.git"
clone_or_pull "https://github.com/dimsemenov/PhotoSwipe.git"
clone_or_pull "https://github.com/dimsemenov/photoswipe-video-plugin.git"

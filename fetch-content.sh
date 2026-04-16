#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/perceocrity/perceocrity-contents.git"
CONTENT_DIR="$(cd "$(dirname "$0")" && pwd)/content"

if [ -d "$CONTENT_DIR/.git" ]; then
  echo "Updating existing content..."
  git -C "$CONTENT_DIR" pull
else
  echo "Cloning content into $CONTENT_DIR..."
  rm -rf "$CONTENT_DIR"
  git clone "$REPO_URL" "$CONTENT_DIR"
fi

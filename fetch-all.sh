#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

"$SCRIPT_DIR/fetch-content.sh"
"$SCRIPT_DIR/fetch-references.sh"

#!/usr/bin/env bash
# Weekly backup (Lesson 12): all of Hermes, plus the shared business folder.
# Usage:  bash backup.sh /path/to/a/drive/or/private/cloud/folder
# Keep the copies OFF the laptop, and private: the Hermes zip holds your keys.
set -euo pipefail
DEST="${1:?Say where to save it, e.g. bash backup.sh /media/usb/backups}"
mkdir -p "$DEST"
DAY="$(date +%F)"
hermes backup -o "$DEST/hermes-backup-$DAY.zip"
tar -czf "$DEST/shared-$DAY.tar.gz" -C "$HOME/AmalDesigners" shared
chmod 600 "$DEST/hermes-backup-$DAY.zip"
echo "✓ Saved to $DEST: hermes-backup-$DAY.zip and shared-$DAY.tar.gz"
echo "  Restore on a new machine: install Hermes, stop the gateways, hermes import <zip>, untar the folder."

#!/usr/bin/env bash
# Build an AI Team: starter kit setup.
# Makes the four bots (profiles), gives each its SOUL.md, makes the shared folder,
# and locks the key files. Safe to run again: it never overwrites without a backup.
# Needs: Hermes Agent installed (Lesson 6). Run from this folder:  bash setup.sh
set -euo pipefail

BOTS="marketing production operations analyst"
HERE="$(cd "$(dirname "$0")" && pwd)"
BIZ="$HOME/AmalDesigners"
KIT="$BIZ/kit"

if ! command -v hermes >/dev/null 2>&1; then
  echo "Hermes isn't installed yet. Do Lesson 6 first, then run this again."; exit 1
fi

mkdir -p "$BIZ/shared/posts" "$KIT"
echo "✓ Shared folder: $BIZ/shared (the only folder the bots can see)"
for f in "$HERE"/sample-shared/*; do
  [ -e "$BIZ/shared/$(basename "$f")" ] || cp "$f" "$BIZ/shared/"
done
echo "  (added made-up sample orders and a catalogue where none existed: replace them with yours)"

for b in $BOTS; do
  P="$HOME/.hermes/profiles/$b"
  if [ -d "$P" ]; then
    echo "• $b already exists: keeping it"
  else
    hermes profile create "$b"
    echo "✓ Made the $b bot"
  fi
  mkdir -p "$P"
  if [ -f "$P/SOUL.md" ] && ! cmp -s "$P/SOUL.md" "$HERE/souls/$b.md"; then
    cp "$P/SOUL.md" "$P/SOUL.md.before-kit"
    echo "  (saved its old SOUL.md as SOUL.md.before-kit)"
  fi
  cp "$HERE/souls/$b.md" "$P/SOUL.md"
  sed "s#HOME_DIR#$HOME#g" "$HERE/config/$b.yaml" > "$KIT/config-$b.yaml"
  [ -f "$P/.env" ] && chmod 600 "$P/.env"
done
echo "✓ Each bot has its SOUL.md. Settings to paste are in $KIT/"

cat <<NEXT

Next, for each bot (start with marketing):
  1. Pick its model:        marketing setup                 (Lesson 7)
  2. Paste its settings:    nano ~/.hermes/profiles/marketing/config.yaml
                            (from $KIT/config-marketing.yaml)
  3. Try it:                marketing chat
  4. Connect Telegram:      marketing gateway setup, then marketing gateway install   (Lesson 9)
  5. Lock its keys:         chmod 600 ~/.hermes/profiles/*/.env                    (Lesson 11)
When all four answer in the team group, add the schedules:  bash jobs.sh   (Lesson 10)
NEXT

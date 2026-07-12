#!/bin/bash
# Build react-email preview app

# A globally installed libvips (e.g. via Homebrew) makes sharp compile from
# source and fail; force the prebuilt binary instead.
export SHARP_IGNORE_GLOBAL_LIBVIPS=1

bun x email build || true

# Build the react-email app if node_modules exist
if [ -d ".react-email/node_modules" ]; then
  cd .react-email && bun run build
fi

#!/bin/bash
# Build react-email preview app

bun x email build || true

# Build the react-email app if node_modules exist
if [ -d ".react-email/node_modules" ]; then
  cd .react-email && bun run build
fi

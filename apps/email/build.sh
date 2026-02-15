#!/bin/bash
# Build react-email preview app
# Works around sharp@0.34.4 bug in react-email by replacing with the root's sharp@0.34.5

npx email build || true

# Replace buggy sharp version with the root's working version
if [ -d ".react-email/node_modules/sharp" ]; then
  rm -rf .react-email/node_modules/sharp
  cp -r ../../node_modules/sharp .react-email/node_modules/sharp
  cd .react-email && npm run build
fi

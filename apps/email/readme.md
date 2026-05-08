# email

Templates d'emails transactionnels pour Dev-OC, basés sur **React Email**.

## Description

Atelier de templates écrit avec `@react-email/components`. Le devserver `react-email` fournit une preview live dans le navigateur ; les templates compilés sont consommés par les apps qui envoient via Resend (par ex. `apps/web`, `apps/saveurs-aude`).

Les templates sont dans `emails/`. Le script `build.sh` génère leur version exportée (HTML/JSX) consommable par les apps.

## Démarrage

```bash
direnv allow      # première fois
bun dev           # preview React Email — http://localhost:3000
bun run export    # exporte les templates
bun run build     # via build.sh (export + post-traitement)
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Devserver React Email |
| `bun run export` | Export des templates (HTML) |
| `bun run build` | Pipeline de build (`build.sh`) |
| `bun lint` | Lint via ultracite |
| `bun run format` | Format Biome |

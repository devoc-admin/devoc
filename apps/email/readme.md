# email

Templates d'emails transactionnels pour Dev-OC, basés sur **React Email**.

## Description

Atelier de templates écrit avec `@react-email/components`. Le devserver `react-email` fournit une preview live dans le navigateur.

Les templates sont dans `emails/`. `bun run export` génère leur version HTML dans `out/`, à reprendre à la main dans l'app qui envoie via Resend.

## Démarrage

```bash
direnv allow      # première fois
bun dev           # preview React Email — http://localhost:3000
bun run export    # exporte les templates en HTML dans out/
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Devserver React Email |
| `bun run export` | Export des templates (HTML) dans `out/` |
| `bun lint` | Lint via ultracite |
| `bun run ci` | `biome ci` — lint + format + assist, sans écriture (utilisé par la CI) |

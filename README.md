# SAR Faculty System

An NBA Criterion 5 faculty self-assessment dashboard built with Next.js 14,
TypeScript, Tailwind CSS, and Vitest. The app currently runs as a fast,
demo-backed MVP: the pages use the sample records in `lib/data/mockStore.ts`,
while the calculation engine is database-agnostic and fully tested.

## Included

- Dashboard with SFR, FQI, regular/contractual, and enrollment KPIs
- Faculty, student, and teaching-load views
- SFR, Faculty Qualification Index, and regular/contractual calculation pages
- CSV import preview workflow and SAR table export page
- Settings page with assessment-cycle and qualification-mapping data
- Pure calculation modules with 17 passing unit tests
- Prisma schema and Docker Compose configuration for a future PostgreSQL-backed
  deployment

## Requirements

- Node.js 18.17 or newer
- npm
- Docker Desktop is optional and only needed for PostgreSQL

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To use another port:

```bash
npm run dev -- -p 3010
```

The app does not fetch fonts or data during startup, so it can run without
internet access. Its demo pages do not require a database or `.env` file.

## Verify the project

```bash
npm test
npm run lint        # TypeScript static check (offline)
npm run build
```

## Optional PostgreSQL setup

The Prisma schema is included for the database-backed phase. Copy
`.env.example` to `.env`, start PostgreSQL, and generate the Prisma client:

```bash
docker compose up -d
npx prisma generate
npx prisma migrate dev --name init
```

The current UI intentionally uses the in-memory demo store; there is no seed
script or API layer in this MVP yet.

## Project structure

```text
app/                 Next.js routes and pages
components/          Shared navigation components
lib/calculations/    Pure, tested NBA calculation functions
lib/data/            Demo data store used by the UI
prisma/              PostgreSQL schema for the next integration phase
```

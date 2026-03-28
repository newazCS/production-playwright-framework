# Production Playwright Framework

## Setup
1. Clone repo
2. Run `npm install`
3. Copy `.env.example` to `.env.dev`
4. Fill required values
5. Run tests

## Commands
- `npm run test:api`
- `npm run test:ui`
- `npm run test:perf`
- `npm run report`
- `npm run report:open`

## Framework Structure
- `tests/` → test files
- `apps/` → app-specific pages, flows, routes, data
- `api/clients/` → shared API clients
- `fixtures/` → reusable fixtures
- `utils/` → shared helpers
- `config/` → env and app config

## Rules
- no hardcoded credentials
- no hardcoded base URLs
- every test must have a layer tag
- use POM for UI tests
- use shared client for API tests
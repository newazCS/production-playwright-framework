# Production Playwright Framework

A scalable, production-level test automation framework built with **Playwright + TypeScript**.

Supports UI testing, API testing, performance testing, Allure reporting (with history), and GitHub Actions CI/CD.

---

## Overview

This framework follows a **modular, layered architecture**:

| Layer | Role |
|---|---|
| `tests` | Define scenarios |
| `pages` | UI actions |
| `flows` | Business logic |
| `data` | Reusable values |
| `routes` | API endpoints |
| `client` | API engine |
| `config` | Environment setup |

> Designed for **team collaboration and scalability**.

---

## Framework Structure

```
apps/
  <portal>/
    pages/
    flows/
    data/
    routes/
    components/

tests/
  ui/
  api/
  performance/

api/
  clients/

utils/
config/
fixtures/
templates/
docs/
```

---

## Features

### UI Testing
- Page Object Model (POM)
- Reusable components
- Clean test structure
- Scalable across portals

### API Testing
- Centralized `BaseClient`
- Request/response auto-logging via Allure
- Flow-based API design
- Easy Postman conversion

### Performance Testing
- Page load metrics
- Config-driven thresholds
- Business-flow performance checks

### Reporting (Allure)
- Readable steps
- Request/response attachments
- JSON metrics
- History and trends support

### CI/CD (GitHub Actions)
- Parallel execution
- Cached dependencies
- Allure report deployment to GitHub Pages

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Configure environment

Create `.env.dev`:

```env
SAUCEDEMO_UI_BASE_URL=https://www.saucedemo.com
SAUCEDEMO_UI_USERNAME=standard_user
SAUCEDEMO_UI_PASSWORD=secret_sauce

JSONPLACEHOLDER_API_BASE_URL=https://jsonplaceholder.typicode.com

REQRES_API_BASE_URL=https://reqres.in
REQRES_API_EMAIL=eve.holt@reqres.in
REQRES_API_PASSWORD=cityslicka
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run by layer
npm run test:ui
npm run test:api
npm run test:perf
```

---

## Allure Reporting

```bash
# Generate report
npm run report

# Open report
npm run report:open
```

> CI automatically publishes the report to GitHub Pages.

---

## Environment & Secrets

| Environment | Source |
|---|---|
| Local | `.env.dev` |
| CI/CD | GitHub Secrets |

> **Rules:** Never commit `.env` files. Never hardcode credentials. Always use config.

---

## How to Add Tests

Full guide: `docs/how-to-add-tests.md`

### UI
1. Add test → `tests/ui/<portal>`
2. Use page objects for all UI actions
3. Use flows for multi-step scenarios

### API
1. Add test → `tests/api/<portal>`
2. Use `BaseClient` for all requests
3. Use routes and flows

### Performance
1. Add test → `tests/performance/<portal>`
2. Use the shared metrics utility
3. Validate against config-driven thresholds

---

## Rules

| ✅ Do | ❌ Don't |
|---|---|
| Use Page Object Model | Hardcode URLs or credentials |
| Use flows for reuse | Put selectors in test files |
| Use config/env variables | Duplicate logic |
| Write readable steps | Write unclear step descriptions |
| Reuse existing code | |

---

## Tagging

Every test must include exactly one layer tag:

| Tag | Layer |
|---|---|
| `@ui` | UI tests |
| `@api` | API tests |
| `@perf` | Performance tests |

---

## Example Workflow

```
UI:   Test → Flow → Page → Action
API:  Test → Flow → Client → Endpoint
```

---

## Roadmap

### Current Capabilities
- Multi-portal support
- Parallel execution
- Clean Allure reporting
- CI/CD integration
- Scalable folder structure

### Planned Improvements
- Advanced fixtures (auth state reuse)
- Test data factory
- Contract validation for APIs
- Flaky test detection and handling
- Enhanced performance analytics

---

## Team Usage

This framework is built for multiple QA engineers working across multiple portals with scalable, collaborative test suites.

Follow the guide before adding anything new: `docs/how-to-add-tests.md`

---

## Mental Model

```
Test   = scenario
Page   = UI actions
Flow   = business logic
Client = API calls
Config = environment
```

---

> This is not just a test repo — it's a **scalable QA platform**.
> Keep it simple, reusable, readable, and consistent.
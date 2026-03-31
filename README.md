# Production Playwright Framework

A scalable, production-level test automation framework built with **Playwright + TypeScript**.

Supports UI testing, API testing, performance testing, optional hybrid BDD Cucumber tests, Allure reporting with history, and GitHub Actions CI/CD.

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

BDD adds one more layer on top:

| Layer | Role |
|---|---|
| `features` | Business-readable scenarios |
| `step-definitions` | Maps Gherkin steps to flows/pages |

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
    performance/

tests/
  ui/
  api/
  performance/
  bdd/
    features/
      <portal>/
    step-definitions/
      <portal>/
      hooks.ts

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

### Hybrid BDD Testing
- Business-readable `.feature` files
- Portal-specific step definitions under `tests/bdd/step-definitions/<portal>/`
- Reuse of the same Playwright pages and flows used by TypeScript tests
- Working examples for SauceDemo and GreenKart

### Reporting (Allure)
- Readable steps
- Request/response attachments
- JSON metrics
- History and trends support
- Normalized hierarchy: `UI | API | Performance | BDD -> Portal -> Suite -> Test Case`

### CI/CD (GitHub Actions)
- Parallel execution
- Cached dependencies
- Dedicated BDD job
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

GREENKART_UI_BASE_URL=https://rahulshettyacademy.com/seleniumPractise/#/

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

# Run BDD tests
npm run bdd
npm run bdd:sauceDemo
npm run bdd:greenKart
```

---

## Allure Reporting

```bash
# Generate report
npm run report

# Open report
npm run report:open
```

`npm run report` first normalizes result labels so Allure groups tests by type, then portal, then suite.

CI automatically publishes the merged report to GitHub Pages.

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

### BDD
1. Add feature file → `tests/bdd/features/<portal>`
2. Add step definition file → `tests/bdd/step-definitions/<portal>`
3. Reuse existing flows and pages
4. Use `docs/bdd-beginner-guide.md` and `docs/bdd-new-portal-e2e-guide.md`

---

## Rules

| ✅ Do | ❌ Don't |
|---|---|
| Use Page Object Model | Hardcode URLs or credentials |
| Use flows for reuse | Put selectors in test files |
| Use config/env variables | Duplicate logic |
| Write readable steps | Write unclear step descriptions |
| Keep BDD steps in portal folders | Put BDD logic directly in `.feature` files |
| Reuse existing code | |

---

## Tagging

Every TypeScript test must include exactly one layer tag:

| Tag | Layer |
|---|---|
| `@ui` | UI tests |
| `@api` | API tests |
| `@perf` | Performance tests |

BDD feature files typically use `@bdd` plus a portal tag such as `@saucedemo` or `@greenkart`.

---

## Example Workflow

```
UI:   Test → Flow → Page → Action
API:  Test → Flow → Client → Endpoint
BDD:  Feature → Step Definition → Flow/Page → Action
```

---

## Roadmap

### Current Capabilities
- Multi-portal support
- Parallel execution
- Clean Allure reporting
- CI/CD integration
- Scalable folder structure
- Hybrid BDD with SauceDemo and GreenKart examples

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

BDD-specific documentation:
- `CUCUMBER.md`
- `docs/bdd-beginner-guide.md`
- `docs/bdd-quick-reference.md`
- `docs/bdd-new-portal-e2e-guide.md`

---

## Mental Model

```
Test   = scenario
Page   = UI actions
Flow   = business logic
Client = API calls
Config = environment
BDD    = business-readable layer on top of flows/pages
```

---

> This is not just a test repo — it's a **scalable QA platform**.
> Keep it simple, reusable, readable, and consistent.
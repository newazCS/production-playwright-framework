# Framework Specification — Playwright QA Platform

---

## Purpose

A production-level test automation platform built with **Playwright** and **TypeScript**.

**Supports:** UI testing · API testing · Performance testing · Allure reporting · CI/CD via GitHub Actions

**Goals:**
- Scalability across multiple portals
- Consistency across QA engineers
- Reusable architecture
- Readable reporting

---

## Architecture Overview

The framework follows a strict layered architecture. Each layer has one responsibility.

| Layer | Responsibility |
|---|---|
| `test` | Defines scenarios and assertions |
| `page` | Handles UI interactions |
| `flow` | Handles business logic |
| `data` | Stores reusable values |
| `routes` | Stores API endpoints |
| `client` | Executes API calls |
| `config` | Manages environment values |

---

## Directory Structure

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

## Layer Responsibilities

### Test Layer

**Location:** `tests/`

| Responsibilities | Restrictions |
|---|---|
| Define test scenarios | No selectors |
| Perform assertions | No business logic |
| Define test steps | No hardcoded credentials or URLs |
| Apply tags (`@ui`, `@api`, `@perf`) | |

---

### Page Layer

**Location:** `apps/<portal>/pages/`

| Responsibilities | Restrictions |
|---|---|
| Define selectors | No business workflows |
| Perform UI actions | No multi-page logic |
| Encapsulate page-level logic | No test assertions |

---

### Flow Layer

**Location:** `apps/<portal>/flows/`

| Responsibilities | Restrictions |
|---|---|
| Define business workflows | No raw selectors |
| Combine page or API actions | Minimal assertions |
| Enable reuse across tests | |

_Examples: login flow · checkout flow · user lifecycle (API)_

---

### Data Layer

**Location:** `apps/<portal>/data/`

| Responsibilities | Restrictions |
|---|---|
| Store reusable values | No secrets |
| Store payload templates | No environment-specific values |
| Store static test data | |

---

### Routes Layer

**Location:** `apps/<portal>/routes/`

- Define API endpoint paths
- Centralize route management

---

### Client Layer

**Location:** `api/clients/baseClient.ts`

- Execute HTTP requests
- Provide reusable methods: `GET`, `POST`, `PUT`, `DELETE`
- Attach request/response data to Allure reports

---

### Config Layer

**Location:** `config/`

- Load environment variables
- Define portal configuration
- Validate required environment variables

| Environment | Source |
|---|---|
| Local | `.env.*` |
| CI/CD | GitHub Secrets |

---

## Test Types

### UI Tests

**Location:** `tests/ui/<portal>/`
- Use Page Object Model
- Interact with UI via page classes
- Optionally use flows for multi-step scenarios

### API Tests

**Location:** `tests/api/<portal>/`
- Use `BaseClient` for all requests
- Use routes for endpoint paths
- Use flows for multi-step scenarios

### Performance Tests

**Location:** `tests/performance/<portal>/`
- Measure page load time
- Validate against config-driven thresholds

---

## Tagging Rules

Every test must include **one required layer tag:**

| Tag | Layer |
|---|---|
| `@ui` | UI tests |
| `@api` | API tests |
| `@perf` | Performance tests |

Optional tags: `@smoke` · `@regression` · portal-specific tags

---

## Allure Reporting

- Step-level visibility
- Request/response attachments for API tests
- Performance metrics attachments
- Historical trends via GitHub Pages

All step descriptions must be **business-readable, descriptive, and non-technical.**

---

## CI/CD Behavior

**Platform:** GitHub Actions

| Concern | Detail |
|---|---|
| Execution | UI, API, and Performance run independently |
| Report | Results merged into a single Allure report |
| Artifacts | `allure-results`, `final-allure-report` |
| Deployment | GitHub Pages |
| History | Previous report history is preserved and merged |

---

## Rules

### Environment
- No hardcoded credentials or base URLs in code
- All secrets stored in environment variables
- `.env.example` must reflect all required variables
- Missing variables must fail fast at startup

### Reuse
Before creating anything new, check for an existing:
1. Page
2. Flow
3. Data file
4. Route

Only create a new file if reuse is not possible.

### Layers
- Do not mix layer responsibilities
- Do not duplicate logic
- Do not bypass the config or client layers

---

## Naming Conventions

| Type | Pattern | Example |
|---|---|---|
| UI test | `<feature>.spec.ts` | `login.spec.ts`, `checkout.spec.ts` |
| API test | `<feature>.spec.ts` | `userFlow.spec.ts`, `posts.spec.ts` |
| Performance test | `<feature>.perf.spec.ts` | `login.perf.spec.ts` |

---

## Design Principles

- Separation of concerns
- High readability
- High reusability
- No duplication
- Environment-driven configuration
- Scalable structure for multiple teams

---

## Mental Model

```
test   = scenario
page   = UI actions
flow   = business logic
data   = reusable values
routes = endpoints
client = API execution
config = environment
```

---

## Instructions for Code Generation

When generating or modifying code against this spec:

**Do:**
- Follow the existing folder structure
- Respect layer responsibilities
- Reuse existing pages, flows, data, and routes whenever possible
- Ensure all new tests include proper tags and step descriptions
- Maintain readability and consistency

**Do not:**
- Mix layer responsibilities
- Introduce hardcoded values
- Duplicate logic
- Bypass the config or client layers
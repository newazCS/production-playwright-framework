---
name: playwright-framework
description: 'Production Playwright + TypeScript test automation framework. Use when: adding UI tests, API tests, or performance tests; creating page objects, flows, data files, or route files; reviewing code for layer violations; understanding the framework architecture; generating any test or framework artifact. Triggers: "add test", "create test", "write test", "new page", "new flow", "new route", "new data", "api test", "ui test", "perf test", "performance test", "checkout flow", "login flow", "test for", "spec file".'
argument-hint: 'Describe what you want to test (e.g., "UI login test for sauceDemo" or "API posts test for jsonplaceholder")'
---

# Playwright Framework — Test Authoring Skill

## When to Use
- Adding any test (UI, API, or performance) to the framework
- Creating page objects, flows, data files, or route files
- Reviewing or auditing code for architecture violations
- Onboarding to the framework and learning its conventions

---

## Architecture at a Glance

```
test       → scenario + assertions only
page       → selectors + UI element interactions only
flow       → multi-step business logic
data       → static reusable values + credential resolvers
routes     → API endpoint string constants
client     → BaseClient (api/clients/baseClient.ts) — ALL API calls go here
config     → environment values via appConfig (config/appConfig.ts)
```

**Golden rules:**
1. Never put selectors in tests. Never put assertions in pages.
2. Always use `BaseClient` — never call `request.get/post/...` directly.
3. Always read config values from `appConfig` — never hardcode URLs or thresholds.
4. Always wrap test steps in `step()` from `utils/allureUtils.ts`.
5. Check for existing pages, flows, data, and routes **before** creating new ones.

---

## Directory Map

| Artifact | Path |
|---|---|
| UI Tests | `tests/ui/<portal>/` |
| API Tests | `tests/api/<portal>/` |
| Performance Tests | `tests/performance/<portal>/` |
| Pages | `apps/<portal>/pages/` |
| Flows | `apps/<portal>/flows/` |
| Data | `apps/<portal>/data/` |
| Routes | `apps/<portal>/routes/` |
| BaseClient | `api/clients/baseClient.ts` |
| Config | `config/appConfig.ts` |
| Utilities | `utils/allureUtils.ts`, `utils/performanceUtils.ts` |

---

## Decision Tree — What to Create

```
User request
 ├─ New test scenario
 │   ├─ UI → tests/ui/<portal>/<name>.spec.ts
 │   ├─ API → tests/api/<portal>/<name>.spec.ts
 │   └─ Perf → tests/performance/<portal>/<name>.perf.spec.ts
 │
 ├─ New page needed → apps/<portal>/pages/<name>Page.ts
 ├─ Multi-step business workflow → apps/<portal>/flows/<name>Flow.ts
 ├─ Static values / payloads → apps/<portal>/data/<name>.ts
 └─ New API endpoints → apps/<portal>/routes/<name>.ts
```

---

## Step-by-Step: Adding a Test

### Step 1 — Identify the portal and test type
- UI test? API? Performance?
- Which portal? (sauceDemo, reqres, jsonplaceholder, automationExercise, samplePortal)

### Step 2 — Check for reusable artifacts
Search `apps/<portal>/` for:
- Existing page class that covers the target UI actions
- Existing flow that covers the business workflow
- Existing data file with the test values needed
- Existing route file with the API endpoint

**If they exist — reuse them. Never duplicate.**

### Step 3 — Create missing layer artifacts (bottom-up order)
Create in this order: routes → data → page → flow → test

### Step 4 — Write the test
Use the templates in [references/ui-test.md](./references/ui-test.md), [references/api-test.md](./references/api-test.md), or [references/perf-test.md](./references/perf-test.md).

### Step 5 — Verify layer purity
Run the checklist:
- [ ] Test has no selectors
- [ ] Test has no hardcoded URLs or credentials
- [ ] All steps use `step()` wrapper
- [ ] Page has no assertions or business logic
- [ ] Flow uses page objects (not raw locators)
- [ ] Data file has no secrets
- [ ] `BaseClient` used for all API calls
- [ ] Config values come from `appConfig`

---

## Naming Conventions

| Type | Pattern | Example |
|---|---|---|
| UI test | `<feature>.spec.ts` | `login.spec.ts` |
| API test | `<feature>.spec.ts` | `userFlow.spec.ts` |
| Perf test | `<page>.perf.spec.ts` | `home.perf.spec.ts` |
| Page class | `<Name>Page` | `LoginPage` |
| Flow class | `<Name>Flow` | `LoginFlow` |
| Data const | `<portal><Resource>` | `sauceDemoProducts` |
| Route const | `<portal>Routes` | `reqresRoutes` |

---

## Layer Reference Docs

- [UI Test Patterns](./references/ui-test.md)
- [API Test Patterns](./references/api-test.md)
- [Performance Test Patterns](./references/perf-test.md)
- [Layer Code Patterns (Page / Flow / Data / Route / Config)](./references/layer-patterns.md)

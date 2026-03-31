# How to Add Tests

> This guide explains how to add new portals and new test cases in this framework.

---

## 1. Framework Structure

| Path | Purpose |
|---|---|
| `tests/` | Test files only |
| `apps/<portal>/pages/` | Page objects for UI |
| `apps/<portal>/flows/` | Business flows |
| `apps/<portal>/data/` | Reusable test data |
| `apps/<portal>/routes/` | API endpoints |
| `api/clients/` | Shared API client |
| `utils/` | Generic reusable helpers |
| `config/` | Env and app config |

---

## 2. Before Adding a Test

Before creating anything, check:

- [ ] Does the portal already exist?
- [ ] Does the page object already exist?
- [ ] Does the flow already exist?
- [ ] Does the data already exist?

> **Always reuse first.**

---

## 3. How to Add a New Portal

If a new portal does not exist yet, create this structure:

```
apps/<portal-name>/
  pages/
  flows/
  data/
  routes/
  performance/

tests/ui/<portal-name>/
tests/api/<portal-name>/
tests/performance/<portal-name>/
```

Then update the following env files and add the values listed:

| File | What to add |
|---|---|
| `.env.dev` | Base URL, credentials, thresholds, API base URL |
| `.env.staging` | Base URL, credentials, thresholds, API base URL |
| `.env.prod` | Base URL, credentials, thresholds, API base URL |
| `.env.example` | Base URL, credentials, thresholds, API base URL |
| `config/appConfig.ts` | Register the portal config |

---

## 4. How to Add a UI Test

### Step 1 — Create the test file

Create or reuse a file in:
```
tests/ui/<portal-name>/
```

### Step 2 — Check for existing page methods

Check `apps/<portal-name>/pages/`. If the action doesn't exist, add it there.

_Examples: login · click button · read message · check element visible_

### Step 3 — Add a flow if needed

If the scenario spans multiple business steps, create or reuse a flow in:
```
apps/<portal-name>/flows/
```
_Examples: login flow · checkout flow · create account flow_

### Step 4 — Add reusable data if needed

```
apps/<portal-name>/data/
```
_Examples: product names · reusable form values · test users_

### Step 5 — Write the test

Use:
- Page Object Model
- Flow if needed
- Readable step descriptions
- Proper assertions

### ✅ UI Rules

- Do not put selectors in test files
- Do not hardcode credentials
- Keep tests readable
- Tag with `@ui`

---

## 5. How to Add an API Test

### Step 1 — Create the test file
```
tests/api/<portal-name>/
```

### Step 2 — Add endpoint paths
```
apps/<portal-name>/routes/
```

### Step 3 — Add reusable payloads or IDs
```
apps/<portal-name>/data/
```

### Step 4 — Use the shared API client
```
api/clients/baseClient.ts
```

### Step 5 — Add a flow for multi-step scenarios
```
apps/<portal-name>/flows/
```
_Examples: login · create + update + delete flow · token generation_

### ✅ API Rules

- Do not hardcode base URLs
- Do not call raw endpoints from tests if route files exist
- Do not duplicate auth logic in every test
- Tag with `@api`

---

## 6. How to Add a Performance Test

### Step 1 — Create the test file
```
tests/performance/<portal-name>/
```

### Step 2 — Use the shared metrics utility
```
utils/performanceUtils.ts
```

### Step 3 — Reuse existing page or flow logic for setup

_Examples: login before measuring inventory page · add product before measuring cart page_

### Step 4 — Add thresholds

Add threshold values to `.env` and `config/appConfig.ts`.

### Step 5 — Write the test with

- Readable steps
- Metrics attachment
- Threshold validation

### ✅ Performance Rules

- Only measure important pages
- Do not hardcode thresholds
- Tag with `@perf`

---

## 7. Where Things Live

### Selectors

✅ Belong in `apps/<portal-name>/pages/`  
❌ Not in test files, flows, or utils

### Flows

✅ Belong in `apps/<portal-name>/flows/`  
Use for: business journeys · repeated multi-step actions · reusable user behavior  
_Examples: login as standard user · complete checkout · create and delete user_  
Flows should not contain raw test assertions unless necessary.

### Data

✅ Belongs in `apps/<portal-name>/data/`  
_Examples: usernames · product names · request payload templates · checkout info_  
Do not hardcode reusable values in tests.  
Sensitive values must stay in `.env` — not in data files.

---

## 8. Step Naming Rules

Each test must include clear, descriptive steps.

| ✅ Good | ❌ Bad |
|---|---|
| Open login page | click button |
| Login as standard user | fill input |
| Add backpack to cart | expect true |
| Verify users list is returned | |

---

## 9. Tagging Rules

Every test must include one required layer tag:

| Tag | Layer |
|---|---|
| `@ui` | UI tests |
| `@api` | API tests |
| `@perf` | Performance tests |

Optional:
- portal tag
- smoke tag
- regression tag

Examples:
- `@ui @smoke`
- `@api @regression`

---

## 10. Before Creating a PR

- [ ] Correct folder used
- [ ] No hardcoded credentials
- [ ] No hardcoded base URLs
- [ ] Page Object Model used for UI tests
- [ ] BaseClient used for API tests
- [ ] BDD feature and step files use portal-specific folders when BDD is added
- [ ] Readable step descriptions added
- [ ] Existing pages, flows, and data reused where possible

---

## 11. Mental Model

| Concept | Role |
|---|---|
| `test` | What we verify |
| `page` | UI actions |
| `flow` | User journey |
| `data` | Reusable values |
| `routes` | Endpoints |
| `client` | API engine |
| `config` | Environment values |
| `feature` | Business-readable BDD story |
| `step-definition` | Bridge between Gherkin and flows/pages |

## 12. What Goes in Each File

### Test file
Use for:
- scenario
- assertions
- readable steps
- tags
- Allure feature/story

Do not put:
- selectors
- repeated business logic
- credentials
- hardcoded URLs

### Page file
Use for:
- selectors
- UI interactions
- page-level checks

Do not put:
- business workflow
- multi-page journeys
- test data

### Flow file
Use for:
- business journeys
- repeated multi-step actions

Examples:
- login
- checkout
- create and update user

Do not put:
- raw selectors
- unrelated assertions

### Data file
Use for:
- reusable values
- payload templates
- product names
- test users

Do not put:
- secrets
- environment-specific values

## 13. Reuse Decision Guide

Before creating a new file, ask:

1. Does this already exist?
2. Can I extend an existing page?
3. Can I reuse an existing flow?
4. Is this value reusable enough for a data file?

Create new files only when reuse is not possible.

## 14. Environment and Config Rules

- Do not hardcode credentials in test files
- Do not hardcode base URLs in test files
- Store secrets in `.env` locally
- Store CI secrets in GitHub Secrets
- Keep `.env.example` updated
- Register every new portal in `config/appConfig.ts`

If a required env value is missing, the framework should fail fast.

## 15. Use Templates

Before writing a new test, start from the template files in:

- `templates/ui-test.template.ts`
- `templates/api-test.template.ts`
- `templates/perf-test.template.ts`
- `templates/bdd-feature.template.feature`
- `templates/bdd-steps.template.ts`

Do not start from scratch unless necessary.

## 16. Adding BDD Tests

Use BDD when the test should be readable by non-technical stakeholders.

Create files here:
- Feature file: `tests/bdd/features/<portal>/<scenario>.feature`
- Step definition file: `tests/bdd/step-definitions/<portal>/<scenario>Steps.ts`
- Shared hooks: `tests/bdd/step-definitions/hooks.ts`

Rules:
- Feature files contain business language only
- Step definitions must call existing flows/pages
- Do not put selectors in `.feature` files
- Do not duplicate flow logic inside step definitions

Run commands:

```bash
npm run bdd
npm run bdd -- --tags @yourportal
```

Use these docs before adding BDD coverage:
- `docs/bdd-beginner-guide.md`
- `docs/bdd-quick-reference.md`
- `docs/bdd-new-portal-e2e-guide.md`
- `CUCUMBER.md`
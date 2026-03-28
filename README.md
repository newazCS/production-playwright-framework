# Playwright Production Framework

## What this is

Unified automation framework for:

* UI testing (Playwright + POM)
* API testing (Playwright request)
* Performance monitoring (baseline metrics)
* Allure reporting
* GitHub Actions CI

---

## Quick Start

1. Clone repo
2. Install deps
   npm install
3. Setup env
   cp .env.example .env.dev
   fill values
4. Run tests
   npm run test

---

## Commands

* npm run test
* npm run test:ui
* npm run test:api
* npm run test:perf
* npm run report
* npm run report:open

---

## Folder Structure

tests/

* ui/
* api/
* performance/

apps/

* <app>/

  * pages/
  * flows/
  * data/
  * routes/
  * performance/

api/

* clients/

fixtures/

* ui/
* api/

utils/
config/

---

## How to Write Tests

### UI

* Use Page Object Model
* Use flows for business logic
* Do not use raw selectors in tests

Flow:
test → flow → page → basePage

---

### API

* Use BaseClient
* Do not call request directly in test
* Use routes + data files

Flow:
test → client → routes/data

---

### Performance

* Use shared performance utility
* Only test critical pages
* Use threshold from config

---

## Config Rules

* Use .env files only
* No hardcoded URLs
* No hardcoded credentials

Env files:

* .env.dev
* .env.staging
* .env.prod

---

## Test Data Rules

* Put reusable data in apps/<app>/data/
* Store env keys, not secrets
* Keep test files clean

---

## Fixtures Rules

Use fixtures for:

* login reuse
* auth setup
* repeated setup

Example:
loggedInSauceDemoPage

---

## Tagging Rules

Every test must include:

* @ui OR @api OR @perf

Optional:

* @app name

---

## Naming Rules

UI:

* login.spec.ts
* home.spec.ts

API:

* users.spec.ts
* posts.spec.ts

Performance:

* home.perf.spec.ts

---

## Allure Reporting

Feature:

* UI
* API
* Performance

Story:

* app + page/endpoint

Run:
npm run report

---

## CI Pipeline

Runs:

1. API
2. UI
3. Performance
4. Merge Allure
5. Publish report

Report available via:

* GitHub Pages
* Artifact download

---

## Security Rules

Never commit:

* .env.dev
* .env.staging
* .env.prod

Only commit:

* .env.example

---

## Golden Rules

* Tests = validation only
* Pages = UI logic
* Flows = business logic
* Clients = API logic
* Fixtures = setup reuse
* Config = runtime values
* Utils = generic helpers

---

## Do NOT

* hardcode credentials
* hardcode URLs
* put selectors in tests
* mix business logic in tests
* overbuild utils

---

## Add New Test (Checklist)

Before PR:

* correct folder
* correct tag
* uses POM (UI)
* uses BaseClient (API)
* uses config (no hardcoding)
* test name is clear
* no secrets in code

---

## Current Demo Apps

UI:

* Sauce Demo
* Automation Exercise

API:

* JSONPlaceholder
* ReqRes

Performance:

* Sauce Demo
* Automation Exercise

---

## Future Improvements

* API login → UI session reuse
* storageState
* parallel CI
* custom assertions
* component-level POM
* PR linting rules

---

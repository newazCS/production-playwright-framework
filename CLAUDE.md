# CLAUDE.md

> This file governs all code generation, modification, review, and improvement in this repository.
> Claude must follow every rule in this document at all times.

---

## Purpose

This repository contains a production-level test automation framework built with **Playwright** and **TypeScript**.

**Goals:**
- Consistency
- Reusability
- Strict architecture adherence
- Support BDD Cucumber (optional, hybrid approach)

---

## Hybrid Architecture: TypeScript + BDD Cucumber

This framework supports **HYBRID** testing:

| Test Type | Location | Language | Audience |
|-----------|----------|----------|----------|
| **TypeScript Tests** | `tests/ui/`, `tests/api/`, `tests/performance/` | Code | Developers, QA |
| **BDD Cucumber Tests** | `tests/bdd/features/<portal>/`, `tests/bdd/step-definitions/<portal>/` | Gherkin | Business, Non-technical |

**Key Points:**
- BDD is **optional** (not required)
- BDD and TypeScript tests are **independent** (both can run)
- **Both share the same flows/pages** (maximum reuse)
- Performance tests **stay TypeScript only** (Gherkin doesn't fit metrics)

**See Also:** `CUCUMBER.md` (BDD-specific rules)

The framework uses a strict layered design. Each layer has a single responsibility.

| Layer | Responsibility |
|---|---|
| `test` | Scenario + assertions |
| `page` | UI actions |
| `flow` | Business logic |
| `data` | Reusable values |
| `routes` | API endpoints |
| `client` | API execution |
| `config` | Environment values |

BDD Note: BDD Cucumber tests add a **step definitions layer** that sits above flows/pages. See `CUCUMBER.md` for details.

> **Rule:** Never mix responsibilities across layers.

---

## Directory Structure

### UI (TypeScript Tests)

| Artifact | Path |
|---|---|
| Tests | `tests/ui/<portal>/` |
| Pages | `apps/<portal>/pages/` |
| Flows | `apps/<portal>/flows/` |
| Data | `apps/<portal>/data/` |

### API (TypeScript Tests)

| Artifact | Path |
|---|---|
| Tests | `tests/api/<portal>/` |
| Routes | `apps/<portal>/routes/` |
| Flows | `apps/<portal>/flows/` |
| Client | `api/clients/baseClient.ts` |

### Performance (TypeScript Tests Only)

| Artifact | Path |
|---|---|
| Tests | `tests/performance/<portal>/` |
| Thresholds | `.env` and `config/appConfig.ts` |

### BDD (Cucumber Tests - Optional)

| Artifact | Path |
|---|---|
| Feature Files | `tests/bdd/features/<portal>/` |
| Step Definitions | `tests/bdd/step-definitions/<portal>/` |
| Hooks | `tests/bdd/step-definitions/hooks.ts` |
| Documentation | `CUCUMBER.md`, `docs/bdd-beginner-guide.md` |

> **Rule:** Always place files in the correct directory.

---

## Layer Responsibilities

### Test Layer

**Allowed:**
- Test scenarios
- Assertions
- Readable steps
- Tags: `@ui`, `@api`, `@perf`

**Not allowed:**
- Selectors
- Business logic
- Hardcoded credentials
- Hardcoded URLs

---

### Page Layer

**Allowed:**
- Selectors
- UI actions
- Element interactions

**Not allowed:**
- Business workflows
- Multi-step logic
- Test assertions

---

### Flow Layer

**Allowed:**
- Business workflows
- Reusable sequences (e.g., login, checkout, API user lifecycle)

**Not allowed:**
- Raw selectors
- Logic duplicated from pages

---

### Data Layer

**Allowed:**
- Reusable values
- Payload templates
- Static test data

**Not allowed:**
- Secrets
- Environment-specific values

---

### Client Layer

**Location:** `api/clients/baseClient.ts`

**Rules:**
- Must be used for all API requests
- Must never be bypassed

---

### Config Layer

**Location:** `config/`

**Rules:**
- No hardcoded values
- All environment values must come from `.env` or CI secrets
- Missing values must fail fast

---

## Reuse Rules

Before creating any new code, check:

1. Existing pages
2. Existing flows
3. Existing data
4. Existing routes

If reusable code exists, it **must** be used. Do not duplicate logic.

---

## Naming Conventions

| Type | Example |
|---|---|
| UI test | `login.spec.ts`, `checkout.spec.ts` |
| API test | `userFlow.spec.ts`, `posts.spec.ts` |
| Performance test | `login.perf.spec.ts` |

> Names must reflect **business behavior**, not implementation details.

---

## Test Writing Rules

All tests must:
- Be readable
- Use business language
- Include proper tags
- Use step-based structure

**Good step names:**
- `Open login page`
- `Login as standard user`
- `Add product to cart`
- `Verify checkout success`

**Bad step names:**
- `click button`
- `fill input`
- `expect true`

---

## Allure Reporting Rules

All tests must:
- Include readable steps
- Avoid technical wording
- Attach relevant data (API response, metrics)
- Produce clean Allure grouping by test type, then portal, then suite

---

## API Rules

**Must:**
- Use `BaseClient` for all requests
- Use route files for all endpoints
- Use flows for multi-step scenarios
- Attach request/response to Allure

**Must not:**
- Call raw endpoints directly in tests
- Duplicate authentication logic

---

## Performance Rules

**Must:**
- Measure only meaningful pages
- Reuse flows for setup
- Use config-based thresholds

**Must not:**
- Hardcode thresholds
- Create noisy or unstable tests

---

## Security Rules

- Never hardcode credentials
- Never expose secrets
- Always use environment variables

---

## CI/CD Rules

The framework runs in **GitHub Actions**.

- Ensure all tests are CI-safe
- Avoid flaky patterns
- Avoid time-dependent logic
- Keep tests deterministic

---

## Output Behavior

### When generating code

- Follow the folder structure exactly
- Follow layer responsibilities
- Use existing patterns
- Ensure consistency with existing files
- Generate minimal, clean code
- Include proper tagging

### When reviewing code

- Detect rule violations
- Suggest corrections
- Enforce framework standards

---

## Forbidden Actions

Claude must **never**:

- Mix layers (e.g., selectors inside tests)
- Duplicate existing logic
- Hardcode config values
- Bypass `BaseClient`
- Create inconsistent structure

---

## Mental Model

```
test   → scenario
page   → UI actions
flow   → business logic
data   → reusable values
routes → endpoints
client → API execution
config → environment
```

---

## Final Rule

Treat this repository as a **strict, structured system**.

All generated or modified code must:
- Respect the architecture
- Maximize reuse
- Maintain readability
- Align with the existing framework design

**For BDD Cucumber:** Follow rules in `CUCUMBER.md` (step definitions must call existing flows/pages, never bypass the architecture).
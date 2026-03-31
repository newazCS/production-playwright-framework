# TODO - Framework Roadmap

This file tracks the next high-value improvements for the Playwright + TypeScript + Hybrid BDD framework.

## Priority 1 - Reliability and Quality Signals

- [ ] Add flaky test defense layer (retry analytics, quarantine tags, flaky trend report).
- [ ] Create a managed flaky allowlist with owner and expiration date.
- [ ] Implement deterministic test data factory for UI and API scenarios.
- [ ] Add reusable cleanup/teardown strategy for created test data.
- [ ] Add API contract validation using JSON schema or OpenAPI for critical endpoints.
- [ ] Add visual regression checks for stable critical UI pages (login, inventory, cart, checkout success).
- [ ] Add accessibility checks (axe) to core UI and BDD happy paths.

## Priority 2 - CI/CD Scalability and Governance

- [ ] Add test impact analysis for PRs (run only affected tests, full run nightly).
- [ ] Add sharding/matrix execution by portal and layer to reduce pipeline time.
- [ ] Add quality gates for flaky spike, threshold regressions, and critical suite health.
- [ ] Add PR bot summary with failed scenarios, rerun commands, and Allure links.

## Priority 3 - BDD Maturity

- [ ] Build step catalog generator from step-definition files.
- [ ] Add Gherkin linting rules for readability and consistency.
- [ ] Publish living BDD documentation (feature list + latest execution status).

## Priority 4 - Performance Maturity

- [ ] Add performance trend tracking over time (not only pass/fail thresholds).
- [ ] Add API latency smoke checks for key endpoints.
- [ ] Standardize performance execution profile (browser settings, viewport, environment assumptions).

## Priority 5 - Developer Experience

- [ ] Build scaffolding CLI for portal and test template generation.
- [ ] Add architecture lint rules to enforce layer boundaries.
- [ ] Add onboarding wizard/script for first portal and first tests.

## Priority 6 - Security and Maintenance

- [ ] Add secret scanning in CI to block credential leaks.
- [ ] Add dependency risk automation (scheduled updates + vulnerability policy gates).
- [ ] Add test ownership metadata by portal/suite for faster incident routing.

## Optional Delivery Plan

### Phase 1 (Quick Wins)
- [ ] Flaky defense baseline.
- [ ] API contract checks for top endpoints.
- [ ] Axe checks on smoke tests.
- [ ] PR bot summary.

### Phase 2 (Scale)
- [ ] Test impact analysis.
- [ ] CI sharding and matrix optimization.
- [ ] Step catalog + Gherkin linting.

### Phase 3 (Platform)
- [ ] Living docs portal.
- [ ] Perf trend dashboards.
- [ ] Scaffolding CLI + onboarding wizard.

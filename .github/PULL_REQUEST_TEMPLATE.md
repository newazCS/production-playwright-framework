## PR Checklist

- [ ] Correct folder used
- [ ] Test has proper tag (`@ui`, `@api`, `@perf`, or `@bdd` when applicable)
- [ ] No hardcoded credentials
- [ ] No hardcoded base URLs
- [ ] Uses config/env values
- [ ] Uses Page Object Model for UI tests
- [ ] Uses BaseClient for API tests
- [ ] Uses portal-specific BDD step-definition folder when adding Cucumber coverage
- [ ] Uses readable Allure feature/story/steps
- [ ] Business logic moved to flow if reusable
- [ ] Test file is readable and short
- [ ] Reused existing page/flow/data before creating new file
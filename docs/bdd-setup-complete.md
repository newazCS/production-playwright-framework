# BDD Framework Setup - Complete Guide

## ✅ What Has Been Done

Your framework is now fully equipped with **Hybrid BDD Cucumber** support!

### Installed & Created:

1. ✅ **Cucumber dependency** - `@cucumber/cucumber`
2. ✅ **BDD folder structure** - `tests/bdd/features/<portal>/` and `tests/bdd/step-definitions/<portal>/`
3. ✅ **Example feature files** for SauceDemo:
   - `login.feature` - Login scenarios
   - `addToCart.feature` - Shopping cart scenarios
   - `checkout.feature` - Checkout process scenarios
4. ✅ **Full real portal example** for GreenKart:
   - `e2ePurchase.feature` - End-to-end purchase scenarios
5. ✅ **Step definitions** that map Gherkin to code:
   - `tests/bdd/step-definitions/sauceDemo/loginSteps.ts`
   - `tests/bdd/step-definitions/sauceDemo/addToCartSteps.ts`
   - `tests/bdd/step-definitions/sauceDemo/checkoutSteps.ts`
   - `tests/bdd/step-definitions/greenKart/greenKartSteps.ts`
   - `hooks.ts` - Browser setup/teardown
6. ✅ **Configuration files**:
   - `cucumber.js` - Cucumber configuration
   - `tsconfig.json` - TypeScript configuration
   - Updated `package.json` with BDD scripts
7. ✅ **Documentation**:
   - `docs/bdd-beginner-guide.md` - For non-technical users
   - `docs/bdd-quick-reference.md` - Quick reference guide
   - `CUCUMBER.md` - Rules and standards (like CLAUDE.md)
   - Updated `CLAUDE.md` with BDD hybrid approach
8. ✅ **Templates**:
   - `templates/bdd-feature.template.feature` - Feature file template
   - `templates/bdd-steps.template.ts` - Step definition template

---

## 🚀 How to Run BDD Tests

### Run All BDD Tests
```bash
npm run bdd
```

### Run Only SauceDemo BDD Tests
```bash
npm run bdd:sauceDemo
```

### Run Only GreenKart BDD Tests
```bash
npm run bdd:greenKart
```

### Run Specific Feature
```bash
npm run bdd -- tests/bdd/features/sauceDemo/login.feature
```

---

## 📚 Documentation Guide

### For Non-Technical Users:
**Start here:** [`docs/bdd-beginner-guide.md`](../docs/bdd-beginner-guide.md)
- Plain English explanation
- How to write scenarios step-by-step
- Examples you can copy
- Like explaining to a 10-year-old

### For Quick Reference:
**Quick answers:** [`docs/bdd-quick-reference.md`](../docs/bdd-quick-reference.md)
- Available steps for SauceDemo
- How to run tests
- Common scenarios to copy
- Common questions answered

### For Developers (Standards):
**Enforce standards:** [`CUCUMBER.md`](../CUCUMBER.md)
- Rules like in CLAUDE.md but for BDD
- Step definition patterns
- Reuse requirements
- Forbidden actions

### For Architects (Hybrid Strategy):
**Understand design:** [`CLAUDE.md`](../CLAUDE.md)
- Updated to show hybrid BDD + TypeScript approach
- Directory structure updated
- Architecture layers still intact

---

## 🎯 Key Principles

### 1. **Main Rule: Reuse Everything**
```
.feature files (Gherkin)
        ↓
Step Definitions (TypeScript) ← YOU CREATE THIS
        ↓
Flows / Pages (ALREADY EXIST) ← REUSE THESE!
```

Step definitions **call** existing flows/pages. They never duplicate logic.

### 2. **Use BDD For:**
- ✅ UI Regression Tests
- ✅ UI Smoke Tests
- ✅ API Happy-Path Flows
- ✅ Business Stakeholder Review
- ✅ Non-Technical Documentation

### 3. **Keep TypeScript For:**
- ✅ Performance Tests
- ✅ Complex Negative Scenarios
- ✅ Edge Cases
- ✅ API Error Handling

---

## 📖 File Locations Summary

| Type | Location | Created By |
|------|----------|-----------|
| Feature Files | `tests/bdd/features/sauceDemo/*.feature` | Non-Technical Users / QA |
| Feature Files | `tests/bdd/features/greenKart/*.feature` | Non-Technical Users / QA / Dev |
| Step Definitions | `tests/bdd/step-definitions/<portal>/*Steps.ts` | Developers |
| Hooks | `tests/bdd/step-definitions/hooks.ts` | Already Done |
| Pages | `apps/sauceDemo/pages/*.ts` | Already Exist (Reuse!) |
| Flows | `apps/sauceDemo/flows/*.ts` | Already Exist (Reuse!) |
| Config | `config/appConfig.ts` | Already Exists |

---

## 🎓 Getting Started Steps

### Step 1: Non-Technical Users Read First
Open: [`docs/bdd-beginner-guide.md`](../docs/bdd-beginner-guide.md)

Learn:
- What is BDD?
- Parts of a test
- How to write a Scenario
- Good step names

**Time:** 15-20 minutes

### Step 2: Write Your First Test
1. Open text editor
2. Create: `tests/bdd/features/sauceDemo/myFirstTest.feature`
3. Copy example from beginner guide
4. Save

### Step 3: Run It
```bash
npm run bdd:sauceDemo
```

See it execute!

### Step 4: Share with Team
Everyone can now:
- Read `.feature` files (human-readable)
- Understand what tests do
- Contribute ideas for new tests
- Validate test coverage

---

## 💡 Example: Login Test

**What Non-Technical User Creates:**
```gherkin
Feature: User Login
  As a customer
  I want to log in
  So that I can see products

  Scenario: Login with correct password
    Given the user is on the SauceDemo login page
    When the user enters username "standard_user"
    And the user enters password "secret_sauce"
    And the user clicks the login button
    Then the inventory page should be displayed
```

**Where It Goes:**
```
tests/bdd/features/sauceDemo/login.feature
```

**How It Runs:**
1. Cucumber reads the feature file
2. Steps match to step definitions (already created)
3. Step definitions call LoginFlow
4. LoginFlow calls LoginPage
5. LoginPage interacts with UI
6. Test passes or fails

**Everyone Can Understand It!** ✅

---

## ⚙️ Available Steps (SauceDemo)

### Login Steps
```gherkin
Given the user is on the SauceDemo login page
When the user enters username "..."
When the user enters password "..."
When the user clicks the login button
Then the inventory page should be displayed
Then an error message should appear with text "..."
```

### Cart Steps
```gherkin
Given the user is logged in as "standard_user"
When the user clicks add to cart for "Product Name"
When the user clicks on the shopping cart icon
When the user removes "..." from cart
Then the cart badge should show "1"
Then "..." should be visible in the cart
```

### Checkout Steps
```gherkin
When the user clicks the checkout button
When the user enters firstname "..."
When the user enters lastname "..."
When the user enters zipcode "..."
When the user clicks the continue button
When the user clicks the finish button
Then the checkout overview page should be displayed
Then the success message should display "..."
```

**Ask a developer for the complete list!**

---

## ❓ Common Scenarios

### Copy This: Already-Implemented Scenarios

All these already work! Copy and modify:

1. **Login Test** → `tests/bdd/features/sauceDemo/login.feature`
2. **Add to Cart** → `tests/bdd/features/sauceDemo/addToCart.feature`
3. **Checkout** → `tests/bdd/features/sauceDemo/checkout.feature`

Just change names/values and run!

---

## 🔧 Next Steps for Developers

If creating new step definitions:

1. Check existing steps first (don't duplicate)
2. Create step in `tests/bdd/step-definitions/<portal>/[feature]Steps.ts`
3. **Must call existing flows/pages**
4. Wrap with `step()` for Allure reporting
5. Use business language, not technical code

**Template:**
```typescript
import { When } from '@cucumber/cucumber';
import { step } from '../../../../utils/allureUtils';

When('the user [action]', async function() {
  await step('[Readable description]', async () => {
    // Call existing flow/page here
  });
});
```

---

## 📊 Test Status

✅ **Infrastructure:** Working  
✅ **Example Features:** Created for SauceDemo  
✅ **GreenKart Example:** Created and working  
✅ **Step Definitions:** Created and working  
✅ **Documentation:** Complete  
✅ **Configuration:** Set up  

**Now:** Add environment variables and run!

---

## 🎯 Success Checklist

- [ ] Read `docs/bdd-beginner-guide.md`
- [ ] Create a test feature file (copy example)
- [ ] Run: `npm run bdd:sauceDemo`
- [ ] Share `.feature` files with team
- [ ] Non-technical users can read tests
- [ ] Add more scenarios as needed

---

## 🆘 Troubleshooting

### Tests Run But Fail (Invalid URL)
**Problem:** `Cannot navigate to invalid URL`  
**Solution:** Add environment variables
```bash
# .env file
SAUCEDEMO_UI_BASE_URL=https://www.saucedemo.com
```

### Step Not Found Error
**Problem:** "Undefined step"  
**Solution:** Ask developer to create it. Show the undefined step text.

### Want to Add New Portal?
**Steps:**
1. Create: `tests/bdd/features/myPortal/`
2. Create: `tests/bdd/step-definitions/myPortal/`
3. Create: `.feature` files and matching step files
4. Run: `npm run bdd -- --tags @myportal`

---

## 📞 Who Does What

| Role | Responsibility |
|------|-----------------|
| **Non-Technical Users** | Write `.feature` files (plain English) |
| **QA Engineers** | Review scenarios, ensure coverage |
| **Developers** | Create step definitions, maintain flows/pages |
| **Product Managers** | Review features for alignment |
| **Managers** | Read feature files as documentation |

**Everyone benefits from BDD!**

---

## 🎉 You're Ready!

Your framework now supports:
- ✅ TypeScript for developers
- ✅ Gherkin for business users
- ✅ Maximum code reuse
- ✅ Full test coverage
- ✅ Team collaboration

**Start by reading:** [`docs/bdd-beginner-guide.md`](../docs/bdd-beginner-guide.md)

**Then write your first scenario and run it!**

```bash
npm run bdd:sauceDemo
```

Let's go! 🚀

# BDD Quick Reference & How-To Run

This is a quick reference for non-technical users who want to write and run BDD tests.

---

## ⚡ Quick Start: Run BDD Tests

### Option 1: Run All BDD Tests
```bash
npm run bdd
```

### Option 2: Run Only SauceDemo Tests
```bash
npm run bdd:sauceDemo
```

### Option 3: Run Only GreenKart Tests
```bash
npm run bdd:greenKart
```

### Option 4: Run Specific Feature
```bash
npm run bdd -- tests/bdd/features/sauceDemo/login.feature
```

The test runs and shows `PASS` or `FAIL` in the terminal.

---

## 📖 How to Write a New BDD Test (Step by Step)

### Step 1: Open Text Editor

Open any text editor:
- VS Code
- Notepad
- Sublime Text
- Any text editor

### Step 2: Create New File

Create a new file in: `tests/bdd/features/sauceDemo/`

Name it: `myTest.feature`

(Replace `myTest` with what you're testing)

### Step 3: Write the Feature Header

Copy this template:

```gherkin
Feature: Add User to System
  As a user
  I want to add a new user
  So that I can manage accounts
```

Change:
- **Feature name:** What are you testing?
- **As a:** Who is the user?
- **I want to:** What action?
- **So that:** Why do they want it?

### Step 4: Write a Scenario (Test Case)

```gherkin
Scenario: User can successfully add a new item
  Given the user is on the login page
  When the user enters username "test_user"
  And the user enters password "test_password"
  And the user clicks the login button
  Then the inventory page should be displayed
```

**Pattern:**
1. `Given` = **Where do we start?** (setup)
2. `When` = **What does the user do?** (actions)
3. `Then` = **What should happen?** (verification)

### Step 5: Use Existing Steps

**Available steps for SauceDemo login:**
- `the user is on the SauceDemo login page`
- `the user enters username "..."`
- `the user enters password "..."`
- `the user clicks the login button`
- `the inventory page should be displayed`

Ask a developer: "What steps are available?"

### Step 6: Save and Run

```bash
npm run bdd:sauceDemo
```

If your steps exist, the test runs!

If a step doesn't exist, you'll see an error. Ask a developer to create it.

---

## 📝 Examples You Can Copy

### Example 1: Login Test
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

### Example 2: Add to Cart Test
```gherkin
Feature: Shopping Cart
  As a customer
  I want to add items to my cart
  So that I can purchase them

  Scenario: Add one item to cart
    Given the user is logged in as "standard_user"
    When the user clicks add to cart for "Sauce Labs Backpack"
    Then the cart badge should show "1"
```

### Example 3: Checkout Test
```gherkin
Feature: Checkout Process
  As a customer
  I want to complete checkout
  So that I can finish my purchase

  Scenario: Complete checkout successfully
    Given the user is logged in as "standard_user"
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks on the shopping cart icon
    And the user clicks the checkout button
    And the user enters firstname "John"
    And the user enters lastname "Doe"
    And the user enters zipcode "12345"
    And the user clicks the continue button
    And the user clicks the finish button
    Then the success message should display "Thank you for your order!"
```

---

## ❓ Common Questions

### Q: I wrote a test but got "Step undefined" error
**A:** Ask a developer to create the step definition. Show them the error message.

### Q: Can I run a single test?
**A:** Yes!
```bash
npm run bdd -- tests/bdd/features/sauceDemo/login.feature
```

### Q: What if I want to test a different portal?
**A:** Same pattern, different folder:
```bash
npm run bdd -- --tags @myportal
```

(But the portal must exist first)

### Q: Can I use parameters in steps?
**A:** Yes! Use any value in quotes:
```gherkin
When the user enters username "john.doe@example.com"
When the customer enters zipcode "54321"
```

### Q: Do I write the step definitions?
**A:** No. Developers do. You write the `.feature` files only.

### Q: How long should a scenario be?
**A:** 5-10 steps. If longer, split into multiple scenarios.

---

## 🎯 Rules for Writing Good Scenarios

✅ **DO:**
- Use plain English words
- Test one behavior per scenario
- Be specific (e.g., "Sauce Labs Backpack" not "a product")
- Use existing steps when possible
- Ask if you're unsure

❌ **DON'T:**
- Use technical jargon ("API", "selector", "DOM")
- Test multiple behaviors in one scenario
- Hardcode unnecessary details
- Make up step names (ask developer first)

---

## 📚 Available Steps (SauceDemo)

### Login Steps
- `the user is on the SauceDemo login page`
- `the user enters username {text}`
- `the user enters password {text}`
- `the user clicks the login button`
- `the inventory page should be displayed`
- `an error message should appear with text {text}`

### Cart Steps
- `the user is logged in as {text}`
- `the user clicks add to cart for {text}`
- `the cart badge should show {text}`
- `the user clicks on the shopping cart icon`
- `{text} should be visible in the cart`

### Checkout Steps
- `the user clicks the checkout button`
- `the user enters firstname {text}`
- `the user enters lastname {text}`
- `the user enters zipcode {text}`
- `the user clicks the continue button`
- `the checkout overview page should be displayed`
- `the user clicks the finish button`
- `the success message should display {text}`

**Ask a developer for the complete list for your portal.**

---

## 🚀 Workflow

1. **You write:** `.feature` file (plain English)
2. **You run:** `npm run bdd:sauceDemo`
3. **Tests execute** (if steps exist)
4. **If step missing:** Ask developer to create it
5. **Developer updates:** `tests/bdd/step-definitions/<portal>/[feature]Steps.ts`
6. **You run again:** Test passes!

---

## 🆘 Need Help?

**Q: Step not found?**
A: Ask a developer. Show the error message.

**Q: Test failed?**
A: Ask a developer. Show the failure message.

**Q: Want to add new step?**
A: Tell a developer what you want to test. They'll create the step.

---

## 💾 File Locations

**You create:** `tests/bdd/features/sauceDemo/myTest.feature`

**You run:** `npm run bdd:sauceDemo`

**Developers create:** `tests/bdd/step-definitions/<portal>/*.ts`

**Documentation:** `docs/bdd-beginner-guide.md`

---

## Next: Create Your First Test

1. Open text editor
2. Create file: `tests/bdd/features/sauceDemo/myFirstTest.feature`
3. Copy Example 1 (Login Test) from above
4. Save the file
5. Run: `npm run bdd:sauceDemo`
6. Watch it pass! 🎉

## 📊 Report View

All BDD results appear inside the shared Allure report under:

```text
BDD -> Portal -> Feature -> Scenario
```

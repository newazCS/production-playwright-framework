# BDD Guide: Write Tests Like a Story (For Anyone!)

This guide is **super simple**. No programming knowledge needed.

---

## 🎯 What is BDD?

BDD stands for **Behavior-Driven Development**.

In simple words: **Write tests as stories that anyone can understand.**

Instead of writing code, you write in **plain English** what the app should do.

### Example:
❌ **Old way (code):**
```typescript
await loginPage.login('user', 'pass');
expect(await inventoryPage.isLoaded()).toBe(true);
```

✅ **BDD way (story):**
```
Scenario: User can login with valid credentials
  When the user enters username "standard_user"
  And the user enters password "secret_sauce"
  And the user clicks the login button
  Then the inventory page should be displayed
```

**Anyone can read that!** Even your manager. Even a non-programmer.

---

## 📝 Parts of a BDD Test

Every BDD test has these simple parts:

### 1. **Feature** (What are we testing?)
```
Feature: User Login on SauceDemo
```

Think of it as: "We're testing the login feature"

### 2. **Scenario** (What specific situation?)
```
Scenario: User can login with valid username and password
```

Think of it as: "In this specific test, a user logs in with the correct info"

### 3. **Given** (Starting point - what's already true?)
```
Given the user is on the SauceDemo login page
```

Think of it as: "First, we open the login page"

### 4. **When** (What action does the user do?)
```
When the user enters username "standard_user"
And the user enters password "secret_sauce"
And the user clicks the login button
```

Think of it as: "Then, the user fills in the form and clicks login"

### 5. **Then** (What should happen?)
```
Then the inventory page should be displayed
```

Think of it as: "After that, the inventory page should appear"

---

## 🎬 Real Example: Complete Test Story

Here's a complete test written as a story:

```gherkin
Feature: Add Products to Cart
  As a customer
  I want to add products to my shopping cart
  So that I can purchase them

  Scenario: User can add one product to cart
    Given the user is logged in as "standard_user"
    When the user clicks add to cart for "Sauce Labs Backpack"
    Then the cart badge should show "1"

  Scenario: User can add multiple products to cart
    Given the user is logged in as "standard_user"
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks add to cart for "Sauce Labs Bike Light"
    And the user clicks add to cart for "Sauce Labs Bolt T-Shirt"
    Then the cart badge should show "3"
```

**Notice:** Both scenarios start the same way (user is logged in), but test different situations. The language is super clear and easy.

---

## ✍️ How to Write a New BDD Test (Step by Step)

### Step 1: Decide What Feature to Test

Example: "Testing product checkout"

Go to questions:
- What is the user doing?
- What should happen?

### Step 2: Create a Story File

Create a new file: `tests/bdd/features/sauceDemo/myTest.feature`

(File names should describe what you're testing)

### Step 3: Write the Feature Header

```gherkin
Feature: Complete Purchase Checkout
  As a customer
  I want to complete the checkout process
  So that I can finish my purchase
```

Fill in:
- **Feature name:** What are you testing?
- **As a:** Who is using this?
- **I want to:** What action?
- **So that:** Why do they want it?

### Step 4: Write Scenarios (Test Cases)

```gherkin
Scenario: User can checkout successfully
  Given the user is logged in as "standard_user"
  When the user adds "Sauce Labs Backpack" to cart
  And the user clicks checkout
  And the user enters name "John" and zipcode "12345"
  And the user clicks finish
  Then the success message should appear
```

**Rules:**
- Each scenario tests **one thing**
- Start with `Given` (setup)
- Then `When` (action)
- Then `Then` (verify)
- Use `And` to add more steps

### Step 5: Use Simple Language

✅ **Good steps:**
- `the user clicks the login button`
- `the user enters username "john@example.com"`
- `the inventory page should be displayed`
- `the cart should show 3 items`

❌ **Bad steps (too technical):**
- `fill #user-name input with "john@example.com"`
- `querySelector . inventory_list`
- `assert button.click() returns true`

**Always write like you're telling a friend what to do.**

---

## 🚀 Run Your BDD Tests

### Option 1: Run All BDD Tests
```bash
npm run bdd
```

### Option 2: Run Only SauceDemo Tests
```bash
npm run bdd:sauceDemo
```

### Option 3: Run Specific Feature File
```bash
npm run bdd -- tests/bdd/features/sauceDemo/login.feature
```

**That's it!** The tests run and show results.

---

## 📍 Where Files Go

When you create new BDD tests, put them here:

```
tests/bdd/
  features/
    sauceDemo/
      login.feature         ← New test file goes here
      addToCart.feature
      checkout.feature
  step-definitions/
    loginSteps.ts           ← Developers create this (you don't need to)
    addToCartSteps.ts
    checkoutSteps.ts
```

**You only create** the `.feature` files (the stories).

**Developers create** the `.ts` files (the code that makes it work).

---

## 🎨 Common Step Templates

Copy and paste these patterns when writing tests:

### Login Scenario
```gherkin
Scenario: User can login
  Given the user is on the SauceDemo login page
  When the user enters username "standard_user"
  And the user enters password "secret_sauce"
  And the user clicks the login button
  Then the inventory page should be displayed
```

### Add to Cart Scenario
```gherkin
Scenario: User can add product
  Given the user is logged in as "standard_user"
  When the user clicks add to cart for "Product Name"
  Then the cart badge should show "1"
```

### Error Message Scenario
```gherkin
Scenario: User sees error for wrong password
  Given the user is on the SauceDemo login page
  When the user enters username "standard_user"
  And the user enters password "wrong_password"
  And the user clicks the login button
  Then an error message should appear with text "username and password do not match"
```

---

## ❓ Common Questions

### Q: Can I write steps with any words?
**A:** No. Steps must match what developers created. But developers create common steps so you can reuse them.

**Ask a developer:** "What steps are available for SauceDemo tests?"

### Q: What if I want to test something new?
**A:** Write the step in your `.feature` file. If it doesn't exist, the developer adds it.

### Q: Can non-technical people write these files?
**A:** **YES!** That's the whole point. Product managers, QA testers, business analysts—anyone can write these stories.

### Q: Do I need to know programming?
**A:** **No!** You just need to:
1. Open a text editor (VS Code, Notepad, etc.)
2. Write clear sentences
3. Save with `.feature` extension

---

## 🛠️ Quick Checklist

Before you write a scenario, ask:

- [ ] Is the Feature name clear?
- [ ] Does the Scenario test one thing?
- [ ] Does it have Given (setup)?
- [ ] Does it have When (action)?
- [ ] Does it have Then (verification)?
- [ ] Are step names in plain English?
- [ ] Is it clear what the expected result is?
- [ ] Would a non-programmer understand it?

---

## 📚 Example Files to Learn From

Look at these to understand the pattern:

- `tests/bdd/features/sauceDemo/login.feature`
- `tests/bdd/features/sauceDemo/addToCart.feature`
- `tests/bdd/features/sauceDemo/checkout.feature`

Copy their style and structure. You'll see the pattern quickly.

---

## 🎓 Next Steps

1. Read one of the example `.feature` files
2. Create a copy: `myTest.feature`
3. Modify it for your test case
4. Ask a developer to check if the steps are available
5. Run: `npm run bdd:sauceDemo`
6. See your test run!

---

## Need Help?

**Developer:** Check if a step exists or needs to be created
**Manager:** Review the feature for business alignment
**QA:** Write scenarios based on requirements

**Everyone:** Read the `.feature` files—they're the documentation!

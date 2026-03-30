# Layer Code Patterns

## Page Layer (`apps/<portal>/pages/<Name>Page.ts`)

### BasePage (extend this for all pages)

```typescript
// apps/<portal>/pages/<Name>Page.ts
import { BasePage } from './basePage';
import { appConfig } from '../../../config/appConfig';

export class LoginPage extends BasePage {
  // All selectors in one private object
  private locators = {
    username: '#user-name',
    password: '#password',
    loginBtn: '#login-button',
    errorMsg: '[data-test="error"]',
    inventoryContainer: '.inventory_list'
  };

  async goto() {
    await this.navigate(appConfig.sauceDemo.ui.baseUrl);
  }

  async login(username: string, password: string) {
    await this.type(this.locators.username, username);
    await this.type(this.locators.password, password);
    await this.click(this.locators.loginBtn);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.locators.inventoryContainer);
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.page.locator(this.locators.errorMsg).textContent();
  }
}
```

### Complex Locator Patterns

```typescript
// Element containing a child with specific text (e.g., product by name)
const item = this.page.locator('.inventory_item', {
  has: this.page.locator('.inventory_item_name', { hasText: productName })
});
await item.locator('button').click();

// Text-based matching
await this.page.locator('button', { hasText: 'Add to cart' }).click();
```

### Page Rules
- Extends `BasePage` (which provides `navigate()`, `click()`, `type()`, `isVisible()`)
- All selectors in `private locators` object at class top
- Methods perform ONE user action or check
- No `expect()` calls — pages never assert
- No business logic — pages expose mechanics

---

## Flow Layer (`apps/<portal>/flows/<Name>Flow.ts`)

### UI Flow

```typescript
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { getStandardSauceDemoUser } from '../data/credentialResolver';
import { step } from '../../../utils/allureUtils';

export class CheckoutFlow {
  private loginPage: LoginPage;
  private inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
  }

  async loginAndAddItemToCart(productName: string) {
    const user = getStandardSauceDemoUser();

    await step('Open SauceDemo login page', async () => {
      await this.loginPage.goto();
    });

    await step('Login as standard user', async () => {
      await this.loginPage.login(user.username, user.password);
    });

    await step(`Add "${productName}" to cart`, async () => {
      await this.inventoryPage.addProductToCart(productName);
    });
  }
}
```

### API Flow

```typescript
import { APIRequestContext } from '@playwright/test';
import { BaseClient } from '../../../api/clients/baseClient';
import { reqresRoutes } from '../routes/users';
import { appConfig } from '../../../config/appConfig';

export class UserFlow {
  private client: BaseClient;
  private token: string = '';
  private userId: string = '';

  constructor(request: APIRequestContext) {
    this.client = new BaseClient(request);
  }

  async login() {
    const response = await this.client.post(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.login}`,
      { email: process.env.REQRES_API_EMAIL, password: process.env.REQRES_API_PASSWORD },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const body = await response.json();
    this.token = body.token;
  }

  async createUser(name: string) {
    const response = await this.client.post(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.users}`,
      { name, job: 'QA Engineer' },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    const body = await response.json();
    this.userId = body.id;
    return response;
  }
}
```

### Flow Rules
- UI flows receive `Page`; API flows receive `APIRequestContext`
- Always use page objects — never raw Playwright locators
- Always use `BaseClient` — never raw `request`
- Wrap each logical step with `step()` for Allure
- Store stateful values (token, userId) as class properties

---

## Data Layer (`apps/<portal>/data/<name>.ts`)

```typescript
// Static test data constants
export const sauceDemoProducts = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light'
};

export const sauceDemoCheckoutData = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
};

// Credential keys (NOT actual values)
export const sauceDemoUsers = {
  standard: {
    usernameEnvKey: 'SAUCEDEMO_UI_USERNAME',
    passwordEnvKey: 'SAUCEDEMO_UI_PASSWORD'
  }
};
```

### Credential Resolver Pattern

```typescript
// apps/<portal>/data/credentialResolver.ts
import { sauceDemoUsers } from './users';
import { getEnvValue } from '../../../utils/testDataUtils';

export function getStandardSauceDemoUser() {
  return {
    username: getEnvValue(sauceDemoUsers.standard.usernameEnvKey),
    password: getEnvValue(sauceDemoUsers.standard.passwordEnvKey)
  };
}
```

### Data Rules
- Static values only — no logic, no `process.env` calls directly
- Use `credentialResolver.ts` to resolve env keys into values
- Never hardcode secrets or passwords
- Group related values in named objects

---

## Route Layer (`apps/<portal>/routes/<name>.ts`)

```typescript
// apps/reqres/routes/users.ts
export const reqresRoutes = {
  login: '/api/login',
  users: '/api/users'
};

// apps/jsonplaceholder/routes/posts.ts
export const postsRoutes = {
  posts: '/posts',
  comments: '/comments'
};
```

### Route Rules
- Paths only — no base URL (base URL lives in `appConfig`)
- One route file per portal/API domain
- Plain key-value pairs, no logic
- Combined with baseUrl in flows/tests: `` `${appConfig.portal.api.baseUrl}${routes.endpoint}` ``

---

## Config Layer (`config/appConfig.ts`)

### Adding a New Portal

```typescript
// config/appConfig.ts
export const appConfig = {
  // ... existing portals ...

  newPortal: {
    ui: {
      baseUrl: process.env.NEWPORTAL_UI_BASE_URL || ''
    },
    api: {
      baseUrl: process.env.NEWPORTAL_API_BASE_URL || ''
    },
    performance: {
      homeThreshold: Number(process.env.NEWPORTAL_HOME_PERF_THRESHOLD || 3000)
    }
  }
};
```

And add to `.env`:
```
NEWPORTAL_UI_BASE_URL=https://example.com
NEWPORTAL_API_BASE_URL=https://api.example.com
NEWPORTAL_HOME_PERF_THRESHOLD=3000
```

### Config Rules
- All values from `process.env`
- Provide sensible defaults (empty string for URLs, number for thresholds)
- Portal name as top-level key
- Sub-keys: `ui`, `api`, `performance` as applicable

---

## Allure Utility Patterns (`utils/allureUtils.ts`)

```typescript
import { step, attachJson } from '../../../utils/allureUtils';

// Wrap any logical step
await step('Business-readable description', async () => {
  // Any async code — actions, assertions, or return values
});

// Step with return value
const result = await step('Get user data', async () => {
  return await flow.getUser();
});

// Attach a JSON payload to the report
await attachJson('API Response', responseBody);
```

## performanceUtils Pattern

```typescript
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';

// Call after page.goto() to collect Web Vitals
const metrics = await getPagePerformanceMetrics(page);
// Returns: { loadTime, domContentLoaded, firstPaint, firstContentfulPaint }
```

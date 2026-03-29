const requiredEnvVars = [
  'SAUCEDEMO_UI_BASE_URL',
  'SAUCEDEMO_UI_USERNAME',
  'SAUCEDEMO_UI_PASSWORD',
  'SAUCEDEMO_LOGIN_PERF_THRESHOLD',
  'SAUCEDEMO_INVENTORY_PERF_THRESHOLD',
  'SAUCEDEMO_CART_PERF_THRESHOLD',
  'AUTOMATIONEXERCISE_UI_BASE_URL',
  'AUTOMATIONEXERCISE_PERF_THRESHOLD',
  'JSONPLACEHOLDER_API_BASE_URL',
  'REQRES_API_BASE_URL',
  'REQRES_API_EMAIL',
  'REQRES_API_PASSWORD',
  'REQRES_API_KEY'
];

export function validateEnv(): void {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}`
    );
  }
}
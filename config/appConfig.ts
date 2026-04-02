export const appConfig = {
  sauceDemo: {
    ui: {
      baseUrl: process.env.SAUCEDEMO_UI_BASE_URL || '',
      username: process.env.SAUCEDEMO_UI_USERNAME || '',
      password: process.env.SAUCEDEMO_UI_PASSWORD || ''
    },
performance: {
  loginThreshold: Number(process.env.SAUCEDEMO_LOGIN_PERF_THRESHOLD || 3000),
  inventoryThreshold: Number(process.env.SAUCEDEMO_INVENTORY_PERF_THRESHOLD || 4000),
  cartThreshold: Number(process.env.SAUCEDEMO_CART_PERF_THRESHOLD || 4000)
}
  },

  automationExercise: {
    ui: {
      baseUrl: process.env.AUTOMATIONEXERCISE_UI_BASE_URL || ''
    },
    performance: {
      threshold: Number(process.env.AUTOMATIONEXERCISE_PERF_THRESHOLD || 6000)
    }
  },

  samplePortal: {
    ui: {
      baseUrl: process.env.SAMPLEPORTAL_UI_BASE_URL || ''
    }
  },

  greenKart: {
    ui: {
      baseUrl: process.env.GREENKART_UI_BASE_URL || ''
    }
  },

  jsonplaceholder: {
    api: {
      baseUrl: process.env.JSONPLACEHOLDER_API_BASE_URL || ''
    }
  },

  reqres: {
    api: {
      baseUrl: process.env.REQRES_API_BASE_URL || ''
    }
  }
};
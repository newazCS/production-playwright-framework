export const appConfig = {
  sauceDemo: {
    ui: {
      baseUrl: process.env.SAUCEDEMO_UI_BASE_URL || '',
      username: process.env.SAUCEDEMO_UI_USERNAME || '',
      password: process.env.SAUCEDEMO_UI_PASSWORD || ''
    },
    performance: {
      threshold: Number(process.env.SAUCEDEMO_PERF_THRESHOLD || 3000)
    }
  },

  automationExercise: {
    ui: {
      baseUrl: process.env.AUTOMATIONEXERCISE_UI_BASE_URL || ''
    },
    performance: {
      threshold: Number(process.env.AUTOMATIONEXERCISE_PERF_THRESHOLD || 5000)
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
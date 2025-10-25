// cypress.config.js
export default {
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    retries: { runMode: 2, openMode: 0 },
    // Descomente se precisar em outros sites com iframes/terceiros:
    // chromeWebSecurity: false,
    setupNodeEvents(on, config) { return config; }
  }
};

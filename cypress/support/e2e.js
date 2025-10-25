// cypress/support/e2e.js
// cypress/support/e2e.js
import 'cypress-file-upload';

// Ignora erros não tratados que vêm de scripts de terceiros do site (ads, etc.)
Cypress.on('uncaught:exception', (_err, _runnable) => {
  return false; // impede que o teste falhe por erro da aplicação
});

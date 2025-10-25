// cypress/e2e/registration.demoqa.cy.js
import { faker } from '@faker-js/faker';

describe('DemoQA - Student Registration', () => {
  it('preenche e submete o formulário com sucesso', () => {
    // Dados fakes
    const firstName = faker.person.firstName();
    const lastName  = faker.person.lastName();
    const email     = faker.internet.email({ firstName, lastName });
    const phone     = '1198765432'; // o site espera 10 dígitos

    // Acessa a página
    cy.visit('https://demoqa.com/automation-practice-form');

    // Em algumas execuções, elementos podem ficar cobertos; garantir viewport e scroll ajuda
    cy.viewport(1366, 768);
    cy.window().then((win) => win.scrollTo(0, 0));

    // Preenche campos básicos
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);

    // Gênero (forçar porque às vezes o label cobre o input)
    cy.get('input[name="gender"][value="Male"]').check({ force: true });

    // Telefone
    cy.get('#userNumber').type(phone);

    // Data de nascimento
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)').click();

    // Subjects (auto-suggest)
    cy.get('#subjectsInput').type('Maths{enter}').type('Physics{enter}');

    // Hobbies
    cy.contains('.custom-control-label', 'Sports').click();
    cy.contains('.custom-control-label', 'Music').click();

    // Upload de arquivo (opcional)
    // Requer: npm i -D cypress-file-upload  e  import 'cypress-file-upload' no cypress/support/e2e.js
    // Garanta que existe cypress/fixtures/example.png
    // cy.get('#uploadPicture').attachFile('example.png');

    // Endereço
    cy.get('#currentAddress').type('Rua Exemplo, 123 - Centro, Atibaia/SP');

    // State e City (React Select)
    cy.get('#state').scrollIntoView().click();
    // seleciona a 1ª opção (ex.: Haryana)
    cy.get('[id^="react-select-3-option-"]').first().click();

    cy.get('#city').click();
    // seleciona a 1ª opção correspondente (ex.: Karnal)
    cy.get('[id^="react-select-4-option-"]').first().click();

    // Envia o formulário (força porque o botão pode estar coberto)
    cy.get('#submit').click({ force: true });

    // Valida o modal de confirmação
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('have.text', 'Thanks for submitting the form');
    cy.get('.modal-body').within(() => {
      cy.contains(`${firstName} ${lastName}`).should('exist');
      cy.contains(email).should('exist');
      cy.contains('Male').should('exist');
      cy.contains(phone).should('exist');
      cy.contains('Maths').should('exist');
      cy.contains('Physics').should('exist');
      cy.contains('Sports').should('exist');
      cy.contains('Music').should('exist');
    });

    // Fecha o modal (opcional)
    cy.get('#closeLargeModal').click({ force: true });
    cy.get('.modal-content').should('not.exist');
  });
});

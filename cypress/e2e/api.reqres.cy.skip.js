// cypress/e2e/api.reqres.cy.js
// Exercícios de API usando https://reqres.in/
// Inclui: GET (lista/usuário), POST (create), PUT/PATCH (update), DELETE

describe('API - ReqRes (CRUD básico)', () => {
  const apiBase = 'https://reqres.in';

  it('GET - lista de usuários (page=2)', () => {
    cy.request('GET', `${apiBase}/api/users?page=2`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('data').and.to.be.an('array').and.not.be.empty;
      // Exemplo de validação de um item
      const user = res.body.data[0];
      expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
    });
  });

  it('GET - usuário por id (id=2)', () => {
    cy.request('GET', `${apiBase}/api/users/2`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.include({ id: 2 });
      expect(res.body.data).to.have.keys('id', 'email', 'first_name', 'last_name', 'avatar');
    });
  });

  it('POST - criar usuário (create)', () => {
    const payload = { name: 'William', job: 'QA Automation' };

    cy.request('POST', `${apiBase}/api/users`, payload).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.include({ name: payload.name, job: payload.job });
      expect(res.body).to.have.property('id').and.to.be.a('string');
      expect(res.body).to.have.property('createdAt');
      // Dica: o ReqRes não persiste de verdade, então o id criado não é recuperável em GET
    });
  });

  it('PUT - atualizar usuário (id=2) - update completo', () => {
    const payload = { name: 'William', job: 'Senior QA' };

    cy.request('PUT', `${apiBase}/api/users/2`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include({ name: payload.name, job: payload.job });
      expect(res.body).to.have.property('updatedAt');
    });
  });

  it('PATCH - atualizar parcialmente usuário (id=2)', () => {
    const payload = { job: 'QA Lead' };

    cy.request('PATCH', `${apiBase}/api/users/2`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(payload);
      expect(res.body).to.have.property('updatedAt');
    });
  });

  it('DELETE - remover usuário (id=2)', () => {
    cy.request('DELETE', `${apiBase}/api/users/2`).then((res) => {
      expect(res.status).to.eq(204);
      expect(res.body).to.be.empty;
    });
  });
});

// cypress/e2e/api.jsonplaceholder.cy.js
// CRUD com https://jsonplaceholder.typicode.com (sem necessidade de API key)

describe('API - JSONPlaceholder (CRUD básico)', () => {
  const api = 'https://jsonplaceholder.typicode.com';

  it('GET - lista de posts', () => {
    cy.request(`${api}/posts`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.not.be.empty;
      const p = res.body[0];
      expect(p).to.have.keys('userId', 'id', 'title', 'body');
    });
  });

  it('GET - detalhe de post (id=1)', () => {
    cy.request(`${api}/posts/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include({ id: 1 });
      expect(res.body).to.have.keys('userId', 'id', 'title', 'body');
    });
  });

  it('POST - criar post (create)', () => {
    const payload = { title: 'Hello Cypress', body: 'Conteúdo do post', userId: 99 };

    cy.request('POST', `${api}/posts`, payload).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.include(payload);
      expect(res.body).to.have.property('id');
    });
  });

  it('PUT - atualizar post (id=1) - update completo', () => {
    const payload = { id: 1, title: 'Título atualizado', body: 'Body atualizado', userId: 1 };

    cy.request('PUT', `${api}/posts/1`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(payload);
    });
  });

  it('PATCH - atualizar parcialmente post (id=1)', () => {
    const payload = { title: 'Título parcial' };

    cy.request('PATCH', `${api}/posts/1`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(payload);
    });
  });

  it('DELETE - remover post (id=1)', () => {
    cy.request('DELETE', `${api}/posts/1`).then((res) => {
      expect([200, 204]).to.include(res.status);
    });
  });
});

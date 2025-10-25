# 🧪 Automação de Testes com Cypress

Projeto de automação criado com **Cypress**, voltado para testes de interface (E2E) e **testes de API REST**.  
O projeto utiliza sites e serviços públicos para fins educacionais, com foco em **boas práticas, organização e qualidade de código**.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) — Framework de testes E2E e API  
- [Node.js](https://nodejs.org/) — Ambiente de execução JavaScript  
- [@faker-js/faker](https://fakerjs.dev/) — Geração de dados fake para testes  
- [cypress-file-upload](https://github.com/abramenal/cypress-file-upload) — Upload de arquivos em testes  
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — API pública usada nos testes de CRUD  
- [ReqRes](https://reqres.in/) — API pública usada para exemplos de autenticação e status codes  

---

## 📦 Estrutura do Projeto

Automacao-teste-cypress/
├── cypress/
│ ├── e2e/
│ │ ├── registration.demoqa.cy.js # Teste E2E (DemoQA - formulário)
│ │ ├── api.jsonplaceholder.cy.js # Testes de API (CRUD) - sem API key
│ │ └── api.reqres_key.cy.js # (Opcional) Exemplo com ReqRes (exige API key)
│ ├── fixtures/
│ │ └── example.png # Arquivo para upload (opcional)
│ └── support/
│ └── e2e.js # Config global (ignorar erros externos, etc.)
├── cypress.config.js # Configurações do Cypress
├── package.json # Dependências e scripts NPM
└── README.md # Documentação do projeto


---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- Navegador (Chrome, Edge ou Firefox)

Verifique as versões:
```bash
node -v
npm -v


git clone https://github.com/SEU_USUARIO/Automacao-teste-cypress.git
cd Automacao-teste-cypress
npm install


▶️ Executando os Testes
🖥️ Modo interativo (interface gráfica)
npx cypress open --browser chrome

Escolha E2E Testing

Selecione o navegador

Escolha os testes que deseja executar



⚡ Modo headless (sem interface)
Rodar todos os testes (E2E + API)
npx cypress run --browser chrome --headless
# ou
npm test


Rodar apenas o teste E2E (DemoQA)
npx cypress run --browser chrome --headless --spec cypress/e2e/registration.demoqa.cy.js

Rodar apenas os testes de API (JSONPlaceholder)
npx cypress run --browser chrome --headless --spec cypress/e2e/api.jsonplaceholder.cy.js


🧠 Fluxo Automatizado (E2E)

O caso de teste principal (registration.demoqa.cy.js) realiza o fluxo completo do formulário:

Acesso à página https://demoqa.com/automation-practice-form

Preenchimento de campos obrigatórios (nome, e-mail, telefone, endereço)

Seleção de gênero, hobbies e data de nascimento

Upload de arquivo (opcional)

Seleção dinâmica de State e City

Submissão do formulário

Validação do modal de confirmação exibido após o envio

🌐 Testes de API

O projeto inclui dois exemplos de testes de API:

✅ api.jsonplaceholder.cy.js

CRUD completo usando a API pública JSONPlaceholder, sem necessidade de autenticação:

GET /posts → Lista todos os posts

GET /posts/1 → Retorna um post específico

POST /posts → Cria um post (mockado)

PUT /posts/1 → Atualiza um post existente

PATCH /posts/1 → Atualiza parcialmente um post

DELETE /posts/1 → Remove um post (mockado)

Rodar apenas este arquivo:

npx cypress run --browser chrome --headless --spec cypress/e2e/api.jsonplaceholder.cy.js


🔐 api.reqres_key.cy.js (opcional)

Exemplo baseado na API ReqRes.
Algumas rotas exigem API key, então este arquivo está preparado para estudos de autenticação, tokens e headers.

Uso futuro:
cy.request({
  method: 'GET',
  url: 'https://reqres.in/api/users/2',
  headers: { 'x-api-key': 'SUA_CHAVE_AQUI' }
})


🧱 Boas Práticas Adotadas

Geração dinâmica de dados (@faker-js/faker)

Upload de arquivo com cypress-file-upload

Ignorar erros externos com Cypress.on('uncaught:exception', () => false)

Reexecução automática de testes intermitentes (retries)

Estrutura modular e legível de specs (UI + API)

Organização dos comandos e suporte em cypress/support/e2e.js

📸 Evidências de Execução

Após cada execução, o Cypress gera automaticamente:

📂 cypress/videos/ → Vídeos de execução
📂 cypress/screenshots/ → Prints automáticos em caso de falhas

"scripts": {
  "cypress:open": "cypress open --browser chrome",
  "test": "cypress run --browser chrome --headless",
  "test:e2e": "cypress run --browser chrome --headless --spec cypress/e2e/registration.demoqa.cy.js",
  "test:api": "cypress run --browser chrome --headless --spec cypress/e2e/api.jsonplaceholder.cy.js"
}


🧱 Boas práticas para testes de API

Usar cy.request() com objeto de configuração:
cy.request({
  method: 'POST',
  url: 'https://jsonplaceholder.typicode.com/posts',
  headers: { 'Content-Type': 'application/json' },
  body: { title: 'Hello Cypress', body: 'Conteúdo do post', userId: 99 }
});

Validar erros sem quebrar o teste:
cy.request({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/rota-invalida',
  failOnStatusCode: false
}).its('status').should('eq', 404);


🧩 Próximos Passos

Adicionar testes negativos de API (400/404)

Criar relatório HTML (Mochawesome ou Allure)

Configurar execução automática em CI/CD (GitHub Actions ou AWS CodeBuild)

👨‍💻 Autor

William Domingues Barbosa
💼 Engenheiro de Software / QA Automation
🔗 LinkedIn



💬 “Automatizar é libertar tempo para pensar em qualidade.”
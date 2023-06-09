Cypress.config('baseUrl', 'http://localhost:3000')
Cypress.config('viewportWidth', 375)
Cypress.config('viewportHeight', 1080)
describe('login', () => {
  it('fieldUsernameEmpty', () => {
    cy.visit('/login')
    cy.get('[data-testid="username"]').should('exist')
    cy.get('[data-testid="btn-login"]').should('exist').click()
    cy.get('[data-testid="input-error"]')
      .should('exist')
      .should('have.text', 'Campo obrigatório')
  })
  it('fieldPasswordEmpty', () => {
    cy.visit('/login')
    cy.get('[data-testid="username"]')
      .should('exist')
      .type('eve.holt@reqres.in')
    cy.get('[data-testid="password"]').should('exist')
    cy.get('[data-testid="btn-login"]').should('exist').click()
    cy.get('[data-testid="input-error"]')
      .should('exist')
      .should('have.text', 'Campo obrigatório')
  })
  it('logar', () => {
    cy.visit('/login')
    cy.get('[data-testid="username"]')
      .should('exist')
      .type('eve.holt@reqres.in')
    cy.get('[data-testid="password"]').should('exist').type('cityslicka')
    cy.get('[data-testid="btn-login"]').should('exist').click()
  })
})

Cypress.config('baseUrl', 'http://localhost:3000')
Cypress.config('viewportWidth', 1920)
Cypress.config('viewportHeight', 1080)
describe('createUser', () => {
  it('fieldUsernameEmpty', () => {
    cy.visit('/login')
    cy.get('[data-testid="username"]')
      .should('exist')
      .type('eve.holt@reqres.in')
    cy.get('[data-testid="password"]').should('exist').type('cityslicka')
    cy.get('[data-testid="btn-login"]').should('exist').click()
    cy.get('[data-testid="btn-create-user"]').should('exist').click()
    cy.get('[data-testid="input-name"]').should('exist')
    cy.get('[data-testid="btn-create-confirm"]').should('exist').click()
    cy.get('[data-testid="input-error-user"]')
      .should('exist')
      .should('have.text', 'Campo obrigatório')
    cy.get('[data-testid="input-name"]').should('exist').type('Daniel Martins')
    cy.get('[data-testid="input-job"]').should('exist')
    cy.get('[data-testid="btn-create-confirm"]').should('exist').click()
    cy.get('[data-testid="input-error-user"]')
      .should('exist')
      .should('have.text', 'Campo obrigatório')
    cy.get('[data-testid="input-name"]').should('exist').type('Daniel Martins')
    cy.get('[data-testid="input-job"]').should('exist').type('Dev')
    cy.get('[data-testid="btn-create-confirm"]').should('exist').click()
  })
})

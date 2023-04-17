Cypress.config('baseUrl', 'http://localhost:3000')
Cypress.config('viewportWidth', 1920)
Cypress.config('viewportHeight', 1080)
describe('deleteUser', () => {
  it('fieldUsernameEmpty', () => {
    cy.visit('/login')
    cy.get('[data-testid="username"]')
      .should('exist')
      .type('eve.holt@reqres.in')
    cy.get('[data-testid="password"]').should('exist').type('cityslicka')
    cy.get('[data-testid="btn-login"]').should('exist').click()
    cy.get('[data-testid="btn-delete-user"]').should('exist').first().click()

    cy.get('[data-testid="btn-delete-confirm"]').should('exist').click()
  })
})

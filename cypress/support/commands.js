Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('[id="firstName"]').type('Maria')
    cy.get('[id="lastName"]').type('Silva')
    cy.get('[id="email"]').type('xofisic145@flowminer.com')
    cy.get('[id="open-text-area"]').type('Curso básico cypress - v2')
    cy.get('.button').click()
})
describe('Event entity', () => {
    it('can be created', () => {
        cy.visit('http://localhost:8080')
        cy.get('#navbarResponsive').contains('Account').click()
        cy.get('#navbarResponsive .dropdown-menu').contains('Sign in').click()

        cy.get('#username').type('admin')
        cy.get('#password').type('admin')
        cy.get('.modal-body').contains('Sign in').click()

        cy.contains('Entities').click()
        cy.contains('Event').click()
        cy.get('#page-heading').contains('Create a new Event').click()
        
        cy.get('#field_name').type('Test')
        cy.get('#field_startsAt').type('2020-02-27')
        cy.get('#field_duration').type(4)

        cy.get('#save-entity').click()

        cy.get('.alerts .alert-success').should('exist')
    })
})
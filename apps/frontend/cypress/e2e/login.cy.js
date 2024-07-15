describe('Login processes', () => {
    it('visits the app root url', () => {
        cy.visit('/')
        cy.contains('h1', 'Login')
    })
})
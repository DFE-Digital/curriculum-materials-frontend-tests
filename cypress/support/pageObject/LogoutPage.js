class LogoutPage {
    getLogoutButton() {
        return cy.get('.button_to > .govuk-link')
    }
    getNextLogoutButton() {
        return cy.get('input.govuk-button')
    }
    getLogoutMessage() {
        return cy.get('h1.govuk-heading-l')
    }
}
export default LogoutPage;
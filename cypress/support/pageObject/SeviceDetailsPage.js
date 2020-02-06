class SeviceDetailsPage {
    getServiceDetailsPageHeader() {
        return cy.get('.govuk-heading-l')
    }
    getContinueButton() {
        //return cy.get('.govuk-button')
        return cy.contains('Continue')
    }
    getBackButton() {
        return cy.get('.govuk-back-link')
    }
    getPageContentofHowServiceWorkPage() {
        return cy.get('.govuk-splash > :nth-child(2)')
    }
}
export default SeviceDetailsPage;
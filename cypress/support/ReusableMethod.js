class ReusableMethod {

    constructor(falg) {
        this.falg = false;
    }
    getFooterLogo() {
        return cy.get('.govuk-footer__meta')
    }
    static sendRequest(endPoint) {
        let baseUrl = Cypress.env('baseUrl')
        endPoint = baseUrl + endPoint
        cy.request({
            url: endPoint,
            headers: { Authorization: 'Bearer StQ85s7vzGaeaPV9bET7r8Zb' } 
          }) .as('herokuapi');

    }
}
export default ReusableMethod;
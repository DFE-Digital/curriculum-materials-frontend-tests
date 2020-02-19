class ReusableMethod {

    constructor(falg) {
        this.falg = false;
    }
    getFooterLogo() {
        return cy.get('.govuk-footer__meta')
    }
}
export default ReusableMethod;
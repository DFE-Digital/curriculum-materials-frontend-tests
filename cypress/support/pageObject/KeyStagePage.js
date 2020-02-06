class KeyStagePage {

    getKeyStagePageHeader() {
        return cy.get('.govuk-heading-l')
    }
    getKeyStagePageSubHeader() {
        return cy.get('.govuk-grid-column-two-thirds > p')
    }
    getKeyStageFieldSetHeader() {
        return cy.get('.govuk-fieldset__heading')
    }
    getKeyStageRadioButton() {
        return cy.get('#year-7')
    }
    getKeyStageContinueButton() {
        return cy.get('.govuk-button')
    }
}
export default KeyStagePage;
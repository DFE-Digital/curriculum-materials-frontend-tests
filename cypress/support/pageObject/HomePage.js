class HomePage {

  getPageName() {
    return cy.get('.govuk-header__content > .govuk-header__link')
  }
  getPageHeader() {
    return cy.get('h1')
  }
  getStartButtonName() {
    return cy.get('.govuk-button')
  }
  getStartButton() {
    return cy.get('a.govuk-button.govuk-button')
  }
    static getStartButton() {
    cy.get('a.govuk-button.govuk-button').click()
  }
  getBeforYouStartHeader() {
    return cy.get('.govuk-grid-column-two-thirds > h3')
  }
  getBeforStartMessage() {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(8)')
  }
  getBeforStartNextMessage() {
    return cy.get(':nth-child(9) > :nth-child(1)')
  }
}
export default HomePage;
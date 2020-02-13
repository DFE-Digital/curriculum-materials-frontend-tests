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
  getBeforYouStartHeader() {
    return cy.get('.govuk-grid-column-two-thirds > h3')
  }
  getBeforStartMessage() {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(13)')
  }
}
export default HomePage;
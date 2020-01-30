class HomePage
{

getPageName()
{
    return cy.get('.govuk-header__content > .govuk-header__link')
}

getPageHeader()
{
    return cy.get('h1')

}
getStartButtonName()
{
  return  cy.get('.govuk-button')
}

getStartButton()
{
  return  cy.get('a.govuk-button.govuk-button')
}
}

export default HomePage;
class SeviceDetailsPage
{

getServiceDetailsPageHeader()
{
    return cy.get('.govuk-heading-l')
}
getContinueButton()
{
    return cy.get('.govuk-button')
}
getBackButton()
{
    return cy.get('.govuk-back-link')
}
}
export default SeviceDetailsPage;
class YeargroupOptionSelectPage
{

getYearGroupSelectPageHeader()
{
    return cy.get('.govuk-heading-l')
}

getYearGroupSelectDescription()
{
    return cy.get('.govuk-grid-column-two-thirds > p')
}

getKeyStageHeader()
{
    return cy.get('.govuk-fieldset__heading')
}

           
}
export default YeargroupOptionSelectPage;
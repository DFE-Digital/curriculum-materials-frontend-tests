class Year7GeographyPage {
    getPageName() {
        return cy.get('.govuk-breadcrumbs__list-item')
    }
    getPageName() {
        return cy.get('.govuk-breadcrumbs__list-item')
    }
    getLessonHeader() {
        return cy.get('h3:nth-child(1)')
    }
}
//article.card >div.card-header > div.card-header-title > a >h3 : list of all lesson header
//div.card-header-title > span.govuk-caption-m : number of lesson
//article.card >div.card-body >ul >li :  
//article.card:nth-child(1) div.card-body > ul:nth-child(2) >li : to get the lesson name
//article.card:nth-child(5) div.card-header div.card-header-title > span.govuk-caption-m:nth-child(2) : lesson count
export default Year7GeographyPage;
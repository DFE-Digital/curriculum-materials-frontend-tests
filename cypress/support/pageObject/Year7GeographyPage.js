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
    getUnitsName() {
        return cy.get('article.card >div.card-header > div.card-header-title > a >h3')
    }
    getViewandLessonPlanLink(indexNumber) {
        return cy.get('article.card:nth-child(' + (indexNumber + 1) + ') >div.card-footer')       
    }
    getUnitHeader(){
        return cy.get('h1.govuk-heading-l')
    }
    getLessonsHeader(index) {
        return cy.get('article.card:nth-child(' + (index + 1) + ') div.card-header div.card-header-title a:nth-child(1) > h3:nth-child(1)')
    }
    getLessonCount(index) {
        return cy.get('article.card:nth-child(' + (index + 1) + ') div.card-header div.card-header-title > span.govuk-caption-m:nth-child(2)')
    }
    getLearningObjective(index) {
        return cy.get('article.card:nth-child(' + (index + 1) + ') div.card-body > ul:nth-child(2) >li')
    }
    getUnitName(i) {
        return cy.get(':nth-child('+i+') > .card-header > .card-header-title > a > h3')        
    }
}
//article.card >div.card-header > div.card-header-title > a >h3 : list of all lesson header
//div.card-header-title > span.govuk-caption-m : number of lesson
//article.card >div.card-body >ul >li :  
//article.card:nth-child(1) div.card-body > ul:nth-child(2) >li : to get the lesson name
//article.card:nth-child(5) div.card-header div.card-header-title > span.govuk-caption-m:nth-child(2) : lesson count
//article.card:nth-child(3) >div.card-footer: gives the link associated with each lesson units
export default Year7GeographyPage;
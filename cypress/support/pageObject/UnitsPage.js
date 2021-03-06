class UnitsPage {
    getPageName() {
        return cy.get('h1')
    }
    /* getPageName() {
        return cy.get('.govuk-breadcrumbs__list-item')
    } */
    getLessonHeader() {
        return cy.get('h3:nth-child(1)')
    }
    getUnitCount() {
        let count = 1

        cy.get('h3:nth-child(1)').each(($el, index, $list) => {

            count = $list.length
        })
        return count
    }

    getUnitsName() {
        return cy.get('article.card >div.card-header > div.card-header-title')
    }
    getViewandLessonPlanLink(indexNumber) {
        return cy.get('article.card:nth-child(' + (indexNumber + 1) + ') >div.card-footer')
    }
    getUnitHeader() {
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
        return cy.get(':nth-child(' + i + ') > .card-header > .card-header-title')

    }
    getFirstViewLessonLink() {
        return cy.get(".govuk-table__body > :nth-child(1) > :nth-child(4) > a")
    }
    getDownloadTab() {
        return cy.get(":nth-child(3) > .govuk-tabs__tab")
    }
    getPrintLessonPlanLink() {
        //return cy.get(".govuk-list > :nth-child(1) > a")
        return cy.get('.downloads > :nth-child(3) > a')       
    }
    getLessonNumber() {
        return cy.get('#knowledge-overview > :nth-child(2)')
    }
    getLessonNumberinPDFFile() {
        return cy.get('.govuk-grid-column-full > :nth-child(3)')
    }
    getLogoInsidePDFFile() {
        return cy.get('.govuk-footer__meta > :nth-child(2) > .govuk-footer__link')
    }
    getFooterInsidePDFFile() {
        return cy.get('.govuk-footer')
    }
    getUnits() {
        return cy.get(".cards-container")
    }
    getUnitOverview() {
        return cy.get("#main-content > :nth-child(2) > p")
    }
    getLearningObjectiveTable() {
        return cy.get('.govuk-table__body > tr ')
    }
    getLearningObjectiveName(index) {
        return cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2)')
    }
    getViewLessonLink(index) {
        return cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a')
    }
    getknowledgeOverviewTab() {
        //return cy.get('#tab_knowledge-overview')
        return cy.get('.govuk-tabs__list-item--selected > .govuk-tabs__tab')
    }
    getLessonContentLink() {
        return cy.get('#knowledge-overview > .govuk-button')
    }
    getLessonContentsTab() {
        //return cy.get('#tab_lesson-contents')
        return  cy.get(':nth-child(2) > .govuk-tabs__tab').click()
    }
    getDownloadsLink() {
        return cy.get('#lesson-contents > .govuk-button')
    }
    getCurrentUnitName() {
        return cy.get('.current')
    }
    getDownloadsHeader() {
        return cy.get('#tab_downloads')
    }
    getDownloadsSubHeader() {
        return cy.get('.downloads > .govuk-heading-l')
    }
    getChangeActivity() {
        return cy.get(':nth-child(1) > .alternatives > .alternatives-list > a')
    }
    
}
export default UnitsPage;


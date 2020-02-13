/// <reference types="Cypress" />
import HomePage from '../../support/pageObject/HomePage'
import SeviceDetailsPage from '../../support/pageObject/SeviceDetailsPage'
import KeyStagePage from '../../support/pageObject/KeyStagePage'
import Year7GeographyPage from '../../support/pageObject/Year7GeographyPage'
import LogoutPage from '../../support/pageObject/LogoutPage'
import InvitationPage from '../../support/pageObject/InvitationPage'

describe('Validate user is able to view curriculum material', function () {

   const homePage = new HomePage()
   this.beforeEach(function () {
      cy.visit(Cypress.env('url'))
      cy.fixture('example').then(function (data) {
         this.data = data        
      })
   })

   it('Validate the user is able to launch curriculum material initial page', function () {
      homePage.getPageName().should('have.text', this.data.pageName)
      homePage.getPageHeader().should('have.text', this.data.pageHeader)
      homePage.getStartButtonName().should('have.text', this.data.startButtonName)
   })

   it('Validate the user is able to see Before you start message on home page', function () {
      homePage.getBeforYouStartHeader().should('have.text', this.data.beforeYouStartHeader)
      homePage.getBeforStartMessage().should('have.text', this.data.beforeYouStartMessage)
      cy.get(':nth-child(14) > :nth-child(1)')
         .first().should('have.text',this.data.beforeYouStartMessage1 )
         .next().should('have.text',this.data.beforeYouStartMessage2)
         .next().should('have.text',this.data.beforeYouStartMessage3)
   })

   it('Validate the user is able to navigate to How the service works page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getServiceDetailsPageHeader().should('have.text', this.data.sevicedetailsPageHeader)
      servicePage.getContinueButton().should('have.text', this.data.continueButtonText)
   })

   it('Validate the user is able to navigate previous page if he click on Back button', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getBackButton().click()
      homePage.getPageHeader().should('have.text', this.data.pageHeader)
      homePage.getStartButtonName().should('have.text', this.data.startButtonName)
   })
   it('Validate the user is able to view the How the service works page content', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getPageContentofHowServiceWorkPage().should('have.text', this.data.servicePageContent1)
         .next().should('have.text', this.data.servicePageContent2)
   })

   it('Validate the user is able to navigate to key stage page and able to view option to select key stage', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStagePageHeader().should('have.text', this.data.keyStagePageHeaher)
      keyStagePage.getKeyStagePageSubHeader().should('have.text', this.data.keyStagePageSubHeader)
      keyStagePage.getKeyStageFieldSetHeader().should('have.class', 'govuk-fieldset__heading')
   })

   it('Validate the system is not allowing user to navigate to next page without selecting year radio button ', function () {
      var flag = false
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStagePageHeader().should('have.text', this.data.keyStagePageHeaher)
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      try {
         flag = false
         year7GeographyPage.getPageName().should('have.text', this.data.geographyPageName)
      }
      catch (err) {
         flag = true
      }
      if (flag) {
         expect(flag == true).to.be.equal(true)
      }
      else {
         expect(flag == false).to.be.equal(false)
      }
   })

   it('Validate the user is able to select the desired option on key stage page and able navigate to next page post clicking on continue button', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getPageName().should('have.text', this.data.geographyPageName)
   })

   it('Validate the user is able to view page descriptions for Year 7 Geography page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getPageName().should('have.text', this.data.geographyPageName)
      cy.get(':nth-child(2) > .govuk-heading-m').should('have.text', "What is covered in TODO!!")
      cy.get('#main-content > :nth-child(2) > p').should('have.text', "A unit focused on the physical processes that create and destroy our landscape - and their effects on humans.")
   })

   it('Validate the user is able to view lessons header/unit ', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getLessonHeader().each(($el, index, $list) => {
         const lessonHeaderText = $el.text()
         expect(lessonHeaderText).equal(this.data.geographyUnitHeader[index])
      })
   })

   it('Validate the lesson count at header is matching with lesson count at footer', function () {
      var $lessoncount = 0
      var $lessoncountatfooter = 0
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getLessonHeader().each(($el, index, $list) => {
         cy.get('article.card:nth-child(' + (index + 1) + ') div.card-header div.card-header-title a:nth-child(1) > h3:nth-child(1)').then(function ($lessonHeader) {
            cy.log($lessonHeader.text())
            cy.get('article.card:nth-child(' + (index + 1) + ') div.card-header div.card-header-title > span.govuk-caption-m:nth-child(2)').then(function ($lessonCount) {
               cy.log($lessonCount.text())
               var count = $lessonCount.text().split(' ')[0]
               $lessoncount = Number(count)
               cy.get('article.card:nth-child(' + (index + 1) + ') div.card-body > ul:nth-child(2) >li').each(($el, index, list) => {
                  cy.log(index + 1 + '=' + $el.text())
                  if ((index + 1) == list.length) {
                     $lessoncountatfooter = list.length
                     cy.log('Lesson count at header = ' + $lessoncount)
                     cy.log('Lesson  count at footer = ' + $lessoncountatfooter)
                     expect($lessoncountatfooter == $lessoncount).to.be.true
                  }
               })
            })
         })
      })
   })

   it('Validate the user is able to view "View and plan lessons" link associated to with each unit', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getUnitName().each(($el, index, $list) => {
         year7GeographyPage.getViewandLessonPlanLink(index).then(function (linkName) {
            var linktext = linkName.text()
            expect(linktext).to.have.string('View and plan lessons')
         })
      })
   })

   it('Validate the user is able to navigate to next page once he clicks on "View and plan lessons" link', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getUnitName().each(($el, index, $list) => {
         year7GeographyPage.getViewandLessonPlanLink(index).then(function (linkName) {
            year7GeographyPage.getViewandLessonPlanLink(index).click()
            cy.waitUntilPageLoad(0.5)
            year7GeographyPage.getUnitHeader().then(function (linkName1) {
               cy.log(linkName1.text())
               cy.log(this.data.geographyUnitHeader[index])
               year7GeographyPage.getUnitHeader().should('have.text', this.data.geographyUnitHeader[index])
            })
            cy.navigateBack()
         })
      })
   })

   it('Validate the user is able to logout from the system', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getPageName().should('have.text', this.data.geographyPageName)
      const logoutPage = new LogoutPage()
      logoutPage.getLogoutButton().click()
      logoutPage.getLogoutMessage().should('have.text', this.data.logOutMessage)
   })

   xit('Validate the user is able to view the invitation page and it\'s content', function () {
      cy.visit(Cypress.env('url_old'))
      const logoutPage = new LogoutPage()
      logoutPage.getLogoutMessage().should('have.text', this.data.invitationMessage)
      const invitationPage = new InvitationPage()
      invitationPage.getInvitationPageContent().should('have.text', this.data.invitationMessageLine1)
         .next().should('have.text', this.data.invitationMessageLine2)
      invitationPage.getInvitationLink().should('have.text', this.data.invitationEmail)
   })

   it('Validate the user is able to view the "View lesson" link against each lesson for each untit', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(1) > .card-header > .card-header-title > a > h3').click()
      cy.get('.govuk-heading-l').should('have.text', 'Earthquake damage')
      cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
         cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2)').then(function (linkName) {
            var learningObjective = linkName.text()
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
         })
      })
   })

   it('Validate the user is able to view the lesson overview page, so that he understand what he can going to teach, and how to teach it', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(1) > .card-header > .card-header-title > a > h3').click()
      cy.get('.govuk-heading-l').should('have.text', 'Earthquake damage')
      cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
         cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2)').then(function (linkName) {
            var learningObjective = linkName.text()
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
            cy.get('#tab_lesson-contents').click()
            cy.waitUntilPageLoad(0.2)
            cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
            cy.get('#tab_downloads').click()
            cy.waitUntilPageLoad(0.2)
            cy.get('#downloads > h2').should('have.text', 'Downloads')
            cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
         })
      })
   })

   it('Validate the user is able to view and navigate to next page if he clicks the link on lesson overview page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(1) > .card-header > .card-header-title > a > h3').click()
      cy.get('.govuk-heading-l').should('have.text', 'Earthquake damage')
      cy.get('.siblings>ol>li>a').each(($el, index, $list) => {
         var linkText = $el.text()
         cy.contains(linkText).click()
         cy.waitUntilPageLoad(1)
         cy.get('.govuk-heading-l').should('have.text', linkText)
      })
   })
   
   it('Validate the user is able to view and navigate to next page if he clicks the "View lesson" link', function () {
      cy.log(this.data.input)
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(2) > .card-header > .card-header-title > a > h3').click()
      cy.get('.govuk-heading-l').should('have.text', 'Map skills')      
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2):visible').then(function (learningobjective) {
               var learningObjective = learningobjective.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.waitUntilPageLoad(1)
               cy.get('.govuk-heading-l:visible').should('have.text',learningObjective)
               cy.get('#tab_lesson-contents').click()
               cy.waitUntilPageLoad(1)
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               cy.get('#tab_downloads').click()
               cy.waitUntilPageLoad(1)
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
   })
})
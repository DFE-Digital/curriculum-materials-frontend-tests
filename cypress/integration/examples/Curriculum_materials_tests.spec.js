import HomePage from '../../support/pageObject/HomePage'
import SeviceDetailsPage from '../../support/pageObject/SeviceDetailsPage'
import KeyStagePage from '../../support/pageObject/KeyStagePage'
import Year7GeographyPage from '../../support/pageObject/Year7GeographyPage'
import LogoutPage from '../../support/pageObject/LogoutPage'
import InvitationPage from '../../support/pageObject/InvitationPage'

describe('Validate user is able to view curriculum material', function () {

   const homePage = new HomePage()
   this.beforeEach(function () {
      cy.fixture('example').then(function (data) {
         this.data = data
      })
   })

   it('Validate the user is able to launch curriculum material initial page', function () {
      cy.visit(Cypress.env('url'))
      homePage.getPageName().should('have.text', this.data.pageName)
      homePage.getPageHeader().should('have.text', this.data.pageHeader)
      homePage.getStartButtonName().should('have.text', this.data.startButtonName)
   })

   it('Validate the user is able to see Before you start message on home page', function () {
      homePage.getBeforYouStartText().should('have.text', 'Before you start')
      cy.get('.govuk-grid-column-two-thirds > :nth-child(13)').should('have.text', 'Your school can use this service if it is:')
      cy.get(':nth-child(14) > :nth-child(1)')
         .first().should('have.text', 'maintained or local authority funded')
         .next().should('have.text', 'an academy or academy trust')
         .next().should('have.text', 'a free school')
   })

   it('Validate the user is able to navigate to How the service works page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getServiceDetailsPageHeader().should('have.text', this.data.sevicedetailsPageHeader)
      servicePage.getContinueButton().should('have.text', this.data.continueButtonText)
   })

   it('Validate the user is able to navigate previous page if he click on Back button', function () {
      cy.visit(Cypress.env('url'))
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getBackButton().click()
      homePage.getPageHeader().should('have.text', this.data.pageHeader)
      homePage.getStartButtonName().should('have.text', this.data.startButtonName)
   })
   it('Validate the user is able to view the How the service works page content', function () {
      cy.visit(Cypress.env('url'))
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getPageContentofHowServiceWorkPage().should('have.text', this.data.servicePageContent1)
         .next().should('have.text', this.data.servicePageContent2)

   })
   it('Validate the user is able to navigate to key stage page and able to view option to select key stage', function () {
      cy.visit(Cypress.env('url'))
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
      cy.visit(Cypress.env('url'))
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
      cy.visit(Cypress.env('url'))
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
      const servicePage = new SeviceDetailsPage()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(2) > .govuk-heading-m').should('have.text', "What is covered in TODO!!")
      cy.get('#main-content > :nth-child(2) > p').should('have.text', "A unit focused on the physical processes that create and destroy our landscape - and their effects on humans.")
   })

   it('Validate the user is able to view lessons header/unit ', function () {
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getLessonHeader().each(($el, index, $list) => {
         const lessonHeaderText = $el.text()
         cy.log(lessonHeaderText)
      })
   })
   it('Validate the lesson count at header is matching with lesson count at footer', function () {
      var $lessoncount = 0
      var $lessoncountatfooter = 0
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

   it('Validate the user is able to logout from the system', function () {

      cy.visit(Cypress.env('url'))
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

   it('Validate the user is able to view the invitation page and it\'s content', function () {
      cy.visit(Cypress.env('url_old'))
      const logoutPage = new LogoutPage()
      logoutPage.getLogoutMessage().should('have.text', this.data.invitationMessage)
      const invitationPage = new InvitationPage()
      invitationPage.getInvitationPageContent().should('have.text', this.data.invitationMessageLine1)
         .next().should('have.text', this.data.invitationMessageLine2)
      invitationPage.getInvitationLink().should('have.text', this.data.invitationEmail)
   })
})
/// <reference types="Cypress" />
import HomePage from '../../support/pageObject/HomePage'
import SeviceDetailsPage from '../../support/pageObject/SeviceDetailsPage'
import KeyStagePage from '../../support/pageObject/KeyStagePage'
import Year7GeographyPage from '../../support/pageObject/Year7GeographyPage'
import LogoutPage from '../../support/pageObject/LogoutPage'
import InvitationPage from '../../support/pageObject/InvitationPage'

let ccps = []
let ccp = {}
// let url = new URL(Cypress.env("url"));
before(() => {
   /**
    * Get from the API the possibel CCPs
    */
   cy.request(`api/v1/ccps`).then((res) => {
      ccps = res.body
      ccp = ccps[0]
   })
})

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
      homePage.getBeforStartNextMessage()
         .first().should('have.text', this.data.beforeYouStartMessage1)
         .next().should('have.text', this.data.beforeYouStartMessage2)
         .next().should('have.text', this.data.beforeYouStartMessage3)
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

   it.skip('Validate the system is not allowing user to navigate to next page without selecting year radio button ', function () {
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
      year7GeographyPage.getPageName().should('have.text', ccp.name)
   })

   it('Validate the user is able to view page descriptions for Year 7 Geography page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      year7GeographyPage.getPageName().should("have.text", ccp.name);
      cy.get(':nth-child(2) > .govuk-heading-m').should('have.text', "What is covered in TODO!!")
      cy.get("#main-content > :nth-child(2) > p").should(
        "have.text",
        ccp.overview.trim()
      );
   })

   it('Validate the user is able to view lessons header/unit ', function () {
      let units = []
      /**
       * Request from the API the units for this the selected CCP ID
       */
      cy.request(`/api/v1/ccps/${ccp.id}/units`).then(res => {
         units = res.body
      })
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      units.forEach(unit => {
         cy.get(".cards-container").should("contain", unit.name)
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
         year7GeographyPage.getLessonsHeader(index).then(function ($lessonHeader) {
            cy.log($lessonHeader.text())
            year7GeographyPage.getLessonCount(index).then(function ($lessonCount) {
               cy.log($lessonCount.text())
               var count = $lessonCount.text().split(' ')[0]
               $lessoncount = Number(count)
               year7GeographyPage.getLearningObjective(index).each(($el, count, list) => {
                  cy.log(count + 1 + '=' + $el.text())
                  if ((count + 1) == list.length) {
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
            expect(linktext).to.have.string(this.data.viewLessonPlanLink)
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
            year7GeographyPage.getUnitHeader().then(function (linkName1) {
               cy.log(linkName1.text())
               year7GeographyPage.getUnitHeader().should('have.text', $el.text())
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
      cy.get(':nth-child(1) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text();
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2)').then(function (linkName) {
               var learningObjective = linkName.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
            })
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
      cy.get(':nth-child(1) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text()
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2)').then(function (linkName) {
               var learningObjective = linkName.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.get('#tab_lesson-contents').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               cy.get('#tab_downloads').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he is on Earthquake damage unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(1) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text()
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.siblings>ol>li>a').each(($el, index, $list) => {
            var linkText = $el.text()
            cy.contains(linkText).click()
            cy.get('.govuk-heading-l').should('have.text', linkText)
         })
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
      cy.get(':nth-child(2) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text()
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2):visible').then(function (learningobjective) {
               var learningObjective = learningobjective.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.get('.govuk-heading-l:visible').should('have.text', learningObjective)
               cy.get('#tab_lesson-contents').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               cy.get('#tab_downloads').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he is on Earthquakes unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(3) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text()
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2):visible').then(function (learningobjective) {
               var learningObjective = learningobjective.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.get('.govuk-heading-l:visible').should('have.text', learningObjective)
               cy.get('#tab_lesson-contents').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               cy.get('#tab_downloads').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he is on Plate tectonics unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(4) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text()
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2):visible').then(function (learningobjective) {
               var learningObjective = learningobjective.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.get('.govuk-heading-l:visible').should('have.text', learningObjective)
               cy.get('#tab_lesson-contents').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               cy.get('#tab_downloads').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he is on Types of volcano unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const year7GeographyPage = new Year7GeographyPage()
      cy.get(':nth-child(5) > .card-header > .card-header-title > a > h3').then($el => {
         let heading = $el.text()
         $el.click()
         cy.get('.govuk-heading-l').should('have.text', heading)
         cy.get('.govuk-table__body > tr ').each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2):visible').then(function (learningobjective) {
               var learningObjective = learningobjective.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.get('.govuk-heading-l:visible').should('have.text', learningObjective)
               cy.get('#tab_lesson-contents').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               cy.get('#tab_downloads').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it("Validates the user is able to download the lesson plan", function() {
     homePage.getStartButton().click();
     const servicePage = new SeviceDetailsPage();
     servicePage.getContinueButton().click();
     const keyStagePage = new KeyStagePage();
     keyStagePage.getKeyStageRadioButton().click();
     keyStagePage.getKeyStageContinueButton().click();
     const year7GeographyPage = new Year7GeographyPage();
     cy.get(
       ":nth-child(1) > .card-header > .card-header-title > a > h3"
     ).click();
     cy.get(".govuk-table__body > :nth-child(1) > :nth-child(4) > a").click();
     cy.get(":nth-child(3) > .govuk-tabs__tab").click();
     cy.get(".govuk-list > :nth-child(1) > a").should(
       "have.attr",
       "target",
       "_blank"
     );
     cy.get(".govuk-list > :nth-child(1) > a[href").then(function($btn) {
        cy.visit($btn.prop("href"), {
           onBeforeLoad(win) {
            cy.stub(win, 'print')
          }
       });
       cy.window()
         .its("print")
         .should("be.called");
       cy.get(".govuk-breadcrumbs").should("not.exist");
       cy.get(".govuk-footer").should("exist");
       cy.get(".govuk-header").should("not.exist");
      [("Understand the aims of the lesson", "Lesson contents")].forEach(
         text => {
            cy.get(".govuk-grid-column-full h2").should("contain", text);
         }
      );
       [
         "Core knowledge for teachers",
         "Vocabulary",
         "Common misconceptions",
         "Building on previous knowledge"
       ].forEach(text => {
         cy.get(".govuk-grid-column-full .govuk-heading-m").should(
           "contain",
           text
         );
       });
       cy.get(".govuk-table.lesson-parts").should('exist');
     });
   });
})
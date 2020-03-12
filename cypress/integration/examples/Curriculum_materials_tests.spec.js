/// <reference types="Cypress" />
import HomePage from '../../support/pageObject/HomePage'
import SeviceDetailsPage from '../../support/pageObject/SeviceDetailsPage'
import KeyStagePage from '../../support/pageObject/KeyStagePage'
import UnitsPage from '../../support/pageObject/UnitsPage'
import LogoutPage from '../../support/pageObject/LogoutPage'
import InvitationPage from '../../support/pageObject/InvitationPage'
import ReusableMethod from '../../support/ReusableMethod'

let ccps = []
let ccp = {}
// let url = new URL(Cypress.env("url"));
before(() => {
   /**
    * Get from the API the possibel CCPs
    */
   cy.request(`api/v1/ccps`).then((res) => {
      ccps = res.body
      //cy.log("CCP Count = "+ccps.length)
      if (ccps.length == 1) {
         ccp = ccps[0]
      }
      else {
         ccp = ccps[(ccp.length) - 1]
      }

   })
})

describe('Validate user is able to view curriculum material', function () {
   const homePage = new HomePage()
   const reusableMethod = new ReusableMethod()
   this.beforeEach(function () {
      //cy.visit(Cypress.env('url'))
      cy.viewport(360, 760)
      cy.visit('https://dfe-curriculum-materials.herokuapp.com/teachers/session/ff37bd17-42be-47ab-8141-2f5e3b7f2b7f', {
         auth: { username: 'curriculum-materials', password: 'curriculum-materials' }
      })
      cy.fixture('example').then(function (data) {
         this.data = data
      })
   })

   it('Validate the user is able to launch curriculum material initial page', function () {
      homePage.getPageName().should('have.text', this.data.pageName)
      homePage.getPageHeader().should('have.text', this.data.pageHeader)
      homePage.getStartButtonName().should('have.text', this.data.startButtonName)
      reusableMethod.getFooterLogo().should('exist').children().should('exist')
         .next().should('exist')
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
      servicePage.getImage().should('exist')
      servicePage.getImage().then(function (el) {
         expect(el.prop('alt')).to.have.string('Department for Education')
      })
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
      reusableMethod.getFooterLogo().should('exist').children().should('exist')
         .next().should('exist')
   })

   it('Validate the user is able to navigate to key stage page and able to view option to select key stage', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStagePageHeader().should('have.text', this.data.keyStagePageHeaher)
      keyStagePage.getKeyStagePageSubHeader().should('have.text', this.data.keyStagePageSubHeader)
      keyStagePage.getKeyStageFieldSetHeader().should('have.class', 'govuk-fieldset__heading')
      reusableMethod.getFooterLogo().should('exist').children().should('exist')
         .next().should('exist')
   })

   it.skip('Validate the system is not allowing user to navigate to next page without selecting year radio button ', function () {
      var flag = false
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStagePageHeader().should('have.text', this.data.keyStagePageHeaher)
      keyStagePage.getKeyStageContinueButton().click()
      const UnitsPage = new UnitsPage()
      try {
         flag = false
         UnitsPage.getPageName().should('have.text', this.data.geographyPageName)
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
      const unitsPage = new UnitsPage()
      unitsPage.getPageName().should('have.text', ccp.name)
   })

   it('Validate the user is able to view page descriptions on unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const unitsPage = new UnitsPage()
      unitsPage.getPageName().should("have.text", ccp.name);
      unitsPage.getUnitOverview().should("exist")
      //unitsPage.getUnitOverview().should("have.text", ccp.overview);
      reusableMethod.getFooterLogo().should('exist').children().should('exist')
         .next().should('exist')
   })
   it('Validate the user is able to view lessons header/unit ', function () {
      let units = []
      /**
       * Request from the API the units for this the selected CCP ID
       */
      cy.request(`/api/v1/ccps/${ccp.id}/units`).then(res => {
         units = res.body
         homePage.getStartButton().click()
         const servicePage = new SeviceDetailsPage()
         servicePage.getContinueButton().click()
         const keyStagePage = new KeyStagePage()
         keyStagePage.getKeyStageRadioButton().click()
         keyStagePage.getKeyStageContinueButton().click()
         const unitsPage = new UnitsPage()
         units.forEach(unit => {
            unitsPage.getUnits().should("contain", unit.name)
         })
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
      const unitsPage = new UnitsPage()
      unitsPage.getLessonHeader().each(($el, index, $list) => {
         unitsPage.getLessonsHeader(index).then(function ($lessonHeader) {
            cy.log($lessonHeader.text())
            unitsPage.getLessonCount(index).then(function ($lessonCount) {
               cy.log($lessonCount.text())
               var count = $lessonCount.text().split(' ')[0]
               $lessoncount = Number(count)
               unitsPage.getLearningObjective(index).each(($el, count, list) => {
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
      const unitsPage = new UnitsPage()
      unitsPage.getUnitsName().each(($el, index, $list) => {
         unitsPage.getViewandLessonPlanLink(index).then(function (linkName) {
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
      const unitsPage = new UnitsPage()
      unitsPage.getUnitsName().each(($el, index, $list) => {
         unitsPage.getViewandLessonPlanLink(index).then(function (linkName) {
            unitsPage.getViewandLessonPlanLink(index).click()
            unitsPage.getUnitHeader().then(function (linkName1) {
               cy.log(linkName1.text())
               unitsPage.getUnitHeader().should('have.text', $el.text())
            })
            reusableMethod.getFooterLogo().should('exist').children().should('exist')
               .next().should('exist')
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
      const logoutPage = new LogoutPage()
      logoutPage.getLogoutButton().click()
      logoutPage.getLogoutMessage().should('have.text', this.data.logOutMessage)
      reusableMethod.getFooterLogo().should('exist').children().should('exist')
         .next().should('exist')
   })

   it.skip('Validate the user is able to view the invitation page and it\'s content', function () {
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
      const unitsPage = new UnitsPage()
      unitsPage.getUnitName(1).then($el => {
         let heading = $el.text();
         $el.click()
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', heading)
         unitsPage.getLearningObjectiveTable().each(($el, index, $list) => {
            unitsPage.getLearningObjectiveName(index).then(function (linkName) {
               unitsPage.getViewLessonLink(index).should('have.text', 'View lesson')
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
      const unitsPage = new UnitsPage()
      unitsPage.getUnitName(1).then($el => {
         let heading = $el.text()
         $el.click()
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', heading)
         unitsPage.getLearningObjectiveTable().each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2)').then(function (linkName) {
               var learningObjective = linkName.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               //cy.get('#tab_lesson-contents').click()- not worked for mobile
               cy.get(':nth-child(2) > .govuk-tabs__tab').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               //cy.get('#tab_downloads').click()- not worked for mobile
               cy.get(':nth-child(3) > .govuk-tabs__tab').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it('Validate the user is able to navigate to next page and able to view lesson overview details if he is on first unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const unitsPage = new UnitsPage()
      unitsPage.getUnitName(1).then($el => {
         let heading = $el.text()
         $el.click()
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', heading)
         if (cy.get('.siblings>ol>li>a').should('not.exist')) {
            cy.log("Only one unit is available!!")
         }
         else {
            cy.get('.siblings>ol>li>a').each(($el, index, $list) => {
               var linkText = $el.text()
               cy.contains(linkText).click()
               unitsPage.getUnitHeader().should('exist')
               unitsPage.getUnitHeader().should('have.text', linkText)
            })
         }
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
      const unitsPage = new UnitsPage()
      unitsPage.getUnitName(1).then($el => {
         let heading = $el.text()
         $el.click()
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', heading)
         unitsPage.getLearningObjectiveTable().each(($el, index, $list) => {
            cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(2):visible').then(function (learningobjective) {
               var learningObjective = learningobjective.text()
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').should('have.text', 'View lesson')
               cy.get('.govuk-table__body > :nth-child(' + (index + 1) + ') > :nth-child(4) > a').click()
               cy.get('.govuk-heading-l:visible').should('have.text', learningObjective)
               //cy.get('#tab_lesson-contents').click()
               cy.get(':nth-child(2) > .govuk-tabs__tab').click()
               cy.get('#lesson-contents > h2').should('have.text', 'Lesson contents')
               //cy.get('#tab_downloads').click()
               cy.get(':nth-child(3) > .govuk-tabs__tab').click()
               cy.get('#downloads > h2').should('have.text', 'Downloads')
               cy.get(':nth-child(2) > .govuk-breadcrumbs__link').click()
            })
         })
      })
   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he third unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const unitsPage = new UnitsPage()
      if (unitsPage.getUnitCount() >= 3) {
         unitsPage.getUnitName(3).then($el => {
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
      }
      else {
         cy.log("Third unit page doesn't exist")
      }

   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he is on fourth unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const unitsPage = new UnitsPage()
      if (unitsPage.getUnitCount() >= 4) {
         unitsPage.getUnitName(4).then($el => {
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
      }
      else {
         cy.log("Fourth unit page doesn't exist")
      }
   })

   it('Validate the user is able to navigate to next page and bale to view lesson overview details if he is on fifth unit page', function () {
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const unitsPage = new UnitsPage()
      if (unitsPage.getUnitCount() >= 5) {
         unitsPage.getUnitName(5).then($el => {
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
      }
      else {
         cy.log("Fourth unit page doesn't exist")
      }

   })

   it("Validates the user is able to download the lesson plan", function () {
      HomePage.getStartButton()
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getUnitName(1).click();
      unitsPage.getFirstViewLessonLink().click();
      var lessonNumbers
      unitsPage.getLessonNumber().then(function (lessonNumber) {
         lessonNumbers = lessonNumber.text()
      })
      unitsPage.getDownloadTab().should('exist')
      unitsPage.getDownloadTab().click();
      unitsPage.getPrintLessonPlanLink().should("have.attr", "target", "_blank");
      cy.get(".downloads > :nth-child(3) > a[href").then(function ($btn) {
         cy.visit($btn.prop("href"), {
            auth: { username: 'curriculum-materials', password: 'curriculum-materials' }
         }, { onBeforeLoad(win) { cy.stub(win, 'print') } });

         cy.window().its("print").should("be.called");
         cy.get(".govuk-breadcrumbs").should("not.exist");
         cy.get(".govuk-footer").should("not.exist");
         cy.get(".govuk-header").should("not.exist");

         [("Understand the aims of the lesson", "Lesson contents")].forEach(
            text => {
               cy.get(".govuk-grid-column-full h2").should("contain", text);
            }
         );
         /*["Core knowledge for teachers", "Vocabulary", "Common misconceptions", "Building on previous knowledge"].forEach(text => {
            cy.get(".govuk-grid-column-full .govuk-heading-m").should("contain", text);
         });*/
         unitsPage.getLessonNumberinPDFFile().should('have.text', lessonNumbers)
      });

   });

   it("Validates the user is able to see logo inside the downloaded lesson plan", function () {
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getUnitName(1).click();
      unitsPage.getFirstViewLessonLink().click();
      unitsPage.getDownloadTab().click();
      unitsPage.getPrintLessonPlanLink().should("have.attr", "target", "_blank");
      cy.get(".downloads > :nth-child(3) > a[href").then(function ($btn) {
         cy.visit($btn.prop("href"), {
            auth: { username: 'curriculum-materials', password: 'curriculum-materials' }
         }, { onBeforeLoad(win) { cy.stub(win, 'print') } });
         cy.window().its("print").should("be.called");
         cy.get(".govuk-breadcrumbs").should("not.exist");
         cy.get(".govuk-header").should("not.exist");
         /*cy.get('.govuk-footer__meta-item--grow').should('exist')        
         unitsPage.getLogoInsidePDFFile().should('exist')
         unitsPage.getFooterInsidePDFFile().should('exist')*/
      });
   });

   it("Validates the user is able to navigate to next page if he clicks on unit header", function () {
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getLessonHeader().should('exist')
      unitsPage.getLessonHeader().then(function (headerTest) {
         unitsPage.getLessonHeader().click();
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', headerTest.text())
         unitsPage.getCurrentUnitName().should('have.text', headerTest.text())
      })
   });

   it("Validates the user is able to access all tabs on lesson overview page", function () {
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getLessonHeader().should('exist')
      unitsPage.getLessonHeader().then(function (headerTest) {
         unitsPage.getLessonHeader().click();
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', headerTest.text())
         unitsPage.getCurrentUnitName().should('have.text', headerTest.text())
         unitsPage.getViewLessonLink(1).click();
         unitsPage.getknowledgeOverviewTab().should('exist')
         unitsPage.getLessonContentLink().should('exist')
         unitsPage.getLessonContentLink().click()
         unitsPage.getLessonContentsTab().should('exist')
         unitsPage.getDownloadsLink().should('exist')
         unitsPage.getDownloadsLink().click()
         unitsPage.getDownloadsHeader().should('exist')
         unitsPage.getDownloadsSubHeader().should('exist')
      })
   });

   it("Validates the user is able select the lesson as per his choice using change activity", function () {
      let locators = []
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getLessonHeader().should('exist')
      unitsPage.getLessonHeader().then(function (headerTest) {
         unitsPage.getLessonHeader().click();
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', headerTest.text())
         unitsPage.getCurrentUnitName().should('have.text', headerTest.text())
         unitsPage.getViewLessonLink(0).click();
         unitsPage.getknowledgeOverviewTab().should('exist')
         unitsPage.getLessonContentLink().should('exist')
         unitsPage.getLessonContentLink().click()
         unitsPage.getLessonContentsTab().should('exist')
         cy.get('#lesson-contents > h2').should('exist')
         cy.get(' div.lesson-part:nth-child(1) article.lesson-name-and-description header:nth-child(1) > h3.govuk-heading-m').then(function (defaultSelectedOption) {
            cy.get(':nth-child(1) > .alternatives > .change-link > a').click()
            cy.get('.govuk-radios__item > .govuk-label').each((lessonslist, index, $list) => {
               const textLesson = lessonslist.text()
               if (defaultSelectedOption.text() == textLesson) {
                  cy.get('.govuk-radios__item > .govuk-label').eq(index).then(function (forAttr) {
                     var checkBoxLocator = forAttr.prop('for')
                     checkBoxLocator = "#" + checkBoxLocator
                     defaultSelector = checkBoxLocator
                     cy.get('' + checkBoxLocator + '').should('be.checked')

                  })
               }
            })
         })
         //get locator for all lesson plan
         var s = 0;
         cy.get('.govuk-radios__item > .govuk-label').each((lessonslist, index, $list) => {
            const textLesson = lessonslist.text()
            cy.get('.govuk-radios__item > .govuk-label').eq(index).then(function (forAttr) {
               var checkBoxLocator = forAttr.prop('for')
               checkBoxLocator = "#" + checkBoxLocator
               if (defaultSelector != checkBoxLocator) {
                  if (s == 0) {
                     cy.get('' + checkBoxLocator + '').click()
                     cy.contains('Save lesson changes').click()
                     cy.get(':nth-child(1) > .alternatives > .change-link > a').click()
                     cy.get('' + checkBoxLocator + '').should('be.checked')
                     s++
                  }
               }
            })
         })
      })
   });

   it("Validates the user is able to see the content of the selected lesson on lesson contents page", function () {
      let locators = []
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getLessonHeader().should('exist')
      unitsPage.getLessonHeader().then(function (headerTest) {
         unitsPage.getLessonHeader().click();
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', headerTest.text())
         unitsPage.getCurrentUnitName().should('have.text', headerTest.text())
         unitsPage.getViewLessonLink(0).click();
         unitsPage.getknowledgeOverviewTab().should('exist')
         unitsPage.getLessonContentLink().should('exist')
         unitsPage.getLessonContentLink().click()
         unitsPage.getLessonContentsTab().should('exist')
         cy.get('#lesson-contents > h2').should('exist')
         cy.get(' div.lesson-part:nth-child(1) article.lesson-name-and-description header:nth-child(1) > h3.govuk-heading-m').then(function (defaultSelectedOption) {
            cy.get(':nth-child(1) > .alternatives > .change-link > a').click()
            cy.get('.govuk-radios__item > .govuk-label').each((lessonslist, index, $list) => {
               const textLesson = lessonslist.text()
               if (defaultSelectedOption.text() == textLesson) {
                  cy.get('.govuk-radios__item > .govuk-label').eq(index).then(function (forAttr) {
                     var checkBoxLocator = forAttr.prop('for')
                     checkBoxLocator = "#" + checkBoxLocator
                     defaultSelector = checkBoxLocator
                     cy.get('' + checkBoxLocator + '').should('be.checked')

                  })
               }
            })
         })
         //get locator for all lesson plan
         var s = 0;
         cy.get('.govuk-radios__item > .govuk-label').each((lessonslist, index, $list) => {
            const textLesson = lessonslist.text()
            cy.get('.govuk-radios__item > .govuk-label').eq(index).then(function (forAttr) {
               var checkBoxLocator = forAttr.prop('for')
               checkBoxLocator = "#" + checkBoxLocator
               if (defaultSelector != checkBoxLocator) {
                  if (s == 0) {
                     cy.get('' + checkBoxLocator + '').click()
                     cy.contains('Save lesson changes').click()
                     cy.get(':nth-child(1) > .lesson-name-and-description > header > .govuk-heading-m').should('exist')
                     cy.get(':nth-child(1) > .alternatives > .change-link > a').click()
                     cy.get('' + checkBoxLocator + '').should('be.checked')

                     s++
                  }
               }
            })
         })
      })
   });
   it("Validates the user is able to cancel the selected lesson if he wish to do so", function () {
      let locators = []
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getLessonHeader().should('exist')
      unitsPage.getLessonHeader().then(function (headerTest) {
         unitsPage.getLessonHeader().click();
         unitsPage.getUnitHeader().should('exist')
         unitsPage.getUnitHeader().should('have.text', headerTest.text())
         unitsPage.getCurrentUnitName().should('have.text', headerTest.text())
         unitsPage.getViewLessonLink(0).click();
         unitsPage.getknowledgeOverviewTab().should('exist')
         unitsPage.getLessonContentLink().should('exist')
         unitsPage.getLessonContentLink().click()
         unitsPage.getLessonContentsTab().should('exist')
         cy.get('#lesson-contents > h2').should('exist')
         cy.get(' div.lesson-part:nth-child(1) article.lesson-name-and-description header:nth-child(1) > h3.govuk-heading-m').then(function (defaultSelectedOption) {
            cy.get(':nth-child(1) > .alternatives > .change-link > a').click()
            cy.get('.govuk-radios__item > .govuk-label').each((lessonslist, index, $list) => {
               const textLesson = lessonslist.text()
               if (defaultSelectedOption.text() == textLesson) {
                  cy.get('.govuk-radios__item > .govuk-label').eq(index).then(function (forAttr) {
                     var checkBoxLocator = forAttr.prop('for')
                     checkBoxLocator = "#" + checkBoxLocator
                     defaultSelector = checkBoxLocator
                     cy.get('' + checkBoxLocator + '').should('be.checked')

                  })
               }
            })
         })
         //get locator for all lesson plan
         var s = 0;
         cy.get('.govuk-radios__item > .govuk-label').each((lessonslist, index, $list) => {
            const textLesson = lessonslist.text()
            cy.get('.govuk-radios__item > .govuk-label').eq(index).then(function (forAttr) {
               var checkBoxLocator = forAttr.prop('for')
               checkBoxLocator = "#" + checkBoxLocator
               if (defaultSelector != checkBoxLocator) {
                  if (s == 0) {
                     cy.get('' + checkBoxLocator + '').click()
                     cy.get('' + checkBoxLocator + '').should('be.checked')
                     cy.get('.govuk-button--secondary').click()
                     cy.get(':nth-child(1) > .alternatives > .change-link > a').click()
                     cy.get('' + defaultSelector + '').should('be.checked')
                     s++
                  }
               }
            })
         })
      })
   });
})
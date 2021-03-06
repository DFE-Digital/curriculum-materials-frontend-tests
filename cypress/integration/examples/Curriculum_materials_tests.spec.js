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

   let baseUrl = Cypress.env('baseUrl')
   let endPoint = baseUrl + '/api/v1/ccps'
   cy.request({
      url: endPoint,
      headers: { Authorization: 'Bearer StQ85s7vzGaeaPV9bET7r8Zb' }
   }).then((res) => {
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
      //cy.viewport(360, 760)
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
      //.next().should('have.text', this.data.beforeYouStartMessage3)
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
      keyStagePage.getKeyStagePageHeader().should('exist')
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
      //unitsPage.getUnitOverview().should("exist")
      //unitsPage.getUnitOverview().should("have.text", ccp.overview);
      reusableMethod.getFooterLogo().should('exist').children().should('exist')
         .next().should('exist')
   })
   it('Validate the user is able to view lessons header/unit ', function () {
      let units = []
      let endPoint = '/api/v1/ccps/' + ccp.id + '/units'
      ReusableMethod.sendRequest(endPoint)
      cy.get('@herokuapi').then((response) => {
         units = response.body
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

   it.skip('Validate the lesson count at header is matching with lesson count at footer', function () {
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
      var $lessoncount = 0
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      const unitsPage = new UnitsPage()
      unitsPage.getUnitsName().each(($el, index, $list) => {
         unitsPage.getLessonCount(index).then(function ($lessonCount) {
            cy.log($lessonCount.text())
            var count = $lessonCount.text().split(' ')[0]
            $lessoncount = Number(count)
            if ($lessoncount >= 1) {
               unitsPage.getViewandLessonPlanLink(index).then(function (linkName) {
                  var linktext = linkName.text()
                  expect(linktext).to.have.string(this.data.viewLessonPlanLink)
               })
            }

         })
      })
   })  


   it('Validate the user is able to navigate to next page once he clicks on "View and plan lessons" link', function () {
      var actualLesonName
      homePage.getStartButton().click()
      const servicePage = new SeviceDetailsPage()
      servicePage.getContinueButton().click()
      const keyStagePage = new KeyStagePage()
      keyStagePage.getKeyStageRadioButton().click()
      keyStagePage.getKeyStageContinueButton().click()
      cy.get('.card-with-lessons > .card-header > .card-header-title > h3').then(function (lessonName) {
         actualLesonName = lessonName.text()
      })
      cy.get('.card-footer > .govuk-link').click()
      cy.get('.govuk-heading-l').then(function (lessonNameExpected) {
         expect(lessonNameExpected.text()).to.have.string(actualLesonName)
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
      cy.get('#main-content > a').should('exist')
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
      unitsPage.getUnitName(3).then($el => {
         let heading = $el.text();
         cy.log(heading)
         cy.get('.card-footer > .govuk-link').click()
         unitsPage.getLearningObjectiveTable().each(($el, index, $list) => {
            unitsPage.getLearningObjectiveName(index).then(function (linkName) {
               unitsPage.getViewLessonLink(index).should('have.text', 'View lesson')
            })
         })
      })
   })

  

  

  
   it("Validates the user is able to download the lesson plan", function () {
      HomePage.getStartButton()
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      //unitsPage.getUnitName(1).click();
      cy.get('.card-footer > .govuk-link').click()
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

         [("Contenders to the throne", "Understand the aims of the lesson", "Core knowledge for pupils", "Core knowledge for teachers", "Core knowledge for pupils", "Key vocabulary", "Common misconceptions", "Building on previous knowledge", "Understand and choose the lesson contents")].forEach(
            text => {
               cy.get(".govuk-grid-column-full h2").should("contain", text);
            }
         );
         /*["Core knowledge for teachers", "Vocabulary", "Common misconceptions", "Building on previous knowledge"].forEach(text => {
            cy.get(".govuk-grid-column-full .govuk-heading-m").should("contain", text);
         });*/
         //unitsPage.getLessonNumberinPDFFile().should('have.text', lessonNumbers)
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
      //unitsPage.getUnitName(1).click();
      cy.get('.card-footer > .govuk-link').click()
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

   it.skip("Validates the user is able to navigate to next page if he clicks on unit header", function () {
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
      cy.get('.card-footer > .govuk-link').click()
      unitsPage.getViewLessonLink(1).click();
      unitsPage.getknowledgeOverviewTab().should('exist')
      unitsPage.getLessonContentLink().should('exist')
      unitsPage.getLessonContentLink().click()
      unitsPage.getLessonContentsTab().should('exist')
      unitsPage.getDownloadsLink().should('exist')
      unitsPage.getDownloadsLink().click()
      unitsPage.getDownloadsHeader().should('exist')
      unitsPage.getDownloadsSubHeader().should('exist')

   });

   it("Validate the user is able to see default selected lesson plan on Choose an activity page", function () {
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      cy.get('.card-footer > .govuk-link').click()
      unitsPage.getViewLessonLink(0).click();
      unitsPage.getknowledgeOverviewTab().should('exist')
      unitsPage.getLessonContentLink().should('exist')
      unitsPage.getLessonContentLink().click()
      unitsPage.getLessonContentsTab().should('exist')
      cy.get('#lesson-contents > h2').should('exist')
      cy.get('div.lesson-part:nth-child(1) section.info div.description > h3:nth-child(1)').then(function (defaultSelectedOption) {
         cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
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
   });

   it("Validates the user is able to choose the lesson plan and print it", function () {
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      cy.get('.card-footer > .govuk-link').click()
      unitsPage.getViewLessonLink(0).click();
      unitsPage.getknowledgeOverviewTab().should('exist')
      unitsPage.getLessonContentLink().should('exist')
      unitsPage.getLessonContentLink().click()
      unitsPage.getLessonContentsTab().should('exist')
      cy.get('#lesson-contents > h2').should('exist')
      cy.get('div.lesson-part:nth-child(1) section.info div.description > h3:nth-child(1)').then(function (defaultSelectedOption) {
         cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
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
                  cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
                  cy.get('' + checkBoxLocator + '').should('be.checked')
                  s++
               }
            }
         })
      })
      cy.get('.govuk-\\!-margin-right-1').click()
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
      })

   });

   it("Validates the user is able to choose the lesson plan and download it", function () {
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      cy.get('.card-footer > .govuk-link').click()
      unitsPage.getViewLessonLink(0).click();
      unitsPage.getknowledgeOverviewTab().should('exist')
      unitsPage.getLessonContentLink().should('exist')
      unitsPage.getLessonContentLink().click()
      unitsPage.getLessonContentsTab().should('exist')
      cy.get('#lesson-contents > h2').should('exist')      
      cy.get('div.lesson-part:nth-child(1) section.info div.description > h3:nth-child(1)').then(function (defaultSelectedOption) {
         cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
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
                  cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
                  cy.get('' + checkBoxLocator + '').should('be.checked')
                  s++
               }
            }
         })
      })
      cy.get('.govuk-\\!-margin-right-1').click()
      unitsPage.getDownloadTab().click();
      cy.get('input.govuk-button:nth-child(1)').click()
      cy.get('h1').should('exist')
      cy.get('p:nth-child(1').should('exist')
   });

   it("Validates the user is able to see the content of the selected lesson on lesson contents page", function () {
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      unitsPage.getLessonHeader().should('exist')
      cy.get('.card-footer > .govuk-link').click()
      unitsPage.getViewLessonLink(0).click();
      unitsPage.getknowledgeOverviewTab().should('exist')
      unitsPage.getLessonContentLink().should('exist')
      unitsPage.getLessonContentLink().click()
      unitsPage.getLessonContentsTab().should('exist')
      cy.get('#lesson-contents > h2').should('exist')
      cy.get('div.lesson-part:nth-child(1) section.info div.description > h3:nth-child(1)').then(function (defaultSelectedOption) {
         cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
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
                  cy.get('div.lesson-part:nth-child(1) section.info div.description > h3:nth-child(1)').should('exist')
                  cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
                  cy.get('' + checkBoxLocator + '').should('be.checked')
                  s++
               }
            }
         })
      })
   });
   it("Validates the user is able to cancel the selected lesson plan if he wish to do so", function () {
      let locators = []
      var defaultSelector
      homePage.getStartButton().click();
      const servicePage = new SeviceDetailsPage();
      servicePage.getContinueButton().click();
      const keyStagePage = new KeyStagePage();
      keyStagePage.getKeyStageRadioButton().click();
      keyStagePage.getKeyStageContinueButton().click();
      const unitsPage = new UnitsPage();
      cy.get('.card-footer > .govuk-link').click()
      unitsPage.getViewLessonLink(0).click();
      unitsPage.getknowledgeOverviewTab().should('exist')
      unitsPage.getLessonContentLink().should('exist')
      unitsPage.getLessonContentLink().click()
      unitsPage.getLessonContentsTab().should('exist')
      cy.get('#lesson-contents > h2').should('exist')
      cy.get('div.lesson-part:nth-child(1) section.info div.description > h3:nth-child(1)').then(function (defaultSelectedOption) {
         cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
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
                  cy.get(':nth-child(1) > .alternatives > .alternatives-list > a').click()
                  cy.get('' + defaultSelector + '').should('be.checked')
                  s++
               }
            }
         })
      })
   });
})
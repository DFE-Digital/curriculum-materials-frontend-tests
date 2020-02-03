/// <reference types="Cypress" />
import HomePage from '../../support/pageObject/HomePage'
import SeviceDetailsPage from '../../support/pageObject/SeviceDetailsPage'
import YeargroupOptionSelectPage from '../../support/pageObject/YeargroupOptionSelectPage'
import Year7GeographyPage from '../../support/pageObject/Year7GeographyPage'
describe('Validate user is able to view curriculum material', function() 
{
     this.beforeEach(function() {
        cy.fixture('example').then(function(data)
        {
        this.data=data
        })
      })

    
it('Validate the user is able to launch curriculum material initial page',function() { 
   cy.visit(Cypress.env('url'))
   const homePage=new HomePage()
   homePage.getPageName().should('have.text',this.data.pageName)
   homePage.getPageHeader().should('have.text',this.data.pageHeader)
   homePage.getStartButtonName().should('have.text',this.data.startButtonName)
   
})

it('Validate the user is able to see Before you start message on home page',function() {    
    
   const homePage=new HomePage()
   homePage.getBeforYouStartText().should('have.text','Before you start')
   cy.get('.govuk-grid-column-two-thirds > :nth-child(13)').should('have.text','Your school can use this service if it is:')
   cy.get(':nth-child(14) > :nth-child(1)')
   .first().should('have.text','maintained or local authority funded')
   .next().should('have.text','an academy or academy trust')
   .next().should('have.text','a free school')
                
   })

it('Validate the user is able to navigate to How the service works page',function() {    
    const homePage=new HomePage()
    homePage.getStartButton().click()
    const servicePage=new SeviceDetailsPage()
    servicePage.getServiceDetailsPageHeader().should('have.text',this.data.sevicedetailsPageHeader)    
    servicePage.getContinueButton().should('have.text',this.data.continueButtonText)
    })

    it('Validate the user is able to navigate previous page if he click on Back button',function() {    
    
        const servicePage=new SeviceDetailsPage()
        servicePage.getBackButton().click()
        const homePage=new HomePage()
        homePage.getPageHeader().should('have.text',this.data.pageHeader)
        homePage.getStartButtonName().should('have.text',this.data.startButtonName)        
        homePage.getStartButton().click()
        servicePage.getServiceDetailsPageHeader().should('have.text',this.data.sevicedetailsPageHeader)    
        servicePage.getContinueButton().should('have.text',this.data.continueButtonText)
            
        })

        it('Validate the user is able to view the How the service works page content',function() {    
    
         const servicePage=new SeviceDetailsPage()
         servicePage.getPageContentofHowServiceWorkPage().should('have.text',this.data.servicePageContent1)
         .next().should('have.text',this.data.servicePageContent2)
             
         })  
         
         
         it('Validate the user is able to navigate to year group page and able to view option to select key stage',function() {    
    
            const servicePage=new SeviceDetailsPage()
            servicePage.getContinueButton().click()

            /*const yeargroupOptionSelectPage=new YeargroupOptionSelectPage()
            yeargroupOptionSelectPage.getYearGroupSelectPageHeader().should('have.text',"Which year group would you like to view?")
            yeargroupOptionSelectPage.getYearGroupSelectDescription().should('have.text',"Select a year group to view its full geography curriculum, access\nresources, and plan lessons.")
            yeargroupOptionSelectPage.getKeyStageHeader().should('have.text',"Key stage 3 geography")
            var*/

         })

         it('Validate the user is able to navigate to Year 7 Geography page',function() {    
    
            const servicePage=new SeviceDetailsPage()
            servicePage.getContinueButton().click()

            const year7GeographyPage=new Year7GeographyPage()
            year7GeographyPage.getPageName().should('have.text',"Year 7 Geography")
           
            })
            
            it('Validate the user is able to view page descriptions for Year 7 Geography page',function() {    
    
               const servicePage=new SeviceDetailsPage()
               const year7GeographyPage=new Year7GeographyPage()
               cy.get(':nth-child(2) > .govuk-heading-m').should('have.text',"What is covered in TODO!!")
               cy.get('#main-content > :nth-child(2) > p').should('have.text',"A unit focused on the physical processes that create and destroy our landscape - and their effects on humans.")
              
               })
         
         

})
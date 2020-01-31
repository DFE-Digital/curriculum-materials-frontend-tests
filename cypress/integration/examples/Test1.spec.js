/// <reference types="Cypress" />
import HomePage from '../../support/pageObject/HomePage'
import SeviceDetailsPage from '../../support/pageObject/SeviceDetailsPage'
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
   cy.get(':nth-child(14) > :nth-child(1)').should('have.text','maintained or local authority funded')
   cy.get(':nth-child(14) > :nth-child(2)').should('have.text','an academy or academy trust')
   cy.get(':nth-child(14) > :nth-child(3)').should('have.text','a free school')
             
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


       

})
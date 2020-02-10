class InvitationPage {
    getInvitationPageContent() {
      return cy.get('#main-content > :nth-child(2)')
    }
    getInvitationLink() {
        return cy.get('.govuk-link')
      }    
  }
  export default InvitationPage;
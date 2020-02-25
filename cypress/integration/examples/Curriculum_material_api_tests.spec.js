
describe('Validate that curriculum material api', function () {

    let baseUrl = Cypress.env('baseUrl')
    let endPoint = baseUrl + '/api/v1/ccps'

    it('Validate the curriculum api status code', () => {
        cy.request(endPoint).as('herokuapi');
        cy.get('@herokuapi')
            .its('status')
            .should('equal', 200);
    })

    it('Validate the CCP count', () => {
        cy.request(endPoint).as('herokuapi')
        cy.get('@herokuapi').then((response) => {
            expect(response.body).to.have.length(1)
            
        })
    })

    it('Validate the ccp name, overview and benefits details', () => {

        cy.request(endPoint).as('herokuapi')
        cy.get('@herokuapi').then((response) => {
            expect(response.body).to.have.length(1)
            response.body.forEach(ccp => {
                cy.log(ccp.name)
                cy.log(ccp.overview)
                cy.log(ccp.benefits)
            })
        })
    })

    it('Validate the unit details for the given CCP', () => {
        endPoint = endPoint + '/1/units'
        cy.request(endPoint).as('herokuapi')
        cy.get('@herokuapi').then((response) => {
            response.body.forEach(ccp => {
                cy.log(ccp.name)
            })
        })
    })



})
import ReusableMethod from '../../support/ReusableMethod'
describe('Validate that curriculum material api', function () {


    it('Validate the curriculum api status code', () => {
        ReusableMethod.sendRequest('/api/v1/ccps')
        cy.get('@herokuapi')
            .its('status')
            .should('equal', 200);
    })

    it('Validate the CCP count', () => {
        ReusableMethod.sendRequest('/api/v1/ccps')
        cy.get('@herokuapi').then((response) => {
            expect(response.body).to.have.length(1)

        })
    })

    it('Validate the ccp name, overview and benefits details', () => {

        ReusableMethod.sendRequest('/api/v1/ccps')
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
        ReusableMethod.sendRequest('/api/v1/ccps/1/units')
        cy.get('@herokuapi').then((response) => {
            response.body.forEach(ccp => {
                cy.log(ccp.name)
            })
        })
    })



})
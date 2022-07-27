describe('Get users', function () {
    this.beforeEach(() => {
        cy.viewport(1440, 1200)
        cy.visit('/')
    })

    it('Display items', function () {
        cy.get('cdk-accordion-item').should('have.length', 6)
        cy.get('cdk-accordion-item').first().should('contain', 'Team lead')
        cy.get('cdk-accordion-item').last().should('contain', 'DBA')
        cy.get('[role="button"]').click({ multiple: true })
    });

    it('Reverse the order of items', function () {
        var orderItems = []
        var reverseOrderItems = []
        cy.get('[role="button"]').first().click()
        cy.get('#accordion-header-1 span#firstName').then(
            item => {
                orderItems = item.map((index, html) => Cypress.$(html).text()).get();
            }
        )
        cy.get('mat-icon.arrowIcon').click()
        cy.get('#accordion-header-1 span#firstName').then(
            item => {
                reverseOrderItems = item.map((index, html) => Cypress.$(html).text()).get();
                expect(orderItems, 'Items are reversed').to.deep.equal(reverseOrderItems.reverse());
            }
        )
    })

    it('Should be sorted', function () {
        cy.get('[role="button"]').click({ multiple: true })
        cy.get('mat-select').first().click()
        cy.get('.mat-option-text')
            .contains('First name')
            .then(option => {
                option[0].click();
            });
        cy.get('#accordion-header-0 span#firstName').then(
            item => {
                const unsortedItems = item.map((index, html) => Cypress.$(html).text()).get();
                console.log("sort by algorithm", unsortedItems);
                const sortedItems = unsortedItems.sort();
                console.log("sorted by func", sortedItems);
                expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
            }
        )
    })

    it('Search', function () {
        cy.get('.search-box').type('Huy')
        cy.get('[role="button"]').click({ multiple: true })
        cy.get('mat-card').should('contain', 'Huy')
    })

    it('Get user info', function () {
        cy.get('[role="button"]').first().click()
        cy.get('button#user-info').first().click()
        cy.get('div#mat-dialog-title-0').contains('USER INFORMATION')
    })
})

describe('Create and delete user', function () {
    this.beforeEach(() => {
        cy.viewport(1440, 1200)
        cy.visit('/')
    })

    var firstName = ""
    it('Create a new user', function () {
        cy.get('[role="button"]').first().click()
        cy.get('span#firstName').first().should((text) =>
            firstName = text.get(0).innerText)
        cy.get('button#create-button').click()
        cy.get('input#firstName').type('Testing')
        cy.get('input#lastName').type('Cypress')
        cy.get('select').select('Team lead')
        cy.get('[type="radio"]#gender-male').check()
        cy.get('input#email').type('testing@test.com')
        cy.get('button.submit-button').click()
        cy.wait(1500)
        cy.get('span#firstName').first().should((text) =>
            expect(text.get(0).innerText).to.eq('Testing')
        )
    })

    it('Delete the new user', function () {
        cy.get('[role="button"]').first().click()
        cy.get('button#user-info').first().click()
        cy.get('button.delete').click()
        cy.get('input#delete-email').type('testing@test.com{enter}')
        cy.get('button#submit-delete.submit-button').click()
        cy.wait(1500)
        cy.get('span#firstName').first().should((text) =>
            expect(text.get(0).innerText).to.eq(firstName)
        )
    })
})

describe('Update user', function () {
    this.beforeEach(() => {
        cy.viewport(1440, 1200)
        cy.visit('/')
    })

    it('Check update user if uneditable before clicking edit button', function () {
        cy.get('[role="button"]').first().click()
        cy.get('button#user-info').first().click()
        cy.get('div.mat-dialog-content input').should('be.disabled')
        cy.get('select#title').should('be.disabled')
    })

    it('Check editable after click the edit button', function () {
        cy.get('[role="button"]').first().click()
        cy.get('button#user-info').first().click()
        cy.get('button#edit-button').click()
        cy.get('div.mat-dialog-content input').should('be.enabled')
        cy.get('select#title').should('be.enabled')
    })

    let data = "";

    it('Check edit user successful', function () {
        cy.get('[role="button"]').first().click()
        cy.get('span#firstName').first().should((text) =>
            data = text.get(0).innerText)
        cy.get('button#user-info').first().click()
        cy.get('button#edit-button').click()
        data = cy.get('div.mat-dialog-content input').first().innerText
        cy.get('div.mat-dialog-content input').first().clear().type("abc")
        cy.get('button.submit-button').click()
        cy.wait(2000)
        cy.get('#accordion-header-0 span#firstName').first().should('have.text', 'abc')
    })

    it('Reset data', function () {
        cy.get('[role="button"]').first().click()
        cy.get('span#firstName').contains("abc").then((item) => {
            cy.get('button#user-info').first().click(),
                cy.get('button#edit-button').click(),
                cy.get('div.mat-dialog-content input').first().clear().type(data),
                cy.get('button.submit-button').click(),
                cy.wait(2000),
                cy.get('#accordion-header-0 span#firstName').first().should('have.text', data)
        }
        )
    })
})

// describe('Delete user', function () {
//     this.beforeEach(() => {
//         cy.viewport(1440, 1200)
//         cy.visit('/')
//     })

//     var deleteUser = {}

//     it('Save the user', function () {
//         cy.get('[role="button"]').first().click()
//         cy.get('span#firstName').first().then((text) =>
//             deleteUser.firstName = text.get(0).innerText)
//         cy.get('span#lastName').first().then((text) =>
//             deleteUser.lastName = text.get(0).innerText)
//         cy.get('span#email').first().then((text) =>
//             deleteUser.email = text.get(0).innerText)
//         cy.get('button#user-info').first().click()
//         cy.get('input#dateOfBirth').first().then((text) =>
//             deleteUser.dateOfBirth = text.get(0).innerText
//         )
//         cy.log(deleteUser)
//     })
// })
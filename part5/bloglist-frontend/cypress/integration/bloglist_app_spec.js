describe('Testing the bloglist app ', function() {
  before(function() {
    cy.viewport(1000, 1000)
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joel Tester',
      username: 'nurou',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is displayed', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.get('input:first').type('nurou')
    cy.get('input:last').type('password')
    cy.get('[data-cy=submit]').click()
    cy.contains('Joel Tester logged in')
  })

  it('can create a new blog', function() {
    cy.viewport(1000, 1000)

    cy.get('[name=button]').click()
    cy.get('#title').type('some blog')
    cy.get('#author').type('john doe')
    cy.get('#url').type('https://www.google.com/')
    cy.get('[data-cy=create]').click()
    cy.get('[data-cy=post]').trigger('mouseover')
    cy.get('[data-cy=post]').click()
  })

  it('can like a blog', function() {
    cy.viewport(1000, 1000)
    for (let index = 0; index < 5; index++) {
      cy.get('[data-cy=btn-like]').click()
    }
  })
  it('can view users', function() {
    cy.viewport(1000, 1500)
    cy.contains('Users').click()
  })
  it('can log out', function() {
    cy.viewport(1000, 1000)
    cy.get('[data-cy=btn-logout]').click()
    cy.visit('http://localhost:3000')
  })
})

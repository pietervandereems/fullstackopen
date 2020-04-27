describe('Blog app', function () {
  const user = {
    name: 'Testy Tester',
    username: 'testyt',
    password: '1234567890'
  };


  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    window.localStorage.setItem('user', '');
  });

  it('Login from is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('form').within(() => {
        cy.get('input[name="Username"]').type(user.username);
        cy.get('input[name="Password"]').type(user.password);
        cy.get('button[type=submit]').click();
      });
      cy.contains(`${user.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('form').within(() => {
        cy.get('input[name="Username"]').type(user.username);
        cy.get('input[name="Password"]').type(user.password + 'WRONG');
        cy.get('button[type=submit]').click();
      });
      cy.get('#notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', '`${user.name} logged in`');
    });
  });

});

//this code is only used for testing registration

describe('Login_register', () => {
  it('passes', () => {
  cy.visit('http://localhost:5173/register')


  cy.get('#username').type('_isaacq');
  cy.wait(1000);
  cy.get('#email').type('isaac_corella@gmail.com');
  cy.wait(1000);
  cy.get('#password').type('admin123');
  cy.wait(1000);
  cy.get('input[type="checkbox"]').check();
  cy.wait(1000);
  cy.contains('Sign In').click();
  cy.wait(1000);














  })
})
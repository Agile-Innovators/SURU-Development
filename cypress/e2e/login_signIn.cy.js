//this code is only used for testing Sign In

describe('Login_Sign In', () => {
  it('passes', () => {
  cy.visit('http://localhost:5173/login')


  cy.get('#email').type('isaac_corella@gmail.com');
  cy.wait(1000);
  
  cy.get('#password').type('admin123');
  cy.wait(1000);
  
  cy.contains('Sign In').click().url().should('include', 'http://localhost:5173/');
  cy.wait(1000);




  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


  //eq: equals
  //include: we can add additional parameters, so to have a username and a password won't be a problem anymore.

  })
})
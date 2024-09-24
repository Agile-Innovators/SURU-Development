describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/forgot-password')


    cy.get('#email').type('isaac_corella@gmail.com');
    cy.wait(1000);


    cy.contains('Send Instructions').click();


    cy.contains('Open Gmail').click();
    cy.wait(1000);


  })
})
describe('Login_Suru', () => {
  it('Login tests', () => {
    cy.visit('http://localhost:5173')
  

    
    
    cy.contains('Partners').click();
    cy.wait(5000);

    cy.contains('Solutions').click();
    cy.wait(2000);

    cy.contains('About us').click();
    cy.wait(2000);

    cy.contains('Contact').click();
    cy.wait(2000);

    
    
    


    //cy.get('Open user menu');

  


 

  })
})
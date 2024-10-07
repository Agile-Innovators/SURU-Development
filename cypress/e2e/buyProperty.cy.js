describe('Buy Property', () => {
  it('Homepage Tests', () => {
    cy.visit('http://localhost:5173')
  

    cy.contains('Explore Properties 🡥').click();
    cy.wait(2000);


    cy.get('#select_min_price').select('₡400,000');
    cy.get('#select_max_price').select('₡600,000');

    
    cy.contains('Clear').click();
    cy.wait(2000);


    cy.get('#select_min_price').select('₡400,000');
    cy.get('#select_max_price').select('₡600,000');


    cy.contains('More Filters').click();
    cy.wait(2000);

    cy.contains('Search').click();
    cy.wait(2000);

  })
})  
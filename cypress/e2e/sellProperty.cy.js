describe('Create Property Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/create-property');
  });

  it('should allow filling the property details', () => {
    cy.get('button').contains('STUDIO').click();

    cy.get('button').contains('Sale').click();

    cy.get('input[placeholder="Enter the title"]').type('Beautiful Studio Apartment');

    cy.get('#availability_date').invoke('val', '2024-10-12').trigger('change');

    cy.get('textarea[placeholder="Enter the description"]').type('A lovely studio apartment located in the heart of the city.');

    cy.get('#bedrooms').clear().type('3'); 
    cy.get('#bedrooms').should('have.value', '3');

    cy.get('#bathrooms').clear().type('1'); 
    cy.get('#bathrooms').should('have.value', '1');

    cy.get('#floors').clear().type('1'); 
    cy.get('#floors').should('have.value', '1');

    cy.get('#pools').clear().type('1'); 
    cy.get('#pools').should('have.value', '1');
 
    cy.get('select').eq(0).select('Yes');  
    cy.get('select').eq(1).select('No');   
    cy.get('select').eq(2).select('Yes');  
    cy.get('select').eq(3).select('No');   

    cy.get('input[placeholder="Property size in square meters"]').type('75');


    cy.get('input[name="Sale"]').type('100000'); 

    cy.get('input[name="Sale"]').should('have.value', '100,000');
    

    cy.get('button').contains('Publish').click();
  });

});



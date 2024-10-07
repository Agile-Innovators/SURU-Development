describe('To enter in a property to see details', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')


    cy.contains('View').click();
    cy.wait(2000);




  })
})
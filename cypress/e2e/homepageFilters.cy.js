describe('Search Properties Filters', () => {

    beforeEach(() => {
      cy.visit('http://localhost:5173'); 
    });
  
    it('should allow selecting minimum and maximum prices', () => {

      cy.get('#select_min_price').select('₡400,000');
      cy.get('#select_min_price').should('have.value', '400000'); // Verificar el valor del precio mínimo
      cy.get('#select_max_price').select('₡600,000');
      cy.get('#select_max_price').should('have.value', '600000'); // Verificar el valor del precio máximo
  
      // Hacer clic en el botón "Search"
      cy.get('button').contains('Search').click();
  
      // Verificar que los resultados de la búsqueda se estén cargando
      cy.get('.loading-indicator').should('be.visible'); // Verifica el indicador de carga, si existe
  
      // Verificar que los resultados se muestren después de la búsqueda
      cy.get('.property-results').should('be.visible');
      cy.get('.property-results').children().should('have.length.greaterThan', 0); // Verifica que haya resultados
    });
  
    it('should allow clearing all filters', () => {
      // Hacer clic en el botón "Clear"
      cy.get('button').contains('Clear').click();
  
      // Verificar que los filtros se hayan reseteado
      cy.get('select[name="region"]').should('have.value', ''); 
      cy.get('select[name="minPrice"]').should('have.value', ''); 
      cy.get('select[name="maxPrice"]').should('have.value', ''); 
    });
  
    it('should not allow selecting max price lower than min price', () => {
      // Seleccionar un precio mínimo mayor que el precio máximo
      cy.get('select[name="minPrice"]').select('£500,000');
      cy.get('select[name="maxPrice"]').select('£100,000');
  
      // Hacer clic en el botón "Search"
      cy.get('button').contains('Search').click();
  
      // Verificar que se muestra un mensaje de error
      cy.get('.error-message').should('be.visible')
        .and('contain', 'Maximum price should be greater than minimum price');
    });
  });
  
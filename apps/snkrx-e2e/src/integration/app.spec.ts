describe('builder', () => {
  it('should show the title', () => {
    cy.visit('/');

    expect(cy.contains('SNKRX')).not.equal(undefined);
  });
});

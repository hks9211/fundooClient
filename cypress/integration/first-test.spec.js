
describe("First test", () => {
  it("should visit login page", () => {
    // cy.visit("http://localhost:4200/login");
    // cy.get('[routerlink="/register"]').click();
    // cy.url().should('include', 'http://localhost:4200/register');

    /**
     * Compare the commented code and the code written below
     */
    cy.visit("/login");
    cy.get('[routerlink="/register"]').click();
    cy.url().should('include', '/register');
  });
});


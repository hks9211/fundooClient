describe("User", () => {
    it("should register user", () => {
        cy.visit("/register");
        cy.get('#firstName').type('Honey');
        cy.get('#lastName').type('Kiiii');
        cy.get('#userName').type('qwerty12112@gmail.com');
        cy.get('#password').type('Qwerty123');
        cy.get('#confirmPassword').type('Qwerty123');

        cy.get('.btn-next').click();

        cy.url().should('include', '/login');

    });

    it("should login user", () => {
        cy.visit("/login");
        cy.get('#email').type(Cypress.config('username'));
        cy.get('#password').type(Cypress.config('password'));
        cy.get('.next').click();
  
        cy.url().should('include', '/dashboard');
  
    
      });
});    


import { addRemoveElements } from "../Pages/AddRemoveElements";
import {basePage} from "../Pages/Base";


describe('Add_Remove_Elements', () => {
  it('Verify the functionality of Add/Remove button', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.contains('Add/Remove Elements').click();
    cy.url().should('include', '/add_remove_elements/');
    cy.get(basePage.LOCATORS.content).should('contain',addRemoveElements.NAMES.contentText);
    cy.get('.example').find('button').then((btn)=>{ //1 step
        expect(btn).to.contain('Add Element'); //2&3 steps wait for 1 step to finish
        cy.wrap(btn).click() //3 step
    
    })
    
    it('Verify Add Element button adds a new element', () => {
      cy.visit('https://the-internet.herokuapp.com/');
      cy.contains('Add/Remove Elements').click();
      cy.url().should('include', '/add_remove_elements/');
      
      // Click the Add Element button and verify the new button is added
      cy.get('.example button').contains('Add Element').click();
      cy.get('.added-manually').should('exist').and('be.visible');
    });
  
    it('Verify Remove button removes the element', () => {
      cy.visit('https://the-internet.herokuapp.com/');
      cy.contains('Add/Remove Elements').click();
      cy.url().should('include', '/add_remove_elements/');
      
      // Add an element and then remove it
      cy.get('.example button').contains('Add Element').click();
      cy.get('.added-manually').should('exist').and('be.visible');
      cy.get('.added-manually').click();
      cy.get('.added-manually').should('not.exist'); // Verify the element is removed
    });
  
    it('Verify multiple Add Element clicks create the correct number of buttons', () => {
      cy.visit('https://the-internet.herokuapp.com/');
      cy.contains('Add/Remove Elements').click();
      cy.url().should('include', '/add_remove_elements/');
      
      // Click Add Element multiple times
      const clicks = 5;
      for (let i = 0; i < clicks; i++) {
        cy.get('.example button').contains('Add Element').click();
      }
      
      // Verify the number of buttons added matches the clicks
      cy.get('.added-manually').should('have.length', clicks);
    });
  
    it('Verify all Remove buttons work independently', () => {
      cy.visit('https://the-internet.herokuapp.com/');
      cy.contains('Add/Remove Elements').click();
      cy.url().should('include', '/add_remove_elements/');
      
      // Add multiple elements
      const clicks = 3;
      for (let i = 0; i < clicks; i++) {
        cy.get('.example button').contains('Add Element').click();
      }
      
      // Verify Remove buttons exist
      cy.get('.added-manually').should('have.length', clicks);
  
      // Remove one element and verify the count decreases
      cy.get('.added-manually').first().click();
      cy.get('.added-manually').should('have.length', clicks - 1);
    });  

    it("Verify the functionality of Add/Remove button", () => {
      cy.contains(addRemoveElements.NAMES.contentText).click();
      cy.url().should("include", `/${addRemoveElements.NAMES.linkName}/`);
      cy.get(basePage.LOCATORS.content).should(
        "contain",
        addRemoveElements.NAMES.contentText
      );
  
      basePage
        .getExample()
        .find(LOCATORS.button)
        .then((btn) => {
          expect(btn).to.contain(addRemoveElements.NAMES.addElement);
          cy.wrap(btn).click();
        });
  
      basePage
        .getExample()
        .find(LOCATORS.elements)
        .find(LOCATORS.button)
        .should("contain", addRemoveElements.NAMES.deleteARE);
      basePage.getExample().find(LOCATORS.elements).find(LOCATORS.button).click();
  
      
      // Add element 20 times
      for (let i=1; i<=addRemoveElements.NAMES.loopCount; i++) {
          basePage
          .getExample()
          .find(LOCATORS.button).
          contains(addRemoveElements.NAMES.addElement)
          .click({multiple:true});   
     };
  
     // Check button' count
     cy.get('.example')
     .find(LOCATORS.elements)
     .find(LOCATORS.button).as('deleteBtn');
  
     cy.get('@deleteBtn').its('length').should('eq',addRemoveElements.NAMES.loopCount);
  
  
    // Remove element 20 times
   
    //for (let j=20; j>=1; j--) {
  
      cy.get('@deleteBtn')
       .then ((delBtn)=> {
          expect(delBtn).to.contain(addRemoveElements.NAMES.deleteARE);
          cy.wrap(delBtn).click({multiple:true});
       }
      ) ;
  //};
  });
    
  })
})
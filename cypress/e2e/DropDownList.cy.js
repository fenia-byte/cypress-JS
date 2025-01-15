import { dropdownList } from "../../Pages/DropDownList";
import { basePage } from "../../Pages/Base";
describe ("dropdownList", () => {

    it("Verify link and default value", () => {
        cy.visit('/');
        cy.contains(dropdownList.NAMES.contentText).click();
        cy.url().should("include", `${dropdownList.NAMES.dropdownListLink}`);
        cy.get(basePage.LOCATORS.content).should(
        "contain",dropdownList.NAMES.contentText);

        cy.get(basePage.getExample()).get('select').as('selectDropdown');
        cy.get('@selectDropdown').find('option:selected').should('have.text', dropdownList.NAMES.options.option0);    

    });

    it("Verify dropdown's options count is 3", () => {
        cy.visit('/');
        cy.contains(dropdownList.NAMES.contentText).click();
      
        // checking select by ID
        cy.get(basePage.getExample()).get(dropdownList.NAMES.dropdownID).find('option').should('have.length', '3');   

    });

    it("Verify Options can be selected and default value is disabled", () => {
        cy.visit('/');
        cy.contains(dropdownList.NAMES.contentText).click();
      
        cy.get(basePage.getExample()).get('select').as('selectDropdown');

        for (let i=1; i<=2; i++) {           
            for (let j=1; j<=2; j++) { 
                if (j!==i) {            
                    cy.get('@selectDropdown').select(i);
                    cy.get('@selectDropdown').find('option:selected').should('have.text', dropdownList.NAMES.options[`option${i}`]); //Positive case
                    cy.get('@selectDropdown').find('option:selected').should('not.have.text', dropdownList.NAMES.options[`option${j}`]);
                    
                    cy.get('@selectDropdown').get('select option:first').should('be.disabled'); //check the 1-st (default) option is disabled
                  
                }
            }
        
        }   
    })
})
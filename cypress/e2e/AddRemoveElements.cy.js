import { addRemoveElements } from "../Pages/AddRemoveElements";
import { basePage } from "../Pages/Base";
import { LOCATORS } from "../utils/locators";

describe("Add_Remove_Elements", () => {
  it("Verify the functionality of Add/Remove button", () => {
    cy.visit("/");
    cy.contains(addRemoveElements.NAMES.contentText).click();
    cy.url().should(
      "include",
      `/${addRemoveElements.NAMES.add_remove_elements}/`
    );
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
    for (let i = 1; i <= addRemoveElements.NAMES.loopCount; i++) {
      basePage
        .getExample()
        .find(LOCATORS.button)
        .contains(addRemoveElements.NAMES.addElement)
        .click({ multiple: true });
    }

    // Check buttons count
    cy.get(".example")
      .find(LOCATORS.elements)
      .find(LOCATORS.button)
      .as("deleteBtn");

    cy.get("@deleteBtn")
      .its("length")
      .should("eq", addRemoveElements.NAMES.loopCount);

    // Remove element 20 times

    //for (let j=20; j>=1; j--) {

    cy.get("@deleteBtn").then((delBtn) => {
      expect(delBtn).to.contain(addRemoveElements.NAMES.deleteARE);
      cy.wrap(delBtn).click({ multiple: true }, { timeout: 2000 }); // add first before click
    });
    //};
  });

  it("Verify that Delete buttons are disappeared after reloading", () => {
    cy.visit("/");
    cy.contains(addRemoveElements.NAMES.contentText).click();
    cy.url().should("include", addRemoveElements.NAMES.add_remove_elements);

    basePage
      .getExample()
      .find(LOCATORS.button)
      .then((btn) => {
        expect(btn).to.contain(addRemoveElements.NAMES.addElement);
        cy.wrap(btn).click().click().click();
      });
    cy.get(".example")
      .find(LOCATORS.elements)
      .get(LOCATORS.button)
      .its("length")
      .should("eq", 4);

    cy.reload();
    cy.get(".example")
      .find(LOCATORS.elements)
      .get(LOCATORS.button)
      .its("length")
      .should("eq", 1);
  });
});

import { abTesting } from "../Pages/A_B_Testing";
import { basePage } from "../Pages/Base";

describe("A_B_Testing", () => {
  it("Verify content in the page", () => {
    cy.visit("https://the-internet.herokuapp.com");
    cy.contains(basePage.NAMES.abTesting).click();
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      abTesting.NAMES.contentText
    );
  });
  it("Verify Link Count", () => {
    cy.visit("https://the-internet.herokuapp.com");
  });
});

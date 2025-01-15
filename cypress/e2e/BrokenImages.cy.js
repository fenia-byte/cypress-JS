import { brokenImages } from "../../Pages/BrokenImages";
import { basePage } from "../../Pages/Base";

describe("Broken_Images", () => {
  it("Verify the functionality of Broken Images button", () => {
    cy.visit("/");
    cy.contains(brokenImages.NAMES.contentText).click();
    cy.url().should("include", `/${brokenImages.NAMES.broken_images_link}`);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      brokenImages.NAMES.contentText
    );
  });

  it("Verify that there are 3 images and they are loaded", () => {
    cy.visit("/");
    cy.contains(brokenImages.NAMES.contentText).click();
    cy.get(".example img").should("have.length", brokenImages.NAMES.count);
    cy.get(".example img").each(($img) => {
      const img = $img[0];
      cy.wrap(img)
        .should("be.visible")
        .and("have.property", "naturalWidth")
        .and("be.greaterThan", 0);
    });
  });
});

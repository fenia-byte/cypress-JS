import { disappearingElements } from "../Pages/DisappearingElements";
import { basePage } from "../Pages/Base";
import { COLORS } from "../utils/colors";
import { reloadAndCheck } from "../utils/functions";

describe("Disappearing_Elements", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(disappearingElements.NAMES.contentText).click();
  });

  it("Verify the functionality of Diappearing Elements button", () => {
    cy.url().should("include", disappearingElements.NAMES.disappLinkName);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      disappearingElements.NAMES.contentText
    );

    cy.get(basePage.LOCATORS.content).should(
      "contain",
      disappearingElements.NAMES.description
    );

    for (let i = 0; i < 4; i++) {
      basePage
        .getExample()
        .get("ul>li")
        .eq(i)
        .should("have.text", disappearingElements.NAMES.buttons[i]);
    }
  });

  it("Verify if there is a disappearing button", () => {
    basePage
      .getExample()
      .get("ul")
      .get("li")
      .last()
      .then(($lastItem) => {
        if ($lastItem.text() === disappearingElements.NAMES.buttons[4]) {
          basePage.getExample().get("ul").get("li").should("have.length", 5);
        } else {
          basePage.getExample().get("ul").get("li").should("have.length", 4);
        }
      });
  });

  it("reloads until last li is Gallery or retries are exhausted", () => {
    let getGallery = reloadAndCheck(10); // Set a retry limit
    reloadAndCheck();
  });

  it("tests real hovers", function () {
    basePage
      .getExample()
      .get("ul")
      .find("li")
      .first()
      .find("a")
      .should("have.css", "color", COLORS.colorsDisappear.red);
    //The color should not be black before hovering, but the test gets black
    basePage
      .getExample()
      .get("ul")
      .find("li")
      .first()
      .find("a")
      .realHover()
      .should("have.css", "color", COLORS.colorsDisappear.black);
  });
});

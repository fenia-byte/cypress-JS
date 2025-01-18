import { horizontalSlider } from "../Pages/HorizontalSlider";
import { basePage } from "../Pages/Base";
import { LOCATORS } from "../utils/locators";

describe("Horizontal Slider", () => {
  beforeEach(() => {            
    cy.visit("/");
    cy.contains(horizontalSlider.NAMES.contentText).click();
  });

  it("should verify the link and content", () => {
    cy.url().should("include", horizontalSlider.NAMES.horizSliderLinkName);

    basePage
      .getExample()
      .find("h3")
      .should("contain", horizontalSlider.NAMES.header);

    basePage
      .getExample()
      .find("h4")
      .should("contain", horizontalSlider.NAMES.description);
  });

  it("should verify the default, min, max, and step values of the slider in HTML", () => {
    horizontalSlider.getSliderContainer().scrollIntoView().should("be.visible");

    horizontalSlider.getSliderValue().should("have.text", "0");

    horizontalSlider.getSliderAttr().should(($input) => {
      expect($input.attr("min")).to.equal("0.0");
      expect($input.attr("max")).to.equal("5.0");
      expect($input.attr("step")).to.equal("0.5");
      expect($input.attr("value")).to.equal("0");
    });
  });

  it("should verify the slider's behavior and step functionality in the GUI", () => {
    horizontalSlider.getSliderContainer().scrollIntoView().should("be.visible");

    horizontalSlider.getSliderAttr().invoke("val", 4).trigger("change");
    horizontalSlider.getSliderValue().should(($span) => {
      expect(parseFloat($span.text())).to.equal(4);
    });

    horizontalSlider.getSliderAttr().invoke("val", 10).trigger("change");
    horizontalSlider.getSliderValue().should(($span) => {
      expect(parseFloat($span.text())).to.equal(5);
    });

    horizontalSlider.getSliderAttr().invoke("val", -1).trigger("change");
    horizontalSlider.getSliderValue().should(($span) => {
      expect(parseFloat($span.text())).to.equal(0);
    });

    horizontalSlider.getSliderAttr().invoke("val", 0.55).trigger("change");
    horizontalSlider.getSliderValue().should(($span) => {
      expect(parseFloat($span.text())).to.equal(0.5);
    });
  });
});
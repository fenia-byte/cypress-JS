import { horizontalSlider } from "..Pages/HorizontalSlider";
import { basePage } from "..Pages/Base";
import { LOCATORS } from "..utils/locators";

describe("horizontalSlider", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(horizontalSlider.NAMES.contentText).click();
  });

  it("Verify link and content", () => {
    cy.url().should("include", `${horizontalSlider.NAMES.horizSliderLinkName}`);

    basePage
      .getExample()
      .get("h3")
      .should("contain", horizontalSlider.NAMES.header);
    basePage
      .getExample()
      .get("h4")
      .should("contain", horizontalSlider.NAMES.description);
  });

  it("Verify the deafault, min, max, step values of the slider in html", () => {
    horizontalSlider.getSliderContainer().scrollIntoView().should("be.visible"); //element is visible

    horizontalSlider.getSliderValue().then(($span) => {
      const spanText = $span.text();
      expect(spanText).to.equal("0"); // Check the default value is 0
    });

    horizontalSlider.getSliderAttr().then(($input) => {
      // Get the "min","max", "Step", "Value" attribute from the input element
      const minValue = $input.attr("min");
      const maxValue = $input.attr("max");
      const stepValue = $input.attr("step");
      const valValue = $input.attr("value");
      // Assert that the min, max, step, value values is what you expect in HTML
      expect(minValue).to.equal("0.0");
      expect(maxValue).to.equal("5.0");
      expect(stepValue).to.equal("0.5");
      expect(valValue).to.equal("0");
    });
  });
  it("Verify the min, max, step values of the slider, and that step is done correctly in GUI", () => {
    horizontalSlider.getSliderContainer().scrollIntoView().should("be.visible"); //element is visible

    // move to 4 and check the value
    horizontalSlider.getSliderAttr().invoke("val", 4).trigger("change");

    horizontalSlider
      .getSliderContainer()
      .get("#range")
      .then(($span) => {
        const spanText = parseFloat($span.text());
        expect(spanText).to.equal(4); // Check the value
      });

    horizontalSlider.getSliderAttr().invoke("val", 10).trigger("change");
    horizontalSlider.getSliderValue().then(($span) => {
      const spanText = parseFloat($span.text());
      expect(spanText).to.not.equal(10); // Check max
      expect(spanText).to.equal(5); // Check max
    });

    horizontalSlider.getSliderAttr().invoke("val", -1).trigger("change");
    horizontalSlider.getSliderValue().then(($span) => {
      const spanText = parseFloat($span.text());
      expect(spanText).to.not.equal(-1); // Check min
      expect(spanText).to.equal(0); // Check min
    });

    //check step
    horizontalSlider.getSliderAttr().invoke("val", 0.55).trigger("change");
    horizontalSlider.getSliderValue().then(($span) => {
      const spanText = parseFloat($span.text());
      expect(spanText).to.not.equal(0.55); // Check step
      expect(spanText).to.equal(0.5); // Check step
    });
  });
});
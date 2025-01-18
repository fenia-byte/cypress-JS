class HorizontalSlider {
    NAMES = {
      contentText: "Horizontal Slider",
      horizSliderLinkName: "horizontal_slider",
      header: "Horizontal Slider",
      description: "Set the focus on the slider (by clicking on it)",
    };
  
    getSliderContainer() {
      return cy.get(".sliderContainer");
    }
  
    getSliderAttr() {
      return cy.get(".sliderContainer").get("input[type=range]");
    }
  
    getSliderValue() {
      return horizontalSlider.getSliderContainer().get("#range");
    }
  }
  
  export const horizontalSlider = new HorizontalSlider();
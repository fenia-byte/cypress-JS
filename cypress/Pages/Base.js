// create a class named BasePage, where

class BasePage {
    NAMES = {
      abTesting: "A/B Testing",
      title: {
        test: "test",
      },
    };
  
    LOCATORS = {
      content: "#content",
    };
  
    getExample () {
      return cy.get('.example')
    }
  
  
  
  }
  
  export const basePage = new BasePage();
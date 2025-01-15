import { basePage } from "../Pages/Base";
import { disappearingElements } from "../Pages/DisappearingElements";

export function reloadAndCheck(retries) {
      cy.reload();
      basePage
        .getExample()
        .get("ul")
        .get("li")
        .last()
        .then(($lastLi) => {
          if (
            $lastLi.text() !== disappearingElements.NAMES.buttons[4] &&
            retries > 0
          ) {
            retries--;
            reloadAndCheck(); // Retry reloading and checking
          } else if (retries === 0) {
            throw new Error('Max retries reached and last li is not "Gallery"');
          }
        });
    }
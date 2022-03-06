const APP_URL = "http://localhost:3000";
const INGREDIENTS_API_URL = "https://norma.nomoreparties.space/api/ingredients";

function rndInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("check random ingredient modal window", () => {
  // открываем приложение
  it("should be available on localhost:3000", () => {
    cy.visit(APP_URL);
    cy.intercept('GET', INGREDIENTS_API_URL, { fixture: 'ingredients.json' });
  });

  it("ingredient preview", () => {
    // ingredients boxes
    cy.get("[class^=burger-ingredients_container__").as("burgerIngredients");
    cy.get("[class^=ingredient-box_ingrBox__").as("burgerIngredientsBoxes");

    cy.get("@burgerIngredientsBoxes").should("have.length", 3);

    cy.get("@burgerIngredientsBoxes")
      .eq(rndInt(0, 2))
      .get("[class^=ingredient-preview_ingrPreview__]")
      .as("rndIngredients");
    cy.get("@rndIngredients")
      .its("length")
      .then((count) => {
        cy.get("@rndIngredients")
          .eq(rndInt(0, count - 1))
          .as("rndIngredient");
        let ingrName;
        cy.get("@rndIngredient")
          .find("[class^=ingredient-preview_name__]")
          .as("previewName");
        cy.get("@previewName").then(($el) => {
          ingrName = $el[0].textContent.trim();
        });
        cy.get("@rndIngredient").click({ force: true });
        cy.wait(1000);
        cy.get("[class^=modal_container__]").as("modalContainer");
        cy.get("@modalContainer")
          .find("[class^=modal_closeButton__]")
          .as("modalClose");
        cy.get("@modalContainer")
          .find("[class~=text_type_main-medium]")
          .then(($el) => {
            expect($el[0].textContent.trim()).equal(ingrName);
          });
        cy.get("@modalContainer")
          .find("[class^=order-details_ingrImage__]")
          .then(($el) => {
            expect($el[0].getAttribute("alt")).equal(ingrName);
          });
        cy.wait(1000);
        cy.get("@modalClose").click({ force: true });
        cy.get("[class^=modal_container__]").should("not.exist");
      });
  });
});

const { exists } = require("fs");

const APP_URL = "http://localhost:3000";
const USER_EMAIL = "olegbutrin@gmail.com";
const USER_PASS = "123456";

function rndInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("check burger order", () => {
  // открываем приложение
  before(function () {
    cy.visit(APP_URL);
    cy.wait(1500);
  });

  it("set burger ingredients", () => {
    cy.get("[class^=burger-constructor_container__").as("burgerConstructor");
    cy.get("@burgerConstructor")
      .get("[class^=burger-empty_container__")
      .as("burgerEmpty");
    cy.get("@burgerEmpty").should("have.length", 1);

    cy.get("[class^=burger-ingredients_container__").as("burgerIngredients");
    cy.get("[class^=ingredient-box_ingrBox__").as("burgerIngredientsBoxes");

    cy.get("@burgerIngredientsBoxes").should("have.length", 3);

    cy.get("@burgerIngredientsBoxes")
      .its("length")
      .then((boxesCount) => {
        for (var i = 0; i < boxesCount; i++) {
          let boxName, ingrToBurger;
          cy.get("@burgerIngredientsBoxes").eq(i).as("currentBox");
          cy.get("@currentBox")
            .find("[class~=text_type_main-medium]")
            .as("currentBoxHeader");
          cy.get("@currentBoxHeader").then(($el) => {
            boxName = $el[0].textContent.trim();
            if (boxName === "Булки") {
              ingrToBurger = 1;
            } else {
              ingrToBurger = rndInt(2, 6);
            }
            cy.get("@currentBox")
              .find("[class^=ingredient-preview_ingrPreview__]")
              .as("currentBoxIngredients");
            cy.get("@currentBoxIngredients")
              .its("length")
              .then((ingrCount) => {
                for (var j = 0; j < ingrToBurger; j++) {
                  cy.get("@currentBoxIngredients")
                    .eq(rndInt(0, ingrCount - 1))
                    .trigger("dragstart");
                  cy.get("[class^=burger-constructor_main__").trigger("drop");
                }
              });
          });
        }
      });
  });

  it("order burger", () => {
    cy.get("[class^=burger-order_priceValue__]").get("[class^=button]").click();
    cy.get("[name=email]").type(USER_EMAIL, { force: true });
    cy.get("[name=password]").type(USER_PASS, { force: true });
    cy.get("button").contains("Войти").click();
    cy.get("[class^=burger-order_priceValue__]").get("[class^=button]").click();
  });

  it("close ticket", () => {
    cy.get("[class^=order-details_contents__]", { timeout: 22000 }).as(
      "orderDetails"
    );
    cy.get("@orderDetails")
      .get("[class~=text_type_digits-large]")
      .then(($el) => {
        expect(/^\d+$/.test($el[0].textContent.trim())).equal(true);
      });
    cy.get("[class^=modal_container__]")
      .find("[class^=modal_closeButton__]")
      .click({ force: true });
    cy.get("[class^=modal_container__]").should("not.exist");
  });
});

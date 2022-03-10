
const APP_URL = "http://localhost:3000";
const INGREDIENTS_API_URL = "https://norma.nomoreparties.space/api/ingredients";
const ORDERS_API_URL = "https://norma.nomoreparties.space/api/orders";

function rndInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("check burger order", () => {
  // load user data
  let user;
  before(() => {
    cy.fixture("user.json").then((data) => {
      user = data;
    });
  });
  // открываем приложение
  it("should be available on localhost:3000", () => {
    cy.visit(APP_URL);
    cy.intercept("GET", INGREDIENTS_API_URL, { fixture: "ingredients.json" });
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
    cy.get("[name=email]").type(user.email, { force: true });
    cy.get("[name=password]").type(user.pass, { force: true });
    cy.get("button").contains("Войти").click();
    cy.get("[class^=burger-order_priceValue__]").get("[class^=button]").click();
  });

  it("close ticket", () => {
    cy.intercept("POST", ORDERS_API_URL, { fixture: "order.json" });
    cy.get("[class^=order-details_contents__]").as(
      "orderDetails"
    );
    cy.get("@orderDetails")
      .get("[class~=text_type_digits-large]")
      .then(($el) => {
        expect(/^\d+$/.test($el[0].textContent.trim())).equal(true);
      });
    cy.wait(500);
    cy.get("[class^=modal_container__]")
      .find("[class^=modal_closeButton__]")
      .click({ force: true });
    cy.get("[class^=modal_container__]").should("not.exist");
  });
});

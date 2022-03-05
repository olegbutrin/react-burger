const APP_URL = "http://localhost:3000";
const INGREDIENTS_API_URL = "https://norma.nomoreparties.space/api/ingredients";

describe("service is available", () => {
  // открываем приложение
  it("should be available on localhost:3000", () => {
    cy.visit(APP_URL);
  });

  // тестируем загрузку ингредиентов
  it("ingredients fetch should be done", () => {
    cy.intercept({
      method: "GET",
      url: INGREDIENTS_API_URL,
    }).as("ingredientsAPI");
    cy.wait("@ingredientsAPI").then((interception) => {
      assert.isNotNull(
        interception.response.body,
        "Ingredients API return data"
      );
    });
  });

  // проверяем загрузку элементов меню
  it("should be 3 menu buttons in header and one logo", () => {
    cy.get("[class^=app-header_navigation__]").as("header");
    cy.get("@header")
      .get("[class^=menu-button_menuButton__]")
      .should("have.length", 3);
    cy.get("@header").get("[class^=app-header_logo__]").should("have.length", 1);
  });

  // проверяем контейнер ингредиентов и скроллы
  it("should be created ingredient list with menu and type boxes", () => {
    cy.get("[class^=burger-ingredients_menu__]").as("ingredientsMenu");
    cy.get("[class^=burger-ingredients_container__]").as(
      "ingredientsContainer"
    );
    cy.get("@ingredientsMenu").get("[class^=tab_tab__]").as("buttons");
    cy.get("@buttons").should("have.length", 3);
    cy.get("@buttons")
      .its("length")
      .then((count) => {
        for (var i = count - 1; i >= 0; i--) {
          let posBefore;
          cy.get("@ingredientsContainer")
            .find("[class^=ingredient-box_ingrBox__]")
            .eq(i)
            .then(($el) => {
              posBefore = $el.position().top;
            });
          cy.get("@buttons").eq(i).click({ force: true });
          cy.get("@ingredientsContainer")
            .find("[class^=ingredient-box_ingrBox__]")
            .eq(i)
            .then(($el) => expect($el.position().top).to.not.equal(posBefore));
        }
      });
  });

  //проверяем пустой контейнер
  it("should be empty burger container", () => {
    cy.get("[class^=burger-empty_container__]");
  });
});

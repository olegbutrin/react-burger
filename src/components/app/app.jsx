import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPreviewPage,
  NotFoundPage,
} from "../../pages";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./app.module.css";
import { getIngredients } from "../../services/actions/ingredient-list";
import mainMenu from "../../utils/menu";

// APP component
const App = () => {
  // диспетчер для выполнения экшенов редакс
  const dispatch = useDispatch();
  // импорт чистых данных
  const { ingredients, ingredientRequest, ingredientFailed } = useSelector(
    (store) => store.list
  );

  // запускаем асинхронное получение данных через хук при объявлении диспетчера
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={css.page}>
      <main className={css.main + " mt-10 ml-10 mr-10"}>
        {/* В процессе загрузки показываем сплеш с загрузкой */}
        {ingredientRequest && !ingredientFailed && (
          <div className={css.preload}>
            <p className="text text_type_main-default text_color_inactive">
              загрузка
            </p>
          </div>
        )}
        {/* если ошибка */}
        {ingredientFailed && (
          <div className={css.preload}>
            <InfoIcon type="error" />
            <p className="text text_type_main-default text_color_inactive mt-10">
              ошибка загрузки данных!
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2">
              обратитесь к администрации
            </p>
          </div>
        )}
        {/* основной блок при загрузке данных */}
        {!ingredientRequest && !ingredientFailed && ingredients.length && (
          <Router>
            <AppHeader menu={mainMenu} />
            <div className={css.contents}>
              <Switch>
                <Route path="/" exact={true}>
                  <MainPage>
                    <>
                      <section className={css.sectionLeft + " mr-5 ml-5"}>
                        <BurgerIngredients />
                      </section>
                      <section className={css.sectionRight + " mr-5 ml-5"}>
                        <BurgerConstructor />
                      </section>
                    </>
                  </MainPage>
                </Route>
                <Route path="/login" exact={true}>
                  <LoginPage />
                </Route>
                <Route path="/register" exact={true}>
                  <RegisterPage />
                </Route>
                <Route path="/forgot-password" exact={true}>
                  <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password" exact={true}>
                  <ResetPasswordPage />
                </Route>
                <Route path="/profile" exact={true}>
                  <ProfilePage />
                </Route>
                <Route path="/profile/orders" exact={true}>
                  <ProfilePage />
                </Route>
                <Route path="/ingredient/:id" exact={true}>
                  <IngredientPreviewPage />
                </Route>
                <Route>
                  <NotFoundPage />
                </Route>
              </Switch>
            </div>
          </Router>
        )}
      </main>
    </div>
  );
};

export default App;

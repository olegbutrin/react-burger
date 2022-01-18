import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";

import ErrorNotifier from "../error-notifier/error-notifier";
import { clearError } from "../../services/actions/error";

import Modal from "../modal/modal";

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

  // читаем возможную ошибку перед очередным рендером
  const { source, message } = useSelector((store) => store.error);

  // функция для очистки ошибки при закрытии модального окна с ошибкой
  const closeErrorModal = () => {
    dispatch(clearError());
  };

  // выносим роутированный контент в отдельный компонент
  // для использования хуков
  const RoutedContent = () => {
    // получаем доступ к истории
    const history = useHistory();
    // читаем состояние location для получения модального превью
    const location = useLocation();
    const background = location.state && location.state.background;
    const prodID = useParams();
    console.log(prodID);

    const closeModalPreview = () => {
      history.goBack();
    };

    return (
      <>
        <AppHeader menu={mainMenu} />
        <div className={css.contents}>
          <Switch location={background || location}>
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
            <Route path="/ingredients/:id" exact={true}>
              <IngredientPreviewPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
        {background && (
          <Route
            path="/ingredients/:id"
            children={
              <Modal
                closeCallback={closeModalPreview}
                header={"Детали ингредиента"}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
    );
  };

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
            <RoutedContent />
          </Router>
        )}
        {/* вывод ошибки в модальном окне */}
        {message && (
          <Modal closeCallback={closeErrorModal} header={"Ошибка!"}>
            <ErrorNotifier source={source} message={message} />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default App;

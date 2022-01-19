import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import AppHeader from "../app-header/app-header";
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

import css from "./app.module.css";
import { getIngredients } from "../../services/actions/ingredient-list";
import mainMenu from "../../utils/menu";

// ================================
// выносим роутированный контент в отдельный компонент
// для использования хуков
const RoutedContent = () => {
  // получаем доступ к истории
  const history = useHistory();
  // читаем состояние location для получения модального превью
  const location = useLocation();
  const background = location.state && location.state.background;

  const closeModalPreview = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader menu={mainMenu} />
      <div className={css.contents}>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <MainPage />
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

// APP component
const App = () => {
  // диспетчер для выполнения экшенов редакс
  const dispatch = useDispatch();

  // импорт чистых данных
  const { ingredients, ingredientRequest } = useSelector(
    (store) => store.list
  );

  // запускаем асинхронное получение данных через хук при объявлении диспетчера
  React.useEffect(() => {
    if (!ingredients.length && !ingredientRequest) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients, ingredientRequest]);

  // читаем возможную ошибку перед очередным рендером
  const { source, message } = useSelector((store) => store.error);

  // функция для очистки ошибки при закрытии модального окна с ошибкой
  const closeErrorModal = () => {
    dispatch(clearError());
  };

  return (
    <div className={css.page}>
      <main className={css.main + " mt-10 ml-10 mr-10"}>
        <Router>
          <RoutedContent />
        </Router>
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

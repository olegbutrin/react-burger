import React from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import { getLocalStorageAuth } from "../../services/user";
import { restoreUser } from "../../services/actions/auth";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRoute from "../protected-route/protected-route";

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
  FeedPage,
  NotFoundPage,
} from "../../pages";

import css from "./app.module.css";
import { getIngredients } from "../../services/actions/ingredient-list";
import mainMenu from "../../utils/menu";

import { TCustomHystory } from "../../utils/types";

// ================================
// выносим роутированный контент в отдельный компонент
// для использования хуков
const RoutedContent = () => {
  // получаем доступ к истории
  const history = useHistory<TCustomHystory>();
  // читаем состояние location для получения модального превью
  const location = useLocation<any>();
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
          {/* профиль только для авторизованного */}
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          {/* список заказов только для авторизованного */}
          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          {/* выход только для авторизованного (неавторизованному неоткуда выходить) */}
          <ProtectedRoute path="/logout" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPreviewPage />
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage />
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

  // восстанавливаем пользователя из local storage
  const userData = getLocalStorageAuth();

  React.useEffect(() => {
    if (userData != null) {
      dispatch(restoreUser(userData));
    }
  }, [dispatch, userData]);

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

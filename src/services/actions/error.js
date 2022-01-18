export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export function clearError() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ERROR });
  };
}

export function testError() {
  return function (dispatch) {
    dispatch({
      type: SET_ERROR,
      payload: { source: "TEST", message: "This is test error function" },
    });
  };
}

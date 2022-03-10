import { authReducer, initialState } from "./auth";
import * as constants from "../constants/auth";
import { PUBLIC_APP } from "../../utils/defaults";

describe("Auth reducer", () => {
  it("Should return initial state", () => {
    expect(authReducer(initialState, { type: "test" })).toEqual(initialState);
  });

  it("Should register success", () => {
    expect(
      authReducer(initialState, {
        type: constants.REGISTER_SUCCESS,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: true,
      isForgot: false,
    });
  });

  it("Should login success", () => {
    expect(
      authReducer(initialState, {
        type: constants.LOGIN_SUCCESS,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: true,
      isForgot: false,
    });
  });

  it("Should update profile success", () => {
    expect(
      authReducer(initialState, {
        type: constants.UPDATE_PROFILE_SUCCESS,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: true,
      isForgot: false,
    });
  });

  it("Should register error if user not logged in", () => {
    expect(
      authReducer(initialState, {
        type: constants.REGISTER_ERROR,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: PUBLIC_APP ? initialState.user : { name: "", email: "" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should register error if user logged in", () => {
    expect(
      authReducer(
        {
          ...initialState,
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
        {
          type: constants.REGISTER_ERROR,
          payload: {
            user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
          },
        }
      )
    ).toEqual({
      user: PUBLIC_APP
        ? initialState.user
        : { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should login error if user not logged in", () => {
    expect(
      authReducer(initialState, {
        type: constants.LOGIN_ERROR,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: PUBLIC_APP ? initialState.user : { name: "", email: "" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should login error if user logged in", () => {
    expect(
      authReducer(
        {
          ...initialState,
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
        {
          type: constants.LOGIN_ERROR,
          payload: {
            user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
          },
        }
      )
    ).toEqual({
      user: PUBLIC_APP
        ? initialState.user
        : { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should update profile error if user not logged in", () => {
    expect(
      authReducer(initialState, {
        type: constants.UPDATE_PROFILE_ERROR,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: PUBLIC_APP ? initialState.user : { name: "", email: "" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should update profile error if user is logged in", () => {
    expect(
      authReducer(
        {
          ...initialState,
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
        {
          type: constants.UPDATE_PROFILE_ERROR,
          payload: {
            user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
          },
        }
      )
    ).toEqual({
      user: PUBLIC_APP
        ? initialState.user
        : { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should logout success if user is logged in, eq always", () => {
    expect(
      authReducer(
        {
          ...initialState,
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
        {
          type: constants.LOGOUT_SUCCESS,
          payload: {
            user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
          },
        }
      )
    ).toEqual({
      user: PUBLIC_APP
        ? initialState.user
        : { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should update forgot pass status after request", () => {
    expect(
      authReducer(initialState, {
        type: constants.FORGOT_PASS_SUCCESS,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: PUBLIC_APP ? initialState.user : { name: "", email: "" },
      isLogged: false,
      isForgot: true,
    });
  });

  it("Should update forgot pass status after restore", () => {
    expect(
      authReducer(initialState, {
        type: constants.RESET_PASS_SUCCESS,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
        },
      })
    ).toEqual({
      user: PUBLIC_APP ? initialState.user : { name: "", email: "" },
      isLogged: false,
      isForgot: false,
    });
  });

  it("Should restore user state", () => {
    expect(
      authReducer(initialState, {
        type: constants.RESTORE_USER,
        payload: {
          user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
          isLogged: true,
        },
      })
    ).toEqual({
      user: { name: "Oleg Butrin", email: "olegbutrin@gmail.com" },
      isLogged: true,
      isForgot: initialState.isForgot,
    });
  });
});

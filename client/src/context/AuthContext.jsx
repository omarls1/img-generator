/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";
import { useToast } from "./ToastContext";
import { useNavigate } from "react-router-dom";

import { fetchData } from "../utils/Fetch";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
  isLoading: false,
  isFirstLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "login":
      return {
        ...state,
        user: action.payload ? action.payload : state.user,
        isAuthenticated: true,
        isLoading: false,
        isFirstLoading: false,
        error: "",
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isFirstLoading: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isFirstLoading: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

const URL = "http://127.0.0.1:3000/api/v1/users";

function AuthProvider({ children }) {
  const [
    { user, isAuthenticated, error, isLoading, isFirstLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { addToast } = useToast();
  const navigate = useNavigate();

  async function request(reqData, endpoint, method = "POST") {
    dispatch({ type: "loading" });

    const { data, error } = await fetchData(
      reqData,
      `${URL}/${endpoint}`,
      method
    );

    if (error) {
      dispatch({ type: "error", payload: error });
      addToast(error, "error");
    } else {
      dispatch({ type: "login", payload: data.data });
      addToast("successful operation 🥳", "success");
      setTimeout(() => navigate("/profile"), 1500);
    }
  }

  async function logout() {
    dispatch({ type: "loading" });
    const { error } = await fetchData(null, `${URL}/logout`, "GET");
    if (error) {
      dispatch({ type: "error", payload: error });
      addToast(error, "error");
    } else {
      dispatch({ type: "logout" });
      addToast("successful logout 📤");
    }
  }
  async function updateUser(reqData) {
    dispatch({ type: "loading" });

    const { data, error } = await fetchData(reqData, `${URL}/`, "PATCH");

    if (error) {
      dispatch({ type: "error", payload: error });
      addToast(error, "error");
    } else {
      dispatch({ type: "login", payload: data.data });
      addToast("data changed success 🥳", "success");
    }
  }

  async function changePassword(reqData) {
    dispatch({ type: "loading" });

    const { error } = await fetchData(
      reqData,
      `${URL}/change-password`,
      "PATCH"
    );

    if (error) {
      dispatch({ type: "error", payload: error });
      addToast(error, "error");
    } else {
      dispatch({ type: "login" });
      addToast("password changed success 🥳", "success");
    }
  }
  useEffect(() => {
    async function getUserData() {
      dispatch({ type: "loading" });
      const { data, error } = await fetchData(null, `${URL}/`, "GET");
      if (error) dispatch({ type: "logout" });
      else dispatch({ type: "login", payload: data.data });
    }

    getUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isFirstLoading,
        request,
        error,
        user,
        isAuthenticated,
        logout,
        updateUser,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext must be used within an AuthProvider 🚫🔒");

  return context;
}

export { AuthProvider, useAuth };

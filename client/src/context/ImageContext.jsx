/* eslint-disable react/prop-types */
import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { fetchData } from "../utils/Fetch";
import { useToast } from "./ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const ImageContext = createContext();
const inialState = {
  images: [],
  status: "", //generating ,publishing
  processingImg: {
    prompt: "",
    image: "",
  },
  error: "",
  current: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "image/startGenerate":
      return { ...state, status: "generating" };
    case "image/startPublish":
      return { ...state, status: "publishing" };
    case "image/generate":
      return { ...state, processingImg: action.payload, status: "" };
    case "image/share":
      return {
        ...state,
        images: [...state.images, action.payload],
        status: "",
        processingImg: inialState.processingImg,
        error: "",
      };
    case "image/delete":
      return {
        ...state,
        images: state.images.filter((img) => img.id !== action.payload),
        status: "",
        error: "",
      };
    case "error":
      return { ...state, error: action.payload, status: "" };
    default:
      throw new Error("unkonwn action type 😥");
  }
}

const URL = "http://127.0.0.1:3000/api/v1/images/";

function ImageProvider({ children }) {
  const [{ images, error, current, status, processingImg }, dispatch] =
    useReducer(reducer, inialState);
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function generateImage(prompt) {
    dispatch({ type: "image/startGenerate" });
    const { data, error } = await fetchData({ prompt }, `${URL}generate-image`);

    if (error) {
      dispatch({ type: "error", payload: error });
      addToast(error, "error");
      return;
    }

    dispatch({
      type: "image/generate",
      payload: { prompt, image: data.data },
    });
    addToast("image created succesfully 🥳", "success");
  }

  async function publishImage(title, tags) {
    const tagsArr = tags.split(",");
    dispatch({ type: "image/startPublish" });

    const { data, error } = await fetchData(
      { title, tags: tagsArr, ...processingImg },
      URL
    );
    if (error) {
      dispatch({ type: "error", payload: error });
      addToast(error, "error");
      return;
    }

    dispatch({ type: "image/share", payload: data });
    addToast("image share succesfully 🥳", "success");

    setTimeout(() => {
      navigate(`/images?user=${user._id}`);
    }, 2000);
  }
  return (
    <ImageContext.Provider
      value={{
        images,
        current,
        error,
        status,
        generateImage,
        processingImg,
        publishImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

function useImages() {
  const context = useContext(ImageContext);

  if (context === undefined)
    console.log("you try to access the context outside the provider 🤨");

  return context;
}

export { ImageProvider, useImages };

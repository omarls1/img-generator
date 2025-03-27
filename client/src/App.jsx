import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Loader from "./components/layout/Loader";
import { useAuth } from "./context/AuthContext";

const HomePage = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateImage = lazy(() => import("./pages/CreateImage"));
const Images = lazy(() => import("./pages/Images"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { isAuthenticated, isFirstLoading } = useAuth();

  if (isFirstLoading)
    return (
      <>
        <Navbar /> <Loader />
      </>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate replace to="/profile" />
            ) : (
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate replace to="/profile" />
            ) : (
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/images"
          element={
            <Suspense fallback={<Loader />}>
              <Images />
            </Suspense>
          }
        />
        <Route
          path="/create-image"
          element={
            isAuthenticated ? (
              <Suspense fallback={<Loader />}>
                <CreateImage />
              </Suspense>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;

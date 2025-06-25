import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import Friends from "./pages/Friends";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        isAuthenticated && isOnboarded ? (
          <Layout showSidebar={"true"}>
            <HomePage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        ),
    },
    {
      path: "/signup",
      element: !isAuthenticated ? <SignUpPage /> : <Navigate to="/" />,
    },
    {
      path: "/login",
      element: !isAuthenticated ? (
        <LoginPage />
      ) : (
        <Navigate to={isOnboarded ? "/" : "/onboarding"} />
      ),
    },
    {
      path: "/notifications",
      element:
        isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        ),
    },
    {
      path: "/call/:id",
      element:
        isAuthenticated && isOnboarded ? (
          <CallPage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        ),
    },
    {
      path: "/chat/:id",
      element:
        isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false} showFooter={false}>
            <ChatPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        ),
    },
    {
      path: "/onboarding",
      element: isAuthenticated ? (
        <OnboardingPage />
      ) : (
        <Navigate to={"/login"} />
      ),
    },
    {
      path: "/friends",
      element:isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <Friends />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        ),
    },
  ]);

  return (
    <div className="min-h-screen bg-base-100" data-theme={theme}>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;

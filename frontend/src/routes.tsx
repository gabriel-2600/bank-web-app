import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPages/ErrorPage";
import CreateBankAccountForm from "./pages/CreateBankAccountPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import LandingErrorPage from "./pages/ErrorPages/LandingErrorPage";
import AccountPageError from "./pages/ErrorPages/AccountPageError";
import { protectedLoader } from "./auth/protectedLoader";
import { publicLoader } from "./auth/publicLoader";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <LandingErrorPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: publicLoader,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "app",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: protectedLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "create-bank-account",
        element: <CreateBankAccountForm />,
      },
      {
        path: "account/:accountId",
        element: <AccountPage />,
        errorElement: <AccountPageError />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

export default routes;

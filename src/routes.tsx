import App from "./App";
import CreateAccountPage from "./pages/CreateAccountPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "create-account",
        element: <CreateAccountPage />,
      },
    ],
  },
];

export default routes;

import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/users", element: <Home /> },
      { path: "/users/create", element: <Create /> },
      { path: "/users/:id", element: <Show /> },
      { path: "/users/edit/:id", element: <Edit /> },
    ],
  },
]);

export default router;

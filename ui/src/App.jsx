import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./AppContext";
import ProductList from "./components/ProductList";
import NewProductForm from "./components/NewProductForm";
import EditProductForm from "./components/EditProductForm";
import ProductDetails from "./components/ProductDetails";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ProductList />
      },
      {
        path: '/add',
        element: <NewProductForm />
      },
      {
        path: "details/:id",
        element: <EditProductForm />,
      },
    ],
  },

]);

const App = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);

export default App;
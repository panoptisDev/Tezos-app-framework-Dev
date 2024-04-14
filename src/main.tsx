import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import NFTMinter from "./pages/NFTMinter.tsx";
import App from "./App.tsx";
import ImageGenerator from "./pages/ImageGenerator.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ImageGenerator",
    element: <ImageGenerator />,
  },
  {
    path: "/NFTMinter",
    element: <NFTMinter />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);

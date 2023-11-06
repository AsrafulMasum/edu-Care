import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider";
import DataProvider from "./Provider/DataProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClint = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
      <DataProvider>
        <AuthProvider>
          <RouterProvider router={Routes}></RouterProvider>
        </AuthProvider>
      </DataProvider>
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
);

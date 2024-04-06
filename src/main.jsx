import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import allRoutes from "./Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux'
import store from "./store";


const queryClient = new QueryClient();

const router = createBrowserRouter(allRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

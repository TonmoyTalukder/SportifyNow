import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { persistor, store } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { App as AntdApp } from "antd"; // Import the Antd App component

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <AntdApp>
          <RouterProvider router={router} />
        </AntdApp>
      {/* </PersistGate> */}
      <Toaster />
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/meal.css";

import { UserProvider } from "./context/UserContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { MealProvided } from "./context/MealContext.jsx";
import App from "./App.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*provides routing to the components*/}
    <BrowserRouter>
      <UserProvider>
        <FavoritesProvider>
            <MealProvided>
                <App />
            </MealProvided>
          
        </FavoritesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

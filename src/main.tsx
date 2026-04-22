import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from "./routes/routes.tsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.tsx";
import { AuthProvider } from "./context/authcontext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <AuthProvider>
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);

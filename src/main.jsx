import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import AuthProvider from "./global/AuthProvider.jsx";
import { GlobalProvider } from "./global/GlobalProvider.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <GlobalProvider>
                <AppRoutes />
            </GlobalProvider>
        </AuthProvider>
    </BrowserRouter>
);

import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { AuthProvider } from './global/AuthProvider.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

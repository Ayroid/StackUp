import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components";
import { Auth, Category, Home } from "./pages";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  return (
    <div className="flex">
      {location.pathname !== "/auth" && (
        <div className="fixed h-screen w-80">
          <Sidebar />
        </div>
      )}
      <div className="w-full">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute path="/">
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth"
            element={
              <ProtectedRoute path="/auth">
                <Auth />
              </ProtectedRoute>
            }
          />

          <Route path="/category/*" element={<Navigate to="/" replace />} />

          <Route
            path="/category/:category"
            element={
              <ProtectedRoute path="/category">
                <Category />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;

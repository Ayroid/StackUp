import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components";
import { Auth, Category, Home } from "./pages";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const randomBookNames = [
  "The Alchemist",
  "The Da Vinci Code",
  "The Great Gatsby",
  "The Kite Runner",
  "The Catcher in the Rye",
  "To Kill a Mockingbird",
  "The Hobbit",
  "The Lord of the Rings",
  "The Book Thief",
  "The Hunger Games",
  "Harry Potter",
  "Twilight",
  "The Fault in Our Stars",
];

function App() {
  const location = useLocation();

  return (
    <div className="flex">
      {location.pathname !== "/auth" && (
        <div className="fixed h-screen w-80">
          <Sidebar username="Ayush Singh" userBooks={randomBookNames} />
        </div>
      )}
      <div
        className={location.pathname === "/auth" ? "w-full" : "ml-80 w-full"}
      >
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

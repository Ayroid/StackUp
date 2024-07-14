import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components";
import { Auth, Category, Home } from "./pages";

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
  return (
    <div className="flex">
      <div className="fixed h-screen w-80">
        <Sidebar username="Ayush Singh" userBooks={randomBookNames} />
      </div>
      <div className="ml-80 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/category/*" element={<Category />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

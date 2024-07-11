import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth, Category, Home } from "./pages";

const DummyNavbar = () => {
  return (
    <div className="navbar">
      <h1 className="font-extrabold text-3xl text-red-700">Navbar</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="mainDiv">
      <DummyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/category/*" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;

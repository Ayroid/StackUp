import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loading, Popup } from "../components";
import { serverURL } from "../data/constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginFormValidation = () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return false;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (!loginFormValidation()) {
      return;
    }

    setLoading(true);

    const data = {
      username,
      password,
    };

    axios
      .post(`${serverURL}/auth/login`, data)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => setLoading(false));

    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <>
      {loading && (
        <Popup>
          <Loading />
        </Popup>
      )}
      <form
        onSubmit={handleLoginSubmit}
        className="mt-20 flex w-96 flex-col items-center justify-center space-y-4 rounded-md bg-gray-300 p-8"
      >
        <h2 className="text-lg font-semibold">Log In to your account</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full rounded-md border border-gray-300 p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-2 text-white"
        >
          Log In
        </button>
      </form>
    </>
  );
};

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signupFormValidation = () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return false;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (!signupFormValidation()) {
      return;
    }

    setLoading(true);

    const data = {
      username,
      email,
      password,
    };

    console.log("Signing up with:", data);
    axios
      .post(`${serverURL}/auth/signup`, data)
      .then((response) => {
        console.log(response.data);
        toast.success("Account created successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => setLoading(false));

    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <>
      {loading && (
        <Popup>
          <Loading />
        </Popup>
      )}
      <form
        onSubmit={handleSignupSubmit}
        className="mt-20 flex w-96 flex-col items-center justify-center space-y-4 rounded-md bg-gray-300 p-8"
      >
        <h2 className="text-lg font-semibold">Create an account</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full rounded-md border border-gray-300 p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-2 text-white"
        >
          Create Account
        </button>
      </form>
    </>
  );
};

const AuthPage = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start">
      <h1 className="my-8 text-center text-2xl font-semibold">
        Welcome to StackUp!
      </h1>
      {loginForm ? <LoginPage /> : <SignupPage />}
      <button
        onClick={() => setLoginForm(!loginForm)}
        className="mt-4 text-blue-500"
      >
        {loginForm
          ? "New User? Create an account"
          : "Already have an account? Log In"}
      </button>
    </div>
  );
};

export default AuthPage;

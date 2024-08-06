import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RenderMenu,
  RenderRoutes,
} from "../components/structure/RenderNavigation";
import { Login } from "../components/pages/Login";
import Loading from "../components/pages/Loading";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    isAuthenticated: false,
    isAdmin: true,
  });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false); // Set loading to false after user data is loaded
  }, []);

  const login = (userName, password) => {
    console.log("Password entered:", password); // Add this line
    return new Promise((resolve, reject) => {
      if (password === "password") {
        const loggedInUser = {
          name: userName,
          isAuthenticated: true,
          isAdmin: user.isAdmin, // Set isAdmin based on the username
        };
        setUser(loggedInUser);
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        // Display loading component and redirect based on isAdmin
        setIsLoading(true);
        if (loggedInUser.isAdmin) {
          setIsLoading(false); // Set loading to false before navigating to home page
          navigate("/"); // Navigate to home page if not admin
        } else {
          window.location.href = "https://www.google.com"; // Redirect to Google if admin
        }
        resolve("success");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const logout = () => {
    setUser({ name: "", isAuthenticated: false, isAdmin: false });
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isLoading) {
    return <Loading />; // Render loading component while loading
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {user.isAuthenticated ? (
        <>
          <RenderMenu />
          <RenderRoutes />
        </>
      ) : (
        <Login />
      )}
    </AuthContext.Provider>
  );
};

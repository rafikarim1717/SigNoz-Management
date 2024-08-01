import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();

  // State management for form data using useReducer
  const [formData, setFormData] = useReducer(
    (formData, newItem) => {
      return { ...formData, ...newItem };
    },
    { userName: "", password: "" }
  );

  // State for error message
  const [errorMessage, setErrorMessage] = useState(null);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to handle "Remember Me" functionality
  const [rememberMe, setRememberMe] = useState(false);

  // Function to handle login
  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);

      // Save credentials if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("savedUserName", formData.userName);
        localStorage.setItem("savedPassword", formData.password);
      } else {
        localStorage.removeItem("savedUserName");
        localStorage.removeItem("savedPassword");
      }

      // Navigate to the home page upon successful login
      navigate("/");
    } catch (error) {
      // Set error message if login fails
      setErrorMessage(error);
    }
  };

  // Function to handle key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      doLogin();
    }
  };

  // Load saved credentials from localStorage on component mount
  useEffect(() => {
    const savedUserName = localStorage.getItem("savedUserName");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedUserName && savedPassword) {
      setFormData({ userName: savedUserName, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-full" src="/bri.png" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              SigNoz Management
            </h1>
            <div className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.userName}
                  onChange={(e) => setFormData({ userName: e.target.value })}
                  onKeyDown={handleKeyPress} // Add keydown event
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="showPassword"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Show Password
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={doLogin}
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              {errorMessage ? (
                <div className="error">{errorMessage}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

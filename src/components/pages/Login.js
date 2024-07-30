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
    <div className="page">
      <h2>Signoz Management Login page</h2>
      <div className="inputs">
        <div className="input">
          {/* Input for username */}
          <input
            value={formData.userName}
            onChange={(e) => setFormData({ userName: e.target.value })}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="input">
          {/* Input for password */}
          <input
            value={formData.password}
            onChange={(e) => setFormData({ password: e.target.value })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
        </div>
        <div className="">
          <div className="checkbox">
            {/* Checkbox to toggle password visibility */}
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>
        </div>
        <div className="button">
          {/* Login button */}
          <button onClick={doLogin}>Log in</button>
        </div>
        {/* Display error message if any */}
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </div>
    </div>
  );
};

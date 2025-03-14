import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Flag to toggle between login and signup
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formConfig = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      required: true,
      isSignupOnly: true,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      required: true,
      isSignupOnly: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
      minLength: 8,
      pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
      title: "Must be more than 8 characters, including number, lowercase letter, uppercase letter",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let res;
      if (isSignup) {
        // Signup logic
        res = await axios.post(BASE_URL + "/signup", formData, {
          withCredentials: true,
        });
      } else {
        // Login logic
        res = await axios.post(
          BASE_URL + "/login",
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        );
      }

      // Dispatch user data to Redux store
      dispatch(addUser(res.data));
      // Navigate after dispatch
      navigate(isSignup ? "/profile" : "/");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">
            {isSignup ? "Signup" : "Login"}
          </h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {formConfig.map((field) => {
            if (field.isSignupOnly && !isSignup) return null; // Skip signup-only fields in login mode
            return (
              <div className="form-control mt-4" key={field.name}>
                <label className="input validator flex items-center space-x-2">
                  <input
                    {...field}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} // Attach keydown listener directly to the input
                    className="flex-1"
                  />
                </label>
              </div>
            );
          })}
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isSignup ? "Signup" : "Login"}
            </button>
          </div>
          <div className="text-center mt-4">
            <button
              className="text-blue-500 underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
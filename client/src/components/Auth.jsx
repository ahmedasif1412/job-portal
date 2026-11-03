import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearError } from "../store/authSlice";

function Auth() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginView) {
      const { email, password } = formData;
      dispatch(login({ email, password }));
    } else {
      const result = await dispatch(register(formData));
      if (register.fulfilled.match(result)) {
        alert("Registration successful! Please login.");
        setIsLoginView(true);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLoginView ? "Login" : "Sign Up"}</h2>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLoginView && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-submit-btn">
          {isLoginView ? "Login" : "Register"}
        </button>
      </form>

      <p className="auth-toggle-text">
        {isLoginView ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsLoginView(!isLoginView);
            dispatch(clearError());
          }}
          className="auth-toggle-btn"
        >
          {isLoginView ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;

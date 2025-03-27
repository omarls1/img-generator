import { useState } from "react";
import styles from "./LoginForm.module.css";
import FormGroup from "./FormGroup";
import { useAuth } from "../../context/AuthContext";
import FormLayout from "./FormLayout";
import { Link } from "react-router-dom";

function LoginForm() {
  const { request, isLoading } = useAuth();

  const [email, setEmail] = useState("omarlammas@gmail.com");
  const [password, setPassword] = useState("password123");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request({ email, password }, "login");
  };
  return (
    <FormLayout imgSrc="login-img.jpg" imgAlt="login form">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login Form</h1>
        <p className={styles.welcomeMessage}>
          Welcome back! Please login to your account. 😊
        </p>
        <FormGroup
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "loading ... " : "Login 🚀"}
        </button>
        <p className={styles.switchFormMessage}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </FormLayout>
  );
}

export default LoginForm;

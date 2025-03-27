import styles from "./LoginForm.module.css";
import FormGroup from "./FormGroup";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormLayout from "./FormLayout";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("omar lammas");
  const [email, setEmail] = useState("omar@gmail.com");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const { request, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request({ name, email, password, confirmPassword }, "signup");
  };
  return (
    <FormLayout imgSrc="register-img.jpg" imgAlt="register">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Register Form</h1>
        <p className={styles.welcomeMessage}>
          Welcome! Please create your account. 😊
        </p>
        <FormGroup
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <FormGroup
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={isLoading}
          type="submit"
          className={styles.submitButton}
        >
          {isLoading ? "loading ..." : "Register 🚀"}
        </button>
        <p className={styles.switchFormMessage}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </FormLayout>
  );
}

export default RegisterForm;

import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${styles.navbar}`)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} container`}>
      <div className={styles.navbarHeader}>
        <Link to="/">
          <div className={styles.logo}>
            <img src="/logo.png" alt="Dream Designer logo" />
            <h1>Dream Designer</h1>
          </div>
        </Link>
        <button
          className={styles.navToggleButton}
          style={{ zIndex: 1000 }}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? "✖" : "☰"}
        </button>
      </div>
      <div className={`${styles.navbarNav} ${isNavOpen ? styles.navOpen : ""}`}>
        <ul className={`${styles.navList} ${isNavOpen ? styles.navOpen : ""}`}>
          <li className={styles.navItem}>
            <NavLink to="/" className={styles.navLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/register" className={styles.navLink}>
              Register
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/login" className={styles.navLink}>
              Login
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/profile" className={styles.navLink}>
              Profile
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/images" className={styles.navLink}>
              Images
            </NavLink>
          </li>
        </ul>
        <div className={styles.buttons}>
          <Link
            to={isAuthenticated ? "/create-image" : "/register"}
            className={`${styles.button} btn actionButton`}
          >
            Create 🎨
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className={`${styles.loginButton} btn`}>
              Login
            </Link>
          ) : (
            <button className={styles.logoutBtn} onClick={() => logout()}>
              📤
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

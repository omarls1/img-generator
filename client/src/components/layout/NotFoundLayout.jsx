import styles from "./NotFoundLayout.module.css";
import { useNavigate } from "react-router-dom";

function NotFoundLayout() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.imageContainer}>
        <img src="/robot.png" alt="Not Found" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>404 - Page Not Found 🚧</h1>
        <p className={styles.message}>
          Oops! The page you are looking for does not exist. 😢
        </p>
        <p className={styles.suggestion}>
          But don&apos;t worry, you can always go back to the homepage or explore
          other sections of our site! 🌟
        </p>
        <button className="btn actionButton" onClick={() => navigate("/")}>
          Go Back Home 🏠
        </button>
        <p className={styles.footer}>
          Need help? Contact us at{" "}
          <a href="mailto:support@example.com">support@example.com</a> 📧
        </p>
      </div>
    </div>
  );
}

export default NotFoundLayout;

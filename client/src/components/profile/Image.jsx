import styles from "./Image.module.css";
import { useAuth } from "../../context/AuthContext";

function Image() {
  const { user } = useAuth();

  return (
    <div className={styles.imageContainer}>
      <img src="/user.jpg" alt="Profile" className={styles.profileImage} />
      <h3 className={styles.greeting}>hello {user.name.split(" ")[0]} 👋</h3>
      <p className={styles.changePhoto}>change your photo</p>
      <p className={styles.productiveMessage}>
        Let&apos;s make today productive! 🚀
      </p>
    </div>
  );
}

export default Image;

/* eslint-disable react/prop-types */
import styles from "../auth/LoginForm.module.css";

function FormLayout({ imgSrc, imgAlt, children }) {
  return (
    <div className="container">
      <div className={styles.LoginForm}>
        <div className={styles.img}>
          <img src={imgSrc} alt={imgAlt} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default FormLayout;

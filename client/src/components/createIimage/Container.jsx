/* eslint-disable react/prop-types */
import styles from "./Container.module.css";
function Container({ children }) {
  return (
    <div className={styles.createImage}>
      <div className="container">{children}</div>
    </div>
  );
}

export default Container;

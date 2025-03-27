/* eslint-disable react/prop-types */
import styles from "./Container.module.css";
function Container({ children }) {
  return (
    <div>
      <div className={styles.profile}>
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

export default Container;

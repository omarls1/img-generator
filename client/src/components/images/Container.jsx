import styles from "./Container.module.css";
function Container({ children }) {
  return <div className={`container ${styles.container}`}>{children}</div>;
}

export default Container;

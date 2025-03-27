import styles from "./Loader.module.css";
function Loader() {
  return (
    <div style={{ margin: "auto" }}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;

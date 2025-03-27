import styles from "./Image.module.css";
import { useImages } from "../../context/ImageContext";
import Loader from "../layout/Loader";
function Image() {
  const { status, processingImg } = useImages();
  return (
    <div className={styles.imageContainer}>
      {status === "generating " && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      <img
        className={styles.image}
        src={
          processingImg.image
            ? `data:image/png;base64,${processingImg.image}`
            : "/image-placeholder.jpg"
        }
        alt="image"
      />
    </div>
  );
}

export default Image;

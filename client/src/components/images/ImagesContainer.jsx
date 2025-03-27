import styles from "./ImagesContainer.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/Fetch";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import ImageBox from "./ImageBox";
import Loader from "../layout/Loader";

const URL = "http://127.0.0.1:3000/api/v1/images";

function Images() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getImages() {
      setHasMore(true);
      setIsLoading(true);

      const { error, data } = await fetchData(
        null,
        `${URL}?user=${searchParams.get("user") || ""}&search=${
          searchParams.get("search") || ""
        }&page=${searchParams.get("page")}`,
        "GET"
      );

      if (error) {
        setIsLoading(false);
        setHasMore(false);
        return;
      }
      if (data.data.length === 0 || data.data.length < 6) {
        setHasMore(false);
      }
      if (searchParams.get("page") === "1" || !searchParams.get("page")) {
        setImages(data.data);
      } else {
        setImages((prevImages) => [
          ...prevImages,
          ...data.data.filter(
            (img) => !prevImages.some((prev) => prev._id === img._id)
          ),
        ]);
      }

      setIsLoading(false);
    }

    getImages();
  }, [addToast, searchParams, isAuthenticated]);

  const loadMore = () => {
    if (hasMore) {
      const nextPage = Number(searchParams.get("page") || 1) + 1;
      setSearchParams({
        page: nextPage,
        search: searchParams.get("search") || "",
      });
    }
  };

  if (isLoading && searchParams.get("page") === 1) return <Loader />;
  return (
    <>
      <div className="images">
        {images.map((img) => (
          <ImageBox key={img._id} img={img} />
        ))}
      </div>
      {hasMore ? (
        <button className="btn actionButton" onClick={loadMore}>
          show more
        </button>
      ) : (
        <p className={styles.endMessage}>No more images to show 😥</p>
      )}
    </>
  );
}

export default Images;

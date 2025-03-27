/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ImageBox.module.css";
import { fetchData } from "../../utils/Fetch";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const URL = "http://127.0.0.1:3000/api/v1/likes/";
function ImageBox({ img }) {
  const { user, isAuthenticated } = useAuth();
  const [, setSearchParams] = useSearchParams();
  const [likes, setLikes] = useState(img.likes.length);
  const [liked, setLiked] = useState(() =>
    img.likes.some((like) => like.user === user?._id)
  );
  const navigate = useNavigate();
  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  async function handleLike() {
    const { error } = await fetchData({ image: img._id }, URL, "POST");
    if (error) {
      console.log(error);
      return;
    }
    setLikes((prevLikes) => prevLikes + 1);
    setLiked(true); 
  }

  async function handleDeleteLike() {
    await fetchData({ image: img._id }, URL, "DELETE");

    setLikes((prevLikes) => prevLikes - 1);
    setLiked(false); 
  }

  return (
    <div className={styles.imageBox}>
      <header>
        <img src={img.image} alt={img.title} />

        <p className={styles.prompt}>{truncateText(img.prompt, 50)}</p>
        <p
          className={styles.likes + " " + (liked ? styles.liked : "")}
          onClick={
            isAuthenticated
              ? liked
                ? handleDeleteLike
                : handleLike
              : () => navigate("/login")
          }
        >
          <span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className={liked ? styles.liked : ""} 
              fill={liked ? "indigo" : "none"} 
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </span>
          <span> {likes}</span>
        </p>
      </header>

      <h3 className={styles.title}>{truncateText(img.title, 50)}</h3>
      <div className={styles.tagsContainer}>
        {img.tags.map((tag, index) => (
          <span
            key={index}
            className={styles.tag}
            onClick={() => setSearchParams({ search: tag })}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageBox;

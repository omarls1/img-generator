import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
import { useState } from "react";

function HeroSection() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className={`${styles.heroSection} container`}>
      <h2 className={styles.heading}>
        <span>Enhance your experience with</span>
        <br />
        <strong>ultimate AI image generator! </strong>
        <span style={{ fontSize: "2.5rem" }}>🤖</span>
      </h2>
      <blockquote className={styles.description}>
        AI enhances creativity, unlocking new possibilities beyond imagination.
      </blockquote>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for images..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          id="search"
        />
        <Link to={`/images?search=${searchInput}`}>
          <label htmlFor="search">Search</label>
        </Link>
      </div>

      <div className={styles.tags}>
        <span className={styles.popularTags}>Popular tags :</span>
        <ul className={styles.tagsList}>
          <Link to="/images?search=Nature">
            <li className={styles.tag}>Nature</li>
          </Link>
          <Link to="/images?search=Abstract">
            <li className={styles.tag}>Abstract</li>
          </Link>
          <Link to="/images?search=Art">
            <li className={styles.tag}>Art</li>
          </Link>
          <Link to="/images?search=Space">
            <li className={styles.tag}>Space</li>
          </Link>
          <Link to="/images?search=Technology">
            <li className={styles.tag}>Technology</li>
          </Link>
          <Link to="/images?search=Science">
            <li className={styles.tag}>Science</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default HeroSection;

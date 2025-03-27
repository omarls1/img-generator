import { Link, useSearchParams } from "react-router-dom";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    setSearchParams((prevParams) => {
      const params = Object.fromEntries(prevParams);
      params.search = e.target.value;
      params.page = "1";
      return params;
    });
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        placeholder="Search for images..."
        onChange={handleChange}
        value={searchParams.get("search") || ""}
        id="search"
        className={styles.input}
      />
      <Link
        to={`/images?search=${searchParams.get("search")}`}
        className={styles.button}
      >
        Search
      </Link>
    </div>
  );
}

export default SearchBar;

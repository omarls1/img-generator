import { useSearchParams } from "react-router-dom";
import ImagesContainer from "../components/images/ImagesContainer";
import Container from "../components/images/Container";
import SearchBar from "../components/images/SearchBar";

function Images() {
  const [searchParams] = useSearchParams();

  return (
    <Container>
      {searchParams.get("search") && (
        <h3>
          show results for <strong>{searchParams.get("search")}</strong>
        </h3>
      )}

      <SearchBar />

      <ImagesContainer />
    </Container>
  );
}

export default Images;

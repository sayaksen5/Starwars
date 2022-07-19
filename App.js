import "./App.css";
import Loading from "./Views/Loading";
import { useState, useEffect } from "react";
import Pagination from "./Components/Features/Pagination";

import Error from "./Views/Error";
import Searchbar from "./Components/Features/Searchbar";
function App() {
  const [loading, setLoading] = useState(true);
  const [star, setStars] = useState("");
  const [errors, setErrors] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  let url = "https://swapi.dev/api/people/";

  useEffect(() => {
    const dataListing = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        data ? setStars(data) : setStars(star);
      } catch (error) {
        setErrors(true);
        setErrorDetails(error.message);
      }
    };
    dataListing();

    setLoading(false);
  }, [url]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <div>
          <header
            style={{ backgroundColor: "blue", height: "60px" }}
            className="header"
          >
            Star Wars Heroes
          </header>
          <div>
            <Searchbar star={star} />
          </div>

          <Pagination
            count={star.count}
            setStars={setStars}
            star={star}
            setLoading={setLoading}
            url={url}
          />
        </div>
        {errors ? <Error error={errorDetails} /> : ""}
      </div>
    );
  }
}

export default App;

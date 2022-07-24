import "./App.css";
import Loading from "./Views/Loading";
import { useState, useEffect } from "react";
import Pagination from "./Components/Features/Pagination";

import Searchbar from "./Components/Features/Searchbar";
function App({ url }) {
  const [loading, setLoading] = useState(true);
  const [star, setStars] = useState("");

  // let url = "https://swapi.dev/api/people/";

  useEffect(() => {
    const dataListing = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        data ? setStars(data) : setStars(star);
      } catch (error) {
        alert(error);
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
            role="header"
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
      </div>
    );
  }
}

export default App;

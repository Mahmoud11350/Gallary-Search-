import React, { useState, useEffect } from "react";
import { unsplash } from "./unsplash";
import Photo from "./Photo";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [submitedQuery, setSubmitedQuery] = useState();
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSubmitedQuery(query);
    fetchImage();
  };
  const fetchImage = () => {
    if (query) {
      unsplash
        .get("/search/photos", {
          params: {
            page: page,
            query: submitedQuery,
          },
        })
        .then((res) => {
          setPhotos((oldPhotos) => {
            if (query && page === 1) {
              return [...res.data.results];
            } else if (query) {
              return [...oldPhotos, ...res.data.results];
            }
          });
          console.log(res);
          setLoading(false);
        });
    } else {
      unsplash
        .get("/photos", {
          params: {
            page: page,
          },
        })
        .then((res) => {
          setPhotos((oldPhotos) => [...oldPhotos, ...res.data]);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchImage();
  }, [page]);

  const loadMore = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setPage((oldPage) => oldPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="container">
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          photos.map((photo) => {
            return <Photo key={`${photo.id}${Math.random()}`} {...photo} />;
          })
        )}
      </div>
    </div>
  );
};

export default App;

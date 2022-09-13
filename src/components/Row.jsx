import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";

const Row = (props) => {
  const [movies, setMovies] = useState([]);

  const { title, fetchURL } = props;

  useEffect(() => {
    axios
      .get(fetchURL)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, [fetchURL]);

  console.log(movies);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((item, id) => (
            <Movie item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;

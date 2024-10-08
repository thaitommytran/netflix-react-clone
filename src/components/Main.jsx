import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import { useSaveShow } from "../hooks/useSaveShow";

const Main = () => {
  const [movie, setMovie] = useState(null);
  const { saved, saveShow } = useSaveShow();

  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((res) => {
        const movies = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      })
      .catch((err) => console.log(err));
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  if (!movie) return null;

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded hover:bg-gray-400 hover:shadow-sm transition duration-200">
              Play
            </button>
            <button 
              onClick={() => saveShow(movie)}
              className="border text-white border-gray-300 py-2 px-5 ml-4 rounded hover:bg-opacity-10 hover:bg-white transition duration-200"
            >
              {saved ? 'Saved' : 'Watch Later'}
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import Styles from "./DisplayRow.module.css";
import SlideShow from "../SlideShow/SlideShow";
import movieInstance from "../../Utility/MovieInstance";
import requests from "../../Utility/requestURL";

function DisplayRow() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });

  const fetchMovies = async () => {
    try {
      const [
        trendingRes,
        netflixRes,
        topRatedRes,
        actionRes,
        comedyRes,
        horrorRes,
        romanceRes,
        docRes,
      ] = await Promise.all([
        movieInstance.get(requests.fetchTrending),
        movieInstance.get(requests.fetchNetflixOriginals),
        movieInstance.get(requests.fetchTopRatedMovies),
        movieInstance.get(requests.fetchActionMovies),
        movieInstance.get(requests.fetchComedyMovies),
        movieInstance.get(requests.fetchHorrorMovies),
        movieInstance.get(requests.fetchRomanceMovies),
        movieInstance.get(requests.fetchDocumentaries),
      ]);

      setMovies({
        trending: trendingRes.data.results || [],
        netflixOriginals: netflixRes.data.results || [],
        topRated: topRatedRes.data.results || [],
        action: actionRes.data.results || [],
        comedy: comedyRes.data.results || [],
        horror: horrorRes.data.results || [],
        romance: romanceRes.data.results || [],
        documentaries: docRes.data.results || [],
      });
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={Styles.mainWraper}>
      <SlideShow title="Netflix Trending" movies={movies.trending} />
      <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
      <SlideShow title="Trending Now" movies={movies.action} />
      <SlideShow title="New Release" movies={movies.topRated} color="black" />
    </div>
  );
}

export default DisplayRow;

import { useEffect, useState } from "react";
import NetflixBannerLogo from "../../assets/logo.png";
import { Play, Info } from "lucide-react";
import movieInstance from "../../Utility/MovieInstance";
import requests from "../../Utility/requestURL";

import Styles from "./Banner.module.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await movieInstance.get(requests.fetchTrending);
        const results = response.data?.results || [];

        const randomMovie =
          results
            .filter((item) => item.backdrop_path)
            .sort(() => Math.random() - 0.5)[0] || null;

        setMovie(randomMovie);
      } catch (error) {
        console.error("Failed to load banner movie:", error);
      }
    };

    fetchBannerMovie();
  }, []);

  const bannerImage = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const title = movie?.title || movie?.name || "Netflix";
  const description = movie?.overview
    ? movie.overview.length > 160
      ? `${movie.overview.slice(0, 160)}...`
      : movie.overview
    : "Watch the latest trending stories, favorites, and blockbuster hits from around the world.";

  return (
    <div
      className={Styles.banner}
      style={
        bannerImage
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(20,20,20,0.9), rgba(20,20,20,0.2)), url(${bannerImage})`,
            }
          : undefined
      }
    >
      <div className={Styles.contents}>
        <img
          src={NetflixBannerLogo}
          className={Styles.logoImg}
          alt="Netflix Banner Logo"
        />

        <h1 className={Styles.title}>{title}</h1>

        <h1 className={Styles.description}>{description}</h1>

        <div className={Styles.buttonContainer}>
          <button className={Styles.button}>
            <Play size={30} />
            Play
          </button>

          <button className={Styles.button}>
            <Info size={30} />
            MyList
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;

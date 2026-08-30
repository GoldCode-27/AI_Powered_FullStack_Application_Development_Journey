import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Styles from './SlideShow.module.css'

// 1. Swiper/react በትንሽ s ተ አስተካክሏል
import { Swiper, SwiperSlide } from 'swiper/react'

// CSS Imports
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

function SlideShow({ title, movies }) {
  return (
    <div>
      <h2 className={Styles.title}>{title}</h2>
      <div className={Styles.Row}>
        <Swiper 
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={5.8}
        >
          {
            // 3. () በመጠቀም return እንዲያደርግ ተ አስተካክሏል
            movies?.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default SlideShow
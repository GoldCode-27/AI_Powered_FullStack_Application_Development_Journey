import React from 'react'
import Styles from './DisplayRow.module.css'
import SlideShow from '../SlideShow/SlideShow'
import { movies } from '../../Data/Data'

function DisplayRow() {
  return (
    <div className={Styles.mainWraper}>
      {/* movie={movies} የነበረው ወደ movies={movies} ተቀይሯል */}
      <SlideShow title="Movies Suggestions" movies={movies} />
      <SlideShow title="Popular on Netflix" movies={movies} />
      <SlideShow title="Trending Now" movies={movies} />
      <SlideShow title="New Release" movies={movies} color='black'/>
    </div>
  )
}

export default DisplayRow
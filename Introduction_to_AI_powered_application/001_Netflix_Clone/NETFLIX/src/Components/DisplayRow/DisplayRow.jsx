import React from 'react'
import Styles from './DisplayRow.module.css'
import SlideShow from '../SlideShow/SlideShow'
import { movies } from '../../Data/Data'
import {movieInstance} from'../../Utility/MovieInstance'
import requests from'../../Utility/requestURL'
function DisplayRow() {

const [movie, setMovies] = useState({
  trending:[],
  netFlixOriginals:[],
  topRated:[],
  action:[],
  commedy:[],
  horror:[],
  romance:[],
  documentaties:[]
})

const fetchMovies= async ()=>{
  try{

  }catch(error){
    
  }
}

  return (
    <div className={Styles.mainWraper}>
      <SlideShow title="Movies Suggestions" movies={movies} />
      <SlideShow title="Popular on Netflix" movies={movies} />
      <SlideShow title="Trending Now" movies={movies} />
      <SlideShow title="New Release" movies={movies} color='black'/>
    </div>
  )
}

export default DisplayRow
import React from 'react'
import {FaCirclePlay} from'react-icons/fa6'
import {GoCheckCircleFill} from'react-icons/go'
import {BsPlusCircle} from'react-icons/bs'
import { IoIosArrowDropdownCircle } from "react-icons/io";

import Styles from'./MovieCard.module.css'
function MovieCard({movie}) {

    let generes = ['Adventure', 'Action', 'Thriler']
  return (
    <div className={Styles.cardWraper}>
      <img 
      src={movie?.poster_path} 
      className={Styles.poster}
      alt='poster image'
      />
      {/* hover card */}
       <div className={Styles.hoverCard}>
         <img 
         src={movie?.poster_path} 
         alt="hover image"
         className={Styles.hoverImage} />
        <div className={Styles.badge}>Recently Added </div>
        
        <div className={Styles.buttonShow}>
            <FaCirclePlay color='white' size={40} className={Styles.circleButton} />
            <BsPlusCircle color='white' size={40} className={Styles.circleButton} />
            <GoCheckCircleFill color='white' size={40} className={Styles.circleButton} />
            <IoIosArrowDropdownCircle color='white' size={40} className={Styles.circleButtonSmall} />
        </div>
        <div className={Styles.metaRow}>
            <span className={Styles.tag}>U/A 16+</span>
            <span className={Styles.tag}>Movies</span>
            <span className={Styles.tag}>HD</span>
        </div>
        <div className={Styles.generes}>
            {generes.map((g, index)=>{
                return <span key={index}>
                    {g}
                    {index < generes.length - 1 && <span className={Styles.dot}>.</span>}
                </span>
            })
        }
        </div>
       </div>
    </div>
  )
}

export default MovieCard

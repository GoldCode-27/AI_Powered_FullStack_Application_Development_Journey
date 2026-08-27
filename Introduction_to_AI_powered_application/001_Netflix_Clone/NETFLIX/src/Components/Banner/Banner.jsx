import NetflixBannerLogo from'../../assets/logo.png'
import {Play, Info} from'lucide-react'

import Styles from'./Banner.module.css'

function Banner() {
  return (
    <div className={Styles.banner}>
        <div className={Styles.contents}>
          <img src={NetflixBannerLogo} className={Styles.logoImg} alt="Netflix Banner Logo" />

           <h1 className={Styles.title}>Brighton</h1>

           <h1 className={Styles.description}>lorem</h1>

            <div className={Styles.buttonContainer}>
                <button className={Styles.button}>
                <Play size={30}/>
                 Play
                </button>

                <button className={Styles.button}>
                <Info size={30} />
                  MyList
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default Banner

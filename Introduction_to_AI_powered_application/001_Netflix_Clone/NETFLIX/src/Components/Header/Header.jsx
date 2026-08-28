// import React from'react'
import logo from'../../assets/logo.png';
import { Link } from'react-router-dom';
import { useState } from 'react';
import { Search, Bell, User, ChevronDown } from'lucide-react'
import Styles from'./Header.module.css'


function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return ( 
      <header className={Styles.header}>
        <div className={Styles.container}>
         <img src={logo} alt='logo image'  className={Styles.logo} />
          <nav className={Styles.nav}>
            <Link className={Styles.navLink} to="/">Home</Link>
            <Link className={Styles.navLink} href="">Tv Show</Link>
            <Link className={Styles.navLink} href="">MOvies</Link>
            <Link className={Styles.navLink} href="">News & Populars</Link>
            <Link className={Styles.navLink} href="">My List</Link>
            <Link className={Styles.navLink} href="">Browse by Language</Link>
          </nav>

        <div className={Styles.rightSection}>
          <div className={Styles.searchContainer}>
             <button className={Styles.searchButton} 
              onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={20} />
             </button>
             {isSearchOpen && (
              <input type="text" placeholder='Search' className={Styles.searchInput} />
             )}
          </div>
             <button className={Styles.iconButton}>
                <Bell />
                <span className={Styles.notificationBadge}>4</span>
             </button>
           <div className={Styles.profileContainer}>
            <button className={Styles.profileButton}
              onClick={() => setIsProfileOpen(!isProfileOpen)}>

              <div className={Styles.profileAvator}>
                <User size={20} />
              </div>

              <ChevronDown size={20} />
             </button> 
               {isProfileOpen && (
                <div className={Styles.profileDropdown}>
                  <Link to="/profile" className={Styles.dropdownItem}>Account</Link>
                  <Link to="/settings" className={Styles.dropdownItem}>Help Center</Link>
                  <hr className={Styles.profileMenuDevider}/>
                  <Link to="/logout" className={Styles.dropdownItem}>Logout</Link>
                </div>
              )}
          </div>
        </div>
       </div>
      </header>
  );
}

export default Header

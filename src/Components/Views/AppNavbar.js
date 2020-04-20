import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TopNavigation from '@material-ui/core/'

const Header = props => {
   return (
      <header className='Header'>
         <Link to='/'>Home</Link>
         <Link to='/about'>About</Link>
         <Link to='/portfolio'>Portfolio</Link>
         <Link to='/contact'>Contact</Link>
      </header>
   )
}

export default Header;
import withRoot from './Theme/withRoot';
import React, {useState, useEffect} from 'react';
import AppNavbar from './Views/AppNavbar';
import HeroHeader from './Views/HeroHeader';
import AboutAuthor from './Views/AboutAuthor';
import CollectionCategories from './Views/CollectionCategories';
import AppFooter from './Views/AppFooter';

const Landing = props => {
   return (
      <React.Fragment>
         <AppNavbar />
         <HeroHeader />
         <AboutAuthor />
         <CollectionCategories />
         <AppFooter />
      </React.Fragment>
   )
}

export default withRoot(Landing);
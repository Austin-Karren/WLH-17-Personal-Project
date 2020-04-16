import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import About from './Components/About';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';
import Collection from './Components/Collection';
import Album from './Components/Album';
import Auth from './Components/Login';

export default(
   <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path='/portfolio' component={Portfolio} />
      <Route path='/collection/:id' component={Collection} />
      <Route path='/album/:id' component={Album} />
      <Route path='/auth' component={Auth} />
   </Switch>
);
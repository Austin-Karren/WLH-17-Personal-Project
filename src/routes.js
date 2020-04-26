import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import About from './Components/About';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';
import Collection from './Components/Collection';
import Album from './Components/Views/Album';
import Login from './Components/Admin/AppLogin';
import Admin from './Components/Admin/Admin';
import Register from './Components/Admin/AppRegister';
import EditCollection from './Components/Admin/EditCollection';
import EditAlbum from './Components/Admin/EditAlbum';
import EditPhoto from './Components/Admin/EditPhoto';
import AddPhoto from './Components/Views/AddPhoto';
import CreateCollection from './Components/Admin/CreateCollection';
import CreateAlbum from './Components/Admin/CreateAlbum';
import AddToCollectionGrid from './Components/Admin/AddToCollectionGrid';

export default(
   <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path='/portfolio' component={Portfolio} />
      <Route path='/collection/:id' component={Collection} />
      <Route path='/album/:id' component={Album} />
      <Route path='/login' component={Login} />
      <Route path='/admin' component={Admin} />
      <Route path='/register' component={Register} />
      <Route path='/edit/collection/:id' component={EditCollection} />
      <Route path='/edit/album/:id' component={EditAlbum} />
      <Route path='/edit/photo/:id' component={EditPhoto} />
      <Route path ='/add/photo' component={AddPhoto} />
      <Route path ='/add/collection' component={CreateCollection} />
      <Route path ='/add/album' component={CreateAlbum} />
      <Route path='/add/album-to-collection/:id' component={AddToCollectionGrid} />
   </Switch>
);
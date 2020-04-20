import React from 'react';
import './App.css';
import routes from './routes';
import {withRouter} from 'react-router-dom';

const App = props => {
  return (
    <div className='App'>
      {routes}
    </div>
  );
}

export default withRouter(App);

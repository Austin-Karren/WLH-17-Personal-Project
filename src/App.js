import React from 'react';
import './App.css';
import routes from './routes';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = props => {
  return (
    <div className='App'>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;

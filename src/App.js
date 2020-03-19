import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './services/routes';

function App() {
  return (
    <>
      <Header appName="Online Calendar" />
      <Routes />
      <Footer />
    </>
  );
}

export default App;
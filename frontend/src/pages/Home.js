// src/pages/Home.js
import React from 'react';
import HelpButton from '../components/HelpButton';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Disha</h1>
      <p className="lead">Your safety is our priority. Use the button below or say "Help me" to send an emergency alert.</p>
      <HelpButton />
    </div>
  );
};

export default Home;


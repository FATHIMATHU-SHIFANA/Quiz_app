import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const nav = useNavigate();
  const start = () => {
    nav('/quizpage');
  };
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz!</h1>
      <button className="start-button" onClick={start}>Start Quiz</button>
    </div>
  );
};

export default Home;

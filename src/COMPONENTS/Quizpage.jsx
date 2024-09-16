import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quizpage = ({ qbank }) => {

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [randomizedQbank, setrandomizedQbank] = useState([]);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [answerState, setanswerState] = useState(null);
  const [showResult, setshowResult] = useState(false);
  const [score, setscore] = useState(0);
  const [timer, settimer] = useState(30);
  const [timerRunning, settimerRunning] = useState(true);
  const nav=useNavigate();
  useEffect(() => {
    const shuffledQbank = qbank.map(questionObj => ({
      ...questionObj,
      options: shuffleArray([...questionObj.options])
    }));

    setrandomizedQbank(shuffleArray(shuffledQbank));
  }, [qbank]);

  useEffect(() => {
    if (timerRunning) {
      const intervalId = setInterval(() => {
        settimer(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            handleNextClick();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerRunning]);

  const clickAnswer = (option) => {
    if (!randomizedQbank[currentQuestion]) return;
    setselectedAnswer(option);
    setanswerState(option === randomizedQbank[currentQuestion].correctAnswer ? 'correct' : 'incorrect');
    settimerRunning(false);
    if (option === randomizedQbank[currentQuestion].correctAnswer) {
      setscore(prevScore => prevScore + 1);
    }
  };

  const getButtonStyles = (option) => {
    if (!randomizedQbank[currentQuestion]) return {};
    if (selectedAnswer === option) {
      return {
        background: answerState === 'correct' ? 'green' : 'red',
        color: 'white',
        border: 'none'
      };
    } else if (option === randomizedQbank[currentQuestion].correctAnswer && answerState === 'incorrect') {
      return {
        background: 'green',
        color: 'white',
        border: 'none'
      };
    } else {
      return {};
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < randomizedQbank.length - 1) {
      setcurrentQuestion(currentQuestion + 1);
      setselectedAnswer(null);
      setanswerState(null);
      settimer(30);
      settimerRunning(true);
    }
  };

  const finishQuiz = () => {
    setshowResult(true);
  };

  const restartQuiz = () => {
    setcurrentQuestion(0);
    setselectedAnswer(null);
    setanswerState(null);
    setshowResult(false);
    setscore(0);
    settimer(30);
    settimerRunning(true);
    setrandomizedQbank(prevQbank => shuffleArray([...prevQbank]));
  };

  const exit =()=>{
  nav('/');
  }

  const percentage = ((score / randomizedQbank.length) * 100);

  if (!randomizedQbank.length || !randomizedQbank[currentQuestion]) {
    return null; 
  }

  return (
    <div className='quiz-container'>
      {showResult ? (
        <div className="results-container">
          <h1>Your Score</h1>
          <p>You got {score} out of {randomizedQbank.length} questions correct.</p>
          <p>Percentage: {percentage}%</p>
          <button onClick={restartQuiz} className="nav-button">Try Again</button>
          <button onClick={exit}  className="nav-button">Exit</button>
        </div>
      ) : (
        <div>
          <span className='question-no'>{currentQuestion + 1}</span>
          <span className='total-question'>/{randomizedQbank.length}</span>
          <h3 className='question'>{randomizedQbank[currentQuestion].question}</h3>
          <p className='timer'>Time left: {timer} seconds</p>
          <ul className='options-list'>
            {randomizedQbank[currentQuestion].options.map((option, index) => (
              <li key={index} className="option-item">
                <button
                  onClick={() => clickAnswer(option)}
                  className='option-button'
                  style={getButtonStyles(option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className='navigation-buttons'>
            {currentQuestion === randomizedQbank.length - 1 ?
              <button className='nav-button' onClick={finishQuiz}>Finish Quiz</button> :
              <button className='nav-button' onClick={handleNextClick}>Next</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizpage;

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './COMPONENTS/Home';
import Quizpage from './COMPONENTS/Quizpage';
import questionbank from './COMPONENTS/Qbank';
import './COMPONENTS/Quizpage.css'
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/quizpage' element={<Quizpage qbank={questionbank}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

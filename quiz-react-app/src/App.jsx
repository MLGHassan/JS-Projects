import { useState } from 'react'
import './App.css'
import Quiz from './quiz';


function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  return (
    <div className='quiz'>
      {showQuiz ? (
      <Quiz />
      ) : (
        <div className='site'>
        <h1>Best Quiz Of All Time</h1>
        <div className='buttonContainer'>
          <button onClick={() => setShowQuiz(true)}> Start Quiz </button>
        </div>
      </div>
  )}
    </div>
  ) 
}

export default App

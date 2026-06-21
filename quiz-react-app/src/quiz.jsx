import './quiz.css'
import { useState } from 'react'

const questions = [
    {
        id : 0,
        question : 'what is the capital of pakistan',
        answers : ['lahore', 'islamabad', 'washington', 'machar colony'],
        answer : 'islamabad'
    },
    {
        id : 1,
        question : 'who do you think made this quiz',
        answers : ['josh keaton', 'wasif rizvi', 'my neighbour', 'mlghassan'],
        answer : 'mlghassan'
    },
    {
        id : 2,
        question : 'do you love your parents',
        answers : ['huh', 'what', 'OF COURSE I DO!', 'mlghassan'],
        answer : 'mlghassan'
    }
]


function Quiz(){
    const [qNumber, setQNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [showFinishScreen, setFinishScreen] = useState(false);

    const [selectedAns, setSelectedAns] = useState(null);

    const ansHandler = (ans) => {
        if (selectedAns !== null) return;
        setSelectedAns(ans);

        if (ans === questions[qNumber].answer){
            setScore(score + 1);
        }
        
        setTimeout(() => {
            if (qNumber < questions.length - 1) {
                setQNumber(qNumber + 1);
                setSelectedAns(null); // Reset the selection for the next question!
            } else {
                setFinishScreen(true);
            }
        }, 2000);

    };

    return(
    <div>{(showFinishScreen) ? (
        <div>
            <h1>Quiz Completed</h1>
            <h2>You scored: {score}/{questions.length}</h2>
        </div>
    ) : (
        <div className='quizContainer'>
            <div className='qContainer'>{questions[qNumber].question}</div>
            <div className='answerContainer'>
                {questions[qNumber].answers.map(answer => { 
                    let buttonClass = '';
                    if (selectedAns !== null) {
                                if (answer === questions[qNumber].answer) {
                                    buttonClass = 'correct';
                                } else {
                                    buttonClass = 'incorrect';
                                }
                            }
                    return (
                    <button key={answer} className={buttonClass} onClick={() => {ansHandler(answer);}}>{answer}</button>);})}
            </div>
            <div>Score: {score}</div>
            </div>
    ) }</div>
   
    );
}   


export default Quiz;
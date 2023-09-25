import '../styles/Question.css';
import QuestionButton from './QuestionButton.js'
import QuestionText from './QuestionText.js'
import QuestionChat from './QuestionChat.js'

import check from '../imgs/checkmark.webp';
import cross from '../imgs/cross.png';

import { useState, useEffect } from 'react';

function Question({ result, questionState, chatState, sendAnswer }) {
    const [showResult,setShowResult] = useState(false)
    useEffect(() => {
        if (result && result.correct !== "") {
            setShowResult(true);
            const timer = setTimeout(() => {
                setShowResult(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [result]);

    // return (
    //     <div  id="question-component">
    //         {showResult?<div> { 
    //             result.correct?<img id="result-img" src={check} alt="checkmark" /> : <img id="result-img" src={cross} alt="checkmark" />
    //         }</div>:<></>} 
    //         <div id="question-title">{questionState.question_title}</div>
    //         {questionState.question_type !== 'buttasdfaon' && <QuestionButton options={questionState.question_options} sendAnswer={sendAnswer}/>}

    //     </div>
    // );


    return (
        <div  id="question-component">
            {showResult?<div> { 
                result.correct?<img id="result-img" src={check} alt="checkmark" /> : <img id="result-img" src={cross} alt="checkmark" />
            }</div>:<></>} 
            <div id="question-title">{questionState.question_title}</div>
            {questionState.question_type === 'button' && <QuestionButton options={questionState.question_options} sendAnswer={sendAnswer}/>}
            {questionState.question_type === 'text' && <QuestionText questionId={questionState.question_id} sendAnswer={sendAnswer}></QuestionText>}
            {questionState.question_type === 'chat' && <QuestionChat chat={chatState} sendAnswer={sendAnswer}></QuestionChat>}

        </div>
    );
}

export default Question;

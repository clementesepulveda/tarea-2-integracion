import '../styles/Game.css';
import { useState, useEffect } from 'react';

function QuestionText({ questionId, sendAnswer }) {
    const [sentAnswer, setSentAnswer] = useState(false)
    const [answer, setAnswer] = useState('')

    const sendFinalAnswer = () => {
        setSentAnswer(true);
        sendAnswer(answer)
        setAnswer('')
    }

    const handleTextChange = event => {
        setAnswer(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendFinalAnswer();
        }
    }

    useEffect(() => {
        setSentAnswer(false);  // Reset button disable state when question type changes
    }, [questionId]);

    return (
        
        <div id="chat-inputs">
            <input disabled={sentAnswer} type='text' onChange={handleTextChange} onKeyDown={handleKeyDown} value={answer}></input>

            {/* <input type='text' onChange={handleTextChange} onKeyDown={handleKeyDown} value={answer} /> */}
            {/* <button onClick={sendFinalAnswer}>Send</button> */}
            <button disabled={sentAnswer} onClick={sendFinalAnswer}>Send</button>
        </div>
        // <div id='question-text-component'>
        //     <input disabled={sentAnswer} type='text' onChange={handleTextChange} onKeyDown={handleKeyDown} value={answer}></input>
        //     <button disabled={sentAnswer} onClick={sendFinalAnswer}>Send</button>
        // </div>
    );
}

export default QuestionText;

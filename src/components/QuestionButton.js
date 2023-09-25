import '../styles/Game.css';
import React, { useState, useEffect } from 'react';

function QuestionButton({ options, sendAnswer }) {
    const [pressedButton, setPressed] = useState(false);


    const buttonClick = (value) => {
        if (!pressedButton){
            setPressed(true);
            sendAnswer(value);
        }
    }
    
    useEffect(() => {
        setPressed(false);  // Reset button disable state when question type changes
    }, [options]);

    // options = {
    //     1: "algo",
    //     2: "otro algo",   
    //     3: "algo",
    //     4: "otro algo",
        
    // }

    return (
        <div id='question-buttons-component'>
            {Object.keys(options).map(i=>(
                <button key={i} disabled={pressedButton} onClick={() => buttonClick(i)} id={`button-answer${i}`}>{options[i]}</button>
            ))}
        </div>
    );
}

export default QuestionButton;

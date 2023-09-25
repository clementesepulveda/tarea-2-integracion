import '../styles/Chat.css';
import ChatMessage from './ChatMessage';
import React, { useState, useEffect, useRef } from 'react';

function QuestionText({ chat, sendAnswer }) {
    const [answer, setAnswer] = useState('');
    const chatContainerRef = useRef(null);


    const sendFinalAnswer = () => {
        sendAnswer(answer);
        setAnswer("");
    }

    const handleTextChange = event => {
        setAnswer(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendFinalAnswer();
            setAnswer("");
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat]);

    return (
        <div id='chat-component'  className='question-type'>
            <div id="chat-container" ref={chatContainerRef}>
                {chat.map((player, index) => (
                    <ChatMessage key={index} data={player} />
                ))}
            </div>
            <div id="chat-inputs">
                <input type='text' onChange={handleTextChange} onKeyDown={handleKeyDown} value={answer} />
                <button onClick={sendFinalAnswer}>Send</button>
            </div>
        </div>
    );
}

export default QuestionText;

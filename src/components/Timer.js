import { Card } from 'antd';
import '../styles/Timer.css';

function Timer({timerState}) {
    return (
        <div id='timer-component'>
            <div className="card" id="question-id">Question {timerState.question_id}</div>
            <div className="card" id="timer-left">Time Left: {timerState.seconds_remaining}</div>
        </div>
    );
}

export default Timer;

import '../styles/Game.css';

// import Question from '../components/Question'
// import Timer from '../components/Timer'
// import Scoreboard from '../components/Scoreboard';

function Game({ timerState, scoreboardState, questionState, sendAnswer}) {
    return (
        <div className='App2'>
            {/* <div id='header'>
                <div id="name">Trivia 123</div>
                <div id="streak">Sauron is on a 3 question streak</div>
            </div>

            <div id='playing-elements'>
                <div id="question">
                    <Timer timerState={timerState}></Timer>
                    <Question questionState={questionState} sendAnswer={sendAnswer}></Question>
                </div>
                <Scoreboard scoreboardState={scoreboardState}></Scoreboard>
            </div> */}
        </div>
    );
}

export default Game;

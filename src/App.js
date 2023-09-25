import './App.css';
import { w3cwebsocket } from 'websocket';
import './views/MainMenu.js'
import { useState } from 'react';

// import { Card } from 'antd';

import MainMenu from './views/MainMenu.js';
import Lobby from './views/Lobby.js';
import FinalScoreboard from './views/FinalScoreboard.js';

// import Game from './views/Game';
import Question from './components/Question'
import Timer from './components/Timer'
import Scoreboard from './components/Scoreboard';
import StreakBanner from './components/StreakBanner'

let server = new w3cwebsocket(process.env.REACT_APP_SERVER_URL+"/connect")

function App() {
    const [gameState, setGameState] = useState("loading");
    const [reconnecting, setReconnecting] = useState(false)
    const [username, setUsername] = useState('');

    const [lobbyState, setLobbyState] = useState({});
    const [timerState, setTimerState] = useState({
        question_id: 0,
        seconds_remaining: 10
    });
    const [scoreboardState, setScoreboardState] = useState({
        scores: {}
    });
    const [questionState, setQuestionState] = useState({
        question_type: ""
    });
    const [chatState, setChatState] = useState([]);
    const [bestStreak, setBestStreak] = useState({
        username: "",
        streak: -1,
    });
    const [questionResult, setQuestionResult] = useState({  
        correct: ""
    });
    const [highscore, setHighScore] = useState([]);


    function reconnect(callback) {
        setReconnecting(true);
    
        setTimeout(() => {
            if (server.readyState !== WebSocket.OPEN) {
                console.log("Reconnecting...");
                server = new w3cwebsocket(process.env.REACT_APP_SERVER_URL + "/connect");
    
                setBestStreak({
                    username: "",
                    streak: -1
                });
                setChatState([]);
                setQuestionResult({
                    correct: ''
                });

                console.log(username)
    
                // Call the callback after successfully reconnecting
                server.onopen = () => {
                    console.log("Reconnected successfully to Websocket");
                    setReconnecting(false);
                };
            } else {
                console.log(server.readyState, WebSocket.OPEN);
                setReconnecting(false);
                console.log("Reconnected successfully");
            }
        }, 1000);
    }

    server.onopen = () => {
        if (!reconnecting) {
            console.log("Connected successfully to Websocket");
            setGameState('mainMenu');
        } else {
            joinGame();  // Call the callback function here
        }
    };

    server.onclose = (event) => {
        console.log("OnClose Event", event);
        reconnect();
    }

    server.onerror = (event) => {
        console.log("OnError Event", event);
    }

    server.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        const type = dataFromServer['type']
        
        if (type === 'accepted') {
            setGameState('lobby');
        } else if (type === 'denied') {
            // TODO
        } else if (type === 'lobby') {
            setBestStreak({
                username: "",
                streak: -1
            });
            setChatState([]);
            setQuestionResult({
                correct: ''
            });
            setLobbyState(dataFromServer)
        } else if (type === 'score') {
            setScoreboardState(dataFromServer)
            // setGameState('playing');
        } else if (type === 'streak') {
            if (dataFromServer.streak > bestStreak.streak) {
                setBestStreak(dataFromServer)
            }
            // setGameState('playing')
        } else if (type === 'question') {
            setQuestionState(dataFromServer);
            setChatState([]);
            setGameState('playing');
        } else if (type === 'timer') {
            setTimerState(dataFromServer)
            // setGameState('playing');
        } else if (type === 'result') {
            setQuestionResult(dataFromServer);
        } else if (type === 'chat') {
            setChatState(chatState => [...chatState, dataFromServer]);
        } else if (type === 'highscore') {
            console.log("highscore", dataFromServer)
            setHighScore(dataFromServer);
            setGameState('scoreboard')
        } else if (type === 'disconnected') {
            // TODO
        }
    };

    const joinGame = (usernameToSet) => {
        setUsername(usernameToSet)
        setLobbyState({
            ...lobbyState,
            players: [usernameToSet]
        });

        server.send(JSON.stringify({
            type: "join",
            username: usernameToSet,
            id: process.env.REACT_APP_NUMERO_ALUMNO
        }));
    };

    const sendAnswer = (answer) => {
        const payload = {
            "type": "answer",
            "question_id": timerState.question_id,
            "value": answer
        }
        // console.log(payload)
        server.send(JSON.stringify(payload));
    }
    
    
    // return (
    //     <div className='App3'>
    //         <div id='header'>
    //             <div id="name">Trivia 123</div>
    //             <StreakBanner streakData={bestStreak}></StreakBanner>
    //         </div>

    //         <div id='playing-elements'>
    //             <div id="question">
    //                 <Timer timerState={timerState}></Timer>
    //                 <Question result={questionResult} questionState={questionState} chatState={chatState} sendAnswer={sendAnswer}></Question>
    //             </div>
    //             <Scoreboard scoreboardState={scoreboardState}></Scoreboard>
    //         </div>
    //     </div>
    // )
    
    if (reconnecting) {
        return (
            <button onClick={reconnect}>reconnect</button>
        )
    } else if (gameState === 'loading'){
        return (
            <div>loading...</div>
        )
    } else if (gameState === 'mainMenu') {
        return (
            <MainMenu parentCallback={joinGame}></MainMenu>
        );
    } else if (gameState === 'lobby') {
        return (
            <Lobby props={lobbyState}></Lobby>        
        );
    } else if (gameState === 'playing'){
        return (
            <div className='App3'>
                <StreakBanner streakData={bestStreak}></StreakBanner>
    
                <div id='playing-elements'>
                    <div id="question">
                        <Timer timerState={timerState}></Timer>
                        <Question result={questionResult} questionState={questionState} chatState={chatState} sendAnswer={sendAnswer}></Question>
                    </div>
                    <Scoreboard scoreboardState={scoreboardState}></Scoreboard>
                </div>
                
            </div>
        )
    } else if (gameState === 'scoreboard'){
        return (
            <FinalScoreboard scoreboardState={highscore}></FinalScoreboard>
        )
    }
}

export default App;

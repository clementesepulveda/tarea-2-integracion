import '../styles/Lobby.css';

function Lobby({props}) {
    return (
        <div className='App'>
            <h1>Lobby</h1>
            <p id='countdown'>{props.message}</p>

            <div id="players-container">
                <div id="players-title">Current Players</div>
                <div id="players">
                    {props.players.map((player, index) => (
                        <div key={index} className="player-item">{player}</div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Lobby;

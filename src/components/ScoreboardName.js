import '../styles/ScoreboardName.css';

function ScoreboardName({place, username, score}) {
    return (
        <div id='scoreboard-names'>
            <div className='scoreChild'>{place}</div>
            <div className='scoreChild'>{username}</div>
            <div className='scoreChild'>{score}</div>
        </div>
    );
}

export default ScoreboardName;

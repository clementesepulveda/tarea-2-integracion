import '../styles/GameHeader.css';

function StreakBanner({streakData}) {
    return (
        
        <div id='header'>
            <div id="name">Trivia 123</div>

            <div id='streak'>
            {   streakData.streak !== -1 && <div>{streakData.username} is on a {streakData.streak} question streak!</div>}
            </div>
        </div>
    );
}

export default StreakBanner;

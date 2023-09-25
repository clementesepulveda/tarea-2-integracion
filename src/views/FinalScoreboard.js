import '../styles/Game.css';
import '../styles/HighScoreBoard.css';
import ScoreboardName from '../components/ScoreboardName.js'

function FinalScoreboard({ scoreboardState }) {
    // const sortedScores = [
    //     [19, "hello", 19],
    //     [12, "hello2", 12],
    //     [11, "hello3", 11],
    // ]
    const sortedScores = Object.entries(scoreboardState.winners)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([key, value]) => value);

    
    return (
        <div id="final-score-background">
            <div id='final-score'>
                <div id="outer-div">
                    <h1 id='title-final-score'>Trivia 123 Winners</h1>
                </div>
                <div id='highscore-players'>
                    <ScoreboardName
                        place='Place'
                        username='Username'
                        score='Score'
                        key={0}
                    >
                    </ScoreboardName>
                    {sortedScores.map((data, index) => {
                        return (
                            <ScoreboardName
                                place={index+1}
                                username={data.username}
                                score={data.score}
                                key={index+1}
                            >
                            </ScoreboardName>
                        );
                    })
                    }
                </div>

                {/* <br/>
                <br/> */}
                {/* <button>quit</button> */}
            </div>
        </div>
    );
}

export default FinalScoreboard;

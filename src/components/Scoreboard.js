import '../styles/Scoreboard.css';

import ScoreboardName from './ScoreboardName';

function Scoreboard({ scoreboardState}) {
    const scores = Object.entries(scoreboardState.scores).map(([username, score]) => ([
        score,
        username
    ]));

    let sortedScores = scores.sort(function(a, b) { return a[0]-b[0]; }).reverse();

    return (
        <div id='scoreboard'>
            <div id='scoreboard-title'><b>Scoreboard</b></div>
            <div id='scoreboard-players'>
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
                            username={data[1]}
                            score={data[0]}
                            key={index+1}
                        >
                        </ScoreboardName>
                    );
                })
                }
            </div>
        </div>
    );
}

export default Scoreboard;

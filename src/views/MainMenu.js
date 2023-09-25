import '../styles/MainMenu.css';
import { useState } from 'react';


function MainMenu(props) {
    const [username, setUsername] = useState('');

    const handleInputChange = (event) => {
        setUsername(event.target.value);
      };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlePlay();
        }
    }

    const handlePlay = () => {        
        props.parentCallback(username);
    }


    return (
        <div className='App'>
            <p id='game-title'>Dungeons & Trivia</p>

            <section id="selectors">
                <input 
                    type="text" 
                    placeholder='username' 
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                />
                <button onClick={() => handlePlay()}>Play</button>
            </section>
        </div>
    );
}

export default MainMenu;

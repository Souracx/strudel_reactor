import { useState } from 'react';

function TogglePlayButton({onPlay, onStop}) { 
    const [isPlaying, setIsPlaying] = useState(false);

    const handleToggle = () => {
        if (isPlaying) {
            onStop();
            setIsPlaying(false);
        } else {
            onPlay();
            setIsPlaying(true);
        }
    };

    return( 
        <button 
            className={`toggle-play-btn ${isPlaying ? 'playing' : 'stopped'}`}
            onClick={handleToggle}
        >
            {isPlaying ? '■ ' : '▶ '}
        </button>
    ); 
}

export default TogglePlayButton;

function TogglePlayButton({onPlay, onStop, isPlaying}) { 
   

    const handleToggle = () => {
        if (isPlaying) {
            onStop();
            
        } else {
            onPlay();
            
        }
    };

    return( 
        <button 
            className={`toggle-play-btn ${isPlaying ? 'playing' : 'stopped'}`}
            onClick={handleToggle}
        >
            {isPlaying ? '■ stop' : '▶ play'}
        </button>
    ); 
}

export default TogglePlayButton;
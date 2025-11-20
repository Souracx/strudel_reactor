function TogglePlayButton({globalEditor, songText, isPlaying, setIsPlaying, showNotification}) { 

    const handlePlay = () => {

        if (!globalEditor) return showNotification('Editor not ready yet. Please wait...', 'warning');
        //check for empty code 
        if(!songText) return showNotification('Please add some code first','error'); 
        
        globalEditor.evaluate()
        setIsPlaying(true); 
        showNotification('Playback started!', 'success');
    }

    const handleStop = () => {
        globalEditor.stop() 
        setIsPlaying(false); 
        showNotification('Paused','success')
    }

    const handleToggle = () => {
        if (isPlaying) {
            handleStop();
        } else {
            handlePlay();
        }
    };

    return( 
        <button 
            className={`toggle-play-btn ${isPlaying ? 'playing' : 'stopped'}`}
            onClick={handleToggle}>
            {isPlaying ? '■ stop' : '▶ play'}
        </button>
    ); 
}

export default TogglePlayButton;
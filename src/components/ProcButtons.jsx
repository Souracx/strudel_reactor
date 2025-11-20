import { getGlobalEditor } from "../strudel";

function ProcButtons ({songText, setIsPlaying,showNotification}){

    const handleProcess = () => { 
        const editor = getGlobalEditor();
        if (editor) {
            editor.setCode(songText);
        }
        showNotification('Preprocess successful','success'); 
    };

    const handleProcessAndPlay = () => {
        const editor = getGlobalEditor();
        if (editor) {
            setIsPlaying(true);
            editor.setCode(songText);
            editor.evaluate();
        }
        showNotification('Processed successfully play started','success'); 
    };

    return (
        <> 
         <div className="process-btn-group" role="group" aria-label="Basic example">
            <button id="process" className="process-btn preprocess" onClick={handleProcess}>Preprocess</button>
            <button id="process_play" className="process-btn proc-play" onClick={handleProcessAndPlay}>Proc & Play</button>
        </div>
        </>
    ); 
}

export default ProcButtons; 

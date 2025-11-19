import { getGlobalEditor } from "../strudel";

function ProcButtons ({songText, setIsPlaying}){

    const handleProcess = () => { 
        const editor = getGlobalEditor();
        if (editor) {
            editor.setCode(songText);
        }
    };

    const handleProcessAndPlay = () => {
        const editor = getGlobalEditor();
        if (editor) {
            setIsPlaying(true);
            editor.setCode(songText);
            editor.evaluate();
        }
    };

    return (
        <> 
         <div className="btn-group" role="group" aria-label="Basic example">
            <button id="process" className="btn btn-outline-primary" onClick={handleProcess}>Preprocess</button>
            <button id="process_play" className="btn btn-outline-primary" onClick={handleProcessAndPlay}>Proc & Play</button>
        </div>
        </>
    ); 
}

export default ProcButtons; 

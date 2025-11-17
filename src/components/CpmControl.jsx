import { useState } from "react";
import { getGlobalEditor } from "../strudel";

export default function CpmControl({songText, setSongText}){

    const[cpm, setCpm] = useState(140); 

    const handleCpm = (newValue) => { 
        const newCpm = Number(newValue)
        setCpm(newCpm) 
    
    //calculate cps 
    const cps = newCpm / 60 / 4; 
    const updatedSong = songText.replace(/setcps\([^)]+\)/, `setcps(${cps})`);
    setSongText(updatedSong);

    //updateEditor 
    const editor = getGlobalEditor();
    if (editor) {
        editor.setCode(updatedSong);
        if (editor.repl?.state?.started) {
            editor.evaluate();
        }
    }
    }; 

    const handleReset = () => { 
       handleCpm(140); 
    }
    return(
        <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM </span>
            <input type="number" min ="30" max = "300" className="form-control" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" value={cpm} onChange={(e) => handleCpm(e.target.value)}/>
        </div>
        <div> 
            <button className="btn btn-outline-danger" onClick={handleReset}> Reset </button>
        </div> 
        </> 
    )
}
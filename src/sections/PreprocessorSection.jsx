import { useState } from "react";
import ProcButtons from "../components/ProcButtons";
import TogglePlayButton from "../components/TogglePlayButton";
import ToggleSwitch from "../components/ToggleSwitch";
import PreprocessTextArea from "../components/PreprocessTextArea";


export default function PreprocessorSection({songText,setSongText,globalEditor,isPlaying, setIsPlaying, onProcess, onProcessPlay, showNotification}){

    const[showPreprocessor,setShowPreprocessor] = useState(true); 

    return(
        <div className="custom-card" style={{marginBottom: '1.5rem'}}> 
            <label htmlFor="TextArea" className="form-label text-component"> 
                Text to preprocess: 
            </label>

            <div style={{display:'flex', alignItems:'center', flexWrap:'wrap', gap:'8px', marginBottom:'16px'}}>
                <ProcButtons onProcess={onProcess} onProcessPlay={onProcessPlay}/> 
                <TogglePlayButton globalEditor={globalEditor} songText={songText} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showNotification={showNotification}/>               
                <ToggleSwitch isOn={showPreprocessor} onToggle={() => setShowPreprocessor(!showPreprocessor)}label={showPreprocessor ? 'Hide' : 'Show'}/>          
            </div>
            {showPreprocessor && (<PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>)}
        </div>
    ); 
}
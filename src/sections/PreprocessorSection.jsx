import { useState } from "react";
import ProcButtons from "../components/ProcButtons";
import TogglePlayButton from "../components/TogglePlayButton";
import ToggleSwitch from "../components/ToggleSwitch";
import PreprocessTextArea from "../components/PreprocessTextArea";
import JsonDisplay from "../components/JsonDisplay";  


export default function PreprocessorSection({songText,setSongText,globalEditor,isPlaying,setIsPlaying,showNotification,presetJson,setPresetJson,onSaveClick,onLoadClick}){

    const[showPreprocessor,setShowPreprocessor] = useState(true); 

    return(
        <div className="custom-card" style={{marginBottom: '1.5rem'}}> 
            <label htmlFor="TextArea" className="form-label text-component"> 
                Text to preprocess: 
            </label>

            <div style={{display:'flex', alignItems:'center', flexWrap:'wrap', gap:'8px', marginBottom:'16px'}}>
                <ProcButtons songText={songText} setIsPlaying={setIsPlaying} showNotification={showNotification}/> 
                <TogglePlayButton globalEditor={globalEditor} songText={songText} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showNotification={showNotification}/>               
                <ToggleSwitch isOn={showPreprocessor} onToggle={() => setShowPreprocessor(!showPreprocessor)}label={showPreprocessor ? 'Show Json' : 'Show Editor'}/>          
            </div>  
                {showPreprocessor ? (
                <PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>) 
                : (
                <JsonDisplay presetJson={presetJson} setPresetJson={setPresetJson} onSave={onSaveClick} onLoad={onLoadClick} showNotification={showNotification}/>
                )} 
        </div>
    ); 
}
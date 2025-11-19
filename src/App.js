import './App.css';
import { useEffect, useRef, useState } from "react";
import { stranger_tune } from './tunes';
import DJControlSection from './sections/DJControlSection';
import NotificationPopUp from './components/Notification';
import { initializeStrudel, getGlobalEditor } from './strudel.js';
import PreprocessorSection from './sections/PreprocessorSection';
import EditorSection from './sections/EditorSection';
import PianoRollSection from './sections/PianoRollSection';
import { handleSavePreset, handleLoadPreset } from './util/jsonHandlers';

export default function StrudelDemo() {
    const hasRun = useRef(false);
    const [globalEditor, setGlobalEditor] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); 
    const [songText, setSongText] = useState(stranger_tune);
    const [notification, setNotification] = useState({show: false, message:'', type:'success'});     // Notification 
    const [presetJson, setPresetJson] = useState("");
    const [cpm, setCpm] = useState((140)); 

        // Save preset wrapper
    const savePresetToJson = () => {handleSavePreset({ cpm, setPresetJson, showNotification });};
    
        // Load preset wrapper
    const loadPresetFromJson = () => {handleLoadPreset({ presetJson, songText, setCpm, setSongText, showNotification });};

    // Notification helper 
    const showNotification = (message, type = 'success') => {
        setNotification({show: true, message, type}); 
        setTimeout(() => {
            setNotification({show:false, message:'', type:'success'});
        }, 2000); 
    };

    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            
            // Initialize Strudel editor
            const editor = initializeStrudel();
            setGlobalEditor(editor);
            // Set initial value in textarea
            document.getElementById('proc').value = stranger_tune;
        }
        
        // Update editor code when songText changes
        const editor = getGlobalEditor();
        if (editor) {
            editor.setCode(songText);
        }
    }, [songText]);

    return (
        <div style={{backgroundColor: 'rgb(18,3,3)'}}>
            <h2 style={{color: '#30B3A5'}}>Strudel Demo</h2>
            <main className="container-fluid" style={{maxWidth: '1600px', margin: '0 auto', padding: '0 1rem'}}>
                <div className="row g-3 mb-3">
                    <div className="col-lg-8">
                        <PreprocessorSection songText={songText} setSongText={setSongText} globalEditor={globalEditor} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showNotification={showNotification}
                            presetJson={presetJson} setPresetJson={setPresetJson} onSaveClick={savePresetToJson} onLoadClick={loadPresetFromJson} />
                        <EditorSection/> 
                    </div>
                    <div className="col-lg-4">
                        <DJControlSection songText={songText} setSongText={setSongText} cpm={cpm} setCpm={setCpm} />
                    </div>
                </div>
                <PianoRollSection/>
            </main>
            <NotificationPopUp message={notification.message} type={notification.type} show={notification.show}/> 
        </div>
    );
}
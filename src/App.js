import './App.css';
import { useEffect, useRef, useState } from "react";
import { stranger_tune } from './tunes';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import DJControls from './components/DJControls';
import VolumeSlider from './components/VolumeSlider';
import TogglePlayButton from './components/TogglePlayButton';
import NotificationPopUp from './components/Notification';
import ToggleSwitch from './components/ToggleSwitch';
import { initializeStrudel, getGlobalEditor } from './strudel.js';

export default function StrudelDemo() {
    const hasRun = useRef(false);
    const [globalEditor, setGlobalEditor] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); 
    const [songText, setSongText] = useState(stranger_tune);
    const [showPreprocessor, setShowPreprocessor] = useState(true);         // Handles preprocessor hiding 
    const [notification, setNotification] = useState({show: false, message:'', type:'success'});     // Notification 
    const [cpm, setCpm] = useState(120); 


    // Notification helper 
    const showNotification = (message, type = 'success') => {
        setNotification({show: true, message, type}); 
        setTimeout(() => {
            setNotification({show:false, message:'', type:'success'});
        }, 2000); 
    };

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

    const handleCpm = (newValue) => {
        const newCpm = Number(newValue);
        setCpm(newCpm); 
        const cps = newCpm / 60 / 4;
        const updatedSong = songText.replace(/setcps\([^)]+\)/, `setcps(${cps})`);
        setSongText(updatedSong);
        
        const editor = getGlobalEditor();
        if (editor) {
            editor.setCode(updatedSong);
            if (editor.repl?.state?.started) {
                editor.evaluate();
            }
        }
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
            <main>
                <div className="container-fluid">
                    <div className="row g-3 mb-3">
                        <div className="col-lg-8">
                            <div className="custom-card">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label text-component">
                                    Text to preprocess:
                                </label>
                                <ProcButtons onProcess={handleProcess} onProcessPlay={handleProcessAndPlay}/>
                                <TogglePlayButton globalEditor={globalEditor} songText={songText} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showNotification={showNotification}/>                           
                                <ToggleSwitch isOn={showPreprocessor} onToggle={() => setShowPreprocessor(!showPreprocessor)}label={showPreprocessor ? 'Hide' : 'Show'}/>          
                                {showPreprocessor && (<PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>)}
                            </div>
                        </div>
                        <div className="col-lg-4">
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div className='custom-card'>
                                <div id="editor" />
                                <div id="output" />
                            </div> 
                        </div>
                        <div className="col-lg-4">
                            <div className='custom-card'>
                                <label htmlFor='DJControls' className='form label text-component'>
                                    DJ Controls
                                </label>
                                <DJControls cpm={cpm} onCpmChange={handleCpm}/>
                                <VolumeSlider /> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row g-3 mt-3'>
                    <div className='custom-card'> 
                        <canvas id="roll"></canvas>
                    </div>
                </div>
            </main>
            <NotificationPopUp message={notification.message} type={notification.type} show={notification.show}
            /> 
        </div>
    );
}
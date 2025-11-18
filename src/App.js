import './App.css';
import { useEffect, useRef, useState } from "react";
import { stranger_tune } from './tunes';
import DJControlSection from './sections/DJControlSection';
import NotificationPopUp from './components/Notification';
import { initializeStrudel, getGlobalEditor } from './strudel.js';
import PreprocessorSection from './sections/PreprocessorSection';
import EditorSection from './sections/EditorSection';
import PianoRollSection from './sections/PianoRollSection';


export default function StrudelDemo() {
    const hasRun = useRef(false);
    const [globalEditor, setGlobalEditor] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); 
    const [songText, setSongText] = useState(stranger_tune);
    // const [showPreprocessor, setShowPreprocessor] = useState(true);         // Handles preprocessor hiding 
    const [notification, setNotification] = useState({show: false, message:'', type:'success'});     // Notification 


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
                        <PreprocessorSection songText={songText} setSongText={setSongText} globalEditor={globalEditor} isPlaying={isPlaying} setIsPlaying={setIsPlaying} showNotification={showNotification} onProcess={handleProcess} onProcessPlay={handleProcessAndPlay}/>
                        <EditorSection/> 
                    </div>
                    <div className="col-lg-4">
                        <DJControlSection songText={songText} setSongText={setSongText} />
                    </div>
                </div>
                <PianoRollSection/>
            </main>
            <NotificationPopUp message={notification.message} type={notification.type} show={notification.show}/> 
        </div>
    );
}
import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import DJControls from './components/DJControls';
import { GrPowerReset } from "react-icons/gr";



let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop() 
    }

    const [songText, setSongText] = useState(stranger_tune)

    const handleProcess = () => { 
        if(globalEditor){
        globalEditor.setCode(songText); }
    }

    const handleProcessAndPlay = () => {
        if (globalEditor) {
            globalEditor.setCode(songText);
            globalEditor.evaluate();
          }
    }

    const [cpm, setCpm] = useState(120); 

    const handleCpm = (newValue) => {
        const newCpm = Number(newValue);

        setCpm(newCpm); 
        const cps = newCpm / 60 / 4;
        const updatedSong = songText.replace(/setcps\([^)]+\)/, `setcps(${cps})`);
        setSongText(updatedSong);
        
        if (globalEditor) {
            globalEditor.setCode(updatedSong);
            if (globalEditor.repl?.state?.started) {
                globalEditor.evaluate();
            }
        }
 };

    const [volume, setVolume] = useState(0.7); 

    const handleVolume = (newValue) => { 
        const newVolume = Number(newValue); 
        setVolume(newVolume); 

        if(globalEditor && globalEditor.repl){
            globalEditor.evaluate(`gain(${newVolume})`); 
        }
    
    }

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        // SetupButtons()
        // Proc()
    }
    globalEditor.setCode(songText); 
}, [songText]);


return (
    <div style={{backgroundColor: 'rgb(18,3,3)'}}>
        <h2 style={{color: '#30B3A5'}}>Strudel Demo</h2>
        <main>
            <div className="container-fluid">
                <div className="row g-3 mb-3">
                    <div className="col-lg-8">
                        <div className="custom-card">
                            <PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/> 
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className='custom-card'>
                        <label htmlFor="Preprocessing" className="form-label text-component">Preprocessing</label>
                            <br/> 
                            <ProcButtons onProcess={handleProcess} onProcessPlay={handleProcessAndPlay}/>
                        </div>
                            <br />
                        <div className='custom-card'>
                        <label htmlFor="Preprocessing" className="form-label text-component">Playback</label>
                            <br/> 
                            <PlayButtons onPlay={handlePlay} onStop={handleStop}/> 
                        </div>
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
                            <label htmlFor='DJControls' className='form label text-component'>DJ Controls</label>
                            <DJControls cpm={cpm} onCpmChange={handleCpm} volume={volume} onVolumeChange={handleVolume}/>
                            <GrPowerReset />

                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-3 mt-3'>
                <div className='custom-card'> 
                <canvas id="roll"></canvas>
                </div>
            </div>
        </main >
    </div >
);


}
import { useState,useEffect } from 'react';
import { getGlobalEditor } from '../strudel';

export default function SoundBoardControls({ songText, setSongText }) {

    const [bass, setBass] = useState(true);
    const [arpeggiator, setArpeggiator] = useState(true);
    const [drums, setDrums] = useState(true);
    const [drums2, setDrums2] = useState(true);

    useEffect(() => {
        setBass(!songText.includes('_bassline:'));
        setArpeggiator(!songText.includes('_main_arp:'));
        setDrums(!songText.includes('_drums:'));
        setDrums2(!songText.includes('_drums2:'));
    }, [songText]);

    const toggleSection = (section, isEnabled) => {
        // Update state first
        const setStates = {
            bass: section === 'bass' ? isEnabled : bass,
            arpeggiator: section === 'arpeggiator' ? isEnabled : arpeggiator,
            drums: section === 'drums' ? isEnabled : drums,
            drums2: section === 'drums2' ? isEnabled : drums2
        };

        // Update the state
        if (section === 'bass') setBass(isEnabled);
        if (section === 'arpeggiator') setArpeggiator(isEnabled);
        if (section === 'drums') setDrums(isEnabled);
        if (section === 'drums2') setDrums2(isEnabled);

        // Get the song text
        let updatedSong = songText;

        // Remove all underscores from section labels to reset
        updatedSong = updatedSong.replace(/^_bassline:/gm, 'bassline:');
        updatedSong = updatedSong.replace(/^_main_arp:/gm, 'main_arp:');
        updatedSong = updatedSong.replace(/^_drums:/gm, 'drums:');
        updatedSong = updatedSong.replace(/^_drums2:/gm, 'drums2:');

        // Add underscore prefix to mute sections
        if (!setStates.bass) {updatedSong = updatedSong.replace(/^bassline:/gm, '_bassline:');}

        if (!setStates.arpeggiator) {updatedSong = updatedSong.replace(/^main_arp:/gm, '_main_arp:');}

        if (!setStates.drums) {updatedSong = updatedSong.replace(/^drums:/gm, '_drums:');}

        if (!setStates.drums2) {updatedSong = updatedSong.replace(/^drums2:/gm, '_drums2:');
}

        // Update the parent component's song text
        setSongText(updatedSong);

        // Get the editor and update it in real-time
        const editor = getGlobalEditor();
        if (editor) {
            editor.setCode(updatedSong);
            
            // If the editor is currently playing, re-evaluate to apply changes immediately
            if (editor.repl?.state?.started) {
                editor.evaluate();
            }
        }
    };

    return (
        <div className="mb-3">
            <label className="form-label text-component d-block mb-2">
                Mixer Controls
            </label>
            
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="bassCheck" checked={bass} onChange={(e) => toggleSection('bass', e.target.checked)}/>
                <label className="form-check-label" htmlFor="bassCheck"> Bassline</label>
            </div>
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="arpCheck" checked={arpeggiator} onChange={(e) => toggleSection('arpeggiator', e.target.checked)}/>
                <label className="form-check-label" htmlFor="arpCheck"> Arpeggiator</label>
            </div>
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="drumsCheck"checked={drums}onChange={(e) => toggleSection('drums', e.target.checked)}/>
                <label className="form-check-label" htmlFor="drumsCheck"> Drums 1</label>
            </div>
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="drums2Check" checked={drums2} onChange={(e) => toggleSection('drums2', e.target.checked)}/>
                <label className="form-check-label" htmlFor="drums2Check"> Drums 2</label>
            </div>
        </div>
    );
}


import { buildPreset, applyPresetToState } from './jsonPreset';
import { getGlobalEditor } from '../strudel';


//  * Save current CPM state to JSON preset

export function handleSavePreset({ cpm, mixerControls, setPresetJson, showNotification }) {
    const preset = buildPreset({ cpm, mixerControls });
    setPresetJson(JSON.stringify(preset, null, 2));
    showNotification("Preset saved to JSON", "success");
}


 // Load preset from JSON and update CPM state
 
export function handleLoadPreset({ presetJson, songText, setCpm, setSongText, setMixerControls, showNotification }) {
    try {
        const parsed = JSON.parse(presetJson);
        const { songText: newSong, cpm: newCpm, mixerControls: newMixerControls} = applyPresetToState({
            songText,
            preset: parsed
        });
    
        setSongText(newSong);
        setCpm(newCpm);

        if (setMixerControls && newMixerControls) {
            setMixerControls(newMixerControls);
        }
        
        const editor = getGlobalEditor();
        if (editor) {
            editor.setCode(newSong);
            if (editor.repl?.state?.started) {
                editor.evaluate();
            }
        }
        
        showNotification("Preset loaded from JSON", "success");
    } catch (err) {
        showNotification("Invalid JSON: " + err.message, "error");
    }
}
import { buildPreset, applyPresetToState } from './jsonPreset';
import { getGlobalEditor } from '../strudel';


//  * Save current CPM state to JSON preset

export function handleSavePreset({ cpm,songText, setPresetJson, showNotification }) {
    const preset = buildPreset({ cpm,songText });
    setPresetJson(JSON.stringify(preset, null, 2));
    showNotification("Preset saved to JSON", "success");
}


//  Load preset from JSON and update CPM state
export function handleLoadPreset({ presetJson, songText, setCpm, setSongText, showNotification }) {
    try {
        const parsed = JSON.parse(presetJson);
        const { songText: newSong, cpm: newCpm } = applyPresetToState({
            songText,
            preset: parsed
        });
    
        // Update state
        setSongText(newSong);
        setCpm(newCpm);
        
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
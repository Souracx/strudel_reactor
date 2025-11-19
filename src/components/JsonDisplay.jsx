// components/JsonDisplay.jsx
import React from 'react';

export default function JsonDisplay({ presetJson, setPresetJson, onSave, onLoad, showNotification }) {
    const handleSave = () => {
        onSave();
    };

    const handleLoad = () => {
        try {
            // Validate JSON before loading
            JSON.parse(presetJson);
            onLoad();
        } catch (err) {
            showNotification?.("Invalid JSON format", "error");
        }
    };

    const handleExport = () => {
        const blob = new Blob([presetJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `strudel-preset-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showNotification?.("JSON exported", "success");
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPresetJson(event.target.result);
                showNotification?.("JSON imported", "success");
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            {/* JSON Control Buttons */}
            <div className="json-button-container">
                <button className="json-btn json-btn-save" onClick={handleSave} title="Save">Save to JSON</button>
                <button className="json-btn json-btn-load" onClick={handleLoad} title="Load ">Load from JSON</button>
                <button className="json-btn json-btn-export" onClick={handleExport}title="Export">Export</button>
                <label className="json-btn json-btn-import" title="Import JSON from file" style={{ marginBottom: 0 }}>Import
                <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }}/>
                </label>
            </div>

             {/* JSON Textarea  */}
            <textarea className="json-textarea"rows="15" value={presetJson} onChange={(e) => setPresetJson(e.target.value)}
                placeholder="JSON preset will appear here. Click 'Save to JSON' to generate a preset from the current song."
                id="json-preset"
            />
        </>
    );
}


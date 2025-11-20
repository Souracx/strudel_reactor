# Project Overview 

This is a React-based preprocessor and UI for Strudel.cc, a live coding music platorm. The application provides a intuitive interface for controlling and manipulating music in real time through features provided. 

- Playback (Play / Stop)
- Song speed (CPM)
- Mixer controls (toggle instrument sections)
- JSON preset saving/loading/import/export
- Preprocessing logic
- A Piano Roll visualization
- A Strudel code editor with live WebAudio output

The project demonstrates component-based design, clean data flow, and modern React principles.

**Video Demonstration:** https://www.youtube.com/watch?v=scfQUrYoYTI

---

## Main Features

###  1. CPM Control  
**Component:** `CpmControl.jsx`  
- Adjusts song speed (CPM → converted to CPS)  
- Automatically updates the `setcps()` call in `songText`  
- Updates the Strudel editor live  
- Includes **Reset** (restores default 140 CPM)

---

###  2. Mixer Controls (Instrument On/Off)  
**Component:** `SoundBoardControls.jsx`  
Controls 4 instruments:

- Bassline  
- Arpeggiator  
- Drums  
- Drums2  

Muting works by applying underscore prefixes inside the Strudel code:
- `bassline:` -> `_bassline:`  
- Removes underscores when re-enabled  

Updates are reflected instantly in both `songText` and the Strudel editor.

---

###  3. Preprocessor Section  
**Component:** `PreprocessorSection.jsx`  

Includes:
- **Preprocess** button  
- **Preprocess & Play** button  
- **Play/Pause toggle**  
- **Text editor ↔ JSON editor switch**  
- Live song text editing  

This is the core interaction panel for the user.

---

###  4. Play / Stop Button  
**Component:** `TogglePlayButton.jsx`  

- Starts the Strudel playback  
- Stops playback  
- Detects if the editor is not ready or if no code exists  
- Provides feedback through notifications  

---

###  5. JSON Preset Handling  
**Components & Utilities:**  
- `JsonDisplay.jsx`  
- `jsonHandlers.js`  
- `jsonPreset.js`  

Supports four key functions:

Supports four key functions:

#### ✔ Save to JSON  
Stores:
- CPM  
- Mixer state  
- Timestamp  
- Version  

#### ✔ Load from JSON  
Updates:
- CPM  
- setcps() in song text  
- Mixer prefixes  
- Updates the Strudel editor

#### ✔ Export JSON  
Creates a downloadable `.json` file.

#### ✔ Import JSON  
Reads a JSON file and loads it into the UI.

---

###  6. Strudel Code Editor  
**Component:** `EditorSection.jsx`

- Uses the StrudelMirror REPL  
- Displays live Strudel code  
- Automatically updates when `songText` changes  
- Runs evaluation on playback  

---

###  7. Piano Roll Visualization  
**Component:** `PianoRollSection.jsx`

- Uses Strudel’s `drawPianoroll()`  
- Displays real-time note visualization on a canvas  
- Reflects the currently playing pattern  

---

###  8. Notifications  
**Component:** `Notification.jsx`  

Shows:
- Success  
- Error  
- Warning  
- Info  

Used throughout JSON operations, preprocessing, and playback.

---

##  Song Used  

The default song is **stranger_tune** from `tunes.js`.

This is a remix of work by **Algorave Dave**.  
Original inspiration: https://www.youtube.com/watch?v=ZCcpWzhekEY

---

## AI Usage Declaration 

I used Claude to understand parts of the Strudel codebase, specifically to help explain how Strudel’s REPL, playback, and preprocessing functions work. 

---


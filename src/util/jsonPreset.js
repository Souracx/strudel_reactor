
 //Extract CPM value from songText by parsing the setcps() call
export function extractCpmFromSong(songText) {
    if (typeof songText !== "string") {
      return 140;
    }
    // Look for setcps(value) pattern
    const cpsMatch = songText.match(/setcps\(([^)]+)\)/);
    
    if (cpsMatch) {
      // Evaluate the expression (handles both numbers and calculations like 140/60/4)
      try {
        const cpsValue = eval(cpsMatch[1]);
        // Convert CPS back to CPM: cpm = cps * 60 * 4
        const cpm = Math.round(cpsValue * 60 * 4);
        return cpm;
      } catch (error) {
        console.error("Error parsing CPS value:", error);
        return 140;
      }
    }
    
    return 140; // Default CPM value
  }
  
  
 //Build a preset object containing only CPM
 
  export function buildPreset({ cpm }) {
    const preset = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      cpm: cpm || 140
    };
    
    return preset;
  }
  
     
  export function applyPresetToState({ songText, preset }) {
    // Validate preset has required fields
    if (!preset || typeof preset !== 'object') {
      throw new Error('Invalid preset format');
    }
    
    if (typeof preset.cpm !== 'number') {
      throw new Error('Preset missing valid CPM field');
    }
    
    // Use current song text, just update the CPM
    let newSongText = songText;
    const newCpm = preset.cpm;
    
    // Update the setcps() value in the song text to match the CPM
    const cps = newCpm / 60 / 4;
    
    if (/setcps\([^)]+\)/.test(newSongText)) {
      // Replace existing setcps() call
      newSongText = newSongText.replace(/setcps\([^)]+\)/, `setcps(${cps})`);
    } else {
      // Add setcps() at the beginning if it doesn't exist
      newSongText = `setcps(${cps})\n\n${newSongText}`;
    }
    
    return {
      songText: newSongText,
      cpm: newCpm
    };
  }

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
  
  //Extract mixer controls from songText by checking for underscore prefixes
  export function extractMixerControlsFromSong(songText) {
    if (typeof songText !== "string") {
      return {
        bass: true,
        arpeggiator: true,
        drums: true,
        drums2: true
      };
    }
    
    return {// No underscore = enabled
      bass: !songText.includes('_bassline:'),        
      arpeggiator: !songText.includes('_main_arp:'),
      drums: !songText.includes('_drums:'),          
      drums2: !songText.includes('_drums2:')         
    };
  }

  
 //Build a preset object containing only CPM
  export function buildPreset({ cpm,songText }) {
    const mixerControls = extractMixerControlsFromSong(songText);
    const preset = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      cpm: cpm || 140,
      mixerControls: mixerControls
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

       // Apply mixer controls if they exist in the preset
    const mixerControls = preset.mixerControls || {
        bass: true,
        arpeggiator: true,
        drums: true,
        drums2: true
      };
      
      // Remove all underscores from section labels to reset
      newSongText = newSongText.replace(/^_bassline:/gm, 'bassline:');
      newSongText = newSongText.replace(/^_main_arp:/gm, 'main_arp:');
      newSongText = newSongText.replace(/^_drums:/gm, 'drums:');
      newSongText = newSongText.replace(/^_drums2:/gm, 'drums2:');
      
      // Add underscore prefix to mute sections based on mixer controls
      if (!mixerControls.bass) {
        newSongText = newSongText.replace(/^bassline:/gm, '_bassline:');
      }
      if (!mixerControls.arpeggiator) {
        newSongText = newSongText.replace(/^main_arp:/gm, '_main_arp:');
      }
      if (!mixerControls.drums) {
        newSongText = newSongText.replace(/^drums:/gm, '_drums:');
      }
      if (!mixerControls.drums2) {
        newSongText = newSongText.replace(/^drums2:/gm, '_drums2:');
      }
    
    return {
      songText: newSongText,
      cpm: newCpm
    };
  }
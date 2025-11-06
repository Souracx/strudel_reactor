
function DJControls({cpm, onCpmChange, volume, onVolumeChange}) {
    return (
      <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM </span>
            <input type="number" min ="30" max = "300" className="form-control" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" value={cpm} onChange={(e) => onCpmChange(e.target.value)}/>
        </div>
        <div> 
            <button className="btn btn-danger" onClick={() => onCpmChange(120)}> reset </button>
        </div> 
        <label htmlFor="volume_range" className="form-label text-component" style={{color: '#30B3A5'}}>Volume</label>
        <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={(e) => onVolumeChange(e.target.value)}/> 
       
      </>
    );
  }
  
  export default DJControls;
  
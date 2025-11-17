
//controls for handling features of music
function DJControls({cpm, onCpmChange}) {
    return (
      <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM </span>
            <input type="number" min ="30" max = "300" className="form-control" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" value={cpm} onChange={(e) => onCpmChange(e.target.value)}/>
        </div>
        <div> 
            <button className="btn btn-outline-danger" onClick={() => onCpmChange(140)}> Reset </button>
        </div> 
      </>
    );
  }
  
  export default DJControls;
  
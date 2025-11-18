function VolumeSlider (){
    return (
        <div> 
            <label htmlFor="volume_range" className="form-label text-component"> Volume </label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"  /> 
            
        </div>
    )
}

export default VolumeSlider

function ToggleSwitch({ isOn, onToggle, label }) {
    return (
        <div className="toggle-switch-container">
            {label && <span className="toggle-switch-label">{label}</span>}
            <label className="toggle-switch">
                <input type="checkbox" checked={isOn} onChange={onToggle}/>
                <span className="toggle-slider"></span>
            </label>
        </div>
    );
}

export default ToggleSwitch;
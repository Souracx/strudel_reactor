export default function PianoRollSection() {
    return (
        <div className='row g-3'>
            <div className='col-12'>
                <div className='custom-card' style={{ padding: '24px' }}>
                    <label className='form-label text-component' style={{ marginBottom: '16px' }}>
                         Piano Roll Visualization
                    </label>
                    <canvas id="roll"></canvas>
                </div>
            </div>
        </div>
    );
}

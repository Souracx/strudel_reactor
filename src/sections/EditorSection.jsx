export default function EditorSection() {
    return (
        <div className='custom-card' style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <label className='form-label text-component' style={{ marginBottom: '12px' }}>
                 Strudel Editor
            </label>
            <div id="editor" />
            <div id="output" />
        </div>
    );
}
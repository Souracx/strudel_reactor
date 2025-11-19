import CpmControl from '../components/CpmControl';
import SoundBoardControls from '../components/SoundBoardControls';
import VolumeSlider from '../components/VolumeSlider';

// Container for all DJ/music controls
export default function DJControlSection({ songText, setSongText,cpm,setCpm }) {
    return (
        <div className='custom-card' style={{ position: 'sticky', top: '20px' }}>
            <label htmlFor='DJControls' className='form-label text-component'>
                DJ Controls
            </label>
                <CpmControl songText={songText} setSongText={setSongText} cpm={cpm} setCpm={setCpm}/>
                <VolumeSlider />
                <SoundBoardControls songText={songText} setSongText={setSongText}/> 
        </div>
    );
}

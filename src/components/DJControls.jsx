import CpmControl from './CpmControl';
import SoundBoardControls from './SoundBoardControls';
import VolumeSlider from './VolumeSlider';

// Container for all DJ/music controls
export default function DJControls({ songText, setSongText }) {
    return (
        <>
            <CpmControl songText={songText} setSongText={setSongText}/>
            <VolumeSlider />
            <SoundBoardControls songText={songText} setSongText={setSongText}/> 
\        </>
    );
}

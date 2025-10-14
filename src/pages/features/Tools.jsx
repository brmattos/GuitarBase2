import '../../styles/features/tools.scss';
import Metronome from '../../components/tools/Metronome';
import Tuner from '../../components/tools/Tuner';

function Tools() {

  return (
    <div className="tools-container">
      <Metronome />
      <Tuner />
    </div>
  );
}

export default Tools;
import '../styles/home.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <h1 className="title">GuitarBase</h1>
        <p className="subtitle">play a while</p>
      </div>
      <div className="feature-group">
        <div className="feature-container" onClick={() => navigate("/fretboard")}>
          <img src="images/fretboard.jpg" className="fretboard-img" alt="fretboard" loading="lazy" />
          <p className="feature-title">Interactive Fretboard</p>
          <p className="description">
            Exploring tunings, experiment with different notes and chords,
            enhance your practice and playing experience. 
            Dive in and start exploring!
          </p>
        </div>
        <div className="feature-container" onClick={() => navigate("/library")}>
          <img src="images/library.png" className="library-img" alt="library" loading="lazy" />
          <p className="feature-title">Library</p>
          <p className="description">
            Organize and manage your guitar learning with a personalized, intuitive 
            library — track songs, sort entries, mark favorites, and access guitar tabs with ease.
          </p>
        </div>
        <div className="feature-container" onClick={() => navigate("/tools")}>
          <img src="images/tools.png" className="tools-img" alt="tools" loading="lazy" />
          <p className="feature-title">Tools</p>
          <p className="description">
            Elevate your practice with our integrated metronome. Whether locking in a steady 
            beat or pushing your speed, this metronome is designed to help you stay on time.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
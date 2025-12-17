import '../styles/home.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div class="container">
        <h1 class="title">GuitarBase</h1>
        <p class="subtitle">play a while</p>
      </div>
      <div class="feature-group">
        <div class="feature-container" onClick={() => navigate("/fretboard")}>
          <img src="images/fretboard.jpg" class="fretboard-img" alt="fretboard" />
          <p class="feature-title">Interactive Fretboard</p>
          <p class="description">
            Exploring tunings, experiment with different notes and chords,
            enhance your practice and playing experience. 
            Dive in and start exploring!
          </p>
        </div>
        <div class="feature-container" onClick={() => navigate("/library")}>
          <img src="images/library.png" class="library-img" alt="library" />
          <p class="feature-title">Library</p>
          <p class="description">
            Organize and manage your guitar learning with a personalized, intuitive 
            library — track songs, sort entries, mark favorites, and access guitar tabs with ease.
          </p>
        </div>
        <div class="feature-container" onClick={() => navigate("/tools")}>
          <img src="images/tools.png" class="tools-img" alt="tools" />
          <p class="feature-title">Tools</p>
          <p class="description">
            Elevate your practice with our integrated metronome. Whether locking in a steady 
            beat or pushing your speed, this metronome is designed to help you stay on time.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
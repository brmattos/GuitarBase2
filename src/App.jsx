import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Learn from "./pages/Learn";
import Fretboard from "./pages/features/Fretboard";
import Library from "./pages/features/Library";
import Tools from "./pages/features/Tools";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/learn" element={<Learn/>} />
        <Route exact path="/fretboard" element={<Fretboard/>} />
        <Route exact path="/library" element={<Library/>} />
        <Route exact path="/tools" element={<Tools/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

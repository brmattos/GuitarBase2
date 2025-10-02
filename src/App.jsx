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
      <Routes>
        <Route exact path="/" element={<div><Navbar/><Home/></div>} />
        <Route exact path="/about" element={<div><Navbar/><About/></div>} />
        <Route exact path="/learn" element={<div><Navbar/><Learn/></div>} />
        <Route exact path="/fretboard" element={<div><Navbar/><Fretboard/></div>} />
        <Route exact path="/library" element={<div><Navbar/><Library/></div>} />
        <Route exact path="/tools" element={<div><Navbar/><Tools/></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

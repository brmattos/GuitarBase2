import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/auth/Login';
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Learn from "./pages/Learn";
import Fretboard from "./pages/features/Fretboard";
import Library from "./pages/features/Library";
import Tools from "./pages/features/Tools";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/learn' element={<ProtectedRoute><Learn /></ProtectedRoute>} />
          <Route exact path='/fretboard' element={<Fretboard />} />
          <Route exact path='/library' element={<ProtectedRoute><Library /></ProtectedRoute>}/>
          <Route exact path='/tools' element={<Tools />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

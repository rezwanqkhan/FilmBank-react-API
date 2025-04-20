import "./css/App.css";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import { MovieProvider } from "./contexts/MovieContexts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;

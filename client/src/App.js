import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React ..
          </a>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Fib />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

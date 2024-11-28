import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EmailAnalysis from "./pages/EmailAnalysis";
import FileAnalysis from "./pages/FileAnalysis";
import URLAnalysis from "./pages/URLAnalysis";
import Extensions from "./pages/Extensions";
import Tips from "./pages/Tips";
import "./App.css";

function App() {
  return (
    <Router>
      <header className="app-header">
        <h1>Email Phishing Analyzer</h1>
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/email-analysis">Analyze Email</Link>
          <Link to="/file-analysis">Analyze File</Link>
          <Link to="/url-analysis">Analyze URL</Link>
          <Link to="/extensions">Our Extensions</Link>
          <Link to="/tips">Tips</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email-analysis" element={<EmailAnalysis />} />
          <Route path="/file-analysis" element={<FileAnalysis />} />
          <Route path="/url-analysis" element={<URLAnalysis />} />
          <Route path="/extensions" element={<Extensions />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© 2024 Email Phishing Analyzer. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;

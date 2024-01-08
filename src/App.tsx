import React from "react"
import GitHubFetch from "./components/GitHubFetch/GitHubFetch"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/:username" element={<GitHubFetch />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

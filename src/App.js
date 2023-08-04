import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./Dashboard"
import PostDetail from "./PostDetail"

function App() {
    return (
        <Router>
            <main className="container">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/:id" element={<PostDetail />} />
            </Routes>
            </main>
        </Router>
    );
}

export default App;

import React from 'react';
import Employees from './component/Employees';
import Vendors from './component/Vendors'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/employees" element={<Employees/>} />
                    <Route path="/vendors" element={<Vendors/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
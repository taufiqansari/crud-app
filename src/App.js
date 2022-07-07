import React from "react";
import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./component/Homepage";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./containers/Albums/Albums";
import Main from "./containers/Main/Main";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/album/:id" element={<Albums></Albums>}></Route>
      </Routes>
    </div>
  );
}

export default App;

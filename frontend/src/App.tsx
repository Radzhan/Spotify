import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./containers/Albums/Albums";
import Main from "./containers/Main/Main";
import Tracks from "./containers/Tracks/Tracks";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/:name/:id" element={<Albums></Albums>}></Route>
        <Route path="/:name/:author/:id" element={<Tracks></Tracks>}></Route>
      </Routes>
    </div>
  );
}

export default App;

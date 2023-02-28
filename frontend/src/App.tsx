import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./containers/Albums/Albums";
import Main from "./containers/Main/Main";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import Tracks from "./containers/Tracks/Tracks";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/:name/:id" element={<Albums/>}></Route>
        <Route path="/:name/:author/:id" element={<Tracks/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trackHistory" element={<TrackHistory/>} />
      </Routes>
    </div>
  );
}

export default App;

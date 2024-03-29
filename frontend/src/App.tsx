import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./containers/Albums/Albums";
import Main from "./containers/Main/Main";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./features/user/Register";
import AddAlbumForm from "./containers/AddAlbumForm/AddAlbumForm";
import Login from "./features/user/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import AddArtistForm from "./containers/AddArtistForm/AddArtistForm";
import AddTrackForm from "./containers/AddTrackForm/AddTrackForm";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/:name/:id" element={<Albums />}></Route>
        <Route path="/:name/:author/:id" element={<Tracks />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/addAlbum" element={<AddAlbumForm />} />
        <Route path="/addTrack" element={<AddTrackForm/>} />
        <Route path="/addArtist" element={<AddArtistForm/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/trackHistory" element={<TrackHistory />} />
      </Routes>
    </div>
  );
}

export default App;

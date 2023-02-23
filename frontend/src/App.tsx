import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./containers/Main/Main";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./containers/Main";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
    </div>
  );
}

export default App;

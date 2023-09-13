import { useState } from "react";
import "./App.css";
import logo from "./logo-150x150.png";
import { Measurements } from "./Measurements";

function App() {
  return (
    <>
      <img src={logo} className="logo react" alt="ASS logo" />
      <h1 className="title">ASS Shade Calculator</h1>
      <div></div>
      <Measurements/>
    </>
  );
}

export default App;

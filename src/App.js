import React from "react";

import "./App.css";
import render from "./reconciler.js";

function App() {
  let doc = {};
  render(<document />, doc, () => console.log("rendered"));
  return <div className="App"></div>;
}

export default App;

import "./App.css";
import { useState } from "react";
function App() {
  const [scan, setScan] = useState(false);
  return <>
  <h1> HELLO OUR SCAN</h1>
  {scan && <button>SCAN</button>}
  {/* 
   */}
  </>;
}

export default App;

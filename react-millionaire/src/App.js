import "./App.css";
import MillionaireForm from "./components/MillionaireForm";
import { useState } from "react";

function App() {
  const [millionaire1, setMillionaire1] = useState({
    name: "",
    networth: 0,
  });
  const [millionaire2, setMillionaire2] = useState({
    name: "",
    networth: 0,
  });

  return (
    <div className="App">
      <MillionaireForm
        millionaire1={millionaire1}
        setMillionaire1={setMillionaire1}
        millionaire2={millionaire2}
        setMillionaire2={setMillionaire2}
      />
    </div>
  );
}

export default App;

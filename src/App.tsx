import React, { useState } from "react";
import Camera from "./components/Camera";
import Display from "./components/Display";

function App() {
  const [roman, setRomanNum] = useState<string>("");
  const [result, setResult] = useState<number>();
  // Decides if user clicked on btn
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="App">
      <Camera
        setRomanNum={setRomanNum}
        setResult={setResult}
        setClicked={setClicked}
      />
      {/* NOTE Shows us the result of tesseract.js */}
      <Display roman={roman} result={result} clicked={clicked} />
    </div>
  );
}

export default App;

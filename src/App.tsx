import React, { useState } from "react";
import Camera from "./components/Camera";
import Display from "./components/Display";

function App() {
  // Decides if the btn was clicked
  const [clicked, setClicked] = useState<boolean>(false);
  const [result, setResult] = useState<string | undefined>();
  // Decides if user clicked on btn

  /**
   * Sets the roman number
   * @param result Roman number
   */
  const changeResult = (result: string) => {
    setResult(result);
    console.log("Changed the result!");
  };

  const changeClick = () => {
    setClicked(true);
  };

  return (
    <div className="App">
      {/* NOTE Takes the picture and sends it to tesseract.js */}
      <Camera changeClick={changeClick} changeResult={changeResult} />
      {/* NOTE Shows us the result of tesseract.js */}
      <Display result={result} clicked={clicked} />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Display from "./components/Display";
import Input from "./components/Input";

function App() {
  const [roman, setRomanNum] = useState<string>("");
  const [result, setResult] = useState<number>();

  return (
    <div className="App">
      <Input setRomanNum={setRomanNum} setResult={setResult} />
      <Display roman={roman} result={result} />
    </div>
  );
}

export default App;

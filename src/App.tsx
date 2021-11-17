import React, { useState } from "react";
import Display from "./components/Display";
import Input from "./components/Input";

function App() {
  const [roman, setRomanNum] = useState<string>("");

  return (
    <div className="App">
      <Input setRomanNum={setRomanNum} />
      <Display roman={roman} />
    </div>
  );
}

export default App;

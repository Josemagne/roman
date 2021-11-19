import React, { useState } from "react";
import Camera from "./Camera";

const Input = (setRomanNum: any, setResult: any) => {
  return (
    <div className="input">
      <Camera setRomanNum={setRomanNum} setResult={setResult} />
    </div>
  );
};

export default Input;

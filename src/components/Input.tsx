import React, { useState } from "react";
import Camera from "./Camera";

const Input = (setRomanNum: any) => {
  return (
    <div className="input">
      <Camera setRoman={setRomanNum} />
    </div>
  );
};

export default Input;

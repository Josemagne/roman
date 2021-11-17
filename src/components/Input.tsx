import React, { useState } from "react";
import Camera from "./Camera";

interface Props {}

const Input = (props: Props) => {
  const [romans, setRomans] = useState("");

  return (
    <div className="input">
      <Camera />
    </div>
  );
};

export default Input;

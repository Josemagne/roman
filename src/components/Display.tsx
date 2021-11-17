import React, { useState } from "react";
import romanToInt from "../utils/convertRomanToInteger";

interface Props {
  roman: string;
}

const Display = ({ roman }: Props) => {
  const [result, setResult] = useState<number>();
  const convert = () => {
    setResult(romanToInt(roman));
  };
  return (
    <div className="display">
      <div className="display__content">
        <p>Hier ist die römische Nummer:</p>
        <p>{roman}</p>
      </div>
    </div>
  );
};

export default Display;

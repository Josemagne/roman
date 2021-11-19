import React, { useState } from "react";
import romanToInt from "../utils/convertRomanToInteger";

interface Props {
  roman: string;
  result: number;
}

const Display = ({ roman, result }: Props) => {
  const [number, setNumber] = useState<number>();
  const convert = () => {
    setNumber(romanToInt(roman));
  };
  return (
    <div className="display">
      <div className="display__content">
        <p>Hier ist die römische Nummer:</p>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Display;

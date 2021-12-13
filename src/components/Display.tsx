import React, { useState } from "react";
import romanToInt from "../utils/convertRomanToInteger";

interface Props {
  roman: string;
  result: number | undefined;
  clicked: boolean;
}

const Display = ({ roman, result, clicked }: Props) => {
  const [number, setNumber] = useState<number>();
  const convert = () => {
    setNumber(romanToInt(roman));
  };
  return (
    <div className="display">
      <div className="display__content">
        <div>
          <p>Hier die römische Nummer:</p>
          {clicked ? (
            number ? (
              <div className="card" style={{ width: "100px" }}>
                <div className="card-body">
                  <div className="card-text">{number}</div>
                </div>
              </div>
            ) : (
              <div className="spinner-border">
                <span></span>
              </div>
            )
          ) : (
            <div className="card" style={{ width: "100px" }}>
              <div className="card-body">
                <div className="card-text"></div>
              </div>
            </div>
          )}
        </div>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Display;

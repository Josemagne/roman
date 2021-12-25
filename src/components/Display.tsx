import React, { useState, useEffect } from "react";
import romanToInt from "../utils/convertRomanToInteger";
import lssv from "lssv";
import { Spinner } from "react-bootstrap";

interface Props {
  result: string | undefined;
  clicked: boolean;
}

const Display = ({ result: roman, clicked }: Props) => {
  const [number, setNumber] = useState<number>();

  const convert = () => {
    if (roman) {
      setNumber(romanToInt(roman));
    }
  };

  useEffect(() => {
    if (roman) {
      convert();
      console.log("Got number!");
    }
  }, [roman]);

  return (
    <div className="display">
      <div className="display__content">
        <div>
          <p>Hier die römische Nummer:</p>
          {clicked ? (
            number ? (
              <div className="card display__number" style={{ width: "100px" }}>
                <div className="card-body">
                  <div className="card-text">{number}</div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ width: "100px" }}>
                <div className="card-body">
                  <div className="card-text">
                    {/* Spinner */}
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden"></span>
                    </Spinner>
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default Display;

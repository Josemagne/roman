import React, { useEffect, useRef, useState } from "react";
import recognizeRoman from "../utils/recognizeRoman";
import evaluatePicture from "../utils/evaluatePicture";

const Camera = (
  setRomanNum: any,
  setResult: any,
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const cameraRef = useRef<null>(null);
  const canvasRef = useRef(null);

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [stream, setStream] = useState<MediaStream>();
  const [takingPicture, setTakingPicture] = useState(false);
  const [photo, setPhoto] = useState();

  // Defines if the "take picture btn was pressed"
  const [takenPicture, setTakenPicture] = useState(false);

  useEffect(() => {
    // TODO let user decide when he is ready to add books
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: "environment" } },
        audio: false,
      })
      .then((stream) => {
        setStream(stream);

        cameraRef.current.srcObject = stream;

        cameraRef.current.play();
      })
      .catch((err) => {
        console.log(err);
      });

    // set the camera viewPort
    setWidth(document.body.clientWidth);
    setHeight(document.body.clientHeight);
  }, []);

  const takePicture = () => {
    const context = canvasRef.current.getContext("2d");

    context.drawImage(cameraRef.current, 0, 0, width, height);
    const data = canvasRef.current.toDataURL("image/png");
    setPhoto(data);

    const roman = recognizeRoman(photo).then((roman) => {
      // TODO Change that
      //   const number = evaluatePicture(roman);

      console.log(roman);

      if (roman) {
        setResult(roman);
      } else {
        //   Throw err
        throw new Error("tesseract.js returned something wrong");
      }
    });
  };

  return (
    <div className="input">
      <div className="camera">
        <div className="cameraViewport">
          {/* Box where the ISBN should be overlayed */}
          <div className="isbnHolder"></div>

          <video
            className="videoHolder"
            ref={cameraRef}
            onCanPlay={function (e) {
              e.currentTarget.width = 400;
            }}
          ></video>
          {/* Takes picture */}
          <button
            className="takeISBN"
            onClick={(e) => {
              e.preventDefault();
              setClicked(true);
              takePicture();
            }}
          >
            ISBN aufnehmen
          </button>
        </div>

        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Camera;

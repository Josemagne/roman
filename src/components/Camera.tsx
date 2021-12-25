import React, { useEffect, useRef, useState } from "react";
import recognizeRoman from "../utils/recognizeRoman";
import evaluatePicture from "../utils/evaluatePicture";
import lssv from "lssv";

interface Props {
  changeClick: () => void;
  changeResult: (result: string) => void;
}

const Camera = ({ changeClick, changeResult }: Props) => {
  const l = new lssv();

  const cameraRef = useRef<null>(null);
  const canvasRef = useRef(null);

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [stream, setStream] = useState<MediaStream>();
  const [takingPicture, setTakingPicture] = useState(false);
  const [photo, setPhoto] = useState();
  const [cameraStyle, setCameraStyle] = useState({
    opacity: 1,
  });

  // Defines if the "take picture btn was pressed"
  const [takenPicture, setTakenPicture] = useState(false);

  const hideCamera = () => {
    setCameraStyle((before) => {
      before.opacity = 0.1;
      return before;
    });
  };

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
      if (roman) {
        changeResult(roman);
      } else {
        //   Throw err
        throw new Error("tesseract.js returned something wrong");
      }
    });
  };

  return (
    <div className="input">
      <div className="camera" style={{}}>
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
              changeClick();
              takePicture();
              hideCamera();
            }}
          >
            Bild aufnehmen
          </button>
        </div>

        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Camera;

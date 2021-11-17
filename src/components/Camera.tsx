import React, { useEffect, useRef, useState } from "react";
import recognizeRoman from "../utils/recognizeRoman";

const Camera = (setRomanNum) => {
  const cameraRef = useRef(null);
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
    // setWidth(document.body.clientWidth);
    // setHeight(document.body.clientHeight);
  }, []);

  const takePicture = () => {
    const context = canvasRef.current.getContext("2d");

    context.drawImage(cameraRef.current, 0, 0, width, height);
    const data = canvasRef.current.toDataURL("image/png");
    setPhoto(data);

    const roman = recognizeRoman(photo).then((roman) => {
      setRomanNum(roman);
    });
  };

  return (
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
            takePicture();
          }}
        >
          ISBN aufnehmen
        </button>
      </div>

      <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default Camera;

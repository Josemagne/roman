import React, { useEffect, useRef, useState } from "react";
import recognizeRoman from "../utils/recognizeRoman";

interface Props {}

const Camera = (props: Props) => {
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [stream, setStream] = useState<MediaStream>();
  const [takingPicture, setTakingPicture] = useState(false);
  const [photo, setPhoto] = useState();
  const [roman, setRoman] = useState<string | void>();
  const [widths, setWidths] = useState();

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
    console.log(cameraRef.current);

    const context = canvasRef.current.getContext("2d");

    context.drawImage(cameraRef.current, 0, 0, width, height);
    const data = canvasRef.current.toDataURL("image/png");
    setPhoto(data);

    const isbn = recognizeRoman(photo).then((roman) => {
      setRoman(roman);
    });
  };

  return (
    <div className="camera">
      <div className="cameraViewport" style={{ height: 500, width: 400 }}>
        {/* Box where the ISBN should be overlayed */}
        <div
          className="isbnHolder"
          style={{
            position: "absolute",
            borderWidth: 6,
          }}
        ></div>

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
          style={{
            position: "absolute",
            zIndex: 3,
            color: "red",
            border: "none",
            top: "90%",
            left: "50%",
          }}
        >
          ISBN aufnehmen
        </button>
      </div>

      <canvas className="canvas" ref={canvasRef}></canvas>

      {/* TODO rm this when finished */}
      <p>{roman ? roman : null}</p>
    </div>
  );
};

export default Camera;

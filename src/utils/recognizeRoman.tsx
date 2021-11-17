import Tesseract, { createWorker } from "tesseract.js";

/**
 * Util function that uses tesseract.js to get the text of an image
 * @param image The image from Input.tsx
 * @returns The roman number as string
 */
const recognizeRoman = (image: any) => {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });

  const getText = async (image: any) => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(image);
    await worker.terminate();
    return text;
  };

  const text = getText(image);

  return text;
};

export default recognizeRoman;

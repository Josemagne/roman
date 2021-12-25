import { createWorker } from "tesseract.js";

/**
 * Util function that uses tesseract.js to get the text of an image
 * @param image The image from Input.tsx
 * @returns The roman number as string
 */
const recognizeRoman = (image: any): Promise<string> => {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });

  const getText = async (image: any) => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
      //   TODO change that
    } = await worker.recognize(image);
    await worker.terminate();
    return text;
  };

  const text = getText(image);

  return text;
};

export default recognizeRoman;

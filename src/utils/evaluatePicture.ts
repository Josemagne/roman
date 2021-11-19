/**
 * Gets rid of all the characters that are not numbers 
 * @param result That what tesseract.js got from the picture
 */
const evaluatePicture = (result: string) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Counts how many nonnumbers are in the string
    let nonNumbers = 0;
    let finalResult = [];
    for (let i = 0; i < result.length; i++) {
        if (numbers.includes(Number(result[i]))) {
            finalResult.push(Number(result[i]));
        } else {
            nonNumbers++;
        }
    }

    return finalResult.join('');
}

export default evaluatePicture;
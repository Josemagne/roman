/**
 * Gets rid of all the characters that are not numbers 
 * @param result That what tesseract.js got from the picture
 */
const evaluatePicture = (result: string) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let finalResult = [];
    for (let i = 0; i < result.length; i++) {
        if (numbers.includes(Number(result[i]))) {
            // Add the number to finalResult
            finalResult.push(Number(result[i]));
        }
    }

    return finalResult.join('');
}

export default evaluatePicture;
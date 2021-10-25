import { decimals, romans } from "./data";
/**
 *  Converts roman number to an integer 
 * @param s Roman number
 */
class ConvertRomanToInteger {
    romanNumber: string;
    constructor(s: string) {
        this.romanNumber = s;

    }

    const isRomanNumber = (): boolean => {
        for (let i = 0; i < this.romanNumber.length; i++) {
            if (!romans.includes(this.romanNumber[i])) return false;

        }
        return true;
    }
}

export default ConvertRomanToInteger;
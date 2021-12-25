
const romans = ["I", "V", "X", "L", "C", "D", "M"];
const integers = [1, 5, 10, 50, 100, 500, 1000];

// ANCHOR romanToInt()
const romanToInt = (s: string) => {



    let integers = convertRomanToInteger(s);
    console.log("bfore:  ", integers)
    // Remove undefineds
    integers = removeUndefined(integers);

    console.log("integers: ", integers);

    let polished = testFor3i(integers)
    console.log("polished1: ", polished);

    polished = ixcBeforevld(polished);

    console.log("polished2: ", polished);
    let biggestIndex = getBiggestNumberIndex(polished);
    console.log("biggestIndex: ", biggestIndex);

    polished = resolve(polished);
    biggestIndex = getBiggestNumberIndex(polished);
    let result = calculate(polished, biggestIndex);

    console.log("result: ", result);

    return result;
}

const removeUndefined = (arr: number[]): number[] => {
    // Arr that we return
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            result.push(arr[i])
        }
    }

    return result;
}

// ANCHOR calculate()
const calculate = (numbers: number[], biggestNumberIndex: number) => {
    console.log("calculate numbers:", numbers);

    let result: number;

    // if biggestNumberIndex is null then it stays 0
    if (biggestNumberIndex === 0) {
        result = numbers[0];
    } else {
        result = numbers[numbers.length - 1];
    }


    // biggestNumberIndex is at the beginning
    if (biggestNumberIndex === 0) {
        for (let i = 1; i < numbers.length; i++) {
            result += numbers[i];
        }

        return result;
    }

    // biggestNumberIndex is at the end
    else if (biggestNumberIndex === numbers.length - 1) {

        for (let i = numbers.length - 2; i >= 0; i--) {
            console.log("i: ", i);

            console.log("numbers: ", numbers[i]);

            if (numbers[i] === numbers[biggestNumberIndex]) {

                result += numbers[i];
            } else if (numbers[i] < numbers[biggestNumberIndex]) {
                result -= numbers[i];
            }
        }

        return result;
    }

    // biggestNumberIndex is in between
    // else {
    //     let copy = [...numbers];
    //     let polished = 0;
    //     if (copy[biggestNumberIndex - 1] < copy[biggestNumberIndex]) {
    //         polished -= copy[biggestNumberIndex - 1];
    //         copy.splice(biggestNumberIndex, 1);
    //     }
    //     // TODO here
    //     else if (copy[biggestNumberIndex -1] === copy)
    // }

    else {
        return numbers.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        })
    }


}

const convertRomanToInteger = (s: string) => {

    let result = [];

    for (let i = 0; i < s.length; i++) {

        result.push(integers[romans.indexOf(s[i])]);

    }
    return result;
}


// ANCHOR getBiggestNumberIndex()
const getBiggestNumberIndex = (integers: number[]): number => {
    let uneven = integers.length % 2 !== 0;

    if (integers.length === 1) {
        return 0;
    }

    if (uneven) {
        integers.push(0);
    }

    let biggestIndex = 0;


    for (let i = 1; i < integers.length; i++) {
        if (integers[i] >= integers[biggestIndex]) biggestIndex = i;
    }

    if (uneven) integers.pop();

    return biggestIndex;
}


// ANCHOR ixcBeforevld()
const ixcBeforevld = (numbers: number[]) => {
    /**
     * Polished array
     */
    let result = [];
    const exceptionBefore = [1, 10, 100];
    const exceptionAfter = [5, 50, 500];

    for (let i = 0; i < numbers.length; i++) {

        if (exceptionBefore.includes(numbers[i]) && numbers[i] < numbers[i + 1] && exceptionAfter.includes(numbers[i + 1])) {
            result.push(numbers[i + 1] - numbers[i]);
            i++;
        } else {
            result.push(numbers[i]);
        }

    }

    return result;
}


// ANCHOR testFor3i()
const testFor3i = (numbers: number[]) => {
    let polished: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === 1) {
            if (numbers[i + 1] === 1 && numbers[i + 2] === 1) {
                polished.push(3);
                i += 2;
            } else if (numbers[i + 1] === 1 && numbers[i + 2] !== 1) {
                polished.push(2);
                i += 1;
            }
            else {
                polished.push(numbers[i]);
            }

        }
        else {
            polished.push(numbers[i]);
        }
    }

    return polished;
}

// ANCHOR resolve()
/**
 * Resolves minus rules 
 * @param numbers Array of numbers to resolve
 */
const resolve = (numbers: number[]): number[] => {

    let resolved = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < numbers[i + 1]) {
            resolved.push(numbers[i + 1] - numbers[i]);
            i++;
        }
        else {
            resolved.push(numbers[i]);
        }
    }

    return resolved;
}

export default romanToInt;
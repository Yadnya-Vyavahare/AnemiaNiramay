export const transformNumber = (number) => {
    // Convert the number to a string for easy manipulation
    const numberString = String(number);
 
    // Extract the three groups of four digits
    const firstFour = replaceDigitsWithAlphabets(numberString.substring(0, 4));
    const middleFour = replaceDigitsWithAlphabets(numberString.substring(4, 8));
    const lastFour = replaceDigitsWithAlphabets(numberString.substring(8));
 
    // Build the transformed string
    const transformedOutput = firstFour + lastFour + middleFour;
 
    return transformedOutput;
  };
 
  const replaceDigitsWithAlphabets = (digits) => {
    // Replace each digit with its corresponding alphabet
    let replacedDigits = '';
    for (let i = 0; i < digits.length; i++) {
      const digit = digits.charAt(i);
      const replacement = String.fromCharCode('a'.charCodeAt(0) + parseInt(digit, 10));
      replacedDigits += replacement;
    }
 
    return replacedDigits;
  };
 
  export const reverseTransform = (transformedOutput) => {
    // Reverse the transformation logic
    const firstFour = replaceAlphabetsWithDigits(transformedOutput.substring(0, 4));
    const middleFour = replaceAlphabetsWithDigits(transformedOutput.substring(8));
    const lastFour = replaceAlphabetsWithDigits(transformedOutput.substring(4, 8));
 
    // Build the reversed string
    const reversedOutput = firstFour + middleFour + lastFour;
 
    return parseInt(reversedOutput, 10);
  };
 
  const replaceAlphabetsWithDigits = (alphabets) => {
    // Replace each alphabet with its corresponding digit
    let replacedDigits = '';
    for (let i = 0; i < alphabets.length; i++) {
      const alphabet = alphabets.charAt(i);
      const replacement = String.fromCharCode('0'.charCodeAt(0) + (alphabet.charCodeAt(0) - 'a'.charCodeAt(0)));
      replacedDigits += replacement;
    }
 
    return replacedDigits;
  };
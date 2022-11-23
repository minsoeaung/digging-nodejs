import {randomInt} from "crypto";

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const CHARS_LENGTH = CHARS.length;

const getRandomThreeLetters = () => {
    let result = ''
    // this gist suggests not to use Math.random for secure random numbers
    // https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba
    for (let i = 0; i < 3; i++)
        result += CHARS.charAt(Math.floor(Math.random() * CHARS_LENGTH));
    return result;
}

const getRandomThreeLettersUsingCrypto = () => {
    const min = 0; // inclusive
    const max = 1000;  // exclusive
    const threeNum = randomInt(min, max).toString().padStart(3, '0');
    return CHARS[threeNum[0]] + CHARS[threeNum[1]] + CHARS[threeNum[2]]
}

const ms = Date.now();
const mathRandom = ms + getRandomThreeLetters();
const withCrypto = ms + getRandomThreeLettersUsingCrypto();

console.log('with Math.random:', mathRandom);
console.log('with randomInt: ', withCrypto)

// console.log("Hello world!");
// let a = 5; //number
// a = "hello"; //string
// a = false; //boolean
// let a  = 5 + "5";
// console.log(a, typeof a);
// a = a - 5;
// console.log(a, typeof a);
// a = "abc";
// a /= 2;
// console.log(a, typeof a);
// a = "123";
// // a -= 0;
// a = +a;
// console.log(a, typeof a);
// if(a = 1){
//     console.log("a is true");
// }
// console.log(a, typeof a);
// let a = 1;
// let b = 3;
// let c = 2;
// if(a < b < c){
//     console.log("a < b < c is true")
// }
// let a = new Number(3);
// console.log(a + 5, typeof a)
// let a = 0.3456789;
// console.log(a, typeof a);
// a = a.toFixed(2);
// console.log(a, typeof a);

// Math.trunc, Math.round, 

// console.log(("A" + +"A" + "AS").toLowerCase());      // как написать слово ananas*

function myToStringInt(number, radix){   
    const sign = number < 0 ? '-' : '';
    number = Math.abs(number);
    number = Math.round(number);
    if(radix < 2 || radix > 36){
        radix = 10;
    }
    let result = '';
    do{
        result = getSymbol(number, radix) + result;
        number = Math.trunc(number/radix);
    }while(number != 0);
    return sign + result;
}
function getSymbol(number, radix){
    const aCode = 'a'.charCodeAt(0);
    const delta = aCode - 10;
    const remainder = number % radix;
    return remainder < 10 ? remainder + '' : String.fromCharCode(remainder + delta);
}

// console.log(myToStringInt(123456789, 36));
// console.log(myToStringInt(-123456789, 36));
// console.log(myToStringInt(-123456789.1234, 36));
// console.log(myToStringInt(0, 36));

const strNum = '0xff';
let radix;
console.log(`string with number ${strNum} for redix ${radix} is ${parseInt(strNum, radix)}`);

function myParseInt(strNum, radix){
    strNum = strNum.trim();
    let index = strNum.charAt(0) == '-' || strNum.charAt(0) == '+' ? 1 : 0;

    if((!radix || radix == 16) && getHexdecemalIndex(strNum.substring(index)) > 0){
        index += 2;
        radix = 16;
    }

    if(!radix){
        radix = 10;
    }

    let result = radix > 1 && radix < 37 ? getDigitCode(strNum, index, radix) : NaN;
    if(!isNaN(result)){
        let digit;
        index++;
        while(index < strNum.length && !isNaN(digit = getDigitCode(strNum, index, radix))){
            result = result * radix + digit;
            index++;
        }
        if(strNum[0] == '-'){
            result = -result;
        }
    }
    return result;
}

function getHexdecemalIndex(str){
    return str.toLowerCase().startsWith('0x') ? 2 : 0;
}

function getDigitCode(strNum, index, radix){
    const delta = 'a'.charCodeAt(0) - 10;
    const symbol = strNum.charAt(index).toLowerCase();
    const code = symbol >= '0' && symbol <= '9' ? +symbol : symbol.charCodeAt(0) - delta;
    return code >= 0 && code < radix  ? code : NaN;
}


console.log(`string with number ${strNum} for redix ${radix} is ${myParseInt(strNum, radix)}`);

// --------------------------------------------------------------------------------------//


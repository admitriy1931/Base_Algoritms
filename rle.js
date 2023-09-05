let fs = require('fs');
let arg = process.argv;
let fileExist = fs.existsSync(process.argv[3], 'utf8'); 
if (fileExist==false){
	console.log('File is not exist');
	return;
}
let arg3 = process.argv[3].toString();
let inText;
inText = fs.readFileSync(arg3);
inText = inText.toString();

if (process.argv[4] === undefined){
    console.log('err');
    return;
}
if (process.argv[2] == 'code')
    code(inText);
else if (process.argv[2] == 'decode')
    decode(inText);


function code (inText)
{
    let i = 0, n = 1  //начало, длинна цепочки
    let arg4 = process.argv[4].toString();
    let resStr = '';
    if (inText==''){
        console.log('Error');
        return;
    }
    while (i < inText.length){
        while(inText.charAt(i) == inText.charAt(i+n)){
            n++;
        }
        nJump = n;
        while( n >= 127){
            resStr += '#' + String.fromCharCode(127) + inText.charAt(i);
            n -= 127;
        }
        if ((n > 3) || (inText.charAt(i) == '#')){
            resStr += '#' + String.fromCharCode(n) + inText.charAt(i)
        }
        else{
            for(k = 0; k < n; k++){
                resStr += inText.charAt(i);
           }
        }
        resStr += inText.charAt(i);
        i += nJump;
        n = 1;
}
fs.writeFileSync(arg4, resStr);
}
function decode(inText)
{
    let arg4_1 = process.argv[4].toString();
    let decodedStr = '';
	let i = 0;
    let j = 0;
    if (inText==''){
        console.log('Error');
        return;
    }
    while (i < inText.length) {
    if (inText.charAt(i)=='#') {
        for (j = 0; j < inText.charCodeAt(i+1); j++){
            decodedStr+=inText.charAt(i+2)
        }
        i+=3;
    }
    else{
        decodedStr+=inText.charAt(i);
        i++;
    }
}
fs.writeFileSync(arg4_1, decodedStr);
console.log(decodedStr);
}

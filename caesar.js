let fs = require('fs');
let arg = process.argv;
let fileExist = fs.existsSync(process.argv[3], 'utf8'); 
if (fileExist==false){
	console.log('File is not exist');
	return;
}
let arg3 = process.argv[3].toString();
input = fs.readFileSync(arg3);
input = input.toString();
input = input.toLowerCase();
if (process.argv[2] === 'code' && process.argv[3] === arg3 && process.argv[4]!= undefined && process.argv[5]!= NaN){
    code(input);
}else if (process.argv[2] == 'decode' && process.argv[3] === arg3 && process.argv[4]!=undefined){
    decode(input);
}else{
    console.log("Error");
}
function code (input){
    let out = process.argv[4].toString();
    let key = process.argv[5];
    if (!parseInt(key)){
        console.log("Введите число");
    }
    if (input === ''){
        console.log("Error");
    }
    key = Number.parseInt(key);
    let alp = "abcdefghigklmnopqrstuvwxyz";
    let codeText ='';
    let codeIndex;
    for (let i = 0; i < input.length; i++){
        let c = input[i];
        let index = alp.indexOf(c, 0);
        if (index < 0){
            codeText+=c.toString();
        }
        else{
            codeIndex = (alp.length + index + key) % alp.length;
            codeText+=alp[codeIndex];
        }
    }
    console.log(codeText);
    fs.writeFileSync(out, codeText);
}


function decode (input){
    let resArg = process.argv[4].toString();
    if (input.length === 0){
        console.log("Error");
    }
    let res = '';
    let alp = "abcdefghigklmnopqrstuvwxyz";
    let canonical = [7.96, 1.60, 2.84, 4.01, 12.86, 2.62, 1.99, 5.39, 7.77, 0.16, 0.41, 3.51, 2.43, 7.51, 6.62, 1.81, 0.17, 6.83, 6.62, 9.72, 2.48, 1.15, 1.80, 0.17, 1.52, 0.05];
    let fact = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < input.length; i++){
        let ind = alp.indexOf(input[i])
        if (ind < 0){
            continue;
        }else{
            fact[ind]++;
        }
    }
    let a = 0; //сумма встречаемости всех букв
    for ( i = 0; i < 26; i ++){
        a+= fact[i];
    }

    for ( i =0; i < 26; i++){
        fact[i]=(fact[i]/a)*100;
        fact[i] = fact[i].toFixed(2);
    }
    let cdv = 0;
    let minSum = Number.MAX_VALUE;
    let newKey = 0;
    for (let k = 0; k < 26; k++){
        for (let j =0; j < 26; j++){
            cdv+= Math.pow(canonical[j] - fact[(j + k) % 26], 2);
        }
        if (cdv < minSum){
            minSum = cdv;
            newKey = k;
        }
        cdv = 0;
    }
    console.log(newKey);

    let cInd = 0;
    for (let i = 0; i < input.length; i++){
        let h = input[i];
        let index = alp.indexOf(h, 0);
        if (index < 0){
            res+=h.toString();
        }else{
            cInd = (26 + index - newKey)%26;
            res+=alp[cInd];
        }
    }
    console.log(res);
    fs.writeFileSync(resArg, res);
}

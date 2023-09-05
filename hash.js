const fs = require("fs");
var key = 2;
var keys = [];
var N = -1;
while (key < 6)
{
    if (process.argv[key][0] === '-')
    {
        keys.push(process.argv[key]);

        if (process.argv[key][1] === 'n')
        {
            key += 1;
            N = process.argv[key];
        }

    } else {
        break;
    };
    key += 1;
}

let mode = process.argv[key];
let fileExist = fs.existsSync(process.argv[key+1], 'utf8'); 
if (fileExist==false){
	console.log('File is not exist');
	return;
}
let file2Exist = fs.existsSync(process.argv[key+2], 'utf8'); 
if (file2Exist==false){
	console.log('File is not exist');
	return;
}
let str = process.argv[key + 1];

let substr = process.argv[key + 2];

var string = fs.readFileSync(str, "utf8");
var substring = fs.readFileSync(substr, "utf8");

if (mode === 'b')
    bruteForce();
if (mode === 'h1')
    codeSum();
if (mode === 'h2')
    codeSqrSum();
if (mode === 'h3')
    rabinCarp();

function printResult(result)
{
    if (result.length == 0)
    {
        console.log('Substring not found');
    } else {
        console.log('Position: ' + result);
    }
}

//BruteForce
function bruteForce ()
{
    console.log('Brute forse');
    var result = [];
    var res = [];
    var start = (new Date()).getTime();
    for (var i = 0; i <= string.length - substring.length; i++) 
    {
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                if ((N === -1) || (result.length < N)){
                    result.push(i);
                    break;  
                }
                else{
                    printResult(result);
					return;
                }
            }
        }
    }
    var end = (new Date()).getTime();

    printResult(result);

    if (keys.indexOf('-t') != -1)
        console.log('time of working: ' + (end - start) + ' milliseconds');
}
function calculateHashRC(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
    {
        var charCode = string.charCodeAt(i)
        hash = hash + charCode * (1 << (string.length - i));
    }
    return hash;
}

function rabinCarp ()
{
    console.log('Rabin-Carp');
    var result = [];
    var substringHash = calculateHashRC(substring);
    var stringHash = calculateHashRC(string.slice(0, substring.length));
    var start = (new Date()).getTime();
    var collisionCount = 0;
    var fl = 0;

    for (var i = 0; i <= string.length - substring.length; i++) 
    {
        if (substringHash === stringHash) 
        {
            fl = 1;
            for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
            {
                if (j === substring.length - 1) 
                {
                    if ((N === -1) || (result.length < N)){
                        result.push(i);
                        break;  
                    }
                    else{
                        printResult(result);
                        return;
                    }
                }
            }
            if (fl === 1)
            {
                collisionCount++;
                fl = 0;
            }
        }
        stringHash -= string.charCodeAt(i) * Math.pow(2, substring.length);
        stringHash = stringHash  * 2 + string.charCodeAt(i + substring.length) * 2;
    }

    collisionCount -= result.length; 
    var end = (new Date()).getTime();

    printResult(result);

    if (keys.indexOf('-c') != -1)
        console.log('Collisions: ' + collisionCount);
    if (keys.indexOf('-t') != -1)
        console.log('time of working: ' + (end - start) + ' milliseconds');
}

//Code sum
function calculateHashSum(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i);
    return hash;
}

function codeSum()
{
    console.log('Sum of code');
    var result = [];
    var substringHash = calculateHashSum(substring);
    var stringHash = calculateHashSum(string.substr(0, substring.length));
    var start = (new Date()).getTime();
    var collisionCount = 0;
    var fl = 0;

    for (var i = 0; i <= string.length - substring.length; i++) 
    {
        if (substringHash == stringHash) 
        {
            fl = 1;
            for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
            {
                if (j == substring.length - 1) 
                {
                    if ((N === -1) || (result.length < N)){
                        result.push(i);
                        break;  
                    }
                    else{
                        printResult(result);
                        return;
                    }
                }
            }
            if (fl == 1)
            {
                collisionCount++;
                fl = 0;
            }
        }
        stringHash = stringHash - string.charCodeAt(i) + string.charCodeAt(i + substring.length);
    }

    collisionCount -= result.length; 
    var end = (new Date()).getTime();

    printResult(result);


    if (keys.indexOf('-c') != -1)
        console.log('Collisions: ' + collisionCount);

    if (keys.indexOf('-t') != -1)
        console.log('time of working: ' + (end - start) + ' milliseconds');
}

//Code sqr sum
function calculateHashSQR(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += (Math.pow(string.charCodeAt(i), 2));
    return hash;
}

function codeSqrSum()
{
    console.log('Sum of code square');
    var result = [];
    var substringHash = calculateHashSQR(substring);
    var stringHash = calculateHashSQR(string.substr(0, substring.length));
    var start = (new Date()).getTime();
    var collisionCount = 0;
    var fl = 0;

    for (var i = 0; i <= string.length - substring.length; i++) 
    {
        if (substringHash == stringHash) 
        {
            fl = 1;
            for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
            {
                if (j == substring.length - 1) 
                {
                    if ((N === -1) || (result.length < N)){
                        result.push(i);
                        break;  
                    }
                    else{
                        printResult(result);
                        return;
                    }
                }
            }
            if (fl == 1)
            {
                collisionCount++;
                fl = 0;
            }
        }
        stringHash = stringHash - Math.pow(string.charCodeAt(i), 2) + Math.pow(string.charCodeAt(i + substring.length), 2);
    }

    collisionCount -= result.length; 
    var end = (new Date()).getTime();

    printResult(result);

    if (keys.indexOf('-c') != -1)
        console.log('Collisions: ' + collisionCount);
    if (keys.indexOf('-t') != -1)
        console.log('time of working: ' + (end - start) + ' milliseconds');
}
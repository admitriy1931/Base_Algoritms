const fs = require("fs");
var key = 2;
var keys = [];
var N = -1;
var automat_table = [[]];
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
        //если поступил не ключ, то считывание ключей необходимо прекратить
        break;
    };
    //"переключаемся" на следующий параметр
    key += 1;
}
let fileExist = fs.existsSync(process.argv[key], 'utf8'); 
if (fileExist==false){
	console.log('File is not exist');
	return;
}
let file2Exist = fs.existsSync(process.argv[key+1], 'utf8'); 
if (file2Exist==false){
	console.log('File is not exist');
	return;
}
let str = process.argv[key];
let substr = process.argv[key + 1];

var string = fs.readFileSync(str, "utf8");
var substring = fs.readFileSync(substr, "utf8");

Automat();

function printResult(result)
{
    var res = []
    //проверяем есть ли вхождения
    if (result.length == 0)
    {
        console.log('Substring not found');
    } else {
        //выполняем условия вывода результата
        if ((N === -1) || (result.length <= N))
            console.log('Position: ' + result);
        else {
            for (var i = 0; i < N; i++)
            {
                res.push(result[i]);
            }
            console.log('Position: ' + res);
        }
    }
}

function Automat()
{
    var start = (new Date()).getTime();
    //создаем алфавит
    var alphabet = new Array();
    for (var i = 0; i < substring.length; i++)
    {
        alphabet[substring.charAt(i)] = 0;
    }

    //заполняем шапку таблицы автомата, которую выведем в консоль 
    automat_table[0][0] = " ";
    count = 1;
    for (var i in alphabet)
    {
        automat_table[0][count] = i;
        count += 1;
    }
    automat_table[0].push("*");
    alphabet['*'] = 0;


    var transitionTable = new Array(substring.length + 1);

    for (var j = 0; j <= substring.length; j++)
        transitionTable[j] = new Array();
    for(var i in alphabet)
        transitionTable[0][i] = 0;

    for (var j = 0; j < substring.length; j++)
    {
        prev = transitionTable[j][substring.charAt(j)];
        transitionTable[j][substring.charAt(j)] = j + 1;
        for (var i in alphabet)
            transitionTable[j+1][i] = transitionTable[prev][i];
    }

    var out = '';
    for (var i in automat_table[0])
        out += automat_table[0][i] + ' ';
    if (keys.indexOf('-a') != -1)
        console.log(out);
    for (var j = 0; j <= substring.length; j++)
    {
        var out = '';
        for (var i in alphabet)
            out += transitionTable[j][i] + ' ';

        if (keys.indexOf('-a') != -1)
            console.log(j + ' ' + out);
    }
    var result = [];
    var status = 0;

    for (var i = 0; i < string.length; i++)
    {
        if (!transitionTable[status][string.charAt(i)])
            transitionTable[status][string.charAt(i)] = 0;
        status = transitionTable[status][string.charAt(i)];
        if (status === substring.length){
            if ((N === -1) || (result.length < N)){
                result.push(i - substring.length + 1);
            }
            else{
                printResult(result);
                return;
            }
        }
    }

    printResult(result);

    var end = (new Date()).getTime();
    if (keys.indexOf('-t') != -1)
        console.log('time of working: ' + (end - start) + ' milliseconds');
}

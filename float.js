if (process.argv[2] === undefined){
	console.log("Error");
	return;
}
function toBIN( num ) {

    var result = (num).toString(2);
    return result;
}

function getScientificNotation( str ) {     // + представление числа
	array = str.split('.');
	n = array[0].length;
	if (array.length < 2)
		array.push('0');

	//step нужен для подсчета степени двойки в научной нотации числа
	var step = 0
	while (n != 1)
	{
		n -= 1;
		step += 1;
	}
	if (step > 0)
	{
		array[1] = array[0].slice(1) + array[1];
		array[1] = array[1].slice(0, 23);
		array[0] = '1';
	}
	//0.011 -> 1.1*2^-2 step = - 2
	if (array[0][0] === '0')
	{
		var i = 0;
		if (array.length > 1)
		{
			while (true)
			{
				if (array[1][i] ==='0')
				{
					step +=1;
				} else {
					break;
				}
				i += 1;
			}
		}

        step += 1;
        array[0] = '1';
        array[1] = array[1].slice(step, 23 + step);
        step = -step;
	}
	if (array[1].length < 23)
    {
       	while (array[1].length < 23)
       	{
       		array[1] += '0';
      	}
    }

	step += 127;
	eightBit = toBIN(step);
	while (eightBit.length < 8)
		eightBit = '0' + eightBit;
	array.push(eightBit);
	return array;
}

var fs = require('fs');
var number = process.argv[2];
var signFirst = "0";

var arrayOperation = number.split("+");
if (arrayOperation.length >= 2){
	var firstNumder = arrayOperation[0].split("-");
} else if (Number(number) !== Number(number)){
	//представление нечисла
	answer = signFirst + ' ' + '11111111 10000000000000000000000';
} else {
	//используем выделенный бит под знак
	if (number[0] === "-")
	{
		signFirst = "1";
		var numberWithoutMinus = number.substr(1);
	} else {
		var numberWithoutMinus = number;
	}
	//представление +- бесконечности
	if (Number(numberWithoutMinus) >= (2 - Math.pow(2, -23)) * Math.pow(2, 127))
	{
		answer = signFirst + ' ' + '11111111 00000000000000000000000';
	}else if (numberWithoutMinus === '0')
	//предсталение +- 0
		answer = signFirst + ' ' + '00000000 00000000000000000000000'
	else {
		result = toBIN(Number(numberWithoutMinus));
		var array8and23bit = getScientificNotation(result)

		answer = signFirst + ' ' + array8and23bit[2] + ' ' + array8and23bit[1];
	}

}
console.log('float: ' + answer);


const fs = require("fs");
var key = 2;
var keys = [];
var N = -1;
var automat_table = [[]];
while (key < 5)
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

BauerMur();

function BauerMur()
{
	var start = (new Date()).getTime();

	var result = []; 
	var entry = []; 
	var count = 0;
	for(var k = 0; k < substring.length; k++) 
	{ 
		entry[substring.charAt(k)] = k + 1;
	} 

	var i = substring.length - 1;
	while (i < string.length) 
	{ 
		if (entry[string.charAt(i)] == null) 
		{ 
			i+= substring.length; 
		} 
		else 
		{ 
			for (var j = 0; j < substring.length; ++j) 
			{
				//посимвольная проверка <--
				if (substring.charAt(substring.length - 1 - j) == string.charAt(i-j)) 
				{ 
					if (j == substring.length - 1) 
					{
						if ((N === -1) || (result.length < N)){
							result.push(i - j) 
						i+=1; 
						break; 
						}
						else{
							printResult(result);
							return;
						} 
					} 
				} 

				else 
				{ 
					i += Math.max(1, substring.length - entry[string.charAt(i)]); 
					break; 
				} 
			} 
		} 
	}

	printResult(result);

	var end = (new Date()).getTime();
    if (keys.indexOf('-t') != -1)
        console.log('time of working: ' + (end - start) + ' milliseconds');
}

function printResult(result)
{
    var res = []
    if (result.length == 0)
    {
        console.log('Substring not found');
    } else {   
        console.log('Position: ' + result);
    }
}
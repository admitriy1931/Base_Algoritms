let fs = require('fs');
let arg = process.argv;
let fileExist = fs.existsSync(process.argv[2], 'utf8'); 
if (fileExist==false){
	console.log('File is not exist');
	return;
}
if (process.argv.length < 3){
    console.log('Error');
}
let str;
str = fs.readFileSync(process.argv[2]);
str = str.toString();
str = str.split(" ");
if (str.length === 0){
    console.log('Введите выражение');
    return;
}
let res = '';
let stack = new Array();
for (i = 0; i < str.length; i++){
    if (str[i]!= "(" && str[i]!= ")" && str[i]!= "+" && str[i]!= "-" && str[i]!= "/" && str[i]!= "*" && str[i]!= "^"){
        res+=" "+str[i];
    }
    if (str[i]==="^" || str[i]==="+" || str[i]==="-" || str[i]==="/" || str[i]==="*"){
        if (stack.length === 0 || stack[stack.length-1] === "("){
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "+" || stack[stack.length-1] ==="-") && (str[i] === "*" || str[i] === "/" || str[i] === "^")){
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "*" || stack[stack.length-1] ==="/") && (str[i] === "^")){
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "^") && (str[i] === "^")){
            for (j = stack.length-1; j>=0; j--){
                if (stack[j] === "*" || stack[j] === "/" || stack[j] === "+" || stack[j] === "-" || stack[j] === "("){
                    break;
                }
                else{
                    res+=" "+stack[j];
                    stack = stack.slice(0, stack.length-1);
                }
            }
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "^") && (str[i] === "*" || str[i] === "/")){
            for (j = stack.length-1; j>=0; j--){
                if (stack[j] === "+" || stack[j] === "-" || stack[j] === "("){
                    break;
                }
                else{
                    res+=" "+stack[j];
                    stack = stack.slice(0, stack.length-1);
                }
            }
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "^") && (str[i] === "+" || str[i] === "-")){
            for (j = stack.length-1; j>=0; j--){
                if (stack[j] === "("){
                    break;
                }
                else{
                    res+=" "+stack[j];
                    stack = stack.slice(0, stack.length-1);
                }
            }
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "*" || stack[stack.length-1] === "/") && (str[i] === "*" || str[i] === "/")){
            for (j = stack.length-1; j>=0; j--){
                if (stack[j] === "+" || stack[j] === "-" || stack[j] === "("){
                    break;
                }
                else{
                    res+=" "+stack[j];
                    stack = stack.slice(0, stack.length-1);
                }
            }
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "*" || stack[stack.length-1] === "/") && (str[i] === "+" || str[i] === "-")){
            for (j = stack.length-1; j>=0; j--){
                if (stack[j] === "("){
                    break;
                }
                else{
                    res+=" "+stack[j];
                    stack = stack.slice(0, stack.length-1);
                }
            }
            stack.push(str[i]);
        }else if ((stack[stack.length-1] === "+" || stack[stack.length-1] === "-") && (str[i] === "+" || str[i] === "-")){
            for (j = stack.length-1; j>=0; j--){
                if (stack[j] === "("){
                    break;
                }
                else{
                    res+=" "+stack[j];
                    stack = stack.slice(0, stack.length-1);
                }
            }
            stack.push(str[i]);
        }
    }
    if (str[i] === "("){
        stack.push(str[i]);
    }
    if (str[i] === ")"){
        for (j = stack.length-1; j>=0; j--){
            if (stack[j] === "("){
                stack = stack.slice(0, j);
                break;    
            }
            else{
                res+=" "+stack[j];
                stack = stack.slice(0, j);
            }
        }
    }
}
for (j = stack.length-1; j>=0; j--){
    res+=" "+stack[j];
    stack = stack.slice(0, stack.length-1);
}
console.log("Обратная польская нотация:"+res);
res = res.split(" ");
let arr = new Array();
let a;
for (i = 0; i <  res.length; i++){
    if (res[i]!="+" && res[i]!= "-" && res[i]!="/" && res[i]!="*" && res[i]!="^"){
        arr.push(res[i]);
    }
    else{
        switch(res[i]){
            case '+':
                a = (arr[arr.length - 2])*1 + (arr[arr.length - 1])*1;
                arr[arr.length - 2] = a;
                arr = arr.slice(0, arr.length - 1);
                break;
            case '-':
                a = (arr[arr.length - 2])*1 - (arr[arr.length - 1])*1;
                arr[arr.length - 2] = a;
                arr = arr.slice(0, arr.length - 1);
                break;
            case '*':
                a = (arr[arr.length - 2])*1 * (arr[arr.length - 1])*1;
                arr[arr.length - 2] = a;
                arr = arr.slice(0, arr.length - 1);
                break;
            case '/':
                a = (arr[arr.length - 2])*1 / (arr[arr.length - 1])*1;
                arr[arr.length - 2] = a;
                arr = arr.slice(0, arr.length - 1);
                break;
            case '^':
                a = Math.pow((arr[arr.length - 2])*1, (arr[arr.length - 1])*1);
                arr[arr.length - 2] = a;
                arr = arr.slice(0, arr.length - 1);
                break;       
        }
    }
    
    /*
    if (res[i] === "+"){
        a = (arr[arr.length - 2])*1 + (arr[arr.length - 1])*1;
        arr[arr.length - 2] = a;
        arr = arr.slice(0, arr.length - 1);
    }
    if (res[i] === "-"){
        a = (arr[arr.length - 2])*1 - (arr[arr.length - 1])*1;
        arr[arr.length - 2] = a;
        arr = arr.slice(0, arr.length - 1);
    }
    if (res[i] === "*"){
        a = (arr[arr.length - 2])*1 * (arr[arr.length - 1])*1;
        arr[arr.length - 2] = a;
        arr = arr.slice(0, arr.length - 1);
    }
    if (res[i] === "/"){
        a = (arr[arr.length - 2])*1 / (arr[arr.length - 1])*1;
        arr[arr.length - 2] = a;
        arr = arr.slice(0, arr.length - 1);
    }
    if (res[i] === "^"){
        a = Math.pow((arr[arr.length - 2])*1, (arr[arr.length - 1])*1);
        arr[arr.length - 2] = a;
        arr = arr.slice(0, arr.length - 1);
    }*/
}
console.log("Значение выражения: "+arr[arr.length - 1]);


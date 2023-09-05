const fs = require("fs");
for (let k = 3; k < 6; k++){
    let fileExist = fs.existsSync(process.argv[k], 'utf8'); 
    if (fileExist==false){
        console.log('File is not exist');
        return;
    }
}

function node(name, weight, used, code, reference)
{
    this.name = name;
    this.weight = weight;
    this.used = used;
    this.code = code;
    this.reference = reference;
}

function code(input, table, output)
{
    let string = fs.readFileSync(input, "utf8");
    if (string === "") {
        console.log('Error');
    }

    let alphabet = new Array();

    //первым циклом задаем сам алфавит, вторым частоту каждого символа
    for (let i = 0; i < string.length; i++)
        alphabet[string.charAt(i)] = 0;
    for (let i = 0; i < string.length; i++)
        alphabet[string.charAt(i)]++;

    let tree = new Array();
    //добавляем в дерево
    for (let char in alphabet) 
    {
        n = new node(char, alphabet[char], false, '', null);
        tree.push(n);
    }

    let originalTreeLength = tree.length;

    for (let k = 1; k < originalTreeLength; k++)
    {
        let frequency1 = string.length;
        let num1 = 0;
        for (let i = 0; i < tree.length; i++)
            if ((tree[i].weight < frequency1) && (tree[i].used == false))
            {
                frequency1 = tree[i].weight;
                num1 = i;
            }

        tree[num1].used = true;
        tree[num1].code = 0;
        tree[num1].reference = tree.length;

        let frequency2 = string.length;
        let num2 = 0;
        for (let i = 0; i < tree.length; i++)
            if ((tree[i].weight < frequency2) && (tree[i].used == false))
            {
                frequency2 = tree[i].weight;
                num2 = i;
            }

        tree[num2].used = true;
        tree[num2].code = 1;
        tree[num2].reference = tree.length;
        n = new node(tree[num1].name + tree[num2].name, tree[num1].weight + tree[num2].weight, false, '', null);
        tree.push(n);
    }

    let codeTable = new Array();
    for (let i = 0; i < originalTreeLength; i++)
    {
        let current = i;
        codeTable[tree[current].name] = '';
        while (tree[current].reference != null)
        {
            codeTable[tree[i].name] = tree[current].code + codeTable[tree[i].name];
            current = tree[current].reference;
        }
    }

    fs.writeFileSync(table, '')
    for (let i in codeTable)
    {
        str = i + ':' + codeTable[i] +'\n'
        fs.appendFile(table, str, (err) => {
            if(err) throw err;
        });
    }

    let code = '';

    for (let i = 0; i < string.length; i++)
        code += codeTable[string.substr(i, 1)];
    fs.writeFileSync(output, code)
}

function decode(output, table, result)
{
    let code = fs.readFileSync(output, "utf8");
    if (code === "") {
        console.log('Error');
    }
    
    let strTbl = fs.readFileSync(table, "utf8").split('\n');
    if (strTbl === "") {
        console.log('File is empty');
    }
    let codeTable = new Array();

    for (let i in strTbl){
        let dict = strTbl[i].split(':');
        if (dict.length > 1){
            codeTable[dict[0]] = dict[1];
        }
    }

    let codeSymbol = '';
    let decode = '';

    for (let i = 0; i < code.length; i++)
    {
        codeSymbol += code.charAt(i);
        for (let j in codeTable)
        {
            if (codeTable[j] == codeSymbol)
            {
                if (j === ''){
                    decode += '\n';
                } else {
                    decode += j;
                }
                codeSymbol = '';
            }
        }
    }

    fs.writeFileSync(result, decode)
}
let func = process.argv[2];
let text = process.argv[3];
let table = process.argv[4];
let out = process.argv[5];

if (func === "code") {
    code(text, table, out);
}

if (func === "decode") {
    decode(text, table, out);
}
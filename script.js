const char2Baudot=
{	'A':24,
	'B':19,
	'C':14,
	'D':18,
	'E':16,
	'F':22,
	'G':11,
	'H':05,
	'I':12,
	'J':26,
	'K':30,
	'L':09,
	'M':07,
	'N':06,
	'O':03,
	'P':13,
	'Q':29,
	'R':10,
	'S':20,
	'T':01,
	'U':28,
	'V':15,
	'W':25,
	'X':23,
	'Y':21,
	'Z':17,
	'/':00,
	'9':04,
	'3':02,
	'4':08,
	'5':27,
	'8':31,
	' ':99
};
const baudot2Char=
{	00:'/',
	01:'T',
	02:'3',
	03:'O',
	04:'9',
	05:'H',
	06:'N',
	07:'M',
	08:'4',
	09:'L',
	10:'R',
	11:'G',
	12:'I',
	13:'P',
	14:'C',
	15:'V',
	16:'E',
	17:'Z',
	18:'D',
	19:'B',
	20:'S',
	21:'Y',
	22:'F',
	23:'X',
	24:'A',
	25:'W',
	26:'J',
	27:'5',
	28:'U',
	29:'Q',
	30:'K',
	31:'8',
	99:' '
};





function preprocessInput(str,leaveSpaces=false)
{	str=str.toUpperCase();
	if(!leaveSpaces) str=str.replace(/ /g, '');
	str=str.replace(/[^A-Z /93458]/g, '');
	return str;
}

function preprocessInputBinary(str,leaveSpaces=false)
{	if(!leaveSpaces) str=str.replace(/ /g, '');
	str=str.replace(/[^10]/g, '');
	return str;
}

function ray2Baudot(ray)
{	for(var i=0;i<ray.length;i++)
	{	ray[i]=char2Baudot[ray[i]];
	}
	return ray;
}

function clearOutput()
{	document.getElementById('tableContainer').innerHTML='';
}

function buildTable(r1,r2,r3)
{	clearOutput();
	
	var table=document.createElement('table');
	
	var ctRow=document.createElement('tr');
	for(var i=0;i<r1.length;i++)
	{	var td=document.createElement('td');
		td.textContent=baudot2Char[r1[i]];
		ctRow.appendChild(td);
	}	table.appendChild(ctRow);
	
	var crRow = document.createElement('tr');
	for(var i=0;i<r2.length;i++)
	{	var td=document.createElement('td');
		td.textContent=baudot2Char[r2[i]];
		crRow.appendChild(td);
	}	table.appendChild(crRow);
	
	var ptRow=document.createElement('tr');
	for(var i=0;i<r3.length;i++)
	{	var th=document.createElement('th');
		th.textContent=baudot2Char[r3[i]];
		ptRow.appendChild(th);
	}	table.appendChild(ptRow);
	
	document.getElementById('tableContainer').appendChild(table);
}

function decryptCrib()
{	for(var i=0;i<rayPT.length;i++)
		if(!(rayCr[i]==99 || rayCr[i]==null)) 
			rayPT[i]=rayCT[i]^rayCr[i];
		else
			rayPT[i]=99;
}

function shiftRight()
{	if(rayCr[rayCr.length-1]==99 || rayCr[rayCr.length-1]==null || rayCr.length<rayCT.length)
	{	rayCr.unshift(99);
		decryptCrib();
		buildTable(rayCT,rayCr,rayPT);
	}
}

function shiftLeft()
{	if(rayCr[0]==99 || rayCr[0]==null)
	{	rayCr.shift();
		decryptCrib();
		buildTable(rayCT,rayCr,rayPT);
	}
}

function dragRight(amount=5)
{	for(var i=0;i<amount;i++) shiftRight();
}

function dragLeft(amount=5)
{	for(var i=0;i<amount;i++) shiftLeft();
}

function refillForm(swap=false)
{	var ct=rayCT;
	for(var i=0;i<ct.length;i++) ct[i]=baudot2Char[ct[i]];
	ct=ct.join('');
	
	if(swap)var cr=rayPT;
	else	var cr=rayCr;
	for(var i=0;i<cr.length;i++) cr[i]=baudot2Char[cr[i]];
	cr=cr.join('');
	
	document.getElementById('ciphertext').value=ct;
	document.getElementById('crib').value=cr.trimEnd();
	document.getElementById("submit").click();
}



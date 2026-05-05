
// -------------------------- взаимодействие со страницей -------------------------- \\

function init() {
	var rez = document.createElement("div");
	rez.id = "result";
	document.body.appendChild(rez);
}

function pushWarning(text) {
	var timeout = 4000;
	var div = document.createElement('div');
	div.className = "message";
	document.body.appendChild(div);
	div.appendChild(document.createTextNode(text));
	setTimeout(function () {
		div.parentNode.removeChild(div);
	}, timeout);
}

function argumentParamsAreValid(argMin, argMax, argStep) {
	var isNumeric = n => !isNaN(parseInt(n)) && isFinite(n);
	var flag = true;
	if (!(isNumeric(argMin) && isNumeric(argMax) && isNumeric(argStep))) {
		pushWarning("Введите числa в аргументы функции, а не то что вы тут ввели!");
		flag = false;
	} else {
		var min = parseFloat(argMin);
		var max = parseFloat(argMax);
		var step = parseFloat(argStep);
		if (min >= max) {
			pushWarning("Конец отрезка изменения аргумента должен быть больше начала!");
			flag = false;
		} else if (step <= 0) {
			pushWarning("Шаг изменения аргумента должен быть больше нуля!");
			flag = false;
		}
	}
	return flag;
}
function showResult(chars, result) {
	var charsStrings = { 'ch1': 'Минимум:', 'ch2': 'Является ли монотонно-убывающей:', 'ch3': 'Количество нулевых значений:', };
	var rez = document.getElementById("result");
	rez.innerHTML = "";
	result.forEach(
		(item, index) => {
			rez.appendChild(document.createTextNode(charsStrings[chars[index]] + ' ' + JSON.stringify(item, null, 4)));
			rez.appendChild(document.createElement("br"));
		}
	);
}


// -------------------------- точка входа -------------------------- \\

function calculate() {

	var func = funcTypes[document.querySelector('input[name="func_types"]:checked').value];
	var stringChars = Array.from(document.querySelectorAll('input[name="calc_chars"]:checked'), element => element.value);
	var chars = Array.from(document.querySelectorAll('input[name="calc_chars"]:checked'), element => funcCharacteristics[element.value]);
	var vars = Array.from(document.querySelectorAll('input[name="func_variants"]:checked'), element => funcVariants[element.value]);

	var min = document.getElementById('a').value;
	var max = document.getElementById('b').value;
	var step = document.getElementById('h').value;

	if (!(func && chars.every(item => item != undefined) && vars.every(item => item != undefined))) {
		pushWarning('Возникла непредвиденная ошибка!');
	}
	else if (argumentParamsAreValid(min, max, step)) {
		min = parseFloat(min);
		max = parseFloat(max);
		step = parseFloat(step);
		
		var result = calculateChars(func, chars, vars, min, max, step);
		showResult(stringChars, result);
	}

}


// -------------------------- внутренняя логика -------------------------- \\


var funcTypes = {
	'f1': x => x * (Math.sqrt(Math.pow(Math.sin(x + 10), 3))) + (Math.pow(x, 3) - Math.cos(x)) / x,
	'f2': x => Math.pow(Math.sin(x), 2) - Math.abs(Math.sin(x - 4)),
	'f3': x => Math.exp(x - 2) + Math.pow(x, 3) + 2 * x * Math.log(x + 3) / 7,
};

var funcCharacteristics = {
	'ch1': (X, Y) => {
		let y = Y.slice().sort((a, b) => a - b)[0];
		let x = X[Y.indexOf(y)];
		return { x, y };
	}, // минимум
	'ch2': (X, Y) => JSON.stringify(Y) === JSON.stringify(Y.slice().sort((a, b) => b - a)), // является ли монотонно-убывающей
	'ch3': (X, Y) => Y.filter(item => item == 0).length, // количество нулевых значений
};

var funcVariants = {
	'v1': func => memoized(func),
	'v2': func => debugged(func),
	'v3': func => callsCounted(func),
};


function calculateChars(func, chars, vars, min, max, step) {
	vars.map(variant => func = variant(func));

	var n = Math.floor((max - min) / step);
	n = n < 1 ? 1 : n; // на случай, если шаг взяли много больше длины отрезка
	var h = (max - min) / n;

	var x = Array.from({ length: n + 1 }, (_, index) => min + index * h);
	var y = x.map(x => func(x));
	x = x.filter((_, index) => !isNaN(y[index]));
	y = y.filter(item => !isNaN(item));

	return chars.map(char => char(x, y)) ;
}

function memoized(func) {
	var cache = {};
	var modFunc = arguments => {
		var inCache = key in cache;
		var key = JSON.stringify(arguments);
		var value = inCache ? cache[key] : cache[key] = func(arguments);
		console.log(`Длина кэша: ${modFunc.getCacheCount()}`);
		console.log(`f(${key}) = ${value} `, inCache ? '(из кэша)' : '(новое)');
		return value;
	}
	modFunc.getCacheCount = () => Object.keys(cache).length;
	return modFunc;
}

function debugged(func) {
	return arguments => {
		var startTime = performance.now();
		var result = func(arguments);
		var endTime = performance.now();
		console.log(`f(${arguments}) = ${result}. Время вызова: ${endTime - startTime}`);
		return result;
	};
}

function callsCounted(func) {
	var count = 0;
	var modFunc = arguments => {
		count++;
		console.log(`Количество вызовов: ${modFunc.getCount()}`);
		return func(arguments);
	};
	modFunc.getCount = () => count;
	modFunc.resetCount = () => count = 0;
	return modFunc;
}




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


function isNumeric(n) {	return !isNaN(parseInt(n)) && isFinite(n); }
function isPositive(n) { return n > 0; }
function compareNums(a, b) { return a - b; }
function compareOddAndEven(a, b) { return Math.abs(a % 2) - Math.abs(b % 2); }


function checkInputParams(size1, size2, range) {
	var flag = true;
	if (!(size1.split(",").every(isNumeric) && size2.split(",").every(isNumeric) && range.split(",").every(isNumeric))) {
		pushWarning("Введите целые числа через запятую!"); flag = false;
	} else {
		var sizeM1 = []; sizeM1 = size1.split(",").map(item => parseInt(item));
		var sizeM2 = []; sizeM2 = size2.split(",").map(item => parseInt(item));
		var rand = []; rand = range.split(",").map(item => parseInt(item));

		if (sizeM1.length != 2 || sizeM2.length != 2 || rand.length != 2) {
			pushWarning("Введите два числа!"); flag = false;
		} else if (rand[0] >= rand[1]) {
			pushWarning("Второе число в диапазоне случайной генерации должно быть больше первого!"); flag = false;
		} else if (!sizeM1.every(isPositive) || !sizeM2.every(isPositive)) {
			pushWarning("Укажите положительные числа в размерностях матриц"); flag = false;
		}
	}		
	return flag;
}


function initMatrs(size_m1, size_m2, random_range) {
	// инициализация
	var x, y;
	x = size_m1.split(",").map(item => parseInt(item))[0];
	y = size_m1.split(",").map(item => parseInt(item))[1];
	Matr1 = new Array(x);
	for (let i = 0; i < Matr1.length; ++i)
		Matr1[i] = new Array(y); 

	x = size_m2.split(",").map(item => parseInt(item))[0];
	y = size_m2.split(",").map(item => parseInt(item))[1];
	Matr2 = new Array(x);
	for (let i = 0; i < Matr2.length; ++i)
		Matr2[i] = new Array(y);
	// заполнение
	var a, b;
	a = random_range.split(",").map(item => parseInt(item))[0];
	b = random_range.split(",").map(item => parseInt(item))[1];

	for (let i = 0; i < Matr1.length; ++i)
		for (let j = 0; j < Matr1[i].length; ++j)
			Matr1[i][j] = Math.floor(Math.random() * (b - a + 1)) + a;

	for (let i = 0; i < Matr2.length; ++i)
		for (let j = 0; j < Matr2[i].length; ++j)
			Matr2[i][j] = Math.floor(Math.random() * (b - a + 1)) + a;
}


function createSummary(text) {
	var summary = document.createElement("summary");
	summary.textContent = text;
	return summary;
}
function createCell(value, color) {
	var cell = document.createElement("td");
	cell.textContent = value;
	cell.align = "center";
	cell.width = "25px";
	cell.bgColor = color;
	return cell;
}
function createTable(matr, color, contrastColor, calculatingElem) {
	var contrastRow = !Array.isArray(calculatingElem);
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	for (let i = 0; i < matr.length; ++i) {
		let row = document.createElement("tr");
		for (let j = 0; j < matr[i].length; ++j)
			if (contrastRow)
				if (i == calculatingElem)
					row.appendChild(createCell(matr[i][j], contrastColor));
				else row.appendChild(createCell(matr[i][j], color));
			else
				if (i == calculatingElem[0] && j == calculatingElem[1])
					row.appendChild(createCell(matr[i][j], contrastColor));
				else row.appendChild(createCell(matr[i][j], color));
		tbody.appendChild(row);
	}
	return table;
}
function addCalculationStep(destination, calculation, header, calculatingElem = -1) {
	calculation = document.createElement("details");
	calculation.appendChild(createSummary(header));
	calculation.appendChild(createTable(Matr1, "LightSalmon", "BlanchedAlmond", calculatingElem));
	calculation.appendChild(createTable(Matr2, "Gold", "BlanchedAlmond", calculatingElem));
	destination.appendChild(calculation);
}

function addCalculationStep(destination, calculation, header, calculatingRow, calculatingColumn1, calculatingColumn2) {
	calculation = document.createElement("details");
	calculation.appendChild(createSummary(header));
	calculation.appendChild(createTable(Matr1, "LightSalmon", "BlanchedAlmond", [calculatingRow, calculatingColumn1]));
	calculation.appendChild(createTable(Matr2, "Gold", "BlanchedAlmond", [calculatingRow, calculatingColumn2]));
	destination.appendChild(calculation);
}


function calculate(size_m1, size_m2, random_range) {
	var calculation;
	var rez = document.getElementById("result");
	rez.innerHTML = "";
	if (checkInputParams(size_m1, size_m2, random_range))
	{
		// создание и заполнение матриц
		initMatrs(size_m1, size_m2, random_range);
		addCalculationStep(rez, calculation, "Исходные матрицы");
		
		// применение функции из задания (перемещаем элементы в зависимости от четности)
		var steps = [Matr1.length, Matr2.length].sort(compareNums)[1];
		for (let i = 0; i < steps; ++i) {
			if (Matr1.length > i) Matr1[i].sort(compareOddAndEven);
			if (Matr2.length > i) Matr2[i].sort(compareOddAndEven);
			addCalculationStep(rez, calculation, "Сортировка строк. Шаг " + (i + 1), i);
		}
		addCalculationStep(rez, calculation, "Матрицы с отсортированными строками");

		// поиск мин и макс элементов в строках
		var j1, j2;
		for (let i = 0; i < steps; ++i) {
			if (Matr1.length > i) j1 = Matr1[i].indexOf([...Matr1[i]].sort(compareNums)[0]); 
			if (Matr2.length > i) j2 = Matr2[i].indexOf([...Matr2[i]].sort(compareNums)[0]); 
			addCalculationStep(rez, calculation, "Мин. элементы. Шаг " + (i + 1) + ". Поиск", i, j1, j2);
			if (Matr1.length > i) Matr1[i].splice(j1, 1);
			if (Matr2.length > i) Matr2[i].splice(j2, 1);
			addCalculationStep(rez, calculation, "Мин. элементы. Шаг " + (i + 1) + ". Удаление", i);
		}
		for (let i = 0; i < steps; ++i) {
			if (Matr1.length > i) j1 = Matr1[i].indexOf([...Matr1[i]].sort(compareNums)[Matr1[i].length - 1]);
			if (Matr2.length > i) j2 = Matr2[i].indexOf([...Matr2[i]].sort(compareNums)[Matr2[i].length - 1]);
			addCalculationStep(rez, calculation, "Макс. элементы. Шаг " + (i + 1) + ". Поиск", i, j1, j2);
			if (Matr1.length > i) Matr1[i].splice(j1, 1);
			if (Matr2.length > i) Matr2[i].splice(j2, 1);
			addCalculationStep(rez, calculation, "Макс. элементы. Шаг " + (i + 1) + ". Удаление", i);
		}

		// результат
		addCalculationStep(rez, calculation, "Результат преобразований");

	}
}

var Matr1 = [];
var Matr2 = [];

function init() {
	var rez = document.createElement("div");
	rez.id = "result";
	document.body.appendChild(rez);
}
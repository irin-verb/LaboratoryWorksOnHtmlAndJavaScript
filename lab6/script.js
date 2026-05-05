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

function inputParamIsIntPosNum(par) {
	var flag = true;
	if (!isNumeric(par)) {
		pushWarning("Введите число, а не то что вы тут ввели!");
		flag = false;
	} else {
		var numPar = parseInt(par);
		if (numPar <= 0) {
			pushWarning("Введите целое положительное число!");
			flag = false;
		}
	}		
	return flag;
}




function init() {
	var rez = document.createElement("div");
	rez.id = "result";
	document.body.appendChild(rez);

	document.getElementById("update").hidden = true;
}

function loadDetails() {
	var input = document.createElement('input');
	input.type = 'file';
	input.accept = 'application/json';
	input.onchange = function (event) {
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function () {
			var contents = reader.result;
			try {
				var details = JSON.parse(contents, null, 4);
				document.getElementById("update").hidden = true;
				var rez = document.getElementById("result");
				rez.innerHTML = "";
				document.getElementById("update").hidden = false;
				Details = [];
				Details = details;
				showDetails(Details);	

			} catch (error) {
				console.error('Ошибка при чтении файла JSON:', error);
			}
		};

		reader.readAsText(file);
	};

	input.click();
}

function saveDetails() {
	var detailsText = document.getElementById("result").innerText;
	try {
		var detailsObject = JSON.parse(detailsText, null, 4);

		var blob = new Blob([JSON.stringify(detailsObject)], { type: 'application/json' });

		// Создаем элемент a для скачивания файла
		var a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'details.json';

		// Добавляем элемент a на страницу и эмулируем клик по нему
		document.body.appendChild(a);
		a.click();

		// Удаляем элемент a
		document.body.removeChild(a);
	} catch (error) {
		console.error('Ошибка при сохранении файла JSON:', error);
	}
}


function generateDetails(quantity) {
	document.getElementById("update").hidden = true;
	var rez = document.getElementById("result");
	rez.innerHTML = "";

	if (inputParamIsIntPosNum(quantity)) {
		document.getElementById("update").hidden = false;
		createRandomDetails(quantity);
		showDetails(Details);
	}
}

function getDetails() {
	var rez = document.getElementById("result");
	rez.innerHTML = "";
	showDetails(Details);
}

function getSortedByMassDetails() {
	var rez = document.getElementById("result");
	rez.innerHTML = "";
	updateSortedDetails();
	showDetails(SortedDetails);
}

function showDetails(detailsArray) {
	var rez = document.getElementById("result");
	rez.innerHTML = "";
	rez.appendChild(document.createTextNode(JSON.stringify(detailsArray, null, 4)));

	/*for (let i = 0; i < detailsArray.length; ++i) {
		rez.appendChild(document.createElement("hr"));
		rez.appendChild(document.createTextNode(JSON.stringify(detailsArray[i], null, "	")));
		rez.appendChild(document.createElement("br"));
	}*/
}

function deleteMaterialsIfMassUnder(mass) {
	if (inputParamIsIntPosNum(mass)) {
		deleteMaterialsIfMassBelow(mass);
		showDetails(Details);
	}
}

function findDetailsWithDimensions(x, y, z) {
	if (inputParamIsIntPosNum(x) && inputParamIsIntPosNum(y) && inputParamIsIntPosNum(z)) {
		updateFoundedDetails(x, y, z);
		showDetails(FoundedDetails);
	}
}

function calculateFoundedDetailsDimensionalValue() {
	addDimensionalValueInFoundedDetails();
	showDetails(FoundedDetails);
}




function isNumeric(n) { return !isNaN(parseInt(n)) && isFinite(n); }
function compareNums(a, b) { return a - b; }

function compareDetailMass(a, b) { return b.mass - a.mass; }


var DETAIL_NAMES = ["Винтик", "Шпунтик", "Гаечка", "Чип", "Дейл", "Шестеренка", "Кольцо", "Балка",
					"Пластина",	"Штифт", "Ось", "Фиксатор", "Втулка", "Колесо", "Поршень", "Подшипник"];
var DETAIL_MATERIALS = ["Латунь", "Алюминий", "Медь", "Чугун", "Сталь", "Бронза", "Полиамид", "Полипропилен", "Титан", "Никель", "Цинк"];
var MAX_DETAIL_MASS = 5000; // 5 кг
var MAX_DETAIL_DIMENSION = 1000; // 1 м
var MAX_DETAIL_SUPPLIERS_COUNT = 5;
var DETAIL_SUPPLIER_NAMES = ["Белый завод", "Серое проеизводство", "Зеленое общество", "Красный завод", "Оранжевый завод",
							"Черное производство", "Желтое общество", "Розовый завод", "Фиолетовый завод", "Коричневое производство",
							"Бежевое общество", "Синий завод", "Голубое производство", "Серо-буро-малиновое нечто"];


var Details = [];
var SortedDetails = []; // копия по значению
var FoundedDetails = []; // передача по ссылке


function createRandomDetails(quantity) {
	Details = [];
	for (let i = 0; i < quantity; ++i) {
		Details.push(createRandomDetail());
	}
}

function deleteMaterialsIfMassBelow(mass) {
	for (let i = 0; i < Details.length; ++i)
		if (Details[i].mass < mass)
			delete Details[i].material;
}

function updateSortedDetails() {
	SortedDetails = [];
	for (let i = 0; i < Details.length; ++i) 
		SortedDetails.push(makeDeepCopy(Details[i]));
	SortedDetails.sort(compareDetailMass);
}

function updateFoundedDetails(x, y, z) {
	FoundedDetails = [];
	for (let i = 0; i < Details.length; ++i)
		if (Details[i].dimensions.x == x && Details[i].dimensions.y == y && Details[i].dimensions.z == z)
			FoundedDetails.push(Details[i]);
}

function addDimensionalValueInFoundedDetails() {
	for (let i = 0; i < FoundedDetails.length; ++i)
		FoundedDetails[i].dimensions.value = FoundedDetails[i].dimensions.x * FoundedDetails[i].dimensions.y * FoundedDetails[i].dimensions.z;
}



function makeDeepCopy(obj) {
	var copy = {};
	for (var key in obj) {
		if (Array.isArray(obj[key])) {
			copy[key] = [];
			for (let i = 0; i < obj[key].length; ++i)
				copy[key].push(makeDeepCopy(obj[key][i]));
		}
		else if (typeof obj[key] == "object")
			copy[key] = makeDeepCopy(obj[key]); 
		else
			copy[key] = obj[key];
	}
	return copy;
}

function createRandomDetail() {
	var detail = {};
	detail.name = DETAIL_NAMES[Math.floor(Math.random() * (DETAIL_NAMES.length))];
	detail.dimensions = createRandomDetailDimension();
	detail.material = DETAIL_MATERIALS[Math.floor(Math.random() * (DETAIL_MATERIALS.length))];
	detail.mass = Math.floor(Math.random() * (MAX_DETAIL_MASS + 1));
	detail.suppliers = createRandomDetailSuppliers();
	return detail;
}

function createRandomDetailDimension() {
	var dimension = {};
	dimension.x = Math.floor(Math.random() * (MAX_DETAIL_DIMENSION + 1));
	dimension.y = Math.floor(Math.random() * (MAX_DETAIL_DIMENSION + 1));
	dimension.z = Math.floor(Math.random() * (MAX_DETAIL_DIMENSION + 1));
	return dimension;
}

function createRandomDetailSuppliers() {
	var count = Math.floor(Math.random() * (MAX_DETAIL_SUPPLIERS_COUNT + 1));
	var suppliers = [];
	for (let i = 0; i < count; ++i) {
		let supplier = {};
		supplier.name = DETAIL_SUPPLIER_NAMES[Math.floor(Math.random() * (DETAIL_SUPPLIER_NAMES.length))];
		supplier.number = createRandomPhoneNumber();
		suppliers.push(supplier);
	}
	return suppliers;
}

function createRandomPhoneNumber() {
	var number = ["+7"];
	//number.push((Math.floor(Math.random() * (9 - 1 + 1)) + 1).toString());
	for (let i = 0; i < 4; ++i) {
		number.push("-");
		var len = i < 2 ? 3 : 2;
		for (let j = 0; j < len; ++j)
			number.push((Math.floor(Math.random() * (9 + 1))).toString());
	}
	return number.join('');
}







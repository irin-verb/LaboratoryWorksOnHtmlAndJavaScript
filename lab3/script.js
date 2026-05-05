function f(x, y, a, nm1, nm2) {
	var r;
	if (x > a)
		r = f1(x, y, nm1);
	else
		r = f2(x, y, nm2);
	return isNaN(r) ? 0 : r;
}

function f1(x, y, nm) {
	let result = y / (x + 1);
	for (let n = 1; n <= nm; n++) {
		result *= y + Math.pow(x, n) / y / n;
	}
	return result;
}

function f2(x, y, nm) {
	let result = 0;
	for (let n = 0; n <= nm; n++)
		result += Math.pow(y, n + 1) / (factorial(n) + 1);
	return result;
}

function factorial(x) {
	if (x < 0) return null;
	else return factorial_recurs(x, 1);
}

function factorial_recurs(x, res) {
	if (!x) return res;
	else return factorial_recurs(x - 1, x * res);
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function compareNumeric(a, b) {
	if (a > b) return 1;
	if (a == b) return 0;
	if (a < b) return -1;
}



function tabFunc(x0, xn, hx, y0, yn, hy, a, nm1, nm2) {

	var rez = document.getElementById("result");
	// проверочки
	if (!isNumeric(x0) || !isNumeric(xn) || !isNumeric(hx) || !isNumeric(y0) || !isNumeric(yn) || !isNumeric(hy)) {
		rez.innerHTML = "Ошибка! Проверьте введёные значения<br>";
		return;
	}
	//преобразуем параметры в числа с плавающей точкой
	x0 = parseFloat(x0);
	xn = parseFloat(xn);
	hx = parseFloat(hx);
	y0 = parseFloat(y0);
	yn = parseFloat(yn);
	hy = parseFloat(hy);
	a = parseFloat(a);
	nm1 = parseFloat(nm1);
	nm2 = parseFloat(nm2);
	//еще проверочки
	if (nm1 < 2 || nm1 > 6 || nm2 < 2 || nm2 > 6) {
		rez.innerHTML = "Ошибка! NM1 и NM2 не соответствуют требованиям!<br>";
		return;
	}
	if ((x0 > xn && hx > 0) || (x0 < xn && hx < 0) || x0 == xn || hx == 0 ||
		(y0 > yn && hy > 0) || (y0 < yn && hy < 0) || y0 == yn || hy == 0) {
		rez.innerHTML = "Ошибка! C такими значениями нельзя табулировать функцию<br>";
		return;
	}


	// ТАБУЛЯЦИЯ
	var x;
	var y;
	// накапливаем теги разметки в переменную s, чтобы не сломать вёрстку
	var s = "<table width='600'><tr> <td>X = " + x0 + "(" + hx + ")" + xn + "</td> <td>Y = " + y0 + "(" + hy + ")" + yn + "</td> <td>F(X,Y)</td> </tr>";
	var arr_f = [];
	var arr_x = [];
	var arr_y = [];
	var func;

	for (x = x0; x0 < xn ? x < xn + hx * 0.5 : x > xn + hx * 0.5; x += hx)
		for (y = y0; y0 < yn ? y < yn + hy * 0.5 : y > yn + hy * 0.5; y += hy) {
			func = f(x, y, a, nm1, nm2);
			s += "<tr><td>" + x + "</td><td>" + y + "</td><td>" + func + "</td></tr>";
			arr_x.push(x);
			arr_y.push(y);
			arr_f.push(func);
		}
	s += "</table><br>";


	// ПОИСК МИН И МАКС
	var arr_copy = [];
	arr_copy = arr_f.slice();

	arr_copy.sort(compareNumeric);
	var min = arr_copy[0];
	var max = arr_copy[arr_copy.length - 1];

	var min_ind = arr_f.indexOf(min);
	var max_ind = arr_f.indexOf(max);

	var min_f = arr_f[min_ind]; var max_f = arr_f[max_ind];
	var min_x = arr_x[min_ind]; var max_x = arr_x[max_ind];
	var min_y = arr_y[min_ind]; var max_y = arr_y[max_ind];

	s += "<table width='600'> <tr> <td>MIN</td> </tr>";
	s += "<tr> <td>X</td> <td>Y</td> <td>F(X,Y)</td> </tr>";
	s += "<tr> <td> X = " + min_x + "</td>	<td> Y = " + min_y + "</td> <td>" + min_f + "</td> </tr></table><br>";

	s += "<table width='600'> <tr> <td>MAX</td> </tr>";
	s += "<tr> <td>X</td> <td>Y</td> <td>F(X,Y)</td> </tr>";
	s += "<tr> <td> X = " + max_x + "</td>	<td> Y = " + max_y + "</td> <td>" + max_f + "</td> </tr></table><br>";

	console.log(s);
	rez.innerHTML += s; // добавляем вёрстку в содержимое элемента
}

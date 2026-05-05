// Подсвечивание кнопок основной горизонтальной шапки
document.addEventListener("DOMContentLoaded", function() {
	// Определите текущую страницу, например, из URL
	var currentPage = document.getElementById("currentPage").value;

	// Найти все элементы с атрибутом name="colorButton"
	var buttons = document.querySelectorAll('button[name="colorButton"]');

	// Пройдитесь по кнопкам и добавьте класс active к кнопке, которая
	// соответствует текущей странице
	buttons.forEach(function(button) {
		if (button.getAttribute("id") === currentPage) {
			button.classList.add("active");
			// Добавляем стили напрямую для :hover
			button.addEventListener("mouseover", function() {
				button.style.backgroundColor = "#707070";
			});

			button.addEventListener("mouseout", function() {
				button.style.backgroundColor = "555";
			});
		}
	});
});

// Подсвечивание кнопок дополнительной вертикальной шапки
document.addEventListener("DOMContentLoaded", function() {

	// Определите текущую страницу, например, из URL
	var filter = document.getElementById("currentFilter").value;

	// Найти все элементы с атрибутом name="filterButton"
	var buttons = document.querySelectorAll('button[name="filterButton"]');

	// Пройдитесь по кнопкам и добавьте класс active к кнопке, которая
	// соответствует текущей странице
	buttons.forEach(function(button) {
		if (button.getAttribute("id") === filter) {
			button.classList.add("active");
			// Добавляем стили напрямую для :hover
			button.addEventListener("mouseover", function() {
				button.style.backgroundColor = "#888";
			});

			button.addEventListener("mouseout", function() {
				button.style.backgroundColor = "#555";
			});
		}
	});
});
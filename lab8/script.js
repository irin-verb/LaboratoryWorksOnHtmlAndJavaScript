
var matrixList = new MatrixList(3);

function addMatrix(n) {
    if (!isNaN(parseInt(n)) && isFinite(n) && parseInt(n) > 0) {
        if (parseInt(n) != matrixList.size)
            matrixList.changeMatrixSize(parseInt(n));
    }
    else {
        document.getElementById("n").value = matrixList.size;
        alert('N должно быть целым положительным числом!');
    }
    matrixList.add();
    showMatrixes();
}

function editMatrix(id) {
    let row = parseInt(prompt("Номер строки (от 0 до " + (matrixList.size - 1) + "):"));
    let col = parseInt(prompt("Номер столбца (от 0 до " + (matrixList.size - 1) + "):"));
    let value = parseInt(prompt("Введите значение:"));

    if (!isNaN(row) && !isNaN(col) && !isNaN(value))
        matrixList.find(id).setValue(row, col, value);
    else alert("Что вы тут ввели?!");
    showMatrixes();
}

function deleteMatrix(id) {
    if (confirm("Вы уверены, что хотите удалить матрицу?"))
        matrixList.delete(id);
    showMatrixes();
}


function minMatrixElem(id) {
    result = matrixList.find(id).getMinElem();
    alert(`Matrix ${id} [${result.row}][${result.col}] = ${result.value}`)
}

function maxMatrixElem(id) {
    result = matrixList.find(id).getMaxElem();
    alert(`Matrix ${id} [${result.row}][${result.col}] = ${result.value}`)
}


function sumMatrix() {
    let matrix1 = matrixList.find(parseInt(prompt("Первое слагаемое-матрица:")));
    let matrix2 = matrixList.find(parseInt(prompt("Второе слагаемое-матрица:")));
    if (matrix1 && matrix2)
        matrixList.add(matrix1.plus(matrix2));
    else
        alert("Неправильные номера матриц!");
    showMatrixes();
}

function subMatrix() {
    let matrix1 = matrixList.find(parseInt(prompt("Матрица-уменьшаемое:")));
    let matrix2 = matrixList.find(parseInt(prompt("Матрица-вычитаемое:")));
    if (matrix1 && matrix2)
        matrixList.add(matrix1.minus(matrix2));
    else
        alert("Неправильные номера матриц!");
    showMatrixes();
}

function mulMatrix() {
    let matrix1 = matrixList.find(parseInt(prompt("Первый матрица-множитель:")));
    let matrix2 = matrixList.find(parseInt(prompt("Второй матрица-множитель:")));
    if (matrix1 && matrix2)
        matrixList.add(matrix1.mult(matrix2));
    else
        alert("Неправильные номера матриц!");
    showMatrixes();
}

function printMethodList(id) {
    matrixList.find(id).printMethodLogs();
}

function clearMethodList(id) {
    matrixList.find(id).clearMethodLogs();
}

function showMatrixes() {
    let container = document.getElementById("matrixContainers");
    container.innerHTML = matrixList.toHTML();
}
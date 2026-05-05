
function MatrixList(size) {
    this.arr = [];
    this.size = size;
}

MatrixList.prototype.changeMatrixSize = function (n) {
    uniqueIdGenerator.reset();
    this.arr = [];
    this.size = n;
}

MatrixList.prototype.add = function (matrix) {
    let matr = matrix || new Matrix(this.size);
    this.arr.push(matr);
}

MatrixList.prototype.delete = function (id) {
    this.arr = this.arr.filter(matrix => matrix.id != id);
}

MatrixList.prototype.find = function (id) {
    return this.arr.find(matrix => matrix.id == id);
}

MatrixList.prototype.toHTML = function () {
    let html = "";
    this.arr.forEach((matrix) => {
        html += `<div class = "matrix-container">
                    <h3>Matrix ${matrix.id}</h3>
                    <div id="matrix${matrix.id}">${matrix.toHTML()}</div>
                    <button type="button" onclick="editMatrix(${matrix.id})">Изменить</button>
                    <button type="button" onclick="deleteMatrix(${matrix.id})">Удалить</button>
                    <button type="button" onclick="minMatrixElem(${matrix.id})">Мин эл</button>
                    <button type="button" onclick="maxMatrixElem(${matrix.id})">Макс эл</button>
                    <br>
                    <button type="button" onclick="printMethodList(${matrix.id})">Список действий (консоль)</button>
                    <br>
                    <button type="button" onclick="clearMethodList(${matrix.id})">Очистить список действий</button>
                </div>`;
    });
    return html;
}

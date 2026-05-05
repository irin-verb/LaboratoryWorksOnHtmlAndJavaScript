
var matrixMinElem = -10;
var matrixMaxElem = 10;
function counter() {
    var n = 0;
    return { count: () => n++, reset: () => n = 0 }
}
var uniqueIdGenerator = counter();


Matrix.prototype = Object.create(BaseObject.prototype);
Matrix.prototype.constructor = Matrix;

function Matrix(size) {
    BaseObject.call(this);
    this.id = uniqueIdGenerator.count();
    this.size = size;
    this.data = [];
    for (let i = 0; i < this.size; i++) {
        this.data.push([]);
        for (let j = 0; j < this.size; j++) {
            this.data[i].push(Math.floor(Math.random() * (matrixMaxElem - matrixMinElem + 1)) + matrixMinElem); 
        }
    }
}

Matrix.prototype.setValue = function (row, col, value) {
    if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
        this.data[row][col] = value;
    }
}

Matrix.prototype.getValue = function(row, col) {
    if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
        return this.data[row][col];
    }
    return null;
}

Matrix.prototype.getMinElem = function () {
    let value = this.data[0][0];
    let row = 0;
    let col = 0;
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.data[i][j] < value) {
                value = this.data[i][j];
                row = i;
                col = j;
            }
        }
    }
    return { value, row, col };
}

Matrix.prototype.getMaxElem = function () {
    let value = this.data[0][0];
    let row = 0;
    let col = 0;
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.data[i][j] > value) {
                value = this.data[i][j];
                row = i;
                col = j;
            }
        }
    }
    return { value, row, col };
}

Matrix.prototype.plus = function (matrix) {
    let result = new Matrix(this.size);
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            result.setValue(i, j, this.data[i][j] + matrix.data[i][j]);
        }
    }
    return result;
}

Matrix.prototype.minus = function (matrix) {
    let result = new Matrix(this.size);
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            result.setValue(i, j, this.data[i][j] - matrix.data[i][j]);
        }
    }
    return result;
}

Matrix.prototype.mult = function (matrix) {
    let result = new Matrix(this.size);
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            let sum = 0;
            for (let k = 0; k < this.size; k++) {
                sum += this.data[i][k] * matrix.data[k][j];
            }
            result.setValue(i, j, sum);
        }
    }
    return result;
}

Matrix.prototype.toHTML = function () {
    let html = "<table>";
    for (let i = 0; i < this.size; i++) {
        html += "<tr>";
        for (let j = 0; j < this.size; j++) {
            html += `<td>${this.data[i][j]}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

Matrix.prototype.toString = function () {
    let result = '';
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            result += this.data[i][j] + '  ';
        }
        result += '----  '; 
    }
    return result;
}

methodList = ['setValue', 'getValue', 'getMinElem', 'getMaxElem', 'plus', 'minus', 'mult', 'toHTML'];
methodList.map(name => {
    var method = Matrix.prototype[name];
    Matrix.prototype[name] = function () {
        this.logMethodCall(name, arguments);
        return method.apply(this, arguments);
    };
});

class Matrix {
    rows;
    cols;
    data;

    constructor(rowsParam, colsParam, defaultValue) {
        this.rows = rowsParam;
        this.cols = colsParam;
        this.data = [];

        for (let i = 0; i < rowsParam; i++) {
            const rowTemp = [];
            for (let j = 0; j < colsParam; j++) {
                rowTemp.push(defaultValue);
            }
            this.data.push(rowTemp);
        }
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    setValue(row, col, value) {
        if (this.isValidPosition(row, col)) {
            this.data[row][col] = value;
        }
    }

    getValue(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.data[row][col];
        } else {
            return null;
        }
    }

    fillRandom(min, max) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                this.data[i][j] = random;
            }
        }
    }

    // Nueva función agregada según la imagen
    fillIncrementRows(){
        var initialValue = 1;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = initialValue; // Asigna el mismo valor (e.g., 1) a toda la fila
            }
            initialValue++; // Incrementa el valor (a 2) para la siguiente fila
        }
    }
    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    
}
}
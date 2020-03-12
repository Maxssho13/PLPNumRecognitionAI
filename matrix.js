class Matrix {
  constructor(rows, columns, input) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];

    //creates empty matrix
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
    }
    if (Array.isArray(input) && rows == input.length && columns == 1) {
      for (let i = 0; i < this.rows; i++) {
        this.matrix[i][0] = input[i];
      }
    } else if (typeof input !== "undefined") {
      const e = new Error("input vector not applicable");
      throw e;
    }
  }

  /**
   * Maps a function to a matrix
   * @param {Function} func - function to map the matrix over, can take 4 arguments: current element in matrix, whole matrix object, i, and j
   * @returns {Matrix} returns the mapped matrix, useful for chaining
   */
  map(func) {
    let output = new Matrix(this.rows, this.columns);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        output.matrix[i][j] = func(this.matrix[i][j], this, i, j);
      }
    }

    return output;
  }

  /**
   * Randomizes each element in matrix
   * @param {number} lower - lower bound inclusive
   * @param {number} upper - upper bound exclusive
   */
  randomize(lower = -1, upper = 1) {
    //iterate through each row of the  matrix
    for (let i = 0; i < this.rows; i++) {
      //iterate through each column of the matrix
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] =
          Math.round((Math.random() * (upper - lower) + lower) * 10000) / 10000; //get rid of a few decimal places
      }
    }
    return;
  }

  /**
   * sets every element in matrix to constant
   * @param {number} n - number to fill the matrix with
   */
  fill(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] = n;
      }
    }
  }

  /**
   * Grabs the column of a Matrix object
   * @param {number} col - column to grab
   * @returns {number[]} output column
   */
  getCol(col) {
    let column = [];
    if (col > this.rows - 1 || col < 0) {
      let e = new Error("column out of range: " + col);
      throw e;
    }
    for (let i = 0; i < this.rows; i++) {
      column.push(this.matrix[i][col]);
    }
    return column;
  }

  /**
   * Computes matrix multiplication
   * @param {Matrix} matrix1 - input A
   * @param {Matrix} matrix2 - input B
   * @returns {Matrix} output matrix
   */
  static multiply(matrix1, matrix2) {
    //ensures the multiplication can take place. Proper dimensions. Columns of first matrix need to be equal to rows of second
    if (matrix1.columns != matrix2.rows) {
      const e = new Error("Matrix multiplication error: dimensions no good");
      throw e;
    }
    //create the output matrix with the correct size
    let outPutMatrix = new Matrix(matrix1.rows, matrix2.columns);

    //iterate through each row of the first matrix
    for (let i = 0; i < matrix1.rows; i++) {
      //iterate through each column of the second matrix
      for (let j = 0; j < matrix2.columns; j++) {
        //dot product the rows of the first matrix and the columns of the second
        outPutMatrix.matrix[i][j] = Matrix.dotProduct(
          matrix1.matrix[i],
          matrix2.getCol(j)
        );
      }
    }

    return outPutMatrix;
  }

  /**
   * Computes dot product of two vectors
   * @param {number[]} vector1 - input A
   * @param {number[]} vector2  - input B
   * @returns {number} dot product of A and B
   */
  static dotProduct(vector1, vector2) {
    //detects if the vectors are compatible
    if (vector1.length != vector2.length) {
      let e = new Error(
        "Dot product not possible; vectors not of equal length"
      );
      throw e;
    }

    let products = [];
    let output = 0;

    //multiply each corresponding number
    for (let i = 0; i < vector1.length; i++) {
      products[i] = vector1[i] * vector2[i];
    }
    //add each product
    for (let i = 0; i < products.length; i++) {
      output += products[i];
    }
    return output;
  }

  /**
   * Transposes matrix
   * @param {Matrix} input - input matrix
   * @returns {Matrix} new transposed matrix
   */
  static transpose(input) {
    let output = new Matrix(input.columns, input.rows);
    for (let i = 0; i < input.rows; i++) {
      for (let j = 0; j < input.columns; j++) {
        output.matrix[j][i] = input.matrix[i][j];
      }
    }
    return output;
  }

  /**
   * Sums every element of a matrix
   * @param {Matrix} input - matrix to be summed on
   * @returns {number} sum of all elements
   */
  static sum(input) {
    let output = 0;
    for (let i = 0; i < input.rows; i++) {
      for (let j = 0; j < input.columns; j++) {
        output += input.matrix[i][j];
      }
    }
    return output;
  }
}

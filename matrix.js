class Matrix {
  constructor(rows, columns) {

    this.rows = rows;
    this.columns = columns;
    this.matrix = [];

    //creates empty matrix
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
    }
  }

  /**
   * Maps a function to a matrix
   * @param {Function} func - function to map the matrix over
   */
  map(func) {
    let output = new Matrix(this.rows, this.columns);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        output.matrix[i][j] = func(this.matrix[i][j], this);
      }
    }
    // updates matrix after ALL calculations are done
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] = output.matrix[i][j];
      }
    }
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
        this.matrix[i][j] = (Math.round((Math.random() * (upper - lower) + lower) * 10000)) / 10000; //get rid of a few decimal places
      }
    }
    return;
  }

  /**
   * Run activation function over matrix
   * @param {String} func - activation function, either "relu" or "softmax"
   * 
   * deprecated in place of map function 
   */
  activate(func) {
    //ReLU function
    if (func == "relu") {
      //iterate through every item in the this matrix
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.matrix[i][j] <= 0) {
            //small gradient. Technically leaky ReLU
            this.matrix[i][j] *= 0.01;
          }
        }
      }
      return;
      //softmax function  
    } else if (func == "softmax") {
      let sum = 0;
      for (let i = 0; i < this.rows; i++) {
        sum += Math.exp(this.matrix[i][0]);
      }
      for (let i = 0; i < this.rows; i++) {
        this.matrix[i][0] = (Math.exp(this.matrix[i][0])) / sum;
      }
      return;
    }
  }

  /**
   * Grabs the column of a Matrix object
   * @param {Matrix} inMatrix - input matrix
   * @param {number} col - column to grab
   * @returns {number[]} output column
   */
  static getCol(inMatrix, col) {
    var column = [];
    for (var i = 0; i < inMatrix.length; i++) {
      column.push(inMatrix[i][col]);
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
      console.error("Matrix multiplication error: dimensions no good");
      return;
    }
    //create the output matrix with the correct size
    let outPutMatrix = new Matrix(matrix1.rows, matrix2.columns);


    //iterate through each row of the first matrix
    for (let i = 0; i < matrix1.rows; i++) {

      //iterate through each column of the second matrix
      for (let j = 0; j < matrix2.columns; j++) {
        //dot product the rows of the first matrix and the columns of the second
        outPutMatrix.matrix[i][j] = Matrix.dotProduct(matrix1.matrix[i], Matrix.getCol(matrix2.matrix, j));

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
      console.error("Dot product not possible: vectors not of equal length");
      return;
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
}
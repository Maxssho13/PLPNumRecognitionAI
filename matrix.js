class Matrix {
  constructor(dimY, dimX) { //arg1(rows) arg2(columns)
    this.dimY = dimY; //rows
    this.dimX = dimX; //columns


    this.matrix = [];
    //creates matrix
    for (let i = 0; i < this.dimY; i++) {
      this.matrix[i] = [];
    }

  }


  //function to do matrix multiplication between two functions. matrix1.multiply(matrix2). Returns new matrix
  multiply(matrix2) {
    if (this.dimY != matrix2.dimX) { //ensures the multiplication can take place. Proper dimensions.
      console.error("Matrix multiplication error: dimensions no good");
      return;
    }
    //create the output matrix with the correct size
    let outPutMatrix = new Matrix(matrix2.dimX, matrix2.dimX);


    //iterate through each row of the first matrix
    for (let i = 0; i < this.dimY; i++) {

      //iterate through each column of the second matrix
      for (let j = 0; j < matrix2.dimX; j++) {
        //dot product the rows of the first matrix and the columns of the second
        outPutMatrix.matrix[i][j] = dotProduct(this.matrix[i], getCol(matrix2.matrix, j));

      }
    }

    return outPutMatrix;
  }
  //function to randomize the values of a fucntion between two values. Lower inclusive upper exclusive
  randomize(lower, upper) {
    //iterate through each row of the  matrix
    for (let i = 0; i < this.dimY; i++) {
      //iterate through each column of the matrix
      for (let j = 0; j < this.dimX; j++) {

        this.matrix[i][j] = (Math.round((Math.random() * (upper - lower) + lower) * 10000)) / 10000; //get rid of a few decimal places
      }
    }
    return;
  }

}

//function to get the column of a 2d array.

function getCol(inMatrix, col) {
  var column = [];
  for (var i = 0; i < inMatrix.length; i++) {
    column.push(inMatrix[i][col]);
  }
  return column;
}

//function that returns the dot product of two vectors.
function dotProduct(vector1, vector2) {
  if (vector1.length != vector2.length) { //detects if the vectors are compatible
    console.error("Dot product not possible: vectors not of equal length");
    return;
  }
  let products = [];
  let output = 0;

  for (let i = 0; i < vector1.length; i++) { //multiply each corresponding number
    products[i] = vector1[i] * vector2[i];
  }
  for (let i = 0; i < products.length; i++) { //add each product
    output += products[i];
  }
  return output;
}
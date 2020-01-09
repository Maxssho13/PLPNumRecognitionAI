class Matrix {
  constructor(dimX, dimY) {
    this.dimX = dimX; //rows
    this.dimY = dimY; //columns

    this.matrix = [];
    this.arr = [];
    //automatically creates matrix with the dimensions given. Fills every index with 0.
    for (let i = 0; i < dimX; i++) {
      for (let j = 0; j < dimY; j++) {
        this.arr[j] = 0;
      }
      this.matrix[i] = this.arr;
    }

  }
  //function to do matrix multiplication between two functions. matrix1.multiply(matrix2). overwrites matrix1
  mutliply(matrix2) {
    if (this.dimX != matrix2.dimY) { //ensures the multiplication can take place. Proper dimensions.
      console.error("Matrix multiplication error: dimensions no good");
      return;
    }
    //create the output matrix with the correct size
    var outPutMatrix = new Matrix(matrix2.dimY, matrix2.dimY);

    //iterate through each row of the first matrix
    for (var i = 0; i < this.dimX; i++) {
      console.log("hello");
      //iterate through each column of the second matrix
      for (var j = 0; j < matrix2.dimY; j++) {
        //dot product the rows of the first matrix and the columns of the second
        console.log(i, j)
        console.log(dotProduct(this.matrix[i], getCol(matrix2.matrix, j)));
        outPutMatrix.matrix[i][j] = dotProduct(this.matrix[i], getCol(matrix2.matrix, j));
        console.log(outPutMatrix.matrix[i][j]);
      }
    }
    console.table(outPutMatrix.matrix)
    return outPutMatrix;
  }

}


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
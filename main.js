const net = new Brain(4, 4, 1);
let testMatrix1 = new Matrix(2, 3);
let testMatrix2 = new Matrix(3, 2);

testMatrix1.matrix = [
  [1, 2, 3],
  [4, 5, 6]
];

testMatrix2.matrix = [
  [7, 8],
  [9, 10],
  [11, 12]
];

function setup() {
  //console.log(randomArray(net.inputLayerLength));
  //console.log(weightsInHid[0]);
  //console.table(testMatrix.matrix);
  //console.table(dotProduct([2, 1, 7], [3, 4, 5]));
  //console.table(testMatrix1.matrix);
  //console.table(testMatrix2.matrix);
  test = testMatrix1.mutliply(testMatrix2);
  //console.table(test.matrix);
}

function draw() {

}
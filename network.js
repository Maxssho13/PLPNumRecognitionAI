//create brain class with arguments for length of input, hidden, and output layer.
class Network {
  constructor(inputLayer, hiddenLayer, outLayer) {
    this.inputLayer = new Matrix(inputLayer, 1);
    this.hiddenLayer = new Matrix(hiddenLayer, 1);
    this.outLayer = new Matrix(outLayer, 1);
    this.weightsHidIn = new Matrix(hiddenLayer, inputLayer);
    this.weightsHidIn.randomize(-1, 1); //randomize the weights number between -10 and 10
    this.weightsHidInBias = new Matrix(hiddenLayer, 1);
    this.weightsHidInBias.randomize(1, 1); //initialize the weight biases as 1
  }
  //function to do the feed forward pass of the NN
  feedForward() {


    //calculate nodes in the hidden layer
    this.hiddenLayer.randomize(0, 0); //set every hidden layer node to 0
    for (let i = 0; i < this.hiddenLayer.matrix.length; i++) {
      this.hiddenLayer.matrix[i][0] += this.weightsHidInBias.matrix[i][0];
      //iterate through each node in the hidden layer
      for (let j = 0; j < this.inputLayer.matrix.length; j++) {
        //iterate through each input
        //do the weighted sum
        this.hiddenLayer.matrix[i][0] += this.weightsHidIn.matrix[i][j] * this.inputLayer.matrix[j][0];

      }
    }

  }
}
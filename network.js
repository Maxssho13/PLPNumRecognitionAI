//create brain class with arguments for length of input, hidden, and output layer.
class Network {
  constructor(inputLayer, hiddenLayer, outLayer) {
    this.inputLayer = new Matrix(inputLayer, 1);
    this.hiddenLayer = new Matrix(hiddenLayer, 1);
    this.outLayer = new Matrix(outLayer, 1);
    this.weightsHidIn = new Matrix(hiddenLayer, inputLayer);
    this.weightsHidIn.randomize(-1, 1); //randomize the weights number between -1 and 1
    this.weightsHidInBias = new Matrix(hiddenLayer, 1);
    this.weightsHidInBias.randomize(1, 1); //initialize the weight biases as 1
    this.weightsOutHid = new Matrix(outLayer, hiddenLayer);
    this.weightsOutHid.randomize(-1, 1); //randomize the weights number between -1 and 1
    this.weightsOutHidBias = new Matrix(outLayer, 1);
    this.weightsOutHidBias.randomize(1, 1) //initialize the weights biases as 1
  }

  //function to do the feed forward pass of the NN
  feedForward() {

    //calculate nodes in the hidden layer
    this.hiddenLayer.randomize(0, 0); //set every hidden layer node to 0
    for (let i = 0; i < this.hiddenLayer.matrix.length; i++) {
      //add the  biases
      this.hiddenLayer.matrix[i][0] += this.weightsHidInBias.matrix[i][0];
      //iterate through each node in the input layer
      for (let j = 0; j < this.inputLayer.matrix.length; j++) {
        //iterate through each input
        //do the weighted sum
        this.hiddenLayer.matrix[i][0] += this.weightsHidIn.matrix[i][j] * this.inputLayer.matrix[j][0];

      }
    }
    this.hiddenLayer.activate("relu"); //passes hidden layer through activation function
    

    //calculate nodes in the output outLayer
    this.outLayer.randomize(0, 0) //set every output layer node to 0

    for (let i = 0; i < this.outLayer.matrix.length; i++) {
      //add the biases
      this.outLayer.matrix[i][0] += this.weightsOutHidBias.matrix[i][0];
      //iterate through each node in the hidden outLayer
      for (let j = 0; j < this.hiddenLayer.matrix.length; j++) {
        //iterate through each hidden node
        //do the weighted sum
        this.outLayer.matrix[i][0] += this.weightsOutHid.matrix[i][j] * this.hiddenLayer.matrix[j][0];
      }
    }
    this.outLayer.activate("softmax");
  }

  
}
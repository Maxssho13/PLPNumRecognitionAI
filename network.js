class Network {
  /**
   * Neural network object
   * @param {number} inputLayer - \# of nodes in input layer
   * @param {number} hiddenLayer - \# of nodes in hidden layer
   * @param {number} outLayer - \# of nodes in output layer
   */
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
  feedForward(inputs) {

    this.inputLayer.matrix = inputs
    //calculate nodes in the hidden layer
    this.hiddenLayer.randomize(0, 0); //set every hidden layer node to 0
    for (let i = 0; i < this.hiddenLayer.matrix.length; i++) {
      //add the biases
      this.hiddenLayer.matrix[i][0] += this.weightsHidInBias.matrix[i][0];

      //iterate through each node in the input layer
      for (let j = 0; j < this.inputLayer.matrix.length; j++) {
        //iterate through each input
        //do the weighted sum
        this.hiddenLayer.matrix[i][0] += this.weightsHidIn.matrix[i][j] * this.inputLayer.matrix[j][0];

      }
    }
    // pass hidden layer over ReLU function
    this.hiddenLayer.map(relu);


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
    // pass output layer over softmax function
    this.outLayer.map(softmax);

  }
  /**
   * Training function
   * 
   * choo choo!
   * @param {number[]} targets - expected results
   * @param {number} lr - learing rate 
   */
  train(targets, lr) {

    let outputs = this.outLayer.matrix;
    let outErrors = new Matrix(this.outLayer.matrix.length, 1);


    // calculate output errors
    for (let i = 0; i < outputs.length; i++) {
      outErrors.matrix[i] = Math.pow(outputs[i] - targets[i], 2);
    }

    let hiddenErrors = new Matrix(this.hiddenLayer.matrix.length, 1);
    // caclulate hidden errors
    hiddenErrors.matrix = Matrix.multiply(Matrix.transpose(net.weightsOutHid), outErrors);


    // cost function
    let cost = 0;
    for (let i = 0; i < outputs.length; i++) {
      cost += Math.pow(outputs[i] - targets[i], 2);
    }

  }
}

/**
 * Performs ReLU function(technically leaky)
 * @param {number} x - number to run ReLU on
 */
function relu(x) {
  if (x <= 0) {
    return x * 0.01;
  } else {
    return x;
  }
}

/**
 * Performs softmax function elementwise
 * @param {number} x - current element being softmax'ed
 * @param {Matirx} inObject - the matrix object being softmax'ed
 * @returns {number} softmax of current element
 */
function softmax(x, inObject) {
  let sum = 0;
  for (let i = 0; i < inObject.rows; i++) {
    for (let j = 0; j < inObject.columns; j++) {
      sum += Math.exp(inObject.matrix[i][j]);
    }
  }
  return Math.exp(x) / sum;
}
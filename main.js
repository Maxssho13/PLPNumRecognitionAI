const net = new Brain(4, 4, 1);

function setup() {
  let weightsInHid = ranWeights(0);
  //console.log(randomArray(net.inputLayerLength));
  console.log(weightsInHid[0][1]);
}

function draw() {

}




function ranWeights(layer) { //layer is an integer between 0 and 1. 0 = ih. 1 = ho
  let arr = [];
  let final = [];
  let layers = [net.inputLayerLength, net.hiddenLayerLength, net.outLayerLength]
  for (let i = 0; i < layers[layer + 1]; i++) { //i refers to the hidden node
    for (let j = 0; j < layers[layer]; j++) { //j refers to the input node
      arr[j] = j;
    }
    final[i] = arr;
  }
  return final; //weights are in the form [i][j]
}





//function for creating a random array with arbitrary length. Numbers between 0-1
function randomArray(length) {
  let out = [];
  //iterate for the length of the desired array
  for (let i = 0; i < length; i++) {
    out[i] = Math.random();
  }

  return out;
}
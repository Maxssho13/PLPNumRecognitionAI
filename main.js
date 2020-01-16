let net = new Network(7, 8, 2);


function setup() {
  createCanvas(1000, 4000);
  frameRate(1)

  net.inputLayer.randomize(0, 1);
  net.feedForward();
  console.table(net.hiddenLayer.matrix);

}

function draw() {
  net.weightsHidIn.randomize(-1, 1);
  net.weightsOutHid.randomize(-1, 1);
  background(255);
  for (let i = 0; i < net.inputLayer.matrix.length; i++) {
    ellipse(100, 50 + i * 60, 40);
  }
  push();
  //set up variables for gaussian curve
  let a = 100; //height
  const b = .99; //position of the center of the peak
  const c = 14; //width
  let xOffset = 100; //offset in the x direction
  let yOffset; //offset in the y direction
  //draw input neurons
  for (let i = 0; i < net.inputLayer.matrix.length; i++) {
    a = -60 + i * -60;
    yOffset = -10;

    for (let j = 0; j < net.hiddenLayer.matrix.length; j++) {
      a += 60;
      yOffset += 60;
      //draw lines for the input to hidden nodes
      for (let x = 20; x < 400; x++) {
        //change width depending on weight strength
        strokeWeight(Math.pow(abs(net.weightsHidIn.matrix[j][i]), 1.5) * 4);
        //change color depending on positive or negative
        if (net.weightsHidIn.matrix[j][i] > 0) {
          stroke(0, 100, 200)
        } else {
          stroke(255, 160, 0)
        }
        //draw the lines
        line(x + xOffset, (-1 * a * b * Math.pow(b, (Math.pow(x - b, 2) / (2 * (Math.pow(c, 2)))))) + yOffset, x + xOffset, (-1 * a * b * Math.pow(b, (Math.pow(x - b, 2) / (2 * (Math.pow(c, 2)))))) + yOffset);

      }
    }
  }
  //draw lines for the hidden to output nodes
  xOffset = 500;
  for (let i = 0; i < net.hiddenLayer.matrix.length; i++) {
    a = -60 + i * -60;
    yOffset = -10;
    for (let j = 0; j < net.outLayer.matrix.length; j++) {
      a += 60;
      yOffset += 60;
      for (let x = 20; x < 350; x++) {
        strokeWeight(Math.pow(abs(net.weightsOutHid.matrix[j][i]), 1.5) * 4);
        //change color depending on positive or negative
        if (net.weightsOutHid.matrix[j][i] > 0) {
          stroke(0, 100, 200);
        } else {
          stroke(255, 160, 0)
        }
        line(x + xOffset, (-1 * a * b * Math.pow(b, (Math.pow(x - b, 2) / (2 * (Math.pow(c, 2)))))) + yOffset, x + xOffset, (-1 * a * b * Math.pow(b, (Math.pow(x - b, 2) / (2 * (Math.pow(c, 2)))))) + yOffset);
      }
    }
  }

  pop();
  //draw hidden layer neurons
  for (let i = 0; i < net.hiddenLayer.matrix.length; i++) {
    ellipse(500, 50 + i * 60, 40);
  }
  //draw output layer neurons
  for (let i = 0; i < net.outLayer.matrix.length; i++) {
    ellipse(850, 50 + i * 60, 40);
  }

}
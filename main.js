let net = new Network(7, 8, 2);
testRan = new Matrix(100, 1);
testRan.randomize(0, 100);



function setup() {
  createCanvas(1000, 1000);
  frameRate(1);
  net.inputLayer.randomize(0, 1);
  net.feedForward();
  console.table(net.hiddenLayer.matrix);

}

function draw() {
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
    //draw hidden neurons

    for (let j = 0; j < net.hiddenLayer.matrix.length; j++) {
      a += 60;
      yOffset += 60;
      //draw line
      for (let x = 20; x < 400; x += .1) {
        //change width depending on weight strength
        strokeWeight(Math.pow(abs(net.weightsHidIn.matrix[j][i]), 2) * 4)
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
  pop();
  for (let i = 0; i < net.hiddenLayer.matrix.length; i++) {
    ellipse(500, 50 + i * 60, 40);
  }
  for (let i = 0; i < net.outLayer.matrix.length; i++) {
    ellipse(850, 50 + i * 60, 40);
  }


}
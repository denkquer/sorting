var arr;
var bars;
var engine;

function setup(){

  var cnv = createCanvas( innerWidth, innerHeight);
  cnv.canvas.style.display = 'block';
  barGen(100); // Anzahl der Bars (Arraylänge) festlegen!!!
  engine = new bubbleSort();
  frameRate(60) // Hier die Framerate festlegen!!! circa 70 max..

}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function draw(){

  background(50);

  for(let i = 0; i < bars.length; i++){
    bars[i].update();
    bars[i].show();
  }

  engine.spark();
}

function bubbleSort(){
  
  this.n = arr.length;
  this.newn;
  this.i = 0;
  this.tick = 0;

  this.spark = function(){
    if(this.tick == 0){
      this.piston0();
      return;
    }
    if(this.tick == 1){
      this.piston1();
      return;
    }
  }

  this.piston0 = function(){

    if(this.n > 1){
      this.tick = 1; //zu piston 1
      this.i = 0;
    }
  }

  this.piston1 = function(){

    if(this.i<this.n-1){
      if(arr[this.i] > arr[this.i+1]){
        [arr[this.i], arr[this.i+1]] = [arr[this.i+1], arr[this.i]];
      }
      ++this.i;
    }else{
      --this.n;
      this.tick = 0; //zu piston 0
    }
  }
}

function barGen(amount){

  if(amount > 0 && !isNaN(amount)){

    bars = [];
    arr = [];

    for(let i = 0; i < amount; i++){
      bars.push(new bar());
      arr.push(i);
    }
    arr = shuffle(arr);
  }
}

function bar(){

  this.width = -1;
  this.height = -1;
  this.num = bars.length;

  this.update = function(){

    this.width = width / bars.length;
    this.height = height / bars.length * arr[this.num];

  }

  this.show = function(){

    rect(this.width * this.num , height, this.width, -this.height);
  }
}








//Fisher-Yates shuffle algorithm
function shuffle(arr0) {
  let counter = arr0.length;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = arr0[counter];
      arr0[counter] = arr0[index];
      arr0[index] = temp;
  }

  return arr0;
}
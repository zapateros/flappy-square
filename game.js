const cvs = document.getElementById("jump");
const ctx = cvs.getContext("2d");

var j = 0;
var highscore = localStorage.getItem("highscore");

//step size
const step = 2;
//time step (s)
const tstep = 0.01;

var loop;
const g = 900.81;
const v0 = 27;
var i = 0;
var n = 4;
var k = 1;
var big = 0;
var start = 270;
let random = [];
var j_old = 0;
let block = [];

const pipeImg = new Image();
pipeImg.src = "pipe.png";

const vlagImg = new Image();
vlagImg.src = "flag.png";

const slowImg = new Image();
slowImg.src = "slow.png";

block = {
    x : 310 ,
    y : start
};

pipe = {
  x : 600 ,
  y : 270
};

pipe2 = {
  x : 940 ,
  y : 270
};

let vlag = {
  x : Math.floor(Math.random()*400+100),
  y : Math.floor(Math.random()*400+100)
};

let slow = {
  x : -40,
  y : 0
};

var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

document.addEventListener('keyup', function(e){
  if(e.keyCode == 32 || ((e.keyCode == 38) && loop ==false ))
    window.location.reload();
})

function draw(){
  loop = true;
  if ((keyState[37] || keyState[65]) && block.x >0){
        block.x -= n;
  }
  if ((keyState[39] || keyState[68]) && block.x <570){
        block.x += n;
  }
  if (keyState[38] && i >20 && block.y >60){
      i = 1;
      start = block.y;
  }

  ctx.beginPath();
  ctx.fillStyle = "#D2DFFF";
  ctx.rect(0,0,600,600);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#ffcccc";
  ctx.rect(0,0,600,90);
  ctx.fill();

  ctx.fillStyle = "#990000";
  ctx.fillRect(block.x,block.y,27+big,27+big);
  ctx.strokeStyle= "black";
  ctx.strokeRect(block.x,block.y,27+big,27+big);

  if(pipe.x  < -80){
    pipe.x = 600;
    pipe.y = Math.floor((Math.random() * 270) + 270);
    j = j + 1;
  }

  if(pipe2.x < -80){
    pipe2.x = 600;
    pipe2.y = Math.floor((Math.random() * 270) + 270);
    j = j + 1;
  }

  if(j_old + 1 == j ){
    k = k + 1;
    big += 5;
    j_old = j;
  }

  random = Math.floor((Math.random() * 10000) + 1);
  if (random >9999){
    slow.x = Math.floor(Math.random()*400+100);;
    slow.y = Math.floor(Math.random()*400+100);;
  }

  pipe.x  -= n;
  pipe2.x -= n;

  ctx.drawImage(vlagImg, vlag.x, vlag.y);
  ctx.drawImage(slowImg, slow.x, slow.y);
  ctx.drawImage(pipeImg, pipe.x, pipe.y);
  ctx.drawImage(pipeImg, pipe.x, pipe.y - 600);
  ctx.drawImage(pipeImg, pipe2.x, pipe2.y);
  ctx.drawImage(pipeImg, pipe2.x, pipe2.y - 600);

  if (block.y <570 - big ){
    i = i + 1;
  }

  block.y = Math.floor(start - v0 * (0.1 * i) + 0.5 * g * (tstep * i) * (tstep * i))-10 ;

  if( ((pipe.y < block.y + 27+big) && (block.x + 27+big > pipe.x) && (block.x < pipe.x + 77 )) || ((block.x+big + 27 > pipe.x) && (block.x < pipe.x + 77 )
   && (pipe.y -200 > block.y )) || ((pipe2.y < block.y + 27+big) && (block.x+big + 27 > pipe2.x) && (block.x < pipe2.x + 77 )) || ((block.x +big+ 27 > pipe2.x)
   && (block.x < pipe2.x + 77 ) && (pipe2.y -200 > block.y )) ){
    clearInterval(game);
    loop = false;
    ctx.beginPath();
    ctx.fillStyle = "rgba(275,0,0,0.5)";
    ctx.rect(0,0,600,600);
    ctx.fill();
    ctx.font = "27px Arial";
    ctx.fillText("LOSER",200,275);
  }

  if((vlag.y < block.y + 27+big) && (block.x + 27+big > vlag.x) && (block.x < vlag.x + 27 ) && (vlag.y +27  > block.y )){
    vlag.x = Math.floor(Math.random()*400+100);
    vlag.y = Math.floor(Math.random()*400+100);
    if(big> -10){
    big -= 5;
    k -= 1;
    }
  }

  if( ((pipe.y < vlag.y + 27 ) && (vlag.x + 27  > pipe.x) && (vlag.x < pipe.x + 77 )) || ((vlag.x  + 27 > pipe.x) && (vlag.x < pipe.x + 77 )
   && (pipe.y -200 > vlag.y )) || ((pipe2.y < vlag.y + 27 ) && (vlag.x  + 27 > pipe2.x) && (vlag.x < pipe2.x + 77 )) || ((vlag.x  + 27 > pipe2.x)
   && (vlag.x < pipe2.x + 77 ) && (pipe2.y -200 > vlag.y )) ){
     vlag.x = Math.floor(Math.random()*400+100);
     vlag.y = Math.floor(Math.random()*400+100);
  }


  if( ((pipe.y < slow.y + 27 ) && (slow.x + 27  > pipe.x) && (slow.x < pipe.x + 77 )) || ((slow.x  + 27 > pipe.x) && (slow.x < pipe.x + 77 )
   && (pipe.y -200 > slow.y )) || ((pipe2.y < slow.y + 27 ) && (slow.x  + 27 > pipe2.x) && (slow.x < pipe2.x + 77 )) || ((slow.x  + 27 > pipe2.x)
   && (slow.x < pipe2.x + 77 ) && (pipe2.y -200 > slow.y )) ){
     slow.x -= n;
  }

  if((slow.y < block.y + 27+big) && (block.x + 27+big > slow.x) && (block.x < slow.x + 27 ) && (slow.y +27  > block.y )){
    slow.x=-40;
    slow.y = 0
    if( n> 2){
    n -= 1;
    }
  }

  if(highscore !== null){
      if (j > highscore) {
          localStorage.setItem("highscore", j);
      }
  }else{
      localStorage.setItem("highscore", j);
  }

  ctx.font = "20px Arial";
  ctx.fillText("Score: "+j,10,25);
  ctx.fillText("Difficulty: "+k,10,50);
  ctx.fillText("Highscore: "+highscore,10,77);
  //ctx.fillText("random: " + random, 400,25)
}

let game = setInterval(draw,tstep * 1000);

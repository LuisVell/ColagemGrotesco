let barriga, barrigaC, buraco, grotesco, normalImg, goreImg, paper;
let bgNormal, bgGrotesco, lNormal;
let BarrigaLayer,AlienLayer;

let audio;
let audioControl = true;

let SizeChange;

let StrokeSize = 100;

let clickCount = 0;
let rotationF = -1;
let rotation = 0.1;

function preload() {
    paper = loadImage("midia/Paper.jpg");
    audio = loadSound("midia/1280.mp3"); //https://bigsoundbank.com/stomach-gurgling-1-s1280.html
    barriga = loadImage("midia/Barriga.png");
    barrigaC = loadImage("midia/Barriga Costurada.png");
    buraco = loadImage("midia/Buraco.png");
    grotesco = loadImage("midia/Grotesco.png");
    normalImg = loadImage("midia/Normal.png");
    goreImg = loadImage("midia/Gore.png");
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    SizeChange = width/1920;
    cnv.parent('Draw');
    Reset()
    alert('Enter - tela cheia\nClique e Arraste para ver o grotesco aparecer')
}

function Reset(){
    audioControl = true;
    clickCount = 0;
    rotation = 0.1;
    //BgNormal
    bgNormal = createGraphics(width, height);
    bgNormal.image(paper,0,0,width,height)
    bgNormal.strokeWeight(StrokeSize);
    bgNormal.blendMode(REMOVE);

    //Barriga
    barrigaLayer = createGraphics(width,height);
    barrigaLayer.strokeWeight(StrokeSize);
    barrigaLayer.push();
    barrigaLayer.translate(width/2,height/2);
    barrigaLayer.imageMode(CENTER);
    barrigaLayer.image(barriga,0,0,900*SizeChange,1080*SizeChange);
    barrigaLayer.pop();
    barrigaLayer.blendMode(REMOVE);

    //Nomal
    lNormal = createGraphics(width,height);
    lNormal.image(normalImg,0,0, width, height);
    lNormal.strokeWeight(StrokeSize);
    lNormal.blendMode(REMOVE);
}


function draw() {
    //Fundo Gore
    for(let x =0;x<100;x++){
        for(let y=0;y<100;y++){
            image(goreImg,x*(256*SizeChange),y*(256*SizeChange),256*SizeChange,256*SizeChange)
        }
    }
    imageMode(CENTER);
    push()
    translate(width/2,height/2)
    rotate(radians(rotation))
    image(barrigaC,0,0,900*SizeChange,1080*SizeChange)
    pop()
    if(clickCount>10){
        if(audioControl){
            audioControl=false
            audio.play()
        }
        rotation = 0
        image(buraco,(width/2)+45,(height/2)+40,568*SizeChange,783*SizeChange)
    }
    imageMode(CORNER);
    image(grotesco, 0, 0, width, height);
    image(bgNormal, 0, 0);
    image(barrigaLayer, 0, 0);
    image(lNormal, 0, 0);

    if(mouseIsPressed) {
        lNormal.line(pmouseX, pmouseY, mouseX, mouseY);
        bgNormal.line(pmouseX, pmouseY, mouseX, mouseY);
        barrigaLayer.line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function mouseClicked(e){
    if(dist((width/2)+45,(height/2)+40,mouseX,mouseY)<80){
        clickCount+=1;
        rotation = rotation==9? -9:rotation==0?0:9
    }
}

function keyPressed(){
    if(keyCode==ENTER){
        fullscreen(!fullscreen())
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    SizeChange = width/1920;
    Reset()
  }
ac = "";
bottle = "";
fan = "";
lightbulb = "";
tv = "";
objects = [];
status="";

function preload(){
    ac = loadImage("ac.jpg");
    bottle = loadImage("bottle.webp");
    fan = loadImage("fan.jpg");
    lightbulb = loadImage("lightbulb.jpg");
    tv = loadImage("tv.png");
}

function setup(){

    canvas = createCanvas(400, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

    
}


function modelLoaded(){
    console.log("Model is loaded");
    status = true;
    objectDetector.detect(lightbulb, gotResult);
    
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}


function draw(){

    image(lightbulb, 0, 0,400,400);
    if(status != ""){
       
        
        for(i=0; i <objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects : " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%" , objects[i].x +15, objects[i].y-15);

            noFill();

            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
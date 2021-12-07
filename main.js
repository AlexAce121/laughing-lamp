inputpls = "";
statuses = "";
objects = [];

function preload() {
}

function setup() {
    canvas = createCanvas(480 , 380);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
}

function START() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    inputpls = document.getElementById("sup").value;
}

function draw(){
    image(video , 0 , 0 , 480 , 380);

    if (statuses != "") {
        r = random(255);
        g = random(255);
        b = random(255);     


        objectDetector.detect(video , gotResult)
       for (i = 0; i < objects.length; i++) { 
           if (objects[i].label==inputpls) {
            document.getElementById("status").innerHTML = "Status: Object Found" ;
           
           } else {
            document.getElementById("status").innerHTML = "Status: Object Not Found" ; 
           
           }
       
        
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
       rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
       }
    }
}



function modelLoaded() {
 console.log('Model Loaded');
 statuses = true
}

function gotResult(error , results) {
    if (error) {
       console.log(error); 
    }
    console.log(results);
    objects = results;
}
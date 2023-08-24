status_object="";
sound="";
objects=[];
object_name="";

function setup(){
    canvas=createCanvas(500,350);
    canvas.position(350,200);
    video=createCapture(VIDEO);
    video.size(500,350);
    video.hide();
    

}

function preload(){
 sound=loadSound('myalarm.mp3');
 
}


function gotResults(error,results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects_1=results;
        
    
}

function draw(){
    
    image(video,0,0,500, 350);
    if (status_object != ""){
        object_detection.detect(video, gotResults);
        for(var i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected Yayy!!!!!!"
            stroke("green");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" - "+percentage+"%",objects[i].x+20,objects[i].y+15);
            object_name=objects[i].label;
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            sound.stop();
        }
        if(object_name != "person" || objects.length == 0 ){
            sound.play();
        }
    }

   
    
    
}

function start(){
    object_detection=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded(){
    console.log("model Loaded");
   status_object=true;

}

function gotResults(error, result){
    if(error){
        console.error();
    }
    else{
        console.log(result);
        objects=result;
    }
}

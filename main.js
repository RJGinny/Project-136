video = "";
objstatus = "";
objects = []
function preload()
{
    alarm = loadSound('alarm.wav');
    
}
function setup()
{
canvas = createCanvas(480, 380);
canvas.center();
video = createCapture(VIDEO)
video.size( 480, 380)
video.hide()
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if(objstatus!="")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            
              
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent + "%", objects[i].x + 15, objects[i].y )
    noFill();
    stroke("#FF0000");
    rect(objects[i].x, objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if (objects[i].label=="person")
    {
        document.getElementById("number_of_objects").innerHTML = "BABY FOUND!"
        alarm.stop()
    }
    else {
        document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND!"
        alarm.play()
}
        }
    }

}
function gotResults(error, results)
{
    objects=results

}
function modelLoaded() 
{
    console.log("Model Loaded!");
    objstatus = true;
    
}

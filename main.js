music = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    PoseNet = ml5.poseNet(video, moddelLoaded);
    PoseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("lightBlue");
    stroke("lightBlue");
    circle(leftWristX, leftWristY, 20)
    num_leftWristY = Number(leftWristY);
    volume = floor(num_leftWristY / 500).toFixed(2);
    document.getElementById("volume").innerHTML = "volume:" + volume;
    music.setVolume(volume);
}
function moddelLoaded(){
    console.log("Posenet moddel has been initialized!");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Right wrist values are; rightWristX = " + rightWristX + ", and rightWristY = " + rightWristY + ".");
        console.log("Left wirst values are; leftWristX = " + leftWristX + ", and leftWristY = " + leftWristY + ".");
    }
}
function playMusic(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}
function pauseMusic(){
    music.stop();
}

import {setupSockets} from "./sockets.js";

window.onload = function() {
    const serverURL = window.location.hostname + ":" +  window.location.port;
    const socket = io.connect(serverURL, {secure: true});

    setupSockets(socket);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    var xspeed = 0;
    var yspeed = 0;
    var irudia = new Image();
    irudia.src = "../spritesheet.png";
    irudia.onload = getTile;

    var sprites = new Image();
    sprites.src = "../spritesheet.png";
    sprites.onload = getTile;


    function getTile() {
        context.drawImage(irudia, 0, 0);
        context.clearRect(500, 0, canvas.width, canvas.height);
        context.drawImage(sprites, x, y, 28, 36, 500, 0, 56, 72);
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "red";
        context.rect(x, y, 28, 36);
        context.stroke();

        context.font = "bold 12px arial"
        context.fillStyle="red";
        context.textAlign = "right";
        context.textBaseLine = "top";
        context.fillText('('+x+','+y+')',470,15);

        xspeed = 0;
        yspeed = 0;
    }

    let keysPressed = {}
    document.addEventListener('keydown', (event) => {
        event.preventDefault();
        keysPressed[event.key] = true;
        gestorTeclas(keysPressed);

    });

    document.addEventListener('keyup', (event) => {
        keysPressed[event.key] = false;
        //gestorTeclas(keysPressed);
    });


    var gestorTeclas = function(keys) {
        if (keys.ArrowUp){
            if(y != 0){
                yspeed -= 3;
            }
        }
        if (keys.ArrowLeft){
            if(x != 0){
                xspeed -= 3;
            }
            else{
                socket.emit('crash')
            }
        }
        if (keys.ArrowDown){
            if (y != (444)){
                yspeed += 3;
            }
        }
        if (keys.ArrowRight){
            if(x != (476-29)){
                xspeed += 3;
            }
            else{
                socket.emit('crash')
            }
        }
        x+=xspeed;
        y+=yspeed;

        console.log(x, y)
        console.log(xspeed,yspeed)
        console.log(keys)
        getTile();

    }
}
export var setupSockets = function (socket) {
    // register desktop connection
    socket.emit('desktop-connect');

    socket.onopen = function(){
        console.log("Socket conectado!");
    }

    socket.on('crash', function (event) {
        socket.emit('crash')
    });

    socket.on('phone-move', function (data){
        if (data > 0){
            document.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowRight"}));
            document.dispatchEvent(new KeyboardEvent("keyup", {key: "ArrowLeft"}));
        } else if (data < 0){
            document.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowLeft"}));
            document.dispatchEvent(new KeyboardEvent("keyup", {key: "ArrowRight"}));
        }

    });
}
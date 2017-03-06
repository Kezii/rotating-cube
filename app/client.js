
/*
        COMMUNICATION STUFF
*/

var socket = io();

function motion(event){
    var lol={
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
    }
    socket.emit('acc', lol);
}

function orientation(event){
    var lol={
        x: event.alpha,
        y: event.beta,
        z: event.gamma
    }

    document.getElementById("debug").innerHTML=Math.floor(lol.x) + " " + Math.floor(lol.y) + " " + Math.floor(lol.z)
    socket.emit('rot', lol);
}

function client(){
  if(window.DeviceMotionEvent && window.DeviceOrientationEvent){
    window.addEventListener("devicemotion", motion, false);
    window.addEventListener("deviceorientation", orientation, false);
  }else  alert("unsupported");

  socket.on("ping", function(ms){
      console.log("ping")
      socket.emit('pong',5)
  })
}

function receive(){
    init();
    var nsp = io('/data');
    nsp.on('acc', function(data){
     // console.log("acc", data);

    //   mesh.position.x=data.x/10
    //   mesh.position.y=data.y/10
    //   mesh.position.z=data.z/10
    });
    nsp.on('rot', function(data){

    //    mesh.rotation=new THREE.Euler(data.x* Math.PI / 180,data.y* Math.PI / 180,data.z* Math.PI / 180,"XYZ")
      mesh.rotation.x=data.x* Math.PI / 180;
      mesh.rotation.y=data.y* Math.PI / 180;
      mesh.rotation.z=data.z* Math.PI / 180

      mesh.rotateZ(Math.PI/2)

    });
}

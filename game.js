//COLORS
var Colors = {
    skyBlue: 0x86ebcc,
    ground: 0x332609,
    golden: 0xebaf2a,
    white: 0xffffff,
    grey: 0xc7c9c8
};

// THREEJS RELATED VARIABLES

var camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

var scene;

var currentAngle = 0;

//TESTING RAYCASTING
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var controls;


var currentZ = 0;

var HEIGHT, WIDTH
var NWIDTH = 1024;
var NHEIGHT = 786;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
  //
  camera.position.x = NWIDTH/2;
  camera.position.y = NHEIGHT/2;
  camera.position.z = 1000;

  camera.lookAt(NWIDTH/2,NHEIGHT/2,0);


  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container = document.getElementById('glcanvas');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);

  scene = new THREE.Scene();

  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  document.onkeydown = handleKeyDown;

  //addBox(0,0,WIDTH,HEIGHT, 0xff0000);
  mondrian(0, 0, NWIDTH, NHEIGHT, 0x000000);


}

function mondrian(x,y,w,h, color){
  currentZ += 1
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    addBox(x,y,w,h,color);

    if((w > NWIDTH*0.5 && h > NHEIGHT*0.5)){
      nx= split(w)
      ny= split(h)
      mondrian(x,y,nx,ny,color);
      mondrian(x+nx,y,w-nx,ny,color);
      mondrian(x,y+ny,nx,h-ny,color);
      mondrian(x+nx,y+ny,w-nx,h-ny,color)
    }
    else if(w > NWIDTH*0.5){
      nx= split(w)
      mondrian(x,y, nx, h,color)
      mondrian(x+nx,y,w-nx, h,color)

    }
    else if(h > NHEIGHT*0.5){
      ny= split(h)
      mondrian(x,y,w,ny,color)
      mondrian(x,y+ny,w,h-ny,color)
    }

    else if((canSplit(w) && canSplit(h))){
      nx= split(w)
      ny= split(h)
      mondrian(x,y,nx,ny,color);
      mondrian(x+nx,y,w-nx,ny,color);
      mondrian(x,y+ny,nx,h-ny,color);
      mondrian(x+nx,y+ny,w-nx,h-ny,color)
    }
    else if(canSplit(w)){
      nx= split(w)
      mondrian(x,y, nx, h,color)
      mondrian(x+nx,y,w-nx, h,color)

    }
    else if(canSplit(h)){
      ny= split(h)
      mondrian(x,y,w,ny,color)
      mondrian(x,y+ny,w,h-ny,color)
    }
    else{
      addFilledBox(x,y,w,h,get_color());
      return true;
    }
}

function get_color(){
  r = Math.random();
  if (r < 0.0866){
    return 0xff0000;
  }
  else if (r < 0.1660){
    return 0x00ff00;
  }
  else if (r < 0.25){
    return 0x0000ff;
  }
  else{
    return 0xffffff;
  }
}

function canSplit(dim){
  if(dim*1.5 > 120){
    num = 120+Math.random()*dim*1.5;
    if(num < dim){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}

function split(dim){
  var splitter =  (33+Math.random()*33)/100;
  var splitt = splitter*dim ;
  return splitt;
}

function addBox(x,y,w,h,ncolor){
  x = x + w/2;
  y = y + h/2;
  depth = 20+Math.random()*20
  var geomBox1 = new THREE.BoxGeometry(w, 1, 1, 1, 1, 1);
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x,y-h/2,currentZ);
  scene.add(box1);

//Second box
  var geomBox1 = new THREE.BoxGeometry(w, 1, 1, 1, 1, 1)
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x,y+h/2,currentZ);
  scene.add(box1);

  var geomBox1 = new THREE.BoxGeometry(1, h, 1, 1, 1, 1);
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x-w/2,y,currentZ);
  scene.add(box1);

  var geomBox1 = new THREE.BoxGeometry(1, h, 1, 1, 1, 1);
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x+w/2,y,currentZ);
  scene.add(box1);

}

function addFilledBox(x,y,w,h,ncolor){
  x = x + w/2;
  y = y + h/2;

    var geomBox1 = new THREE.BoxGeometry(w, h, 1, 1, 1, 1);
    var boxMat1  = new THREE.MeshPhongMaterial(
                               { color : ncolor});

    var box1 = new THREE.Mesh(geomBox1, boxMat1);

    box1.position.set(x,y,currentZ);
    scene.add(box1);
}



// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}



function loop() {
  camera.lookAt(NWIDTH/2,NHEIGHT/2,0);
  renderer.render(scene, camera);
  // console.log(renderer.info.memory);
  requestAnimationFrame(loop);



}


function initGame() {

  createScene();
  console.log(renderer);
  loop();

}


function handleKeyDown(keyEvent){

   if(keyEvent.key == "r"){
     camera.position.x = NWIDTH/2;
     camera.position.y = NHEIGHT/2;
     camera.position.z = 1000;
   }

  if(keyEvent.key == "ArrowLeft"){
    //moving left
    camera.position.x -= 50;

  }
  if(keyEvent.key == "ArrowRight"){
    //moving right
    camera.position.x += 50;
  }

  if(keyEvent.key == "ArrowDown"){
    //moving left
    camera.position.y -= 50;

  }
  if(keyEvent.key == "ArrowUp"){
    //moving right
    camera.position.y += 50;
  }





}

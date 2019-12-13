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


  //addBox(0,0,WIDTH,HEIGHT, 0xff0000);
  mondrian(0, 0, NWIDTH, NHEIGHT, 0x000000);


}

function mondrian(x,y,w,h, color){
    addBox(x,y,w,h,color);

    if((w > NWIDTH*0.5 && h > NHEIGHT*0.5) ||(canSplit(w) && canSplit(h))){
      nw = split(w);
      nh = split(h);
      mondrian(x,y,nw,nh, color);
    }
    //   mondrian(x+nw,y,w-nw,nh, color);
    //   mondrian(x,y+nh,nw,h-nh, color);
    //   mondrian(x+nw,y+nh,w-nw,h-nh, color);
    // }
    // else if(w > NWIDTH*0.5 || canSplit(w)){
    //   nw = split(w);
    //   mondrian(x,y,nw,h, color);
    //   mondrian(x+nw,y,w-nw,h, color);
    //
    // }
    // else if(h > NHEIGHT*0.5 || canSplit(h)){
    //   nh = split(h);
    //   mondrian(x,y,w,nh, color);
    //   mondrian(x,y+nh,w,h-nh, color);
    //
    // }
    else{
      return true;
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
  return ((1+Math.random())/3)*dim;
}

function addBox(x,y,w,h,ncolor){

  x = x + w/2;
  y = y + h/2;

  var geomBox1 = new THREE.BoxGeometry(w, 10, 10, 1, 1, 1);
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x,y-h/2,0);
  scene.add(box1);

//Second box
  var geomBox1 = new THREE.BoxGeometry(w, 10, 10, 1, 1, 1)
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x,y+h/2,0);
  scene.add(box1);

  var geomBox1 = new THREE.BoxGeometry(10, h, 0, 1, 1, 1);
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x-w/2,y,0);
  scene.add(box1);

  var geomBox1 = new THREE.BoxGeometry(10, h, 10, 1, 1, 1);
  var boxMat1  = new THREE.MeshPhongMaterial(
                             { color : ncolor});

  var box1 = new THREE.Mesh(geomBox1, boxMat1);

  box1.position.set(x+w/2,y,0);
  scene.add(box1);

}
// function addBox(x,y,w,h, ncolor){
//     xi = x;
//     yi = y;
//     console.log(xi,yi);
//     for(var i = 0; i < w; i++){
//
//       var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
//       var boxMat  = new THREE.MeshPhongMaterial(
//                                  { color : ncolor});
//
//       var box = new THREE.Mesh(geomBox, boxMat);
//
//       box.position.set(xi,yi,0);
//       xi+=10;
//       scene.add(box);
//
//     }
//     for(var i = 0; i < w; i++){
//
//       var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
//       var boxMat  = new THREE.MeshPhongMaterial(
//                                  { color : ncolor});
//
//       var box = new THREE.Mesh(geomBox, boxMat);
//
//       box.position.set(xi,yi,0);
//       yi+=10;
//       scene.add(box);
//
//     }
//     for(var i = 0; i < w; i++){
//
//       var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
//       var boxMat  = new THREE.MeshPhongMaterial(
//                                  { color : ncolor});
//
//       var box = new THREE.Mesh(geomBox, boxMat);
//
//       box.position.set(xi,yi,0);
//       xi-=10;
//       scene.add(box);
//
//     }
//     for(var i = 0; i < w; i++){
//
//       var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
//       var boxMat  = new THREE.MeshPhongMaterial(
//                                  { color : ncolor});
//
//       var box = new THREE.Mesh(geomBox, boxMat);
//
//       box.position.set(xi,yi,0);
//       yi-=10;
//       scene.add(box);
//     }
//
// }



// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}



function loop() {

  renderer.render(scene, camera);
  // console.log(renderer.info.memory);
  requestAnimationFrame(loop);



}


function initGame() {

  createScene();
  console.log(renderer);
  loop();

}

var renderer,
  scene,
  camera,
  myCanvas = document.getElementById("myCanvas");

// SCENE
scene = new THREE.Scene();
// RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});
renderer.setClearColor(0xffeefe, 1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// CAMERA
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
//LIGHTS;
var light = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(light);
var light2 = new THREE.PointLight(0xffffff, 3, 100);
light2.position.set(3, 2, 1);
scene.add(light2);

// LOADER

var loader = new THREE.GLTFLoader();
loader.load("./a-key.glb", handle_load);

var key;

function handle_load(gltf) {
  var scale = 1;
  key = gltf.scene.children[0];
  key.name = "body";
  key.position.set(0, 0, 0);
  key.rotation.set(1.5, 0, -0.5);
  key.scale.set(scale, scale, scale);
  key.castShadow = true;
  key.recieveShadow = true;
  scene.add(key);
}
camera.position.z = 5;

var animate = function() {
  requestAnimationFrame(animate);
  render();
};

var render = function() {
  if (key) {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    key.rotation.z += 0.001;
  }
};

document.addEventListener("keydown", onDocumentkeyDown, false);
document.addEventListener("keyup", onDocumentkeyup, false);
var down = false;
function onDocumentkeyDown(event) {
  if (event.keyCode == 32 && down == false) {
    down = true;
    key.position.z -= 1;
    key.children[0].material.color.setHex(0xfb7029);
  }
}
function onDocumentkeyup(event) {
  console.log(event);
  if (event.keyCode == 32) {
    down = false;
    key.position.z += 1;
    key.children[0].material.color.setRGB(
      0.1607843137254902,
      0.4392156862745098,
      0.984313725490196
    );
    console.log(key.children[0].material);
  }
}

animate();

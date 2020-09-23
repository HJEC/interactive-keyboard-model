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
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

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
var spotLight = new THREE.SpotLight(0xffffff, 3, 50, 50);
spotLight.position.set(5, 2, 10);
spotLight.castShadow = true;
spotLight.shadow = new THREE.LightShadow(
  new THREE.PerspectiveCamera(20, 1, 1, 1000)
);
scene.add(light, spotLight);

var shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
shadowCameraHelper.visible = true;
// scene.add(shadowCameraHelper);

// LOADER

var loader = new THREE.GLTFLoader();
loader.load("./a-key.glb", handle_load);

var key;

function handle_load(gltf) {
  gltf.scene.traverse(function(node) {
    if (node.isMesh || node.isLight) node.castShadow = true;
    if (node.isMesh || node.isLight) node.receiveShadow = true;
  });

  var scale = 1;
  key = gltf.scene.children[0];
  key.name = "body";
  key.position.set(0.5, 0.5, 1.5);
  key.rotation.set(1.7, 0.02, -0.75);
  key.scale.set(scale, scale, scale);
  scene.add(gltf.scene);
}

var geometry = new THREE.PlaneGeometry(10, 10, 32);
var material = new THREE.MeshPhongMaterial({ color: 0x546dad });
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = 30;
plane.position.z = 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

camera.position.z = 5;
var animate = function() {
  requestAnimationFrame(animate);
  render();
};

var render = function() {
  if (key) {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    key.rotation.z += 0.007;
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
  if (event.keyCode == 32) {
    down = false;
    key.position.z += 1;
    key.children[0].material.color.setRGB(
      0.1607843137254902,
      0.4392156862745098,
      0.984313725490196
    );
  }
}

animate();

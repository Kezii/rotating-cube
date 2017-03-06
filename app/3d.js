var camera, scene, renderer;
var geometry, material, mesh;




function buildAxis(src, dst, colorHex, dashed) {
  var geom = new THREE.Geometry(),
    mat;

  if (dashed) {
    mat = new THREE.LineDashedMaterial({
      linewidth: 3,
      color: colorHex,
      dashSize: 3,
      gapSize: 3
    });
  } else {
    mat = new THREE.LineBasicMaterial({
      linewidth: 3,
      color: colorHex
    });
  }

  geom.vertices.push(src.clone());
  geom.vertices.push(dst.clone());
  geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

  var axis = new THREE.Line(geom, mat, THREE.LinePieces);

  return axis;

}

function buildAxes(length) {
  var axes = new THREE.Object3D();

  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

  return axes;

}

function init() {


  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 3
  camera.position.y = 3
  camera.position.x = 3


  var gui = new dat.GUI();

  var f1 = gui.addFolder('Camera Position');
  f1.add(camera.position, 'x', -10, 10);
  f1.add(camera.position, 'y', -10, 10);
  f1.add(camera.position, 'z', -10, 10);



  camera.rotation.x = -Math.PI

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(1, 0.1, 2);

  material = new THREE.MeshBasicMaterial({
    color: 0xfff999fff,
    wireframe: true
  })
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);


  // var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
  // var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
  // var floor = new THREE.Mesh( geometry, material );
  // floor.material.side = THREE.DoubleSide;
  // floor.rotation.x = 90*0.0174533;
  // scene.add( floor );

  axes = buildAxes(100);
  scene.add(axes)

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  animation();

}

function animation() {
  window.requestAnimationFrame(animation);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // mesh.rotation.x = Date.now() * 0.00005;
  // mesh.rotation.y = Date.now() * 0.0001;

  renderer.render(scene, camera);

}

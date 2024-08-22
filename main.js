import * as THREE from "three";
import { MathUtils, Vector3 } from "three";
import { Sky } from 'three/addons/objects/Sky.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";
// tela
const w = window.innerWidth
const h = window.innerHeight

// render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);



document.body.appendChild(renderer.domElement)

// campo de visáo do usuario
const fieldOfView = 75;

// aspect ?
const aspect = w / h;

// distancia maxima que o site vai renderizar objetos
const near = 0.1;

//quao longe vai renderizar
const far = 10;

const camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far);
camera.position.z = 3;


const scene = new THREE.Scene();

// controle de rotação

const sky = new Sky();
sky.scale.setScalar(450000);

const phi = MathUtils.degToRad(90);
const theta = MathUtils.degToRad(180);
const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

sky.material.uniforms.sunPosition.value = sunPosition;

scene.add(sky);



const controls = new OrbitControls(camera, renderer.domElement)

//nao sei ainda
controls.enableDamping = true
//o quao fluido é a rotação quanto maior o numero menos fluido
controls.dampingFactor = 0.03


// geometria , tipo de mesh exmeplo, cubo esphera etc..
// tipo de material se pe metalico por exemplo
const geometry = new THREE.IcosahedronGeometry(1, 5); // Create a cube geometry
const material = new THREE.MeshStandardMaterial({

    color: "white",

    // mostra vertices e edges do objeto
    flatShading: true
})




// a mesh e o tipo de eobjeto mais seu material 

const mesh = new THREE.Mesh(geometry, material);

const wireMat = new THREE.MeshBasicMaterial({
    color: "white",
    wireframe: true,
})

const wireMesh = new THREE.Mesh(geometry, wireMat);
wireMesh.scale.setScalar(1.001)

mesh.add(wireMesh)



// const directionalLight = new THREE.DirectionalLight("#FF00F7", 2);
// scene.add(directionalLight);


// tipo de iluminacao
const hemiLight = new THREE.HemisphereLight("red", "blue", 1.5)

scene.add(mesh);
scene.add(hemiLight)





// funcao para animar a cena
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    //udpate por frame do control
    controls.update()
    // mesh.rotation.x += 0.005
    mesh.rotation.y += 0.001

}

animate();
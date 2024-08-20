import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// tela
const w = window.innerWidth
const h = window.innerHeight

// render
const renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(w,h);



document.body.appendChild(renderer.domElement)

// campo de visáo do usuario
const fieldOfView = 75;

// aspect ?
const aspect = w/ h;

// distancia maxima que o site vai renderizar objetos
const near = 0.1;

//quao longe vai renderizar
const far = 10;

const camera = new THREE.PerspectiveCamera(fieldOfView,aspect,near,far);
camera.position.z =3;


const scene =new THREE.Scene();

// controle de rotação



const controls = new OrbitControls(camera, renderer.domElement)

//nao sei ainda
controls.enableDamping = true
//o quao fluido é a rotação quanto maior o numero menos fluido
controls.dampingFactor =0.03


// geometria , tipo de mesh exmeplo, cubo esphera etc..
// tipo de material se pe metalico por exemplo
const geometry = new THREE.TorusKnotGeometry(4,0.1,100,10); // Create a cube geometry
const material =  new THREE.MeshStandardMaterial({

    color: "white",

    // mostra vertices e edges do objeto
    flatShading:true
})




// a mesh e o tipo de eobjeto mais seu material 

const mesh = new THREE.Mesh(geometry,material);

const wireMat = new THREE.MeshBasicMaterial({
    color : "white",
    wireframe: true,
})

const wireMesh = new THREE.Mesh(geometry,wireMat);
wireMesh.scale.setScalar(1.001)

mesh.add(wireMesh)



// tipo de iluminacao
const hemiLight = new THREE.HemisphereLight("red" ,"blue",1.5)

scene.add(mesh);
scene.add(hemiLight)


// funcao para animar a cena
function animate(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate);

    //udpate por frame do control
    controls.update()
    // mesh.rotation.x += 0.005
    mesh.rotation.y += 0.001

}

animate();
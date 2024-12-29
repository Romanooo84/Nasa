import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import image from '../../media/3884071286_92de0b5a98_o.jpg';
import moonImage from '../../media/j341xwrkvrduzmdlcsiymq8wz6ev.jpg'
import asteroidImage from '../../media/g6zx8pfyhftrfsut3xcq-680x383.jpg'
import { countCoorodinates } from '../../hooks/coordinates';


interface Coordinate {
  x: number;
  y: number;
  z: number;
  id: string;
}


interface CoordinatesProps {
  coordinates: Coordinate[];
}

interface Scaled {
  x: number;
  y: number;
  z: number;
  id: string
}

const EarthAnimation: React.FC<CoordinatesProps>  = (coordinates) => {
  const [moonCoordinates, setmoonCoordinates] = useState<Scaled[] | undefined>(undefined)
  const mountRef = useRef<HTMLDivElement | null>(null);
  const earthRadius = 6378
  let mainWidth:number
  let mainHeight:number

  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainWidth = mainElement.clientWidth
    mainHeight = mainElement.clientHeight
    console.log('Szerokość (clientWidth):', mainElement.clientWidth);
    console.log('Wysokość (clientHeight):', mainElement.clientHeight);
  } else {
    console.warn('<main> nie istnieje w DOM.');
  }


  useEffect(() => {
    
    const fetchMoonData = async () => {
      const data = await countCoorodinates('301',384400);
      setmoonCoordinates(data)
    };
    fetchMoonData ();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const scale = 1/earthRadius
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    
    const boxes =[]
    for(let i=0; i<coordinates.coordinates.length; i++){ 
      if (coordinates.coordinates[i].x===null)
      {continue}
      boxes.push({
        x:coordinates.coordinates[i].x*scale,
        y:coordinates.coordinates[i].y*scale,
        z:coordinates.coordinates[i].z*scale,
        color: 'white',
        label: coordinates.coordinates[i].id
      })
    }

   
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mainWidth, mainHeight);
    console.log(window.innerWidth * 0.65)
    camera.aspect = mainWidth/ mainHeight;
      renderer.setClearColor(0x000000, 0)
       

    window.addEventListener('resize', () => {
      renderer.setSize(mainWidth, mainHeight);
      camera.aspect = mainWidth/ mainHeight;
      camera.updateProjectionMatrix();
  });

    const mountNode = mountRef.current; // Capture the mountRef value in a variable
    mountNode.appendChild(renderer.domElement);

    // Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(image);

    // Earth  geometry
    const sphereRadius = 1;
    const geometry = new THREE.SphereGeometry(sphereRadius, 100, 100);
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    
    // Moon texture
    const moonTextureLoader = new THREE.TextureLoader();
    const moonTexture = moonTextureLoader .load(moonImage);

    // Moon geometry
    const moonRadius = 1737*scale ;
    const moonGeometry = new THREE.SphereGeometry(moonRadius , 100, 100);
    const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
    const moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
    if (moonCoordinates) {
      moonSphere.position.set(
        moonCoordinates[0].x * scale,
        moonCoordinates[0].y * scale,
        moonCoordinates[0].z * scale
      );
    }
    scene.add(moonSphere);

    // Moon label
    const createLabelTexture = (label: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return new THREE.Texture(canvas);
  
      context.font = '50px Arial';
      context.fillStyle = 'white';
      context.fillText(label, 10, 40);
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };
  
    const spriteMaterial = new THREE.SpriteMaterial({
      map: createLabelTexture('Moon'),
      transparent: true
    });
  
    const sprite = new THREE.Sprite(spriteMaterial);
    if (moonCoordinates) {
      sprite.position.set(
        moonCoordinates[0].x * scale,
        moonCoordinates[0].y * scale + 0.3,
        moonCoordinates[0].z * scale
      );
    } 
    sprite.scale.set(2, 2, 1); 
    scene.add(sprite);

    // Ateroid
    boxes.map(item => {

      const asteroidTextureLoader = new THREE.TextureLoader();
      const asteroidTexture = asteroidTextureLoader .load(asteroidImage);

      // Asteroid size
      const objectSize = 0.05;
      const objectGeometry = new THREE.SphereGeometry(objectSize, 10, 5);
      const objectMaterial = new THREE.MeshBasicMaterial({ map: asteroidTexture});
      const object = new THREE.Mesh(objectGeometry, objectMaterial);
      object.position.set(item.x, item.y, item.z);
      scene.add(object);
    
      // Asteroid abel
      const createLabelTexture = (label: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return new THREE.Texture(canvas);
    
        context.font = '50px Arial';
        context.fillStyle = 'white';
        context.fillText(label, 10, 40); 
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
    
      const spriteMaterial = new THREE.SpriteMaterial({
        map: createLabelTexture(item.label),
        transparent: true
      });
    
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(item.x, item.y + 0.1, item.z); 
      sprite.scale.set(2, 2, 2); 
      scene.add(sprite);
    });
    
    camera.position.z = 20;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.3
    controls.minDistance = 10; 
    controls.maxDistance = 300; 
    const renderScene = () => {
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(renderScene);

    return () => {
      if (mountNode) { 
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [coordinates.coordinates, moonCoordinates]);

  return <div ref={mountRef} />;
};

export default EarthAnimation;

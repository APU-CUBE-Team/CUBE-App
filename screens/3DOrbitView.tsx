import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader, loadAsync } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';
import * as React from 'react';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Camera,
  Object3D,
  SphereGeometry,
  MeshPhongMaterial,
  MeshBasicMaterial,
  TorusGeometry,
} from 'three';

import { resetOrientation } from '../hooks/resetOrientation';
// import globeImage from '../assets/images/globe.png'
// const globeImageUri = Image.resolveAssetSource(globeImage).uri
// const globeUri = copyAssetToCacheAsync(require('../assets/images/globe.png'), 'globe');
// const globeText = {globeUri}
// let globeImageUri = Image.resolveAssetSource(globeText).uri
// alert(globeImageUri)
// if (globeImageUri.includes('asset://'))
//   globeImageUri = globeImageUri.replace('asset://', 'file://')
// const globeText = require('https://cdn.discordapp.com/attachments/806317258594320395/806317442858483722/globe.png')

export default function Orbit() {
  resetOrientation();

  const [camera, setCamera] = React.useState<Camera | null>(null);
  

  let timeout;

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = "#fff";

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 50);
    
    setCamera(camera);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const pointLight = new PointLight("#805020", 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);


    /////////////////////////////

    let globe = new Object3D();
    let orbitPosition = new Object3D();
    let orbitTracker = new Object3D();
    orbitTracker.add( orbitPosition )
    scene.add(globe)
    scene.add(orbitTracker)

    //const globeText = {globeUri, width: 1800}

    const asset = Asset.fromModule(require('../assets/images/globe.png'));

    await asset.downloadAsync();  
    //alert(asset)
    alert(asset.localUri)
    asset.localUri = asset.localUri?.replace(":/", "://")
    //const globeUri = await copyAssetToCacheAsync(asset.localUri, 'globe');
    //alert(globeUri)
    const globeTexture = new TextureLoader().load(asset);

    
    // const globeTexture = new TextureLoader().load(globeText);
    // console.log('globe text', globeText)
    // console.log('globeuri', globeUri)
    //const globeTexture = await loadAsync(require('../assets/images/globe.png'));
    // console.log("GlobeText Require", globeImageUri)
    //globeTexture.image.data.localUri = globeTexture.image.data.uri;
    const globeGeometry = new SphereGeometry(15, 100, 80);

    let globeMaterial = new MeshPhongMaterial({
      map: globeTexture,
    });

    let globeMesh = new Mesh(globeGeometry, globeMaterial);

    globeMesh.rotation.y = -80 * (Math.PI/180)

    globe.add( globeMesh );

    const torusGeometry = new TorusGeometry(17, .4, 8, 60);
    let torusMaterial = new MeshBasicMaterial({
      color: "#f00"
    })
    let torusMesh = new Mesh(torusGeometry, torusMaterial);
    orbitPosition.rotation.order = 'ZYX'
    orbitPosition.rotation.x = Math.PI / 2 
    orbitPosition.rotation.z = 51.65 * (Math.PI/180)
    orbitPosition.add( torusMesh )

    const satGeo = new SphereGeometry(2);
    let satMat = new MeshBasicMaterial({
      color: "#00f"
    })
    let satMesh = new Mesh(satGeo, satMat);
    satMesh.position.y = 17
    orbitPosition.add(satMesh);

    scene.add(new AmbientLight("#909090"));
    /////////////////////////////

    camera.lookAt(globe.position);

    function update() {
      orbitTracker.rotation.y += .0005;
      orbitPosition.rotation.y += .01;
      renderer.render(scene, camera);
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);

      // ref.current.getControls()?.update();
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <OrbitControlsView style={{ flex: 1 }} camera={camera} enableZoom={false}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} key="d" />
    </OrbitControlsView>
  );
}

async function copyAssetToCacheAsync(assetModule, localFilename) {
  const localUri = `${FileSystem.cacheDirectory}asset_${localFilename}`;
  const fileInfo = await FileSystem.getInfoAsync(localUri, { size: false });
  if (!fileInfo.exists) {
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();
    console.log(`copyAssetToCacheAsync ${asset.localUri} -> ${localUri}`);
    await FileSystem.copyAsync({
      from: asset.localUri,
      to: localUri,
    });
  }
  return localUri;
}
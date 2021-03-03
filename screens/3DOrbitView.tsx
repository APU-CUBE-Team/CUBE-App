import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader, loadAsync, THREE } from 'expo-three';
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
  BoxGeometry,
  BackSide,
} from 'three';
global.Image = undefined;
import { useFocusEffect } from '@react-navigation/native';
import { resetOrientation } from '../hooks/resetOrientation';

export default function Orbit() {
  useFocusEffect(
    React.useCallback(() => {
        resetOrientation();
    }, [])
  )


  const [camera, setCamera] = React.useState<Camera | null>(null);
  

  let timeout;

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = "rgb(40, 44, 47)";

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

    const globeAsset = Asset.fromModule(require('../assets/images/globe.png'));
    const skyleftAsset = Asset.fromModule(require('../assets/images/skybox/sky_left.png'));
    const skybackAsset = Asset.fromModule(require('../assets/images/skybox/sky_back.png'));
    const skyrightAsset = Asset.fromModule(require('../assets/images/skybox/sky_right.png'));
    const skyfrontAsset = Asset.fromModule(require('../assets/images/skybox/sky_front.png'));
    const skyupAsset = Asset.fromModule(require('../assets/images/skybox/sky_up.png'));
    const skydownAsset = Asset.fromModule(require('../assets/images/skybox/sky_down.png'));
    await globeAsset.downloadAsync();  
    await skyleftAsset.downloadAsync();  
    await skybackAsset.downloadAsync();  
    await skyrightAsset.downloadAsync();  
    await skyfrontAsset.downloadAsync();  
    await skyupAsset.downloadAsync();  
    await skydownAsset.downloadAsync();  
    globeAsset.localUri = globeAsset.localUri?.replace(":/", "://")
    skyleftAsset.localUri = skyleftAsset.localUri?.replace(":/", "://")
    skybackAsset.localUri = skybackAsset.localUri?.replace(":/", "://")
    skyrightAsset.localUri = skyrightAsset.localUri?.replace(":/", "://")
    skyfrontAsset.localUri = skyfrontAsset.localUri?.replace(":/", "://")
    skyupAsset.localUri = skyupAsset.localUri?.replace(":/", "://")
    skydownAsset.localUri = skydownAsset.localUri?.replace(":/", "://")

    const globeTexture = new TextureLoader().load(globeAsset);
    const skyLeftTexture = new TextureLoader().load(skyleftAsset);
    const skyBackTexture = new TextureLoader().load(skybackAsset);
    const skyRightTexture = new TextureLoader().load(skyrightAsset);
    const skyFrontTexture = new TextureLoader().load(skyfrontAsset);
    const skyUpTexture = new TextureLoader().load(skyupAsset);
    const skyDownTexture = new TextureLoader().load(skydownAsset);

    const skyBox = new BoxGeometry(1000, 1000, 1000)

    let skyBoxLeftMesh = new MeshBasicMaterial({
      map: skyLeftTexture, side: BackSide
    });
    let skyBoxBackMesh = new MeshBasicMaterial({
      map: skyBackTexture, side: BackSide
    });
    let skyBoxRightMesh = new MeshBasicMaterial({
      map: skyRightTexture, side: BackSide
    });
    let skyBoxFrontMesh = new MeshBasicMaterial({
      map: skyFrontTexture, side: BackSide
    });
    let skyBoxUpMesh = new MeshBasicMaterial({
      map: skyUpTexture, side: BackSide
    });
    let skyBoxDownMesh = new MeshBasicMaterial({
      map: skyDownTexture, side: BackSide
    });

    let skyMesh = new Mesh(skyBox, [skyBoxFrontMesh, skyBoxBackMesh, skyBoxUpMesh, skyBoxDownMesh, skyBoxLeftMesh, skyBoxRightMesh,])

    scene.add(skyMesh)

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

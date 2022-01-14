import { Canvas } from '@react-three/fiber'
import React from 'react'
import Box from './components/Box'
import ControllerInterface from './components/ControllerInterface';
import GeoContainer from './components/GeoContainer';
import uniqid from 'uniqid'
import Sphere from './components/Sphere';
import AudioAnalyser from './components/AudioAnalyser';
import Plane from './components/Plane';


function App() {
 

  return (
    <div style={{height: '1000px', margin: '-200px', height: '2000em', backgroundColor:'black'}} >
      <Canvas   pixelRatio={window.devicePixelRatio}
                invalidateFrameloop={false}
                style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%' }}>
        <ambientLight />
        <fog attach="fog" args={["lightgrey", 5, 30]} />

        <pointLight position={[10, 10, 10]} />

            
        <Sphere position={[0, 0, -4]} color={'#ECB365'} size={10} heightSegments={1} rotX={-28} rotY={-12} rotZ={-10}/>                              
        <Plane position={[-2.8, -10, -1]} color={"#041C32"} size={1} heightSegments={50} widthSegments={50} rotX={-65} rotY={-1} rotZ={2}/>                              

        <AudioAnalyser />     
      </Canvas>              
    </div>

  );
}
{/* <GeoContainer id={uniqid()}type={'box'} position={[0,0,-10]} color={'#ff00ff'} size={50}/>  */}
{/* <Sphere position={[-2.8, -10, -1]} color={"#a3bd47"} size={99} heightSegments={20} widthSegments={2} rotX={-2} rotY={-1} rotZ={2}/>                               */}
{/* <Sphere position={[6, -2, -10]} color={'#DE834D'} size={50} heightSegments={20} widthSegments={2} rotX={8} rotY={10} rotZ={-10}/>                               */}

{/* <Box position={[0,0,-10]} color={'#ff00ff'} size={50}/> */}
export default App;

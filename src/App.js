import { Canvas } from '@react-three/fiber'
import React from 'react'
import Box from './components/Box'
import ControllerInterface from './components/ControllerInterface';
import GeoContainer from './components/GeoContainer';
import { useStore } from './index'
import uniqid from 'uniqid'
import Sphere from './components/Sphere';
import AudioAnalyser from './components/AudioAnalyser';


function App() {
  const [ effects, addEffects ] = useStore(state => [state.allEffects, state.addEffect])
  //addEffects(<B/>)
 

  return (
    <div style={{height: '1000px'}} >
      <Canvas   pixelRatio={window.devicePixelRatio}
                invalidateFrameloop={false}
                style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

            
        <Sphere position={[0, 0, -10]} color={'#0000fa'} size={50} />                              
        <Sphere position={[2, -2, -10]} color={'#f30000'} size={50} heightSegments={20} widthSegments={20}/>                              

        <AudioAnalyser />     
      </Canvas>               
    </div>

  );
}
{/* <GeoContainer id={uniqid()}type={'box'} position={[0,0,-10]} color={'#ff00ff'} size={50}/>  */}

{/* <Box position={[0,0,-10]} color={'#ff00ff'} size={50}/> */}
export default App;

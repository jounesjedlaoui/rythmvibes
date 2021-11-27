import { Canvas } from '@react-three/fiber'
import React from 'react'
import B from './components/Sphere'


function App() {
  return (
    <div style={{height: '1000px'}}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <B/>
      </Canvas>
      </div>

  );
}

export default App;

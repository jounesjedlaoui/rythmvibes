import { useFrame } from '@react-three/fiber'
import React from 'react'

export default function B(props) {
    const mesh = React.useRef();
    useFrame(() => {
      mesh.current.rotation.x += 0.02;
      mesh.current.rotation.z += 0.02;


    })
  
    return (
      <mesh
        ref={mesh}
        scale={3}
        onClick={console.log('you clicked me!')}
        >
        
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    )
  }

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Vera(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('3DModels/vera_model.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_0.geometry}
        material={materials.material_0}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('3DModels/vera_model.glb')

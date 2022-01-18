import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { useStore } from '../state'
import * as THREE from 'three'
import { MeshWobbleMaterial } from '@react-three/drei'

import { Html } from '@react-three/drei/web/Html.cjs'

/**
 * A Sphere Three.js Object, whose parameters are influences by the audio-input from the clients microphone
 * @param {object} param: The paramateters with which the 3d-Object is created. It includes:
 *  position: as an Array(3),
 *  color: as a HEX-value,
 *  size: as an Integer,
 *  heightSegments: the amount of heightSegments of the 3d-Object
 *  widthSegments: the amount of widthSegments of the 3d-Object
 *  rotX: the amount of static rotation on the x-axis
 *  rotY: the amount of static rotation on the y-axis
 *  rotZ: the amount of static rotation on the z-axis  
 * @return The react-three-fiber Sphere-Component
**/ 
export default function Sphere(props) {
    const mesh = React.useRef();
    //Visibility of ControllerInterface
    const [ active, toggleActive ] = useState(false)
    //Active Rotation
    const [ activeRotation, toggleActiveRotation ] = useState(true)
    //Amplitude of microphone input connected to global store
    const [ amp ] = useStore(state => [ state.micAmp ])
    //Mouse Position for positioning of controllerInterface
    let [ mousePos, setMousePos ] = useState(new THREE.Vector3( 0, 0, -3 ));
    //locally stored controller variables
    let [ cI, setCI ] = useState({
        size: props.size,
        color: props.color,
        heightSegments: props.heightSegments,
        widthSegments: props.widthSegments,
        posX: props.position[0],
        posY: props.position[1],
        posZ: props.position[2],
        rotX: props.rotX,
        rotY: props.rotY,
        rotZ: props.rotZ
    })

    //toggle activeRotation 
    const handleActiveRotation = ( event ) => {
        event.preventDefault();
        toggleActiveRotation(!activeRotation)
    }

    //update values in controllerInput
    const handleChange = (event) => {
        const { value, name } = event.target;
        let newCI = {...cI}
        newCI[name] = value;
        setCI(newCI)
    }

    const getMouseWorld = ( event ) => {
        setMousePos( event.point )
    }

    const handleToggle = ( event ) => {
        console.log(event)
        getMouseWorld(event);

        toggleActive(!active)
    }

    const style = {
        backgroundColor: 'grey',
        padding: '0.6em',
        opacity: '0.7',
        borderRadius: '0.5em'
        
    }

    const controllerInterface = <Html style={style} position={ [mousePos.x, mousePos.y, mousePos.z] } rotationY={0.2}>
                                    <div>
                                        <form>
                                            <h4>{props.name}</h4>
                                            <br/>
                                            <label htmlfor='color'>Farbe</label>
                                            <br/>
                                            <input type='color' name='color' value={cI.color} onChange={handleChange}/>

                                            <br/>

                                            <label htmlfor='size'>Größe</label>
                                            <input type='range' name='size' value={cI.size} onChange={handleChange}/>

                                            <label htmlfor='heightSegments'>heightSegments</label>
                                            <input type='range' min={1} max={20} name='heightSegments' value={cI.heightSegments} onChange={handleChange}/>

                                            <label htmlfor='widthSegments'>widthSegments</label>
                                            <input type='range' min={1} max={20} name='widthSegments' value={cI.widthSegments} onChange={handleChange}/> 

                                            <br/>

                                            <label htmlfor='X'>X</label>
                                            <input type='range' min={-8.8} max={8.8} name='posX' value={cI.posX} onChange={handleChange}/>
                                            <label htmlfor='Y'>Y</label>
                                            <input type='range' min={-10} max={10} name='posY' value={cI.posY} onChange={handleChange}/>
                                            <label htmlfor='Z'>Z</label>
                                            <input type='range' min={-10} max={10} name='posZ' value={cI.posZ} onChange={handleChange}/>

                                            <br/>

                                            <button onClick={handleActiveRotation}>Toggle active rotation</button>
                                            <label htmlfor='rotX'>Rotation X</label>
                                            <input type='range' min={-100} max={100} name='rotX' value={cI.rotX} onChange={handleChange}/>
                                            <label htmlfor='rotY'>Rotation Y</label>
                                            <input type='range' min={-100} max={100} name='rotY' value={cI.rotY} onChange={handleChange}/>
                                            <label htmlfor='rotZ'>Rotation Z</label>
                                            <input type='range' min={-100} max={100} name='rotZ' value={cI.rotZ} onChange={handleChange}/>
                                        </form>
                                    </div>
                                </Html>

    //apply rotation on every frame
    useFrame(() => {
        if(activeRotation) {
            var ampRot = amp/50;
            mesh.current.rotation.x += (cI.rotX/1000) * ampRot;
            mesh.current.rotation.y += (cI.rotY/1000) * ampRot;
            mesh.current.rotation.z += (cI.rotZ/1000) * ampRot;
        }
    })



    return(
        <React.Fragment>

        {active ? controllerInterface : null}

        <mesh
            position={[cI.posX, cI.posY, cI.posZ]}
            ref={mesh}
            scale={cI.size/10+amp/40}
            onClick={handleToggle}
            rotation={[cI.rotX, cI.rotY, cI.rotZ]}
            >
            
            <sphereGeometry args={[1, cI.heightSegments+amp*20, cI.widthSegments*(amp/35)]} />
            
            <MeshWobbleMaterial 
                attact='material'
                color={cI.color}
                side={THREE.DoubleSide}
                factor={1*(amp)}
                speed={0.2*(0.01/amp)}
                refractionRatio={3}
                roughness={0.2}
                wireframe={false}
                />
          </mesh>
          </React.Fragment >

    )
}
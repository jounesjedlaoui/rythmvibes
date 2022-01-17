import * as THREE from 'three'
import React, { useState } from 'react'
import { MeshWobbleMaterial } from '@react-three/drei'
import { useStore } from '../state'
import shallow from 'zustand/shallow'
import { Html } from '@react-three/drei/web/Html.cjs'

/**
 * A Plane Three.js Object, whose parameters are influences by the audio-input from the clients microphone
 * @param {object} param: The paramateters with which the 3d-Object is created. It includes:
 *  position: as an Array(3),
 *  color: as a HEX-value,
 *  size: as an Integer,
 *  heightSegments: the amount of heightSegments of the 3d-Object
 *  widthSegments: the amount of widthSegments of the 3d-Object
 *  rotX: the amount of static rotation on the x-axis
 *  rotY: the amount of static rotation on the y-axis
 *  rotZ: the amount of static rotation on the z-axis  
 * @return The react-three-fiber Plane-Component
**/ 
export default function Plane(props) {
    const mesh = React.useRef();
    //Visibility of ControllerInterface
    const [ active, toggleActive ] = useState(false)
    //Visibility of wireframe
    const [ wireframe, toggleWireframe ] = useState(false)
    //Amplitude of microphone input connected to global store
    const [ amp ] = useStore(state => [ state.micAmp ])

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

    const handleChange = (event) => {
        const { value, name } = event.target;
        let newCI = {...cI}
        newCI[name] = value;
        setCI(newCI)
    }

    const handleClick = () => {
        toggleActive(!active)
    }

    const handleWireframe = () => {
        toggleWireframe(!wireframe)
    }

    const style = {
        backgroundColor: 'grey',
        padding: '0.6em',
        opacity: '0.7',
        borderRadius: '0.5em'
    }

    const controllerInterface = <Html style={style} position={[50, 40, -50]} rotationY={0.2}>
                                    <div>
                                        <form>

                                            <label htmlfor='color'>Farbe</label>
                                            <br/>
                                            <input type='color' name='color' value={cI.color} onChange={handleChange}/>

                                            <br/>
                                            
                                            <label htmlfor='wireframe'>Wireframe On</label>
                                            <input type='checkbox' onChange={handleWireframe}/>
   

                                            <label htmlfor='size'>Größe</label>
                                            <input type='range' name='size' min={-10} max={10}value={cI.size} onChange={handleChange}/>

                                            <label htmlfor='heightSegments'>heightSegments</label>
                                            <input type='range' min={1} max={200} name='heightSegments' value={cI.heightSegments} onChange={handleChange}/>

                                            <label htmlfor='widthSegments'>widthSegments</label>
                                            <input type='range' min={1} max={200} name='widthSegments' value={cI.widthSegments} onChange={handleChange}/> 

                                            <br/>

                                            <label htmlfor='X'>X</label>
                                            <input type='range' min={-8.8} max={8.8} name='posX' value={cI.posX} onChange={handleChange}/>
                                            <label htmlfor='Y'>Y</label>
                                            <input type='range' min={-20} max={10} name='posY' value={cI.posY} onChange={handleChange}/>
                                            <label htmlfor='Z'>Z</label>
                                            <input type='range' min={-10} max={10} name='posZ' value={cI.posZ} onChange={handleChange}/>

                                            <br/>

                                            <label htmlfor='rotX'>Rotation X</label>
                                            <input type='range' min={-360} max={360} name='rotX' value={cI.rotX} onChange={handleChange}/>
                                            <label htmlfor='rotY'>Rotation Y</label>
                                            <input type='range' min={-360} max={360} name='rotY' value={cI.rotY} onChange={handleChange}/>
                                            <label htmlfor='rotZ'>Rotation Z</label>
                                            <input type='range' min={-360} max={360} name='rotZ' value={cI.rotZ} onChange={handleChange}/>
                                        </form>
                                    </div>
                                </Html>


    return(
        <React.Fragment>

        {active ? controllerInterface : null}

        <mesh
            position={[cI.posX, cI.posY, cI.posZ]}
            ref={mesh}
            scale={cI.size/10}
            onClick={handleClick}
            rotation={[cI.rotX/100, cI.rotY/100, cI.rotZ/100]}
            >
            
            <planeGeometry 
                args={[1000, 1000, cI.heightSegments, cI.widthSegments]} 
                />
            <MeshWobbleMaterial 
                attact='material'
                color={cI.color}
                side={THREE.DoubleSide}
                factor={0.41}
                speed={1}
                refractionRatio={3}
                roughness={0.2}
                wireframe={wireframe}
                />

          </mesh>
          </React.Fragment >

    )
}
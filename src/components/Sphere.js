import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { useStore } from '../index'
import shallow from 'zustand/shallow'
import { Html } from '@react-three/drei/web/Html.cjs'

export default function Sphere(props) {
    const mesh = React.useRef();
    const [ active, toggleActive ] = useState(false)
    let audioFactors = {
        amp: 1,
    }

    let [ cI, setCI ] = useState({
        size: props.size,
        color: props.color,
        heightSegments: props.heightSegments,
        widthSegments: props.widthSegments,
        posX: props.position[0],
        posY: props.position[1],
        posZ: props.position[2],
        rotX: 0,
        activeRot: true,
        rotY: 0,
        
        rotZ: 0

    })

    const handleChange = (event) => {
        const { value, name } = event.target;
        let newCI = {...cI}
        newCI[name] = value;
        console.log(cI)
        setCI(newCI)
    }

    const handleClick = () => {
        toggleActive(!active)
    }

    const style = {
        backgroundColor: 'grey',
        padding: '0.6em',
        opacity: '0.7',
        borderRadius: '0.5em'
    }

    const controllerInterface = <Html style={style} position={[15, 40, -50]} rotationY={0.2}>
                                    <div>
                                        <form>

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

                                            <label htmlfor='rotX'>Rotation X</label>
                                            <input type='range' min={-100} max={100} name='rotX' value={cI.rotX} onChange={handleChange}/>
                                            <label htmlfor='rotY'>Rotation Y</label>
                                            <input type='range' min={-100} max={100} name='rotY' value={cI.rotY} onChange={handleChange}/>
                                            <label htmlfor='rotZ'>Rotation Z</label>
                                            <input type='range' min={-100} max={100} name='rotZ' value={cI.rotZ} onChange={handleChange}/>
                                        </form>
                                    </div>
                                </Html>

    useFrame(() => {
        if(cI.activeRot) {
            mesh.current.rotation.x += cI.rotX/1000;
            mesh.current.rotation.y += cI.rotY/1000;
            mesh.current.rotation.z += cI.rotZ/1000;
        }
    })



    return(
        <React.Fragment>

        {active ? controllerInterface : null}

        <mesh
            position={[cI.posX, cI.posY, cI.posZ]}
            ref={mesh}
            scale={cI.size/10}
            onClick={handleClick}
            
            >
            
            <sphereGeometry args={[1, cI.heightSegments, cI.widthSegments]} />
            <meshStandardMaterial color={cI.color} />
          </mesh>
          </React.Fragment >

    )
}
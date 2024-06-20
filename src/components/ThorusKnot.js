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
export default function ThorusKnot(props) {
    const mesh = React.useRef();
    //Visibility of ControllerInterface
    const [ active, toggleActive ] = useState(false)
    //Active Rotation
    const [ activeRotation, toggleActiveRotation ] = useState(true)
    //Amplitude of microphone input connected to global store
    const [ amp ] = useStore(state => [ state.micAmp ])
    //Mouse Position for positioning of controllerInterface
    let [ mousePos, setMousePos ] = useState(new THREE.Vector3( 0, 0, -3 ));
    //locally stored non-boolean controller variables
    let [ cI, setCI ] = useState({
        size: props.size,
        radius: 1,
        tubularSegments: 100,
        radialSegments: 3,
        tube: 3,
        p: 2,
        q: 2,
        color: props.color,
        sensitivity: 1,
        heightSegments: props.heightSegments,
        widthSegments: props.widthSegments,
        posX: props.position[0],
        posY: props.position[1],
        posZ: props.position[2],
        rotX: props.rotX,
        rotY: props.rotY,
        rotZ: props.rotZ
    })

    /**
     * @description toggles active rotation on/off
     * @param {event} event 
     * @returns void
     */
    const handleActiveRotation = ( event ) => {
        event.preventDefault();
        toggleActiveRotation(!activeRotation)
    }

    /**
     * @description update values in controllerInput
     * @param {event} event
     * @returns void
     */
    const handleChange = (event) => {
        const { value, name } = event.target;
        let newCI = {...cI}
        newCI[name] = value;
        setCI(newCI)
    }

    /**
     * @description update mousePosition in local state to position controllerInterface
     * @param {event} event 
     * @returns void
     */
    const getMouseWorld = ( event ) => {
        var m = event.point;
        if( m === undefined ) {
            m = new THREE.Vector3( 0, 0, -3 )
        }
        else if(m.y < -0.7) {
            m.y += 1.5;
        }
        setMousePos( m )
    }

    /**
     * @description show controllerInterface and set mouse position
     * @param {event} event 
     * @returns void
     */
    const handleToggle = ( event ) => {
        if(event.target.tagName !== undefined)
            if(event.target.tagName.toLowerCase() === 'button') 
                event.preventDefault();
        getMouseWorld(event);
        toggleActive(!active)
    }

    
    /**
     * @description Geometry parameters are manipulated here.
     * @returns JSX for controllerInterface.
     */
    const controllerInterface = <Html className={'geo-container'} position={ [mousePos.x, mousePos.y, mousePos.z] } rotationY={0.2}>
                                    <div className={'hud-element'}>
                                        <form>
                                            <header>
                                                <button style={{marginBottom: '1em'}} className={'button__visible'} onClick={handleToggle}>x</button>
                                                <div>
                                                    <label className={'hudlabel'}>{props.name}</label>
                                                </div>
                                            </header>
                                            <br/>

                                            <section>
                                            <label >Farbe</label>
                                                <br/>
                                                <input type='color' name='color' value={cI.color} onChange={handleChange}/>
                                            <br/>
                                            </section>

                                            <section >
                                                <label>Position</label>
                                                <br/>
                                                <label >X</label>
                                                <input type='range' min={-20} max={20} name='posX' value={cI.posX} onChange={handleChange}/>
                                                <label >Y</label>
                                                <input type='range' min={-20} max={10} name='posY' value={cI.posY} onChange={handleChange}/>
                                                <label >Z</label>
                                                <input type='range' min={-40} max={10} name='posZ' value={cI.posZ} onChange={handleChange}/>

                                                <br/>
                                            </section>

                                            <section>
                                                <label >Size</label>
                                                <input type='range' name='size' min={0} max={50} value={cI.size} onChange={handleChange}/>

                                                <label >Radius</label>
                                                <input type='range' name='radius' min={0} max={50} value={cI.radius} onChange={handleChange}/>

                                                <label >tubularSegments</label>
                                                <input type='range' name='tubularSegments' min={0} max={1500} value={cI.tubularSegments} onChange={handleChange}/>

                                                <label >radialSegments</label>
                                                <input type='range' name='radialSegments' min={0} max={500} value={cI.radialSegments} onChange={handleChange}/>

                                                <label >tube</label>
                                                <input type='range' name='tube' min={0} max={20} value={cI.tube} onChange={handleChange}/>

                                                <label >p</label>
                                                <input type='range' name='p' min={0} max={20} value={cI.p} onChange={handleChange}/>

                                                <label >q</label>
                                                <input type='range' name='q' min={0} max={20} value={cI.q} onChange={handleChange}/>

                                                <label >Sensitivity</label>
                                                <input type='range' min={0} max={10} name='sensitivity' value={cI.sensitivity} onChange={handleChange}/>

                                                <label >widthSegments</label>
                                                <input type='range' min={1} max={200} name='widthSegments' value={cI.widthSegments} onChange={handleChange}/> 

                                                <br/>
                                            </section>

                                            <section>
                                                <label >Rotation X</label>
                                                <input type='range' min={-100} max={100} name='rotX' value={cI.rotX} onChange={handleChange}/>
                                                <label >Rotation Y</label>
                                                <input type='range' min={-100} max={100} name='rotY' value={cI.rotY} onChange={handleChange}/>
                                                <label >Rotation Z</label>
                                                <input type='range' min={-100} max={100} name='rotZ' value={cI.rotZ} onChange={handleChange}/>
                                                <button onClick={handleActiveRotation}>Toggle active rotation</button>
                                            </section>
                                        </form>
                                    </div>
                                </Html>

    /**
     * @description Apply rotation on every frame.
     */
    useFrame(() => {
        if(true) {
            var ampRot = amp/50;
            mesh.current.rotation.x += (cI.rotX/2000) * ampRot;
            mesh.current.rotation.y += (cI.rotY/2000) * ampRot;
            mesh.current.rotation.z += (cI.rotZ/2000) * ampRot;
        }
    })

    

    return (
        <React.Fragment>

            {active ? controllerInterface : null}

            <mesh
                position={[cI.posX, cI.posY, cI.posZ]}
                ref={mesh}
                scale={cI.sensitivity === 0 ? cI.size: 1}
                onClick={handleToggle}
                >
                <torusKnotGeometry args={[cI.size, cI.tube, cI.tubularSegments, cI.radialSegments, cI.p, cI.q]} />
                <meshPhongMaterial 
                    attact='material'
                    color={cI.color}
                    side={THREE.DoubleSide}
                    factor={cI.sensitivity === 0 ? null : 1*(amp)*(cI.sensitivity/10)}
                    speed={cI.sensitivity === 0 ? null : 0.2*(0.01/amp)}
                    refractionRatio={3}
                    diffuse={1}
                    shininess={0}
                    roughness={1}
                    wireframe={false}
                    />
            </mesh>

          </React.Fragment >

    )
}
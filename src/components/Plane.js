import * as THREE from 'three'
import React, { useState } from 'react'
import { MeshWobbleMaterial } from '@react-three/drei'
import { useStore } from '../state'
import { Html } from '@react-three/drei/web/Html.cjs'

/**
 * A Plane Three.js Object, whose parameters are influenceD by the audio-input from the clients microphone
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
    //connect Wobble to amplitude
    const [ wobble, toggleWobble ] = useState(props.reacts)
    //Visibility of wireframe
    const [ wireframe, toggleWireframe ] = useState(false)
    //Amplitude of microphone input connected to global store
    const [ amp ] = useStore(state => [ state.micAmp ])
    //Mouse Position for positioning of controllerInterface
    let [ mousePos, setMousePos ] = useState(new THREE.Vector3( 0, 0, -3 ));
    //locally stored controller variables
    let [ cI, setCI ] = useState({
        size: props.size,
        color: props.color,
        factor: 0.41,
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
     * @description Handle change in controllerInterface
     * @param {event} event 
     */
    const handleChange = ( event ) => {
        const { value, name } = event.target;
        let newCI = {...cI}
        newCI[name] = value;
        setCI(newCI)
    }

    /**
     * @description Toggle wireframe visibility
     * 
     */
    const handleWireframe = () => {
        toggleWireframe(!wireframe)
    }

    /**
     * @description Toggle wobble-material
     * 
     */
    const handleWobble = () => {
        toggleWobble(!wobble)
    }

    /**
     * @description Get and set mouse position on click 
     * @param {event} event 
     * 
     */
    const getMouseWorld = ( event ) => {
        setMousePos( event.point )
    }

    /**
     * @description Toggle controllerInterface visibility
     * @param {event} event
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
    const controllerInterface = <Html className={'geo-container__plane'} position={ [-4, -3, -5] } rotationY={0.2}>
                                    <div >
                                        <form>
                                            <header>
                                                <button style={{marginBottom: '1em'}} className={'button__visible'} onClick={handleToggle}>x</button>
                                                <div>
                                                    <label className={'hudlabel'}>{props.name}</label>
                                                </div>
                                            <br/>
                                            </header>

                                            <section>
                                                <div>
                                                    <label >Farbe</label>
                                                    <br/>
                                                    <input type='color' name='color' value={cI.color} onChange={handleChange}/>
                                                    <br/>
                                                </div>
                                                <div>                                           
                                                    <label >Wireframe On</label>
                                                    <input type='checkbox' onChange={handleWireframe}/>
                                                </div>
                                                <div>
                                                    <label >Reacts</label>
                                                    <input type='checkbox' onChange={handleWobble}/>
                                                </div>
                                            </section>

                                            <section >
                                                
                                                <div>
                                                <label htmlfor={'X'}>Position</label>
                                                <br/>                                               
                                                <label htmlfor='X'>X</label>
                                                <input type='range' min={-8.8} max={8.8} name='posX' value={cI.posX} onChange={handleChange}/>
                                                <label htmlfor='Y'>Y</label>
                                                <input type='range' min={-20} max={10} name='posY' value={cI.posY} onChange={handleChange}/>
                                                <label htmlfor='Z'>Z</label>
                                                <input type='range' min={-40} max={10} name='posZ' value={cI.posZ} onChange={handleChange}/>
                                                </div>
                                                <br/>

                                                <div>
                                                    <label htmlfor='size'>Größe</label>
                                                    <input type='range' name='size' min={0} max={20} value={cI.size} onChange={handleChange}/>

                                                    <label htmlfor='factor'>wave factor</label>
                                                    <input type='range' min={0} max={100} name='factor' value={cI.factor} onChange={handleChange}/>

                                                    <label htmlfor='heightSegments'>heightSegments</label>
                                                    <input type='range' min={1} max={200} name='heightSegments' value={cI.heightSegments} onChange={handleChange}/>

                                                    <label htmlfor='widthSegments'>widthSegments</label>
                                                    <input type='range' min={1} max={200} name='widthSegments' value={cI.widthSegments} onChange={handleChange}/> 

                                                    <br/>
                                                </div>

                                                <div>
                                                    <label htmlfor='rotX'>Rotation X</label>
                                                    <input type='range' min={-360} max={360} name='rotX' value={cI.rotX} onChange={handleChange}/>
                                                    <label htmlfor='rotY'>Rotation Y</label>
                                                    <input type='range' min={-360} max={360} name='rotY' value={cI.rotY} onChange={handleChange}/>
                                                    <label htmlfor='rotZ'>Rotation Z</label>
                                                    <input type='range' min={-360} max={360} name='rotZ' value={cI.rotZ} onChange={handleChange}/>
                                                </div> 
                                            </section>


                                        </form>
                                    </div>
                                </Html>


    return (
        <React.Fragment>

            {active ? controllerInterface : null}

            <mesh
                position={[cI.posX, cI.posY, cI.posZ]}
                ref={mesh}
                scale={cI.size* 0.001}
                onClick={handleToggle}
                rotation={[cI.rotX/100, cI.rotY/100, cI.rotZ/100]}
                >
                <planeGeometry 
                    args={[1000, 1000, cI.heightSegments, cI.widthSegments]} 
                    />
                <MeshWobbleMaterial 
                    attact='material'
                    color={cI.color}
                    side={THREE.DoubleSide}
                    factor={wobble ? (cI.factor/10) + amp/180 : cI.factor/100}
                    speed={1}
                    refractionRatio={3}
                    roughness={0.2}
                    wireframe={wireframe}
                    />
            </mesh>

          </React.Fragment >

    )
}
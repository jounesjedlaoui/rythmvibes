import React, { useState } from 'react';
import Sphere from './Sphere';
import Plane from './Plane';
import { Html } from '@react-three/drei/web/Html.cjs'
import topfont from './img/topfont.png'

const style = {
    backgroundColor: 'grey',
    padding: '0.6em',
    opacity: '0.7',
    borderRadius: '0.5em',
    font: 'Arial'
}

/**
 * GeometryContainer
 * @returns React.Component containing a html interface to manage the geometry
 */
export default function GeoContainer() {
    //An array containing all the geometries being rendered on screen
    const [ geometries, updateGeometry ] = useState([
        <Sphere type={'Sphere'} name={'Sphere1'} position={[0, 0, -4]} color={'#ECB365'} size={10} heightSegments={2} widthSegments={10} rotX={-28} rotY={-12} rotZ={-10}/>,
        <Plane type={'Plane'} name={'Background'} reacts={true} position={[-2.8, -10, -1]} color={"#041C32"} size={100} heightSegments={50} widthSegments={50} rotX={-65} rotY={-1} rotZ={2}/>                              
    ])
    
    //Fog Control
    const [ fogColor, setFogColor ] = useState('darkgrey') 
    const [ fogOn, setFogOn ] = useState(true) 

    //Name of new Geometry
    const [ newName, updateNewName ] = useState('');

    //Toggle visibility
    const [ visible, toggleVisibility ] = useState('true')

    //Build li-element of geometry
    const getGeoLI = ( name, index ) => {
        return <div key={index} className={'geolist'} index={index}>
                    {name}
                    <br/>
                    <button onClick={removeGeometry}>remove</button>
                </div>
    }

    /**
     * @description Add a geometry to the scene.
     * @param {event} event 
     * @returns void
     */
    const addGeometry = ( event ) => {
        event.preventDefault();
        if(newName.length === 0) {
            alert("Geometry must be named")
            return;
        }
        var select = document.getElementById("selectType")
        var selectedIndex = select.selectedIndex;
        var newGeo;

        //distinguish geometry type and create new geometry
        switch (selectedIndex) {
            case 0:
                newGeo = <Sphere type={'Sphere'} name={newName} position={[-6.5, 4, -2]} color={'green'} size={10} heightSegments={2} widthSegments={10} rotX={-28} rotY={-12} rotZ={-10}/>
                
                geometries.push(newGeo)
                updateGeometry([...geometries])
                break;
            case 1:
                newGeo = <Plane type={'Plane'} name={newName} position={[-2.8, 0, -1]} color={"red"} size={10} heightSegments={50} widthSegments={50} rotX={45} rotY={-1} rotZ={2}/>
                
                geometries.push(newGeo)
                updateGeometry([...geometries])
                break;
            default:
                console.error('a geometry-type needs to be selected')

        }
    }

    /**
     * @description Remove a geometry from the scene.
     * @param {event} event 
     * @returns void
     */
    const removeGeometry = ( event ) => {
        const index = event.target.closest('div').getAttribute('index')
        geometries.splice(index, 1)
        updateGeometry([...geometries])
    }

    /**
     * @description Handle color change for fog.
     * @param {event} event 
     * @returns void
     */
    const handleFogColor = (event) => {
        setFogColor(event.target.value)
    }

    /**
     * @description Toggle fog on/off.
     * @param {event} event
     * @returns void
     */
    const handleFogOn = () => {
        setFogOn(!fogOn)
    }

    /**
     * @description Handle change in input field, to differentiate between new geos in list.
     * @param {event} event 
     * @returns void
     */
    const handleChange = ( event ) => {
        const  value  = event.target.value
        updateNewName(value)
    }

    /**
     * @description Toggle Visibility of interface.
     * @param {event} event
     * @returns void
     */
    const handleToggle = () => {
        toggleVisibility(!visible);
    }
    
    /**
     * @description Hidden version of the interface.
     * @returns JSX <p>-tag of GeoContainer to switch back to visible mode.
     */
    const inVisible = <p className={'button__hidden'}onClick={handleToggle}>Show</p>

    /**
     * @description Visible version of the interface.
     * @returns JSX of GeoContainer-HUD
     */
    const Visible = <div className={'hud-element'} style={style}>                   
                        <header>
                            <button className={'button__visible'} onClick={handleToggle}>x</button>
                            <img className={'icon__visible'}src={topfont} alt={'RYTHMVIBES'}/>
                        </header>

                        <section>
                            <form>
                                <label>Fog on</label>
                                <input type='checkbox' checked onChange={handleFogOn}/>
                                <label>FogColor</label>
                                <input type='color' onChange={handleFogColor}/>
                            </form>
                        </section>

                        <section>
                            <form>
                                <h4 >Create new geometry:</h4>
                                <select id={"selectType"}>
                                    <option value={'sphere'}>Sphere</option>
                                    <option value={'plane'}>Plane</option>
                                </select>
                                <input type={'text'} value={newName} onChange={handleChange} />
                                <button onClick={addGeometry}> Add Geometry</button>
                            </form>
                        </section>

                        <div className={'all-geometries'}>
                            <label >All Geometries</label>
                            <ul >
                                {geometries.map(( geo, index ) => getGeoLI(geo.props.name, index))}   
                            </ul>
                        </div>
                    </div>
    
    return (
        <React.Fragment>

            <Html   width={12} position={[-3.5, 6, -3]}>
                { visible ? Visible : inVisible } 
            </Html>

            {fogOn ? <fog attach="fog" args={[fogColor, 5, 40]} /> : null }

            {geometries.map(geo => geo)}

        </React.Fragment>
    )
}
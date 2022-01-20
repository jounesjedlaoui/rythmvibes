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
        <Plane type={'Plane'} name={'Background'} reacts={true} position={[-2.8, -10, -1]} color={"#041C32"} size={1} heightSegments={50} widthSegments={50} rotX={-65} rotY={-1} rotZ={2}/>                              
    ])

    //Name of new Geometry
    const [ newName, updateNewName ] = useState('');

    //Toggle visibility
    const [ visible, toggleVisibility ] = useState('true')

    //Build Display of geometry
    const getGeoLI = ( name, index ) => {
        return <li className={'geolist'} index={index} >
                    {name}
                    <br/>
                    <button onClick={removeGeometry}>remove</button>
                </li>
    }

    //Add a geometry to the scene
    const addGeometry = ( event ) => {
        event.preventDefault();
        var select = document.getElementById("selectType")
        var selectedIndex = select.selectedIndex;
        var newArray = geometries;
        var newGeo;
        switch (selectedIndex) {
        case 0:
            newGeo = <Sphere type={'Sphere'} name={newName} position={[-6.5, 4, -2]} color={'green'} size={10} heightSegments={2} widthSegments={10} rotX={-28} rotY={-12} rotZ={-10}/>
            
            newArray.push(newGeo)
            updateGeometry([...geometries])
            break;
        case 1:
            newGeo = <Plane type={'Plane'} name={newName} position={[-2.8, 0, -1]} color={"red"} size={0.1} heightSegments={50} widthSegments={50} rotX={45} rotY={-1} rotZ={2}/>
            
            geometries.push(newGeo)
            updateGeometry([...geometries])
            break;
        default:
            console.log('a geometry-type needs to be selected')
        
        }
    }

    //remove a geometry from the scene
    const removeGeometry = ( event ) => {
        const index = event.target.closest('li').getAttribute('index')
        geometries.splice(index, 1)
        console.log(geometries)

        updateGeometry([...geometries])
    }

    //Handle Change in input field, to differentiate between new geos in list
    const handleChange = ( event ) => {
        const  value  = event.target.value

        updateNewName(value)
    }

    //Toggle Visibility of interface
    const handleToggle = () => {
        toggleVisibility(!visible);
    }

    //hidden version of the interface
    const inVisible = <p class={'button__hidden'}onClick={handleToggle}>Show</p>
    //visible version of the interface
    const Visible = <div class={'hud-element'} style={style}>                   
                        <header>
                            <button class={'button__visible'} onClick={handleToggle}>x</button>
                            <img class={'icon__visible'}src={topfont}/>
                        </header>

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
                        <label >All Geometries</label>
                        <ul >
                            {geometries.map(( geo, index ) => getGeoLI(geo.props.name, index))}   
                        </ul>
                    </div>
    
    return (
        <React.Fragment>

        <Html  width={12} position={[-3.5, 6, -3]}>
            
                { visible ? Visible : inVisible } 
           
        </Html>
        {geometries.map(geo => geo)}
        </React.Fragment>
    )
}
import React, { useState } from 'react';
import Sphere from './Sphere';
import Plane from './Plane';
import { Html } from '@react-three/drei/web/Html.cjs'

const style = {
    backgroundColor: 'grey',
    padding: '0.6em',
    opacity: '0.7',
    borderRadius: '0.5em',
    font: 'Arial'
}


export default function GeoContainer() {
    //An array containing all the geometries being rendered on screen
    const [ geometries, updateGeometry ] = useState([
        <Sphere type={'Sphere'} name={'Sphere1'} position={[0, 0, -4]} color={'#ECB365'} size={10} heightSegments={2} widthSegments={10} rotX={-28} rotY={-12} rotZ={-10}/>,
        <Plane type={'Plane'} name={'Background'} position={[-2.8, -10, -1]} color={"#041C32"} size={1} heightSegments={50} widthSegments={50} rotX={-65} rotY={-1} rotZ={2}/>                              
    ])

    //Name of new Geometry
    const [ newName, updateNewName ] = useState('');

    //Toggle visibility
    const [ visible, toggleVisibility ] = useState('true')

    //Build Display of geometry
    const getGeoLI = ( name, index ) => {
        return <li index={index} >
                {name}
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
            newGeo = <Sphere type={'Sphere'} name={newName} position={[0, 0, -2]} color={'green'} size={10} heightSegments={2} widthSegments={10} rotX={-28} rotY={-12} rotZ={-10}/>
            
            newArray.push(newGeo)
            updateGeometry([...geometries])
            break;
        case 1:
            newGeo = <Plane type={'Plane'} name={newName} position={[-2.8, -10, -1]} color={"red"} size={1} heightSegments={50} widthSegments={50} rotX={-65} rotY={-1} rotZ={2}/>
            
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

    const handleToggle = () => {
        toggleVisibility(!visible);
    }

    //hidden version of the interface
    const inVisible = <button onClick={handleToggle}>Show</button>
    //visible version of the interface
    const Visible = <>
                        <button onClick={handleToggle}>Hide</button>
                        <h1>All Geometries</h1>
                        <form>
                            <h2 >Typ:</h2>
                            <select id={"selectType"}>
                                <option value={'sphere'}>Sphere</option>
                                <option value={'plane'}>Plane</option>
                            </select>
                            <input type={'text'} value={newName} onChange={handleChange} />
                            <button onClick={addGeometry}> Add Geometry</button>
                        </form>
                        <ul>
                            {geometries.map(( geo, index ) => getGeoLI(geo.props.name, index))}   
                        </ul>
                    </>
    
    return (
        <React.Fragment>

        <Html style={style} position={[-10.7, 6, -3]}>
           { visible ? Visible : inVisible } 
        </Html>
        {geometries.map(geo => geo)}
        </React.Fragment>
    )
}
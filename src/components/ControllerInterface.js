// import React, { useState } from 'react';
// import { Html } from '@react-three/drei/web/Html.cjs'
// import { useStore } from '../index';
// import shallow from 'zustand/shallow'
// import Box from './Box'
// import uniqid from 'uniqid'

// export default function ControllerInterface(props) {
//     const [ allEffects ] = useStore(state => [ state.allEffects ])
//     const controllerInput = useStore(state =>  state.allEffects[props.geoId])
//     const updateControllerInput = useStore(state => state.updateControllerInput)
//     console.log(props.geoId)
//     const cI = useState(controllerInput);

//     const handleColor = (event) => {
//         const { value } = event.target;
//         controllerInput.color = value;
//         cI.color = value;
//         console.log(value)
//         updateControllerInput({id: props.geoId, controllerInput: controllerInput})

//     }

//     const handleSize = (event) => {
//         const { value } = event.target;
//         controllerInput.size = parseFloat(value);
//         cI.size = value;
//         console.log(controllerInput)
//         updateControllerInput({id: props.geoId, controllerInput: controllerInput})

//     }



//     return (
//         <React.Fragment>
//         <Html position={props.position} rotationY={0.2}>
//             <div>
//                 <form>
//                     <label htmlfor='type'>Typ</label>
//                     <select name='type' value={cI.type} onChange={handleSize}>
//                         <option value='Box' />
//                         <option value='Sphere'/>
//                     </select>
//                     <br/>
//                     <label htmlfor='size'>Größe</label>
//                     <input type='range' name='size' value={cI.size} onChange={handleSize}/>

//                     <label htmlfor='color'>Farbe</label>
//                     <input type='color' name='color' value={cI.color} onChange={handleColor}/>

//                 </form>
//             </div>
//         </Html>

//         </React.Fragment>
//         )
//         // <Box position={[0,0,-10]} color={cI.color} size={cI.size}/>
// }
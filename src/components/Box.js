// import { useFrame } from '@react-three/fiber'
// import React, { useState } from 'react'
// import shallow from 'zustand/shallow'
// import ControllerInterface from './ControllerInterface'

// //TODO: Erstelle Dummy Werte die bei noch nicht existierender uuid verwendet werden. Die Controllerwerte und die Dummy Werte müssen beide unkonditionnell initialisiert werden
// export default function Box(props) {
//     const mesh = React.useRef();
//     const id = mesh.current;
//     const [ active, switchActive ]= useState(false)
//     const [ initialized, switchInitialized ] = useState(false)
    
    

//     const initialControllerInput = {
//         type: props.type,
//         size: props.size,
//         color: props.color,
//         active: false
//     }

//     if(id !== undefined && id.uuid !== undefined) {
      
//     }

//     let cI = useState(initialControllerInput);

//     const handleClick = (event) => {
//       if(id !== undefined && id.uuid !== undefined)
//         console.log(event.target)
//         //updateControllerInput({id: id, controllerInput: controllerInput})
//         switchInitialized(true)
//         switchActive(!active)
//     }

//     const mouseDown = (event) => {
//       console.log(5)
//     }
    

//     useFrame((frame) => {
//       //console.log(id === undefined ? undefined : allEffects)
//       if(id !== undefined ) {
//       console.log(cI.allEffects[id.uuid])}
//       mesh.current.rotation.x += 0.02;
//       mesh.current.rotation.z += 0.02;
//     })
  
//     if(id !== undefined && initialized && id.uuid !== undefined) {
//       //console.log(allEffects)
//       return (
//           <React.Fragment>
//           <mesh
//             ref={mesh}
//             scale={props.size/50}
//             onClick={handleClick}
//             onMouseDown={mouseDown}
//             >
            
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={cI.color} />
//           </mesh>

//           {active ? <ControllerInterface geoId={id.uuid} position={[15, 40, -50]}/> : null}

//           </React.Fragment>
//         )
//       }
//       else {
//         console.log('here');
        
//         return (
//         <React.Fragment>
//         <mesh
//           ref={mesh}
//           scale={props.size/50}
//           onClick={handleClick}
//           onMouseDown={mouseDown}
//           >
          
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial color={props.color} />
//         </mesh>


//         </React.Fragment>
//       )}
//   }
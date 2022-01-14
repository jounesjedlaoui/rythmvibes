import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import create from 'zustand'
import Box from './components/Box';

// export const useStore = create((set, get) => ({
//   selectedEffect: 0,
//   allEffects: {
//                 } ,
//   controllerInput: {
//       type: 'Box',
//       size: 50,
//       color: '#ff00ff'
//       },
//   addEffect: (payload) => {
//     let eff = get().allEffects
//     eff[payload.id] = payload.controllerInput
//     set(state => (eff))
//   },
//   getCI: (id) => {
//     console.log(get(state => state.allEffects.allEffects))
//     return get(state => state);
//   },
//   updateControllerInput: (payload) => {
//     let allEff = get().allEffects;

//     allEff[payload.id] = payload.controllerInput;
//     set(state => ({allEffects: {...state.allEffects}}))
//   }

// })) 

ReactDOM.render(
          <App />,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

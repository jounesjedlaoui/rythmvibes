import create from 'zustand'

/**
 * @description pmndrs state management component. Used to handle changes in the users mic-input and inform the geometries. 
 * @method updateMicAmp(amp): update microphone amplitude in global state 
 * @attribute micAmp: microphone amplitude as whole integer
 */
export const useStore = create(( set ) => ({
    micAmp: 25,
    updateMicAmp: (amp) => {        
        return set(state => ({micAmp: amp}))
    }, 
  })) 
  
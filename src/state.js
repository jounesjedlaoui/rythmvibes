import create from 'zustand'

/**
 * pmndrs state management component. Used to handle changes in the users mic-input and inform the geometries. 
 */
export const useStore = create(( set ) => ({
    micAmp: 25,
    updateMicAmp: (amp) => {        
        return set(state => ({micAmp: amp}))
    }, 
    planeActiveSwitch: true
  })) 
  
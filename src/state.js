import create from 'zustand'

export const useStore = create(( set ) => ({
    micAmp: 25,
    updateMicAmp: (amp) => {        
        return set(state => ({micAmp: amp}))
    } 
  
  })) 
  
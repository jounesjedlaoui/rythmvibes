import create from 'zustand'

export const useStore = create((set, get) => ({
    micAmp: 25,
    updateMicAmp: (amp) => {        
        return set(state => ({micAmp: amp}))
    } 
  
  })) 
  
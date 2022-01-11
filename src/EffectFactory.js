import { useStore } from '../index';
import shallow from 'zustand/shallow'
import React from 'react';

export default function EffectFactory(props) {
    const container = useStore(state => state.allEffects)

    
    return (
        <React.Fragment>
            {container.values}
        </React.Fragment>
        )
}
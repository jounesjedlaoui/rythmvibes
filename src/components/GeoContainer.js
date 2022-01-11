import Box from "./Box";
import ControllerInterface from "./ControllerInterface";
import uniqid from 'uniqid'
import React from "react";
import { useStore } from "..";
import{ useState } from 'react'

export default function GeoContainer(props) {

    const id = props.id;
    const {active, switchActive }= useState(false);
    const [ allEffects, addEffect, effectExists ] = useStore(state => [state.allEffects, state.addEffect, state.effectExists])
    const controllerInput = {
        type: props.type,
        size: props.size,
        color: props.color,
        active: false
    }


    console.log(effectExists(id))
    // if(props.type === 'box') {
        const geo = <Box position={props.position} scale={props.scale} color={props.color} />
        //const controller = <ControllerInterface position={[15, 40, -50]} />
    // }

    const effect = {}
    effect[id] = controllerInput

    if(!effectExists(id)) {
        console.log('add new Effect to allEffects')
        //allEffects[id] = controllerInput;
        //console.log(allEffects)
    }

    return (
            <group onClick={console.log(active)}>
                {geo}
            </group>
    )
}
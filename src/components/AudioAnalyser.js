import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import { Html } from '@react-three/drei/web/Html.cjs'
import { useStore } from '../index';

const style = {
  padding: '1em',
  width: '100%',
  backgroundColor: 'gray',
  borderRadius: '0.5em'
}
const selectStyle = {
  padding: '0em 1em',
  margin: '1em',
  width: '100%'
}

export default function AudioAnalyser() {
  const [ allDevices, setAllDevices ] = useState([]);
  const [ init, switchInit ] = useState(false)
  let [ selectedInput, changeInput ] = useState({id: 'default', label: '', kind: 'audioinput'});

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();
  analyser.fftsize = 512;

  let source;
  
  const onChange = (event) => {
    const value = event.target.value;
    changeInput(value);
  }

  //get Permission to read System inputs and outputs
  navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(function(stream) {
      window.stream = stream
      source = audioCtx.createMediaStreamSource(stream)
      source.connect(analyser)
      console.log('hey')
    })

  //case privacy doesnt allow access
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
   
  }
  
  //get all available devices
  if(!init) {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      let i = 0;
        devices.forEach(function(device) {
          let dev = {
          kind: device.kind,
          label: device.label,
          id: device.deviceId,
          groupId: device.groupId
        }
        allDevices.push(dev)
        setAllDevices([...allDevices, dev])
        i++;
        //console.log(allDevices)
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
    switchInit(true)
  }
  console.log(allDevices.length)
  console.log(allDevices[0])

  useFrame(() => {
    var array = new Uint8Array(analyser.frequencyBinCount)
    //console.log(analyser)
  })

  return (
    <React.Fragment >
            <Html position={[-6, 6,-3]} rotationY={0.2}>
                  <form style={style}>
                    <label htmlfor='type'>Audio-Quelle</label>
                    <select name='type' style={selectStyle} >
                      {allDevices.map(device => 
                        <option value={device.deviceId}>{device.label}</option>
                      )}
                    </select>
                  </form>
            </Html>   
    </React.Fragment>
  )  
}
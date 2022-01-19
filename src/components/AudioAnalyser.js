import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei/web/Html.cjs'
import { useStore } from '../state';
import MicrophoneStream from 'microphone-stream';


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

export default function AudioAnalyser(props) {
  const [updateMicAmp] = useStore(state => [ state.updateMicAmp ])

  //case privacy doesnt allow access
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");   
  }
  
  useEffect(() => {
    //get Permission to read System inputs and outputs and add eventlistener to process input stream
    navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
    .then(function(stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
  
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 64;
  
      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        updateMicAmp(average)
      };
    })
    .catch(function(err) {
      /* handle the error */
      console.error(err);
    });
  }, [])



  return (
    <React.Fragment >
           
    </React.Fragment>
  )  
}
{/* <Html position={[-6, 6,-3]} rotationY={0.2}>
<form style={style}>
  <label htmlfor='type'>Audio-Quelle</label>
  <select name='type' style={selectStyle} >
    {allDevices.map(device => 
      <option value={device.deviceId}>{device.label}</option>
    )}
  </select>
</form>
</Html>    */}
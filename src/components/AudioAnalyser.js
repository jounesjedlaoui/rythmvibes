import React, { useEffect } from 'react';
import { useStore } from '../state';


export default function AudioAnalyser() {
  const [updateMicAmp] = useStore(state => [ state.updateMicAmp ])

  /**
   * @description case privacy doesnt allow access
   */
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.error("enumerateDevices() not supported.");   
  }
  
  /**
   * @description Works analogous to onComponentDidMount. Sets up stream for continuous use.
   */
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


  //Empty return so that Component is included  React Render-Loop
  return (
    <></>
  )  
}

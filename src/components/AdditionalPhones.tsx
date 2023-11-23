import React, { useEffect } from 'react'
import { Html, useGLTF, Float } from '@react-three/drei'
import { useRef, useMemo } from "react";
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber';
import InitialPhone from './InitialPhone';

export default function AdditionalPhones(props: any) {
  // You can't reuse meshes or put the same object into the scene twice in webgl/threejs, it will just unmount and remount. 
  const model = useGLTF("/iPhoneModel.gltf")
  const { position, phoneInstances } = props
  const cloneRefs = Array.from({ length: phoneInstances }, () => useRef<any>(null!))
  const iFrameRefs = Array.from({ length: phoneInstances - 1 }, () => useRef<HTMLIFrameElement>(null!))

  // React hook to memorize the cloned model so it isn't re-created on every render
  // The second parameter is a dependency array, if it changes, the memoized value will be re-created
  const clone = useMemo(() => model.scene.clone(), [model.scene])


  const { screenPosition, screenOffsetY, screenScale } = useControls('screenPosition', {
    screenPosition: {
        value: [ 0.17, -0.22, 0.09 ],
        step: 0.001,
        min: - 10,
        max: 10,
    },
    screenOffsetY: {
      value: 2,
      step: 0.001,
      min: - 10,
      max: 10,
    },
    screenScale: {
      value: [ 0.94, 0.94, 1 ],
      step: 0.001,
      min: - 10,
      max: 10,
  },
})

const { phoneRotation } = useControls('phoneRotation', {
  phoneRotation: {
    value: [ -0.1, -0.4, 0 ],
    step: 0.1,
    min: - 10,
    max: 10,
  }
})

const { distanceFactor } = useControls('distanceFactor', {
  distanceFactor: { 
    value: 1.17,
    step: 0.01,
    min: 0,
    max: 5,
  }
})

  useEffect(() => {      
      for (let i = 0; i < iFrameRefs.length; i++) { 
       // the iFrame needs to load first and add the event listener before calling this
      setTimeout(() => {
        const iFrameIndex = parseInt(iFrameRefs[0].current.id)
        iFrameRefs[i].current.contentWindow!.postMessage(iFrameIndex, 'http://localhost:3000/phonescreen');
      }, 5000)
    }
  }, [iFrameRefs])

  useFrame((state, delta) =>
  {

  })

  // use sin/cos to create a circle of phones
  return (
    <>
      { phoneInstances > 0 ? [...Array(phoneInstances - 1)].map((value, index) => {
      return(
        // <Float rotationIntensity={ 1 }>
          <primitive 
          key={index}
          ref={cloneRefs[index]} // Assign a ref to each clone
          object={clone}
          position={[Math.random() * -10, Math.random() * -25, Math.random() * -50 ]} 
          rotation={[0, Math.random() * 2 - 1, 0]}
          >
            <Html 
              occlude={[cloneRefs[index]]} 
              distanceFactor={ distanceFactor }
              wrapperClass="phonescreen" 
              transform 
              position={screenPosition}
              scale={screenScale}
              >
              
                <iframe
                style={{}}
                id={index.toString()}
                ref={iFrameRefs[index]}
                // scrolling="no"
                src="http://localhost:3000/phonescreen"        
                />
            </Html>
          </primitive>
          // </Float>
              // <InitialPhone key={index} position={[0, 0, Math.random() * 10 ]} rotation={[0, Math.random() * 2 - 1, 0]}/>
          )}
      ) : <></>}

     </>
  )
}
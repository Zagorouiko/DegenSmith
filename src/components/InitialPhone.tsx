import React from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { useRef, Suspense } from "react";
import { Mesh } from 'three'
import { useControls } from 'leva'
import { useFrame, useThree } from '@react-three/fiber';

export default function InitialPhone(props: any) {
  const model = useGLTF("/iPhoneModel.gltf")
  const phone = useRef<Mesh>(null!)
  const { camera } = useThree()
  const frame = useRef<HTMLIFrameElement>(null!)

  const { screenPosition, screenRotation, screenScale } = useControls('InitialPhoneScreen', {
    screenPosition: {
        value: [ 0.17, -0.22, 0.09 ],
        step: 0.001,
        min: - 10,
        max: 10,
    },
    screenRotation: {
        value: [ 0, 0, 0 ],
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

const { phonePosition, phoneRotation, phoneScale } = useControls('InitialPhone', {
    phonePosition: {
        value: [ 0, 0, -4.8 ],
        step: 0.1,
        min: - 10,
        max: 10,
    },
    phoneRotation: {
        value: [ 0, 0, 0 ],
        step: 0.1,
        min: - 10,
        max: 10,
    },
    phoneScale: {
        value: [ 5, 5, 5 ],
        step: 0.01,
        min: 5,
        max: 25,
    },
})

    useFrame(() => {
        // console.log(camera.position, camera.rotation)
    })

    const { distanceFactor } = useControls('distanceFactor', {
    distanceFactor: { 
        value: 1.25,
        step: 0.01,
        min: 0,
        max: 5,
    }
})


  return (
        <primitive ref={phone} object={model.scene} position={phonePosition} scale={phoneScale}> 
        <Html 
            occlude={[phone]} 
            distanceFactor={ distanceFactor }
            wrapperClass="phonescreen"
            position={screenPosition}
            rotation={screenRotation}
            scale={screenScale} 
            transform 
            >
                <iframe
                ref={frame}              
                // scrolling="no"
                src="http://localhost:3000/phonescreen"        
                />
            </Html>
        </primitive>
  )
}
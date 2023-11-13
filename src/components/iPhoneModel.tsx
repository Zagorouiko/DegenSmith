import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useRef } from "react";
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three'

export default function Model(props: any) {
  const model = useGLTF("/iPhoneModel.gltf")
  const phone = useRef<Mesh>(null!)
  const { position } = props

  useFrame((state, delta) =>
  {
      phone.current.rotation.y += delta * 0.2
  })

  return (
     <primitive ref={phone} object={model.scene} position={position}/>
  )
}
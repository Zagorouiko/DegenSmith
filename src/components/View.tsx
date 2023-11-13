
import { useFrame, Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Leva, useControls } from 'leva'
import { useRef, lazy } from "react";

const ModelComponent = lazy(() => import("./iPhoneModel"));

export default function View() {

    const { position, visible } = useControls('phone', {
        position: {
            value: [ 0.4, -1.8, -1.6 ],
            step: 0.1,
            min: - 10,
            max: 10,
        },
        visible: true,
    })

    return (
        <Canvas   
            camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -3, 1.5, 4 ]
        } }>
        <ModelComponent position={position} />
        <Environment preset="city" />
        <Perf position="top-left" />
        <OrbitControls makeDefault />

        <rectAreaLight
        width={ 2.5 }
        height={ 1.65 }
        intensity={ 65 }
        color={ '#ff6900' }
        rotation={ [ - 0.1, Math.PI, 0 ] }
        position={ [ 0, 0.55, - 1.15 ] }
    />
        </Canvas> 
    )
}
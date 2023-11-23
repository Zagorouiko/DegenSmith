import View from "../components/View";
import { Canvas } from '@react-three/fiber';
import { Loader } from "@react-three/drei";
import 'dotenv/config'
import { Suspense } from "react";
require('dotenv').config()


export default function Home() {
  return (
    <div style={{ height: '100vh' }}>     
        <Canvas
          camera={ {
          fov: 75,
          near: 0.1,
          far: 2000,
          position: [ .29, 5.85, 16.72 ],
          rotation: [ -0.33, 0.021, 0.0075 ]
      } }
          >
          <Suspense fallback={null}>
              <View />
          </Suspense>
     </Canvas>
     <Loader 
     dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
     initialState={(active) => active} // Initial black out state
     />
  </div>
  )
}

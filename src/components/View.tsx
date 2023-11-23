
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Sparkles, Environment, OrbitControls, Fisheye } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { lazy, useRef, Suspense } from "react";
import { DepthOfField, Bloom, EffectComposer } from '@react-three/postprocessing'
import { useQuery } from '@apollo/client'
import GET_NFT_DATA from '../constants/subgraphQueries'
import { NFTData } from "../helpers/types";
import { useState, useEffect } from 'react'


const InitialPhone = lazy(() => import("./InitialPhone"));
const AdditionalPhones = lazy(() => import("./AdditionalPhones"));

export default function View() {

    const { loading, data } = useQuery(GET_NFT_DATA)
    const [phoneInstances, setPhoneInstantcesCount] = useState(0)
    const { gl, camera } = useThree();

    const { phonePosition, phoneRotation } = useControls('ViewPhone', {
        phonePosition: {
            value: [ 0, 0, 0 ],
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
    })

    const { fishEyeZoom } = useControls('Fisheye', {
        fishEyeZoom: {
            value: 0,
            step: 0.001,
            min: 0,
            max: 1,
        },
    })

    const { rectLightOrangePosition, rectLightOrangeColor, rectLightPinkPosition, rectLightPinkColor, rectLightPinkRotation } = useControls('ViewRectLight', {
        rectLightOrangePosition: {
            value: [ -2.1, -1.9, -2.0 ],
            step: 0.1,
            min: - 10,
            max: 10,
        },
        rectLightOrangeColor: {
            value: '#02ffff'
        },
        rectLightPinkPosition: {
            value: [ 2.1, 1.9, 2.0 ],
            step: 0.1,
            min: - 10,
            max: 10,
        },
        rectLightPinkColor: {
            value: '#ff00a9'
        },
        rectLightPinkRotation: {
            value: [  1.6, 2.6, 1.7 ],
            step: 0.1,
            min: - 10,
            max: 10, 
        }
    })

    const { blur } = useControls('ViewEnvironment', {
        blur: {
            value: 0.07,
            step: 0.01,
            min: 0,
            max: 1, 
        },
    })

    useEffect(() => {
        if (!loading) {
          let NFTDataArray: NFTData[] = []
          try {   
            data.nftCreates.map((nft: any) => {
              const { minterAddress, tokenID, uri } = nft
              let nftObj: NFTData = {
                minterAddress: minterAddress,
                tokenID: tokenID,
                uri: uri
              }
              NFTDataArray.push(nftObj)
            })

          } catch (err) {
            console.log(err)
          }
          getPhoneInstantiationCount(NFTDataArray.length)
        }
      }, [data, loading ])

    

    const getPhoneInstantiationCount = (NFTCount: number) => {
        let instanceCount = 0
        const divided = NFTCount / 8

        if (divided < 1) { 
            instanceCount = 1
        }

        if (Number.isInteger(divided)) { 
            instanceCount = divided
        }
        
        if (!Number.isInteger(divided) && divided > 1) {
            instanceCount = Math.ceil(divided)
        }   
        setPhoneInstantcesCount(instanceCount)
    }

    useFrame(() => {
        // console.log("CAMERA", camera.position, camera.rotation)
    })

    return (
        <>
        <Sparkles size={ 15 } scale={ [ 50, 50, 50 ] } position-y={ 1 } speed={ 0.1 } count={ 100 }/>
        <EffectComposer disableNormalPass multisampling={ 0 }>
            <Bloom luminanceThreshold={ 1.1 } mipmapBlur intensity={ 0.5 } />
        </EffectComposer>

        <Environment
            blur={blur}
            background
            files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        ></Environment>

        {/* <fog attach="fog" args={['#262837', 100, 150]} ></fog> */}
        <InitialPhone/>
        {phoneInstances > 1 ? <AdditionalPhones phoneInstances={phoneInstances}/> : <></>}

        <OrbitControls makeDefault />
        <Perf position={'top-left'} />

        <rectAreaLight
            width={ 2.5 }
            height={ 1.65 }
            intensity={ 65 }
            color={ rectLightOrangeColor }
            rotation={ [ - 0.1, Math.PI, 0 ] }
            position={ rectLightOrangePosition }
        />

        <rectAreaLight
            width={ 2.5 }
            height={ 1.65 }
            intensity={ 65 }
            color={ rectLightPinkColor }
            rotation={ rectLightPinkRotation }
            position={ rectLightPinkPosition }
            />
    </>
    )
}
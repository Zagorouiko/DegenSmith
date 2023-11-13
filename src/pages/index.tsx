import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import { useQuery } from '@apollo/client'
import NFTRenderer from '../components/NFTRenderer'
import { NFTData } from "../helpers/types";
import GET_NFT_DATA from '../constants/subgraphQueries'

import { generateImage } from '../helpers/helpers'
import MintButton from "../components/MintButton";

import View from "../components/View";

import 'dotenv/config'
require('dotenv').config()


export default function Home() {
  const userAddress = useAddress()
  const [imageURI, setImageURI] = useState("")
  const [NFTData, setNFTData] = useState<NFTData[]>([])
  const { loading, data } = useQuery(GET_NFT_DATA)

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
    setNFTData(NFTDataArray)
  }
}, [data, loading])

  const handleButtonClick = async () => {
    const image = await generateImage()
    if (image) {
      setImageURI(image)
    }
  }

  return (
    <div style={{ height: '100vh' }}>
     <View />
    <button onClick={handleButtonClick}>Generate Random Image and Mint</button>
   <ConnectWallet />
   
   { userAddress && imageURI ? (<MintButton imageURI={imageURI} userAddress={userAddress}/>) : (<></>)}
    
    {NFTData ? NFTData.map((nft: any, index) => {
      return <NFTRenderer key={index} {...nft}/>
    })
    : <></>
  }
  </div>
  )
}

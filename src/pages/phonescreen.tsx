
import NFTRenderer from '../components/NFTRenderer'
import MintButton from "../components/MintButton"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import GET_NFT_DATA from '../constants/subgraphQueries'
import { useQuery } from '@apollo/client'
import { NFTData, phoneScreenData } from "../helpers/types";
import { useState, useEffect } from 'react'
import { generateImage } from '../helpers/helpers'
import { ClipLoader } from 'react-spinners';


export default function phonescreen() {
  let nftUpdated = ""

  const userAddress = useAddress()
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageURI, setImageURI] = useState("") 
  const [NFTData, setNFTData] = useState<NFTData[]>([])
  const { loading, data } = useQuery(GET_NFT_DATA)
  const [iFrameIndex, setiFrameIndex] = useState(0)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the event origin is trusted (for security reasons)
      if (event.origin !== 'http://localhost:3000' || !Number.isInteger(event.data)) {
        return;
      }

      // Handle the received data
      const data = event.data;
      setiFrameIndex(data + 1)
    };
    window.addEventListener('message', handleMessage);

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
  }, [data, loading, nftUpdated])
  
    const handleButtonClick = async () => {
      setIsLoaded(true)
      const image = await generateImage()
      if (image) {
        setImageURI(image)
      }
    }

    // REALLY COOOL - How to pass data from child to parent component
    // the onMintSuccess function is passed to the MintButton component as an attribute 
    // then on the onSuccess in the mint - the onMintSuccess function is called (with the data from there)
    // which actually calls back to the handleMintSucess here
    // Which then propagates back up to the parent component into the handleMintSuccess function
    const handleMintSuccess = (result: any) => {     
      console.log('Received result in parent component:', result.receipt.transactionHash)
      nftUpdated = result.receipt.transactionHash
      setIsLoaded(false)
    };

    const handleNFTLoaded = () => {
      console.log('NFTs Loaded')
      window.scrollTo(0, iFrameIndex * 2200);
    }

  return (
    <div className='phoneScreenBody'>
    <div className='walletDiv'>
      <ConnectWallet className='walletConnect'/>

      { userAddress && imageURI ? 
      (<MintButton className='AIGenerateButton' imageURI={imageURI} userAddress={userAddress} onMintSuccess={handleMintSuccess}/>) 
      : 
      (<button className='AIGenerateButton' onClick={handleButtonClick}>
        {isLoaded ? (
          <ClipLoader color="#ffffff" loading={isLoaded} size={15} />
        ) : "AI Generate"}
      </button>)}
    </div>
    
    
     
     {NFTData ? NFTData.map((nft: any, index) => {
      if (index % 8 === 0 && index !== 0) { 
        return (
        <>
        <div style={{height: '1100px'}}/>
        <NFTRenderer key={index} {...nft} onNFTLoaded={handleNFTLoaded} />
        
        </>
        )
      }
       return <NFTRenderer key={index} {...nft} onNFTLoaded={handleNFTLoaded} />
     })
     : <></>
   }
   </div>
  )
}

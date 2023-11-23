import { useState, useEffect} from "react";
import { NFTData, phoneScreenData } from "../helpers/types";

export default function NFTRenderer({ ...props}) {

    const [imageUri, setImageURI] = useState("")
    const { minterAddress, tokenID, uri, onNFTLoaded } = props

    const truncateStr = (fullStr: any, strLen: any) => {
        if (fullStr.length <= strLen) return fullStr
        const seperator = "..."
        const seperatorLength = seperator.length
        const charsToShow = strLen - seperatorLength
        const frontChars = Math.ceil(charsToShow / 2)
        const backChars = Math.floor(charsToShow / 2)
        return fullStr.substring(0, frontChars) + seperator + fullStr.substring(fullStr.length - backChars)
    }
    
    if (imageUri) {
        onNFTLoaded()
    }
    

    useEffect(() => {
        if (uri) {
            getImageSize(uri)
            }         
        }, []      
    )

    async function getImageSize(url: string) {
        const NFTresponse = await fetch(url)
        const IPFSURIResponse = await fetch(NFTresponse.url)
        const responseJSON = await IPFSURIResponse.json()
        setImageURI(responseJSON.image)
    }

    return (
        <>
        <figure style={{ width: '256px', margin: '0px'}} className="hover-img">
            <img src={imageUri}/>
        <figcaption>
            <h3>ID: {tokenID} <br/>{truncateStr(minterAddress, 15)}</h3>
        </figcaption>
        </figure>
        </>
    )
}
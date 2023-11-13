import { useState, useEffect} from "react";
import { NFTData } from "../helpers/types";

export default function NFTRenderer(NFTData: NFTData) {

    const [imageUri, setImageURI] = useState("")

    useEffect(() => {
        if (NFTData) {
            getImageSize(NFTData.uri)
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
            <img src={imageUri}/>
        </>
    )
}
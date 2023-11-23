import React from 'react'
import { Web3Button } from "@thirdweb-dev/react";
import networkMapping from "../constants/networkMapping.json";
import gumABI from "../constants/NFTABI.json";


export default function MintButton(props: any) {
    const gumAddress = networkMapping[11155111].Degen[0]
    const { imageURI, userAddress, onMintSuccess } = props

    return (
        <Web3Button
        contractAddress={gumAddress}
        contractAbi={gumABI} 
        action={async (contract) => contract.call('safeMint', [userAddress, imageURI] )}
        onSuccess={(result) => {
            if (onMintSuccess) {
                onMintSuccess(result)
            }
        }}
    >
        Mint
    </Web3Button>
    )
}
export type NFTData = {
    minterAddress: string,
    tokenID: string,
    uri: string
  }

  export type phoneScreenData = {
    NFTData: NFTData,
    onNFTLoaded: () => void
  }
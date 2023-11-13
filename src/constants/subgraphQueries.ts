import { gql } from '@apollo/client'


const GET_NFT_DATA = gql`
{
  nftCreates {
    uri
    tokenID
    minterAddress
  }
}
`

export default GET_NFT_DATA
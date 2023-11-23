import compile from '../helpers/compile'
import { useEffect } from 'react'

export default function Dashboard() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
  //     const runCompile = async () => {
  //     const version = 'latest'
  //     const compiler = await solcjs(version)
  //     console.dir(compiler.version)
  
  //     const sourceCode = `
  //     pragma solidity ^0.8.20;
  
  //     import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
  //     import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
  //     import "@openzeppelin/contracts/access/Ownable.sol";
  
  //     contract MyToken is ERC721, ERC721URIStorage, Ownable {
  //         constructor(address initialOwner)
  //             ERC721("MyToken", "MTK")
  //             Ownable(initialOwner)
  //         {}
  
  //     function safeMint(address to, uint256 tokenId, string memory uri)
  //         public
  //         onlyOwner
  //     {
  //         _safeMint(to, tokenId);
  //         _setTokenURI(tokenId, uri);
  //     }
  
  //     // The following functions are overrides required by Solidity.
  
  //     function tokenURI(uint256 tokenId)
  //         public
  //         view
  //         override(ERC721, ERC721URIStorage)
  //         returns (string memory)
  //     {
  //         return super.tokenURI(tokenId);
  //     }
  
  //     function supportsInterface(bytes4 interfaceId)
  //         public
  //         view
  //         override(ERC721, ERC721URIStorage)
  //         returns (bool)
  //     {
  //         return super.supportsInterface(interfaceId);
  //     }
  // }`
  //   const output = await compiler(sourceCode)
  //   console.log(output)
  //   }
  //   runCompile()
  compile()
  }
  })
  
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <button onClick={() => compile()}></button> */}
    </div>
  )
}

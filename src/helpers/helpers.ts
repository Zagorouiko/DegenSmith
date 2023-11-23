import axios from 'axios'
import IPFSClient from './IPFSClient'

export async function generateImage() {
  const ipfsClient = await IPFSClient.createIPFSClient()
    try {
    const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      };
  
    const gptResponse = await axios.post("https://api.openai.com/v1/completions", {
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "Create a generative NFT art prompt in the likes of Bored Ape Yacht Club, send me just the text, no code, and no intro",
    "max_tokens": 100
    }, options)


    const imageResponse = await axios.post( "https://api.openai.com/v1/images/generations", {         
        "prompt": gptResponse.data.choices[0].text,
        "n": 1,
        "size": "256x256"
    }, options)

    // Need to save the raw file here before sending it to the image prop
     const rawImage: any = await axios.get("https://cors-anywhere.herokuapp.com/" + imageResponse.data.data[0].url, 
      {
        responseType: 'arraybuffer', 
        headers: { 'Content-Type': 'image/png', 'Access-Control-Allow-Origin': '*' }
      }
      )
      const uint8Array = new Uint8Array(rawImage.data);
      
      // Convert Uint8Array to Buffer
      const buffer = await Buffer.from(uint8Array);
      const imageURI = await ipfsClient.add(buffer)  
 
        const obj = {
        "name": "AI Generated Image",
        "description": "A piece of art",
        "image": "https://gumwall.infura-ipfs.io/ipfs/" + imageURI.path
    }
      const result = await ipfsClient.add(JSON.stringify(obj));
      const metadata = "https://gumwall.infura-ipfs.io/ipfs/" + result.path
      return metadata

    } catch (error) {
      console.log(error)
    }
}
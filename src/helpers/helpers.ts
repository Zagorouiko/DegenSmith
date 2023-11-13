import axios from 'axios'
import IPFSClient from './IPFSClient'

export async function generateImage() {
    try {
    const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      };
  
    const gptResponse = await axios.post("https://api.openai.com/v1/completions", {
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "Create a generative creative random art prompt, send me just the text, no code, and no intro",
    "max_tokens": 50
    }, options)


    const imageResponse = await axios.post( "https://api.openai.com/v1/images/generations", {         
        "prompt": gptResponse.data.choices[0].text,
        "n": 1,
        "size": "256x256"
    }, options)

    // Need to save the raw file here before sending it to the image prop
     const responseURI = imageResponse.data.data[0].url;

        const ipfsClient = await IPFSClient.createIPFSClient()
        const obj = {
        "name": "AI Generated Image",
        "description": "A piece of gum",
        "image": responseURI
    }
      const result = await ipfsClient.add(JSON.stringify(obj));
      const metadata = "https://gumwall.infura-ipfs.io/ipfs/" + result.path
      return metadata

    } catch (error) {
      console.log(error)
    }
}
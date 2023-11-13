import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import '@/styles/globals.css'
import 'dotenv/config'
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
require('dotenv').config()

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/41467/zkgumwall/0.0.4"
})

export default function App({ Component, pageProps}: AppProps) {
  
  return (
    <ApolloProvider client={client}>
    <ThirdwebProvider 
    activeChain={Sepolia}
    clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    // autoConnect={autoConnect}
    >
      <Head>
          <title>Degensmith</title>
          <meta name="description" content="Lens App" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="../../static/favicon.ico" />
      </Head>    
          <Component {...pageProps} />         
    </ThirdwebProvider>  
    </ApolloProvider> 
  )
}

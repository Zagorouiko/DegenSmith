import Head from 'next/head'
import type { AppProps } from 'next/app'
import { smartWallet, ThirdwebProvider, embeddedWallet, metamaskWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import '@/styles/globals.css'
import 'dotenv/config'
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import networkMapping from "../constants/networkMapping.json";
require('dotenv').config()

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/41467/degen/0.0.3"
})

export default function App({ Component, pageProps}: AppProps) {
  // Smart wallet
  const smartWalletConfig = {
    factoryAddress: "0x01f2F087cE7B22a6934AF909c2B025ECc5f822c6",
    gasless: true,
  }
  
  return (
    <ApolloProvider client={client}>
    <ThirdwebProvider 
    activeChain={Sepolia}
    clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID}
    supportedWallets={[
      smartWallet(embeddedWallet(), smartWalletConfig),
      smartWallet(metamaskWallet(), smartWalletConfig)
    ]}
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

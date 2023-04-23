import '@/styles/globals.css'
import {Montserrat} from 'next/font/google'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import RockPaperScissors from '@/components/RockPaperScissors'
import Aquarium from '@/components/Aquarium'

const monserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-mont"
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${monserrat.variable} font-mont bg-light w-full min-h-screen`}>
        <NavBar></NavBar>
        <RockPaperScissors></RockPaperScissors>
        <Aquarium></Aquarium>
        <Component {...pageProps} />
      </main>
    </>
  )
}

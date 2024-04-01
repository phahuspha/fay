import "@/sass/globals.css";
import type { AppProps } from "next/app";
import { Sriracha } from "next/font/google";

export const sriracha = Sriracha({
  weight:'400',
  subsets: ['latin'],
})


export default function App({ Component, pageProps }: AppProps) { 
  return (
    <main className={`${sriracha.className}`}>
      <Component {...pageProps} />
    </main>
  );
}

import { Sriracha } from 'next/font/google'
import LogoutButton from './LogoutButton'
import DarkImageBackground from './BG'



export const sriracha = Sriracha({
  weight: '400',
  subsets: ['latin'],
})


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* <LogoutButton /> */}
      <main className={`relative w-screen h-screen`}>
        <DarkImageBackground />
        {children}
      </main>
    </section>
  )
}
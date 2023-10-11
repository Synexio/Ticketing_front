import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 pb-6">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="text-3xl items-center justify-center flex flex-col text-center">Ticketing Project</p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            Powered by {' '}
            <Image
                className="pl-4"
              src="/polygon-matic-logo.svg"
              alt="Polygon Logo"
              width={50}
              height={24}
              priority
            />
        </div>
      </div>


      <div className="mb-64 grid text-center">
          <h2 className={`mb-3 text-xl font-semibold`}>
            Nombre de tickets disponibles
          </h2>
          <p className={`mb-6 text-sm opacity-80`}>
            X
          </p>

          <h2 className={`mb-3 text-xl font-semibold`}>
            Prix du ticket
          </h2>
          <p className={`mb-6 text-sm opacity-80`}>
            X MATIC
          </p>

          <button className="btn btn-neutral my-6">Acheter un ticket</button>
          <Link href="/ticket" className="btn btn-neutral">Utiliser un ticket</Link>
      </div>

        <p className="text-sm opacity-60">Created by Alexandre Hannagan</p>
    </main>
  )
}

'use client';
import Image from 'next/image'
import Link from "next/link";
import {Web3Button} from "@web3modal/react";
import {useAccount, useDisconnect, useContractWrite} from "wagmi";
import {parseGwei} from "viem";
import {readContract, writeContract} from "@wagmi/core";
import {useEffect, useState} from "react";



export default function Home() {

    const [availableTickets, setAvailableTickets] = useState<any>('');
    const [ticketPrice, setTicketPrice] = useState<any>('');

    useEffect(() => {
        // @ts-ignore
        readContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'getAvailableTickets'
        }).then((res: any) => {
            const newR = Number(res);
            setAvailableTickets(newR);
        })

        // @ts-ignore
        readContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'getTicketPrice'
        }).then((res: any) => {
            const newR = Number(res);
            setTicketPrice(newR);
        })
    }, [availableTickets, ticketPrice])

    const { address, connector, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const contract = require("./contract/Ticketing.json");
    const contractABI = contract.abi;
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    async function mint() {
        // @ts-ignore
        const {hash} = await writeContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'mint',
            value: parseGwei('1'),
        });
    }

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


      <div className="mb-64 mt-24 grid text-center">
          <h2 className={`mb-3 text-xl font-semibold`}>
            Nombre de tickets disponibles
          </h2>
          <p className={`mb-6 text-sm opacity-80`}>
              {availableTickets}
          </p>
          <h2 className={`mb-3 text-xl font-semibold`}>
            Prix du ticket
          </h2>
          <p className={`mb-6 text-sm opacity-80`}>
              {ticketPrice} MATIC
          </p>

          {
              isConnected &&
              <div>
                  <button className="btn btn-neutral my-6 mr-4" onClick={async () => {await mint();}}>Acheter un ticket</button>
                  <Link href="/ticket" className="btn btn-neutral mr-4">Utiliser un ticket</Link>
                  <button className="btn btn-neutral mt-6" onClick={disconnect}>Se déconnecter</button>
              </div>
          }
          {
              !isConnected &&
              <Web3Button />
          }


      </div>

        <p className="text-sm opacity-60">Created by Alexandre Hannagan</p>
    </main>
  )
}

"use client"

import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import Image from "next/image";
import '@coinbase/onchainkit/styles.css';
import Link from "next/link";
import { useAccount, useDisconnect } from 'wagmi';
import { Name } from '@coinbase/onchainkit/identity';

export default function Navbar() {
    const { address, status } = useAccount();
    const { disconnect } = useDisconnect();
    return <div className="fixed top-0 w-screen bg-white flex justify-between items-center flex-row px-20 py-4 z-40">
        <div className="flex justify-start items-center flex-row">

            <Image src={require("../../../public/logo.png")} alt="" className="w-48 h-auto" />
            <div className="ml-4 text-black">
                <Link href="/" className="mx-4">
                    Shoe
                </Link>
                <Link href="/nouns" className="mx-4">
                    Nouns
                </Link>
                <Link href="/" className="mx-4">
                    Favourite
                </Link>
                <Link href="/profile" className="mx-4">
                    Profile
                </Link>
            </div>
        </div>
        
        <div className="">
        {(() => {
        if (status === 'disconnected') {
          return <div className="bg-purple-400 p-1 rounded-3xl"><ConnectAccount /></div>; 
        }
 
        return (
          <div className="flex h-8 w-8 items-center justify-start mr-24">
            {address && (
              <button type="button" onClick={() => disconnect()} className="border-4 border-purple-400 p-2 rounded-full">
                <Name address={address} className="" />
              </button>
            )}
          </div>
        );
      })()}
        </div>

    </div>
}
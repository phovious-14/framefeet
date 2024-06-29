"use client"

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return <div className="fixed top-0 w-screen bg-white flex justify-between items-center flex-row px-20 py-4 z-40">
        <div className="flex justify-start items-center flex-row">

            <Image src={require("../../../public/logo3.png")} alt="" className="w-48 h-auto" />
            <div className="ml-4 text-black">
                <Link href="/" className="mx-4">
                    Shoe
                </Link>
                <Link href="/nouns" className="mx-4">
                    Nouns
                </Link>
                <Link href="/your-orders" className="mx-4">
                    Your Orders
                </Link>
                <Link href="/" className="mx-4">
                    Favourite
                </Link>
                <Link href="/profile" className="mx-4">
                    Profile
                </Link>
            </div>
        </div>
        
        <div className="bg-slate-800 p-1 rounded-3xl">
            <w3m-button />
        </div>;

    </div>
}
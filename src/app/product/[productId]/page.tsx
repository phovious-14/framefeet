"use client"

import Navbar from "@/components/navbar/page"
import store from "@/store"
import Image from "next/image"
import { useState } from "react"
import { useAccount, useReadContract } from "wagmi"
import { base_sepolia_storage } from "../../../../base_sepolia_storage"

type IProduct = {
    id: number,
    image: string,
    glb: string,
    name: string,
    inr: string,
    usdc: string
}

export default function Page({ params }: number | any) {

    const [product, setProduct] = useState<IProduct[]>(store.filter(item => item.id == params.productId))
    const [counter, setCounter] = useState<number>(1)
    const { address } = useAccount()
    const result = useReadContract({
        abi: base_sepolia_storage,
        address: "0x93Fc58B6A8BA282d339e6e34164488b3537401cC",
        functionName: 'getAddrOf',
        args: [address]
      })
    
      const fetchName = useReadContract({
        abi: base_sepolia_storage,
        address: "0x93Fc58B6A8BA282d339e6e34164488b3537401cC",
        functionName: 'getNameOf',
        args: [address]
      })

    const url = 'https://api.commerce.coinbase.com/charges';

    const requestBody = {
        local_price: {
            amount: Number(product[0].usdc) * counter, //price of charge
            currency: 'USD', //currency
        },
        pricing_type: 'fixed_price',

        name: product[0].name,
        description: 'Shoe',
        redirect_url: 'https://framefeet.vercel.app/payment-reciept', //optional redirect URL

        metadata: { //optional charge metadata
            product_id: product[0].id,
            product_img: product[0].image,
            product_name: product[0].name,
            cust_name: fetchName?.data,
            wallet_address: address,
            address: result?.data,
            qty: counter,
            total: Number(product[0].usdc) * counter
        },
    };

    const payload: any = {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CC-Api-Key': "73d2658d-6e70-4500-b555-3274c499f73f",//API key from Commerce
        },
        body: JSON.stringify(requestBody),
    };

    async function createCharge() {
        try {
            const response = await fetch(url, payload);
            if (!response.ok) {
                throw new Error(`HTTP error Status: ${response.status}`);
            }
            const res = await response.json()
            localStorage.setItem("chargeData", JSON.stringify(res.data))
            window.location.href = res.data.hosted_url
        } catch (error) {
            console.error("Error creating charge:", error);
        }
    }

    const incCounter = () => {
        setCounter(prev => prev + 1)
    }

    const decCounter = () => {
        if (counter == 1) return
        setCounter(prev => prev - 1)
    }

    return (
        <div className="min-h-screen bg-white w-screen p-2 overflow-hidden">
            <Navbar />
            <div className="w-screen mt-32 flex p-2 justify-around items-center inria-serif-regular">
                <div className="w-[500px]">
                    <div className="border-2 sub-border-1 absolute border-black mt-3 ml-3 z-10 rounded-lg bg-[#6BF4FD]">
                        <Image src={product[0].image} alt="" className="opacity-0" width={"500"} height={"500"} />
                    </div>
                    <div className="border-[3px] rounded-lg relative border-black sub-border-1 bg-white z-20 flex justify-start items-center flex-col w-full">
                        <Image src={product[0].image} width={"500"} height={"500"} alt="" />
                    </div>
                </div>
                <div className="w-[500px] flex justify-start items-center flex-col">
                    <div className="text-xl text-black">
                        {product[0].name}
                    </div>
                    <hr className="my-4 h-[2px] bg-gray-600 w-full" />
                    <div className="flex w-full justify-between items-center my-4">
                        <h1 className="text-slate-900">Quantity</h1>
                        <div className="flex justify-center items-center flex-row">
                            <button className="border-[1px] border-black text-slate-900 text-lg w-10" onClick={decCounter}>-</button>
                            <p className="border-[1px] border-black text-slate-900 text-base w-10 text-center py-[2px]">{counter}</p>
                            <button className="border-[1px] border-black text-slate-900 text-lg w-10" onClick={incCounter}>+</button>
                        </div>
                    </div>
                    <hr className="my-4 h-[2px] bg-gray-600 w-full" />
                    <div className="flex w-full justify-between items-center my-4">
                        <h1 className="text-slate-900 text-2xl">₹ {Number(product[0].inr) * counter}</h1>
                        <button className="bg-yellow-200 text-lg font-bold text-black p-1 border border-black w-[100px] rounded-lg">Buy</button>
                    </div>
                    <div className="flex w-full justify-between items-center my-4">
                        <h1 className="text-slate-900 text-2xl flex justify-start items-center flex-row"><Image src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png" alt="" width={"30"} height={"30"} className="mr-2" />{(Number(product[0].usdc) * counter).toFixed(3)} usdc</h1>
                        <button className="bg-indigo-300 text-lg font-bold text-black p-1 border border-black w-[100px] rounded-lg" onClick={createCharge}>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
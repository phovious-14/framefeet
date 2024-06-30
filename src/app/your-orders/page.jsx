
"use client"
import Navbar from "@/components/navbar/page";
import { base_sepolia_storage } from "../../../base_sepolia_storage";
import { useAccount, useReadContract } from "wagmi";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from "next/image";
import NextCrypto from 'next-crypto';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

export default function Profile() {

    const { address } = useAccount()
    const result = useReadContract({
        abi: base_sepolia_storage,
        address: "0xc232b61eefaE6933E77E681e056FF268e39De3a3",
        functionName: 'getPaymentOf',
        args: [address]
    })
    const copylink = async (id) => {
        const crypto = new NextCrypto('qwerty');
        let wallet = await crypto.encrypt(address)
        console.log(wallet);
        navigator.clipboard.writeText(`https://framefeet.vercel.app/api/${Number(id)}/${JSON.stringify(wallet)}`)
    }

    return <div className="w-screen bg-white pb-6">
        <Navbar />
        <div className="w-screen h-screen bg-white mt-[80px] pt-4 flex justify-start items-center flex-col">
            {
                result?.data?.length != 0 ? result?.data?.map((item, index) => (
                    <Accordion className="border-2 border-slate-900 w-[50%] mt-4 rounded-full" key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="flex justify-start items-center flex-row"
                        >
                            <Image src={item.image} alt="" width={100} height={100} />
                            <h1 className="text-xl text-slate-800 mt-8 ml-4">{item.name}</h1>
                        </AccordionSummary>
                        <AccordionDetails className="flex justify-center items-center flex-col w-full">
                            <div className="flex justify-between items-center flex-row w-full my-1">
                                <h1 className="text-slate-500">Quantity</h1>
                                <h1 className="text-slate-700">{Number(item.qty)}</h1>
                            </div>
                            <div className="flex justify-between items-center flex-row w-full my-1">
                                <h1 className="text-slate-500">Total amount</h1>
                                <h1 className="text-slate-700">$ {Number(item.total_amt)} USDC</h1>
                            </div>
                            <div className="flex justify-between items-center flex-row w-full my-1">
                                <h1 className="text-slate-500">Time</h1>
                                <h1 className="text-slate-700">{(item.time)}</h1>
                            </div>
                            <div className="flex justify-between items-center flex-row w-full my-1">
                                <h1 className="text-slate-500">Network</h1>
                                <h1 className="text-slate-700">{(item.network)}</h1>
                            </div>
                            <div className="flex justify-between items-center flex-row w-full my-1">
                                <h1 className="text-slate-500">Address</h1>
                                <h1 className="text-slate-700">{(item.addr)}</h1>
                            </div>
                            <div className="w-full flex justify-between items-center flex-row my-2">
                                <a href={`https://basescan.org/tx/${item.tx_hash}`} className="text-blue-500">Transaction Hash <OpenInNewIcon className="text-blue-500 text-sm" fontSize="small" /></a>
                                <button onClick={() => copylink(item.id)} className="bg-lime-400 p-2 text-sm text-black font-semibold rounded-full px-4 flex justify-between items-center border-2 border-purple-500">
                                    <Image src="data:image/jpeg;base64,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" 
                                        alt="" height={30} width={30} className="rounded-full mr-2" 
                                    />
                                    Copy Frame
                                </button>
                            </div>
                            
                        </AccordionDetails>
                    </Accordion>
                    
                ))
                : <h1 className="text-slate-500">No Orders Found!</h1>
            }
            
        </div>
    </div>
} 
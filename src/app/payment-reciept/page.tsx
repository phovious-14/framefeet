"use client"
import { useEffect, useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Image from "next/image";
import { useAccount, useWriteContract } from "wagmi";
import { base_sepolia_storage } from "../../../base_sepolia_storage";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Page() {

    const [recieptData, setRecieptData] = useState<any>(null)
    const { writeContract, data, isPending, isSuccess, isError, error  } = useWriteContract()
    const [open, setOpen] = useState(false);
    const {address} = useAccount()
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    let chargeData: string;

    const storedChargeData = localStorage.getItem('chargeData');
    chargeData = storedChargeData === null ? "" : storedChargeData
    const url = `https://api.commerce.coinbase.com/charges/${JSON.parse(chargeData).id}`;
    const payload: any = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CC-Api-Key': "73d2658d-6e70-4500-b555-3274c499f73f",//API key from Commerce
        }
    };

    const checkout = async () => {
        try {
            const response = await fetch(url, payload);
            if (!response.ok) {
                throw new Error(`HTTP error Status: ${response.status}`);
            }
            const res = await response.json()
            console.log(res.data);
            
            setRecieptData(res.data);
            
        } catch (error) {
            console.error("Error creating charge:", error);
        }
    }

    const save = () => {
        console.log('clicked');
        console.log([recieptData?.metadata.product_img, recieptData?.metadata.qty, recieptData?.metadata.total, recieptData?.payments[0].detected_at, recieptData?.payments[0].network, recieptData?.metadata.address, recieptData?.web3_data.success_events[0].tx_hsh]);
        
        writeContract({ 
            abi: base_sepolia_storage,
            address: '0xc232b61eefaE6933E77E681e056FF268e39De3a3',
            functionName: 'addPaymentReceipt',
            args: [recieptData?.metadata.product_id, recieptData?.name, recieptData?.metadata.product_img, recieptData?.metadata.qty, recieptData?.metadata.total, recieptData?.payments[0].detected_at, recieptData?.payments[0].network, address, recieptData?.metadata.address, recieptData?.web3_data.success_events[0].tx_hsh],
            chainId: 84532
         })
         
         if(isSuccess) {
            setOpen(true);
         }           
    }

    useEffect(() => {
        checkout()
    }, [])

    return <div className="text-black bg-white w-screen flex justify-center items-center flex-col h-screen">
        <div className="w-[40%]">
            <div className="border-2 sub-border-1 absolute border-black mt-2 ml-4 z-10 rounded-lg p-4 bg-[#6BF4FD] w-[40%]">
                <div className="p-2 text-lg">
                    Payment
                </div>
                <div className="w-full flex justify-between items-center flex-row mt-4 mb-2 text-">
                    <h1 className="text-slate-500">Product Name</h1>
                    <h1 className="text-slate-700">{recieptData?.name}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Product Quantity</h1>
                    <h1 className="text-slate-700">{Number(recieptData?.metadata.qty)}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Total amount</h1>
                    <h1 className="text-slate-700">{Number(recieptData?.metadata.total)} USDC</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Payment Time</h1>
                    <h1 className="text-slate-700">{recieptData?.payments[0].detected_at}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Network</h1>
                    <h1 className="text-slate-700">{recieptData?.payments[0].network}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Payment Sender</h1>
                    <h1 className="text-slate-700">{recieptData?.payments[0].payer_addresses}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Payment Status</h1>
                    {recieptData?.payments[0].status == "pending" ? <h1 className="text-yellow-700 uppercase">{recieptData?.payments[0].status}</h1> : <h1 className="text-green-700 font-bold uppercase">{recieptData?.payments[0].status}</h1>}
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <a href={`https://basescan.org/tx/${recieptData?.web3_data.success_events[0].tx_hsh}`} className="text-blue-500">Transaction Hash <OpenInNewIcon className="text-blue-500 text-sm" fontSize="small" /></a>
                </div>

                <button className="bg-blue-800 text-white rounded-full p-2 text-lg w-1/2 mt-4">Go To Home Page</button>
            </div>
            <div className="border-[3px] rounded-lg relative border-black sub-border-1 p-6 bg-white z-20 flex justify-start items-center flex-col w-full ">
                <div className="p-2 text-2xl flex justify-between items-center flex-row w-full pb-6 border border-t-0 border-r-0 border-l-0 border-b-slate-500">
                    <><ReceiptIcon className="text-slate-700" /> Payment Reciept</>
                    <button onClick={save} className="bg-slate-800 text-white rounded-full p-2 text-base border-2 hover:bg-white hover:text-black transition-all border-slate-800 w-[100px]">Save</button> 
                </div>
                
                <div className="w-full flex justify-between items-center flex-row mt-6 mb-2 text-">
                    <Image src={recieptData?.metadata.product_img} alt="" width={100} height={100} className="border border-slate-400 rounded-md"/>
                    <h1 className="text-slate-700">{recieptData?.name}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Product Quantity</h1>
                    <h1 className="text-slate-700">{Number(recieptData?.metadata.qty)}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Total amount</h1>
                    <h1 className="text-slate-700">{Number(recieptData?.metadata.total)} USDC</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Payment Time</h1>
                    <h1 className="text-slate-700">{recieptData?.payments[0].detected_at}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Network</h1>
                    <h1 className="text-slate-700">{recieptData?.payments[0].network}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Payment Sender</h1>
                    <h1 className="text-slate-700">{recieptData?.payments[0].payer_addresses}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Payment Status</h1>
                    {recieptData?.payments[0].status == "pending" ? <h1 className="text-yellow-700 uppercase">{recieptData?.payments[0].status}</h1> : <h1 className="text-green-700 font-bold uppercase">{recieptData?.payments[0].status}</h1>}
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <h1 className="text-slate-500">Address</h1>
                    <h1 className="text-slate-700 w-[60%] text-wrap text-right">{recieptData?.metadata.address}</h1>
                </div>
                <div className="w-full flex justify-between items-center flex-row my-2">
                    <a href={`https://basescan.org/tx/${recieptData?.web3_data.success_events[0].tx_hsh}`} className="text-blue-500">Transaction Hash <OpenInNewIcon className="text-blue-500 text-sm" fontSize="small" /></a>
                </div>

                <a href="https://framefeet.vercel.app" className="bg-blue-800 text-white rounded-full p-2 text-lg w-1/2 mt-8 mb-4 text-center border-2 hover:bg-white hover:text-black transition-all border-blue-800">Go To Home Page</a>

            </div>

        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            >
            Saved!
            </Alert>
        </Snackbar>
    </div>
}
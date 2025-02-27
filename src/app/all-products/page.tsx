
"use client"

import Navbar from "@/components/navbar/page"
import { useAccount } from "wagmi"

import Image from "next/image"
import store from '../../store'
import SearchIcon from '@mui/icons-material/Search'

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

export default function Page() {

    const { address } = useAccount()

    if(address != "0xF13cc670E528cD7c6fDC9420f39D725E9375F98A") window.location.href = "https://framefeet.vercel.app"

    const handlePromote = (id: any) => {
        console.log(id);
        navigator.clipboard.writeText(`https://framefeet.vercel.app/api/promote/${id}`)        
    }

    return  <div className="min-h-screen bg-white w-screen p-2">
      <Navbar />
      <div className="p-[2px] w-[99%] h-full bg-black inria-serif-regular mt-[80px]">
        <div className="bg-white rounded-xl p-12 px-24 w-full">
          <div className="flex justify-between items-center">
            <p className="text-black text-[50px] ">Premium Quality Selection</p>
            <div>
              <input type="text" className="border-2 p-2 px-4 border-black text-black text-2xl" />
              <SearchIcon className="text-black absolute right-28 mt-3" />
            </div>
          </div>
          <div className="mt-12 w-full flex justify-start items-center flex-wrap">

            {store.map(item => (
              <div className="m-10 card-hover w-[43%]" key={item.id}>
                <div className="border-[3px] rounded-lg relative border-black sub-border-1 bg-white z-20 flex justify-start items-center flex-col w-full">
                  <Image src={item.image} alt="" className="w-[15rem] h-auto" width={"240"} height={"240"} />
                  <p className="text-black p-2 text-center w-[240px] font-bold text-base border-t-2 border-black">{item.name}</p>
                  <button onClick={() => {
                    handlePromote(item.id)
                  }} className="font-bold text-center uppercase m-4 mr-2 bg-orange-400 p-2 w-[95%] ml-2 rounded-full text-white ">Promote</button>
                  <div className="text-black p-2 text-lg w-full border-t-2 border-black flex justify-around items-center">
                    <h1>₹ {item.inr}</h1>
                    |
                    <div className="flex justify-between items-center flex-row">
                      <Image src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png" alt="" width={"20"} height={"20"} />
                      <h1 className="ml-2">{item.usdc} USDC</h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
}
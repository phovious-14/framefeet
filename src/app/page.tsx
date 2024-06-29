
import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from "next/image";
import Navbar from "../components/navbar/page";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import store from '../store';
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
  )
  return {
    other: frameTags,
  }
}

export default function Home() {

  
  
// const url = 'https://api.commerce.coinbase.com/charges';

// const requestBody = {
//    local_price: {
//      amount: '0.01', //price of charge
//      currency: 'USD', //currency
//   },
//   pricing_type: 'fixed_price',
 
//  name: 'Name of the charge',
//   description: 'Small description',
//   redirect_url: 'http://localhost:3000/profile', //optional redirect URL

//    metadata: { //optional charge metadata
//      id: 'Customer id',
//      address: '123 Satoshi Lane',
//    },
// };

// const payload:any = {
//   musdcod: 'POST',
//   mode: 'cors',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'X-CC-Api-Key': "73d2658d-6e70-4500-b555-3274c499f73f",//API key from Commerce
//   },
//   body: JSON.stringify(requestBody),
// };

  return (
    <div className="min-h-screen bg-white w-screen p-2">
      <Navbar />

      <div className="p-[2px] w-[99%] h-full mt-[97px] bg-black">
        <div className="bg-white rounded-xl flex justify-around items-center flex-row p-12 px-24">
          <div className="text-black uppercase inria-serif-regular flex justify-start items-start flex-col">
            <h1 className="text-[5rem] leading-[80px]">Step <br />in style</h1>
            <button className="text-black bg-purple-400 rounded-full text-xl p-2 px-6 mt-12">
              But Now
            </button>
          </div>
          <Image src={require('../../public/Arrow.svg')} alt="" className="w-48 h-full absolute -mt-[270px] rotate-[-10deg] -ml-48" />
          <div>
            <div className="border-2 sub-border-1 absolute border-black mt-6 ml-6 z-10 rounded-lg bg-red-100">
              <Image src={require("../../public/shoe1.png")} alt="" className="w-[25rem] h-auto opacity-0" />
            </div>
            <div className="border-[3px] rounded-lg relative border-black sub-border-1 bg-white z-20">
              <Image src={require("../../public/shoe1.png")} alt="" className="w-[25rem] h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-[2px] w-[99%] h-full bg-black inria-serif-regular">
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
              <Link className="m-10 card-hover" key={item.id} href={`/product/${item.id}`}>
                <div className="border-2 sub-border-1 absolute border-black mt-3 ml-3 z-10 rounded-lg bg-[#C2FFB3]">
                  <Image src={item.image} alt="" className="w-[15rem] h-auto opacity-0" width={"240"} height={"240"} />
                </div>
                <div className="border-[3px] rounded-lg relative border-black sub-border-1 bg-white z-20 flex justify-start items-center flex-col w-full">
                  <div className="text-black text-right mr-2"><FavoriteBorderIcon /></div>
                  <Image src={item.image} alt="" className="w-[15rem] h-auto" width={"240"} height={"240"} />
                  <p className="text-black p-2 text-center w-[240px] font-bold text-base border-t-2 border-black">{item.name}</p>
                  <div className="text-black p-2 text-lg w-full border-t-2 border-black flex justify-around items-center">
                    <h1>₹ {item.inr}</h1>
                    |
                    <div className="flex justify-between items-center flex-row">
                      <Image src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png" alt="" width={"20"} height={"20"} />
                      <h1 className="ml-2">{item.usdc} USDC</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}


          </div>
        </div>
      </div>

    </div>
  );
}

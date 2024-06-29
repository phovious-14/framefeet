"use client"

import Image from "next/image";
import Navbar from "../../components/navbar/page";

export default function Home() {

  return (
    <div className="min-h-screen bg-white w-screen p-2">
      <Navbar />

      <div className="p-[2px] w-[99%] h-full mt-[97px] bg-black">
        <div className="bg-white rounded-xl flex justify-around items-center flex-row p-12 px-24">
          <div className="text-black inria-serif-regular flex justify-start items-start flex-col">
            <h1 className="text-[3rem] leading-[80px]">Customize And<br />Order 3D Printed Nouns</h1>
          </div>
          <Image src={require('../../../public/Arrow.svg')} alt="" className="w-48 h-full absolute -mt-[270px] rotate-[-10deg] -ml-32" />
          <div>
            <div className="border-2 sub-border-1 absolute border-black mt-6 ml-6 z-10 rounded-lg bg-blue-700">
              <Image src="https://noun.pics/14.jpg" alt="" width={200} height={200} className="w-[25rem] h-auto opacity-0" />
            </div>
            <div className="border-[3px] rounded-lg relative border-black sub-border-1 bg-white z-20">
            <Image src="https://noun.pics/14.jpg" alt="" width={200} height={200} className="w-[25rem] h-auto" />
            </div>
          </div>
        </div>
      </div>    

    </div>
  );
}

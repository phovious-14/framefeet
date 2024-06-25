"use client"

import Image from "next/image";
import Navbar from "../../components/navbar/page";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import store from '../../store'
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                      <h1 className="ml-2">{item.eth} ETH</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}


          </div>
        </div>
      </div>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}

    </div>
  );
}

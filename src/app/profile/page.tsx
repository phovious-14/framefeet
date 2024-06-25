"use client"
import Navbar from "@/components/navbar/page";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
    borderRadius: '10px'
};

export default function Profile() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { address } = useAccount()
    return <div className="w-screen bg-white ">
        <Navbar />
        <div className="w-screen h-screen bg-white mt-[100px] pt-4 flex justify-start items-center flex-col">
            <div className="flex justify-between items-center flex-row w-[60%]">

                {address && <div className="flex justify-start items-center">
                    <Avatar address={address} className="bg-white rounded-full" />
                    <Name address={address} className="ml-2" />
                </div>}

                <div className="w-[200px]">
                    <div className="border-2 sub-border-1 absolute border-black mt-2 ml-2 z-10 rounded-lg p-2 bg-[#6BF4FD] w-[200px]">
                        <button></button>
                    </div>
                    <div className="border-[3px] rounded-lg relative border-black sub-border-1 p-2 bg-white z-20 flex justify-start items-center flex-col w-[200px]">
                        <button className="text-black w-[200px]" onClick={handleOpen}>Add address</button>
                    </div>
                </div>

            </div>
            <div className="flex justify-start items-center flex-row w-[60%] text-slate-600 mt-6 border-2 border-black rounded-2xl p-4">
                <LocationOnIcon className="text-slate-700 mr-2" /> <h1>A-602, Shashwat mahadev heights, vastral, Ahmedabad, Gujarat</h1>
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black">
                    Your Location
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black text-base">
                    <textarea className="border-2 p-2 px-4 border-black text-black text-base w-full"></textarea>
                    <button className="bg-black text-white w-full p-2 mt-2 border border-black hover:text-black hover:bg-white transition-all">Add address</button>
                </Typography>
            </Box>
        </Modal>
    </div>
} 
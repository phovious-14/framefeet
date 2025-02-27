"use client"
import Navbar from "@/components/navbar/page";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { base_sepolia_storage } from "../../../base_sepolia_storage";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

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

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const {address} = useAccount()
    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);
    const [addr, setAddr] = useState("")
    const [name, setName] = useState("")
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const { writeContract, data, isPending, isSuccess, isError, error  } = useWriteContract()

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
      const handleCloseSnackbar = () => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
      };

    const handleAddr = () => {
        console.log(isPending);
        
        writeContract({ 
            abi: base_sepolia_storage,
            address: '0x93Fc58B6A8BA282d339e6e34164488b3537401cC',
            functionName: 'addAddr',
            args: [addr],
            chainId: 84532
         })
         if(isSuccess) {
            handleClose()
            setOpenSnackbar(true)
         }           
    }

    const handleName = () => {
        console.log(isPending);
        
        writeContract({ 
            abi: base_sepolia_storage,
            address: '0x93Fc58B6A8BA282d339e6e34164488b3537401cC',
            functionName: 'addName',
            args: [name],
            chainId: 84532
         })
         if(isSuccess) {
            handleClose()
            setOpenSnackbar(true)
         }           
    }

    const action = (
        <>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );

    return <div className="w-screen bg-white ">
        <Navbar />
        <div className="w-screen h-screen bg-white mt-[80px] pt-4 flex justify-start items-center flex-col">
            <div className="flex justify-between items-center flex-row w-[60%]">

                <div className="w-[200px]">
                    <div className="border-2 sub-border-1 absolute border-black mt-2 ml-2 z-10 rounded-lg p-2 bg-[#6BF4FD] w-[200px]">
                        <button></button>
                    </div>
                    <div className="border-[3px] rounded-lg relative border-black sub-border-1 p-2 bg-white z-20 flex justify-start items-center flex-col w-[200px]">
                        <button className="text-black w-[200px]" onClick={handleOpen}>Add address</button>
                    </div>
                </div>

                <div className="w-[200px]">
                    <div className="border-2 sub-border-1 absolute border-black mt-2 ml-2 z-10 rounded-lg p-2 bg-[#6BF4FD] w-[200px]">
                        <button></button>
                    </div>
                    <div className="border-[3px] rounded-lg relative border-black sub-border-1 p-2 bg-white z-20 flex justify-start items-center flex-col w-[200px]">
                        <button className="text-black w-[200px]" onClick={handleOpen2}>Add name</button>
                    </div>
                </div>

            </div>
            
            <div className="flex justify-start items-center flex-row w-[60%] text-slate-600 mt-6 border-2 border-black rounded-2xl p-4">
                <PersonOutlineIcon className="text-slate-700 mr-2" /> <h1>{fetchName?.data}</h1>
            </div>

            <div className="flex justify-start items-center flex-row w-[60%] text-slate-600 mt-6 border-2 border-black rounded-2xl p-4">
                <LocationOnIcon className="text-slate-700 mr-2" /> <h1>{result?.data}</h1>
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
                    <textarea className="border-2 p-2 px-4 border-black text-black text-base w-full" onChange={(e) => setAddr(e.target.value)}></textarea>
                    <button onClick={handleAddr} className="bg-black text-white w-full p-2 mt-2 border border-black hover:text-black hover:bg-white transition-all">Save</button>
                </Typography>
            </Box>
        </Modal>
        <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black">
                    Your Name
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black text-base">
                    <textarea className="border-2 p-2 px-4 border-black text-black text-base w-full" onChange={(e) => setName(e.target.value)}></textarea>
                    <button onClick={handleName} className="bg-black text-white w-full p-2 mt-2 border border-black hover:text-black hover:bg-white transition-all">Save</button>
                </Typography>
            </Box>
        </Modal>

        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Address added"
            action={action}
        />
    </div>
} 
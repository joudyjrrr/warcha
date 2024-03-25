import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';

export default function MoneyDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
  try {
    const formData = new FormData();
  
   data?.currency&& formData.append("currency", data.currency);
   data?.dollar_price&& formData.append("dollar_price", data.dollar_price);
const response = await UseAxios({ method: "post", api: "createPublicData", data: formData });

    if (response.status === 200) {
      setMessage("success");
      setOpenMessage(true);
      setTimeout(() => {
        setOpenMessage(false);
      setOpen(false);
      }, 3000);
    } 
  } catch (error) {
    setMessage(error.message || "An error occurred while submitting the form.");
    setOpenMessage(true);
    setTimeout(() => {
      setOpenMessage(false);
    }, 3000);
  }
};

 
  return (
    <React.Fragment>
      <Button sx={{float:"right",marginRight:"4%",color:"white",border:"1px solid white",bgcolor:"#f5c02e"}}  onClick={handleClickOpen}>
        CREATE
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>CREATE</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => { handleAdd(e) }}>
   
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{marginRight:"4%"}}>
                  <TextField
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="currency"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,currency:e.target.value})}}
        />
         </div>
         <div style={{marginRight:"4%"}}>
                  <TextField
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="dollar price"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,dollar_price:e.target.value})}}
        />
         </div> 
    </Box>
         
             <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={message}
      open={openMessage}
      key={"bottom" + "left"}
    />
    <div className="addDialogFormAction">
      <button type="submit" className="button smallRad buttonAdd">ADD</button>
      <button onClick={handleClose} type="button" className="buttonCansel smallRad">Close</button>
    </div>
  </form>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  );
}
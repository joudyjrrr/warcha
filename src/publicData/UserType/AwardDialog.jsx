import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  FormControl,  InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';
import { useSelector } from 'react-redux';

export default function AwardDialog({employee}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
  const money = useSelector((state) => state.money);
  


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

    data?.description && formData.append("description", data.description);
    data?.currency && formData.append("currency", data.currency);
     data?.balance&&formData.append("balance", data.balance);
    formData.append("employee_id",employee);
  
    const response = await UseAxios({ method: "post", api: `createEmployeeMony`, data: formData });

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
       ADD Award
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>ADD Award</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => { handleAdd(e) }}>
             <div className='displayDialogContent'>
         
   
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
                <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,balance:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="Balance"
                    fullWidth
                    type='number'
                />
                      <FormControl  sx={{ m: 1, minWidth: 120 }} >
      <InputLabel  color="warning" id="demo-select-small-label">currency</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,currency:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Branch"
      >
        <MenuItem value="">
                </MenuItem>
                {money?.money?.map((item,index) => {
                  return <MenuItem color="warning" value={item?.currency} key={"ht"+index}>{item?.currency}</MenuItem>
               })} 
                </Select> 
             </FormControl> 
         </div>
            <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,description:e.target.value})}}
                                   color={openMessage?"error" : "warning"}
multiline
          id="outlined-multiline-flexible"
          label="Description"
                    fullWidth
                    type='text'
                />
              </Box>
       
          </div>
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

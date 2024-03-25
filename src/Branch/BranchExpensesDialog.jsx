import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  Box, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, } from '@mui/material';
import { UseAxios } from '../store/constant/url';
import { useSelector } from 'react-redux';

export default function BranchExpensesDialog({branch}) {
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
   formData.append("branch_id", branch);
    formData.append("date", data.date);
    formData.append("total_price", data.total_price);
    formData.append("description", data.description);
   formData.append("title", data.title);
   formData.append("currency", data.currency);
   
    const response = await UseAxios({ method: "post", api: "createBranchExpens", data: formData });

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
        Add Expenses
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>ADD Expenses</DialogTitle>
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
          label="title"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,title:e.target.value})}}
        />
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                          color={openMessage?"error" : "warning"}

                    
                    onChange={(e)=>{setData({...data,description:e.target.value})}}
          id="outlined-multiline-flexible"
                  label="description"
          fullWidth
          multiline
        />
    
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField 
                    required
                    
                    onChange={(e)=>{setData({...data,total_price:e.target.value})}}
                   color={openMessage?"error" : "warning"}
type='number'
          id="outlined-multiline-flexible"
                  label="total price"
                  fullWidth
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
                    
                    onChange={(e)=>{setData({...data,date:e.target.value})}}
                   color={openMessage?"error" : "warning"}
type='date'
          id="outlined-multiline-flexible"
                  fullWidth
        />
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
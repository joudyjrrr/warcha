import React from 'react'
import { UseAxios } from '../../store/constant/url';
import { Box, Button, Dialog, DialogContent, DialogTitle,  Snackbar, TextField } from '@mui/material';

function AddBuyExper({addExperience}) {
 const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("Accebt Only Image")
 const [openMessage, setOpenMessage] = React.useState(false);
 const [open, setOpen] = React.useState(false);
 
 
 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
 };
 const handleAdd = () => {
  console.log(data);
  addExperience({
      title: data.title,
      cost: data.cost,
      description: data.description
  });
  setMessage("added success")
  setOpenMessage(true)
  setTimeout(() => {
   setOpenMessage(false)
  setOpen(false)
  }, 1000);
 }
  return (
    <React.Fragment>
      <Button sx={{float:"right",marginRight:"4%",color:"white",border:"1px solid white",bgcolor:"#f5c02e"}}  onClick={handleClickOpen}>
        Add 
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle> Add </DialogTitle>
        <DialogContent>
    <div className='displayDialogContent'>
     
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
    
        <TextField
          
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="title"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,title:e.target.value})}}
        />        
           <TextField
          
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="cost"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,cost:e.target.value})}}
        />        
    
       
          <TextField
          
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="description"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,description:e.target.value})}}
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
      <button onClick={handleAdd} type="submit" className="button smallRad buttonAdd">ADD</button>
      <button onClick={handleClose} type="button" className="buttonCansel smallRad">Close</button>
    </div>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  )
}

export default AddBuyExper
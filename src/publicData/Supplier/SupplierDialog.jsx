import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';
import { useSelector } from 'react-redux';

export default function SupplierDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
 const money = useSelector((state) => state.money);


  const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith('image/')) {
      setMessage("Accebt Only Image")
      setOpenMessage(true);
      setTimeout(() => {
        setOpenMessage(false);
      }, 2000);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setImageToSend(file);
    console.log(image);
  }
};
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
   if (imageToSend) formData.append("image", imageToSend);
   data?.name&& formData.append("name", data.name);
   data?.opening_balance&&   formData.append("opening_balance", data.opening_balance);
   data?.phone&&   formData.append("phone", data.phone);
   data?.currency&&   formData.append("currency", data.currency);
   data?.address&&   formData.append("address", data.address);

    const response = await UseAxios({ method: "post", api: "createSupplier", data: formData });

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
        Add Supplier
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>ADD Supplier</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => { handleAdd(e) }}>
    <div className='displayDialogContent'>
      <div className='chosseImage' onClick={() => { document.getElementById("image").click() }}>
        {image ? <img src={image} /> :
          <p>Attach a personal photo</p>
        }
        <input accept="image/*" type="file" onChange={(e) => { handleImage(e) }} hidden id='image' />
      </div>
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
          label="Name"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,name:e.target.value})}}
        />
         </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <FormControl fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">currency</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,currency:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="currency"
       
      >
                {money?.money.map((element,index) => {
                  return <MenuItem color="warning"  title={element.dollar_price} value={element.currency}  key={index}>{element.currency }</MenuItem>
               })}
       
      </Select>
         </FormControl>
             <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,opening_balance:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                  label="opening_balance"
                  fullWidth
          />
          </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,phone:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                  label="Phone"
                  fullWidth
        />
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,address:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="Address"
         fullWidth
        />
      </div>
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
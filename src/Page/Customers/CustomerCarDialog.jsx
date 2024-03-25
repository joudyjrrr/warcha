import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';

export default function CustomerCarDialog({customer}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
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
   data?.first_cheack&& formData.append("first_cheack", data.first_cheack);
   data?.type&& formData.append("type", data.type);
   data?.model&& formData.append("model", data.model);
   data?.color&& formData.append("color", data.color);
   data?.car_number&& formData.append("car_number", data.car_number);
   data?.vin&& formData.append("vin", data.vin);
   data?.meter_number&& formData.append("meter_number", data.meter_number);
    formData.append("customer_id", customer);

    const response = await UseAxios({ method: "post", api: "createCar", data: formData });

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
       Create Car 
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>Create Car </DialogTitle>
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
          label="name"
          type='name'
                  fullWidth
                    onChange={(e)=>{setData({...data,name:e.target.value})}}
        />
      </div>
    
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,type:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                  label="type"
                  fullWidth
        />
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,model:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="model"
         fullWidth
        />
                </div>
                       <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,color:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                    label="color"
                    type='color'
         fullWidth
                />
                   <TextField
                    required
                    type='number'
                    onChange={(e)=>{setData({...data,car_number:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="car number"
         fullWidth
        />
              </div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                  
                    onChange={(e)=>{setData({...data,vin:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="vin"
         fullWidth
                />
                   <TextField
                    required
                    type='number'
                    onChange={(e)=>{setData({...data,meter_number:e.target.value})}}
                                   color={openMessage?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="meter number"
         fullWidth
        />
                </div>
                  <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                  
                    onChange={(e)=>{setData({...data,first_cheack:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                    label="first cheack"
                    multiline
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
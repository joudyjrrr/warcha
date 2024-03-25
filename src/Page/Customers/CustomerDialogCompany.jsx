import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DialogTitle from '@mui/material/DialogTitle';
import { FilledInput, FormControl, IconButton,  InputAdornment, InputLabel, Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';

export default function CustomerDialogCompany() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("driver_name",data.driver_name);
    formData.append("is_company",data.driver_phone);
    formData.append("is_company",data.driver_address);
    formData.append("is_company",1);

    const response = await UseAxios({ method: "post", api: "createCustomer", data: formData });

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
      <Button sx={{float:"right",marginRight:"4%",color:"white",border:"1px solid white",bgcolor:"#f5c02e",fontSize:"10px",height:"55px"}}  onClick={handleClickOpen}>
        COMPANY CUSTOMER
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>ADD COMPANY CUSTOMER</DialogTitle>
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
          label="Email"
          type='email'
                  fullWidth
                    onChange={(e)=>{setData({...data,email:e.target.value})}}
        />
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                          color={openMessage?"error" : "warning"}

                    
                    onChange={(e)=>{setData({...data,name:e.target.value})}}
          id="outlined-multiline-flexible"
                  label="Name"
                  fullWidth
        />
        <FormControl fullWidth sx={{ m: 1 }}                          color={openMessage?"error" : "warning"}
>
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                    required
                      
                    onChange={(e)=>{setData({...data,password:e.target.value})}}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
                       <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,driver_name:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="driver name"
         fullWidth
                />
                   <TextField
                    required
                    type='number'
                    onChange={(e)=>{setData({...data,driver_phone:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="driver phone"
         fullWidth
        />
              </div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,driver_address:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="driver address"
         fullWidth
                />
                   <TextField
                    required
                    type='number'
                    onChange={(e)=>{setData({...data,opening_balance:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="opening balance"
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
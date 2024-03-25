import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { UseAxios, imageUrl } from '../../store/constant/url';

export default function ServiceDialog({serviceType,update,togelClose}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState(update?.image?`${imageUrl}${update?.image?.id}/${update?.image?.file_name}`:"");
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
    if (update) {
     togelClose();
    }
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
   data?.description&& formData.append("description", data.description);
   // workShop
   formData.append("service_department_id",serviceType);
   data?.currency&& formData.append("currency", data.currency);
   data?.product_price&& formData.append("price", data.product_price);
   data?.product_name&& formData.append("name", data.product_name);
    const response = await UseAxios({ method: "post", api: update?`updateService/${update?.id}`:"createService", data: formData });

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
      <Button id='createService' sx={{float:"right",marginRight:"4%",color:"white",border:"1px solid white",bgcolor:"#f5c02e"}}  onClick={handleClickOpen}>
       Create Service
    </Button>
    
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle> {update?"update":"Create"} Service</DialogTitle>
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
                    defaultValue={update&&update?.name}
                    onChange={(e)=>{setData({...data,product_name:e.target.value})}}
        />
      </div>
      
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                    required
                    defaultValue={update&&update?.price}
                    
                    onChange={(e)=>{setData({...data,product_price:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
           label="Price"
           type='number'
                  fullWidth
          />
           
               <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">Currency</InputLabel>
                    <Select
                      defaultValue={"$"}
               onChange={(e) => { setData({ ...data, currency: e.target.value }) }}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
                    >
                      
            {money?.money?.map((element, index) => (
     <MenuItem title={element.dollar_price} value={element.currency}  key={index}>{element.currency }</MenuItem>
   ))}
            
      </Select>
            </FormControl>
         </div>
         <div style={{marginRight:"4%"}}>
                  <TextField
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="description"
          type='text'
                    fullWidth
                    defaultValue={update&&update?.description}
                    multiline
                    onChange={(e)=>{setData({...data,description:e.target.value})}}
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
      <button type="submit" className="button smallRad buttonAdd"> {update?"update":"Create"}</button>
      <button onClick={handleClose} type="button" className="buttonCansel smallRad">Close</button>
    </div>
  </form>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  );
}
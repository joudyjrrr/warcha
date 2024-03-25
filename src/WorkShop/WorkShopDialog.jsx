import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../store/constant/url';

export default function WorkShopDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
 const [openMessage, setOpenMessage] = React.useState(false);
 const [admin, setAdmin] = React.useState([]);
 const [branch, setBranch] = React.useState([]);

 React.useEffect(() => {
 
  const getData = async () => {
    try {
       const getAdmin = await UseAxios({
        method: "get",
        api: `getWorkShopAdmin`
      })
    const getBranch = await UseAxios({
        method: "get",
        api: `getBranchName`
      })

      if (getAdmin.status === 200) {
        
         setAdmin(getAdmin.data.data);
         setBranch(getBranch.data.data);
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    if (open) {
     getData();
    }
 }, [open])
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
    data?.name&&formData.append("name", data.name);
   data?.admin_id&& formData.append("manger_id", data.admin_id);
   data?.branch_id&& formData.append("branch_id", data.branch_id);
 data?.open&&  formData.append("open", data.open);
  data?.close&& formData.append("close", data.close);


    const response = await UseAxios({ method: "post", api: "createWorkShop", data: formData });

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
       ADD WorkShop
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>ADD WorkShop</DialogTitle>
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
     
    
         <div style={{ display: "flex" }}>
           <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel color="warning" id="demo-select-small-label">MANGER</InputLabel>
           <Select
            
                onChange={(e)=>{setData({...data,admin_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
    
                {admin?.map((item,index) => {
                  return <MenuItem color="warning"  value={item?.id} key={index}>{item?.free_work_showp?.first_name } {item?.free_work_showp?.last_name }</MenuItem>
               })}
       
      </Select>
            </FormControl>
     <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel color="warning" id="demo-select-small-label">Branch</InputLabel>
           <Select
            
                onChange={(e)=>{setData({...data,branch_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
                {branch?.map((item,index) => {
                  return <MenuItem color="warning"  value={item?.id} key={index}>{item?.name } </MenuItem>
               })}
       
      </Select>
            </FormControl>      
          </div>
 
              
                 <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,open:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                    label="open time"
                    type='time'
         fullWidth
                />
                              <TextField
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="close time"
          type='time'
                  fullWidth
                    onChange={(e)=>{setData({...data,close:e.target.value})}}
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
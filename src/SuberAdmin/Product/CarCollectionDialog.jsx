import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';

export default function CarCollectionDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
 const [openMessage, setOpenMessage] = React.useState(false);
 const [company, setCompay] = React.useState([]);
 const [type, setType] = React.useState([]);
 
 React.useEffect(() => {
  const getData = async () => {
   const company =await UseAxios({ method: "get", api: "getCarCompanyName" });
   const type = await UseAxios({ method: "get", api: "getCarTypeCollection" });
   setCompay(company?.data.data);
   setType(type?.data.data);
  }
  getData();
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
    data?.model&&formData.append("model", data.model);
    data?.horsepower&&formData.append("horsepower", data.horsepower);
    data?.motor_cc&&formData.append("motor_cc", data.motor_cc);
    data?.car_type_id&&formData.append("car_type_id", data.car_type_id);
    data?.company_id&&formData.append("company_id", data.company_id);
    data?.name&&formData.append("name", data.name);

    const response = await UseAxios({ method: "post", api: "createCarCollection", data: formData });

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
       Create Car Collection
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>Create Car Collection</DialogTitle>
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
                   <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel color="warning" id="demo-select-small-label">Company</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,company_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
       
       
      >
        <MenuItem value="">
    <MenuItem color="warning" >ALL</MenuItem>
                </MenuItem>
                {company?.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })}
       
      </Select>
          </FormControl>
                  <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel color="warning" id="demo-select-small-label">Car Type</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,car_type_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Car Type"
       
      >
        <MenuItem value="">
    <MenuItem color="warning" >ALL</MenuItem>
                </MenuItem>
                {type?.map((item,index) => {
                 return <MenuItem color="warning" value={item?.id} key={"t" + index}>{item?.gear} &nbsp;{item?.fuel }</MenuItem>
               })}
       
      </Select>
            </FormControl> 
                </div>
                       <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,motor_cc:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="motor_cc"
         fullWidth
                /> 
                   <TextField
                    required
                    type='number'
                    onChange={(e)=>{setData({...data,horsepower:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="horsepower"
         fullWidth
        /> 
              </div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,model:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
           label="model"
           type='number'
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
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { UseAxios, imageUrl } from '../store/constant/url';
import { useSelector } from 'react-redux';
import QRCode from 'qrcode.react';

export default function ProductUnitDialog({workshop,product_id,handelUnit}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
const money = useSelector((state) => state.money);
 const [unit, setUnit] = React.useState([]);
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
 const handelProductUnit = (item) => {
 handelUnit(item)
 }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
 };
 React.useEffect(() => {
  
  const getData = async () => {
    try {
      const response = await UseAxios({
        method: "GET",
        api: `getUnit/${workshop}?product_id=${product_id}
`
      })
      if (response.status === 200) {
        
        setUnit(response.data.data);
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (open) {
   
     getData();
  }
  
}, [open,product_id]);
  const handleAdd = async (e) => {
    e.preventDefault();
   try {
   // name is_bigger factor price multiple_price node bar_code
    const formData = new FormData();
   if (imageToSend) formData.append("image", imageToSend);
   data?.name&& formData.append("name", data.name);
   data?.multiple_price&& formData.append("multiple_price", data.multiple_price);
   data?.price&& formData.append("price", data.price);
   data?.factor&& formData.append("factor", data.factor);
   data?.is_bigger&& formData.append("is_bigger", data.is_bigger);
   data?.node&& formData.append("node", data.node);
    data?.bar_code && formData.append("bar_code", data.bar_code);
    data?.currency && formData.append("currency", data.currency);
    
   formData.append("work_shop_id",workshop);
   formData.append("product_id",product_id);
   
    const response = await UseAxios({ method: "post", api: "createUnit", data: formData });

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
         Unit
    </Button>
    
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>Add Unit</DialogTitle>
        <DialogContent>
      <form onSubmit={(e) => { handleAdd(e) }}>
    <div className='displayDialogContent'>
       <div >
      <div style={{margin:"2% auto"}} className='chosseImage' onClick={() => { document.getElementById("image").click() }}>
        {image ? <img src={image} /> :
          <p>Attach a personal photo</p>
        }
        <input accept="image/*" type="file" onChange={(e) => { handleImage(e) }} hidden id='image' />
     
        </div>
         <div style={{textAlign:"center"}}>
        <TextField
        color={open?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="QR Code"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,bar_code:e.target.value})}}
    />
     <QRCode style={{width:'160px',height:"160px",marginTop:"10%"}} value={data?.bar_code||null} />
        </div>
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
     
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,price:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
           label="One Price"
           type='number'
                  fullWidth
          />
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,multiple_price:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
           label="multiple price"
           type='number'
                  fullWidth
          />
               <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">Currency</InputLabel>
              <Select
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
        
         <div style={{ marginRight: "4%", display:"flex" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">is bigger</InputLabel>
              <Select
               onChange={(e) => { setData({ ...data, is_bigger: e.target.value }) }}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
           >
            <MenuItem value={1} >bigger</MenuItem>
     <MenuItem value={0} >smaller</MenuItem>
            
        
            
           </Select>
           
            </FormControl>
                  <TextField
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="factor"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,factor:e.target.value})}}
        />
         </div>
           <div style={{ marginRight: "4%" }}>
        
                  <TextField
        color={openMessage?"error" : "warning"}

               name is_bigger factor price multiple_price      
          id="outlined-multiline-flexible"
          label="node"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,node:e.target.value})}}
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
      <div className='tableContent'>
          <table>
  <thead>
            <tr>
              <th>image</th>
      <th>Name</th>
      <th>is bigger</th>
      <th>factor</th>
      <th>price</th>
          <th>multiple_price</th>
          <th>node</th>
          <th>bar_code</th>
          
          
      </tr>
  </thead>
  <tbody> 
        {unit?.map((item, index) => { 
            return <>
              <tr key={index}>
                <th><img src={item?.image?`${imageUrl}${item?.image?.id}/${item?.image?.file_name}`:"HTCcolo.png" } alt="" /></th>
                <th>{item?.name }</th>
                <th>{item?.is_bigger?"true":"false" }</th>
                <th>{item?.factor }</th>
                <th>{item?.price }</th>
                <th>{item?.multiple_price }</th>
              <th>{item?.node}</th>
              <th><QRCode style={{width:"50px",height:"50px"}} value={item?.bar_code} /></th>
              <th>
              {handelUnit&&<th style={{cursor:"pointer",color:"gray"}} onClick={()=>{handelProductUnit(item)}}>select</th> } 
                
                  </th>
   
          </tr >
         </>
          })}
  </tbody>
       </table>
       </div>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  );
}
import { Box, InputLabel, MenuItem, Select,FormControl, Snackbar, TextField, Switch, Rating } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { UseAxios } from "../../store/constant/url";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
   const [data, setData] = React.useState([]);
 const [open, setOpen] = React.useState(false);
  const [Product, setProduct] = React.useState([]);
 const buttonRef=React.useRef(null)
   const [message, setMessage] = React.useState("Accebt Only Image")
 const money = useSelector((state) => state.money);
 const nav = useNavigate();
   var [image,setImage] = React.useState([]);
   var [imageToSend,setImageToSend] = React.useState([]);
  const handleImage = (e) => {
   const file = e.target.files[0];
   if (file) {
     if (!file.type.startsWith('image/')) {
       setMessage("Accebt Only Image")
       setOpen(true);
       setTimeout(() => {
         setOpen(false);
       }, 2000);
       return;
     }

     const imageUrl = URL.createObjectURL(file);
     setImage(prevState => [...prevState, imageUrl]);
     setImageToSend(prevState => [...prevState, file]);
    
   }
 };
const handelRemoveImage = (e) => {
  const remove = image.indexOf(e); 
  setImage(image.filter((item) => item !== e));
  setImageToSend(imageToSend.filter((item, index) => index !== remove)); 
}
 React.useEffect(() => {
  const getData = async () => {
    try {
       const Product = await UseAxios({
        method: "GET",
        api: `getProductCategory`
      })
     
    
         setProduct(Product.data.data.data);
     
    } catch (error) {
      console.error('Error:', error);
    }
  };
  getData();
}, []);
 const handelAdd = async (e) => {
   e.preventDefault();
  buttonRef.current.style.display = 'none';
    if (!data.main_image_id&&data.main_image_id !==0) {
      setOpen(true);
     setMessage("select Main Image")
 buttonRef.current.style.display = 'block';
     
       setTimeout(() => {
         setOpen(false);
       }, 2000);
      return;
    }
     var Product;
    var formdata = new FormData();
     formdata.append("name",data?.name);
     formdata.append("product_category_id",data?.product_category_id);
     formdata.append("description",data?.description);
     formdata.append("price",data?.price||null);
     formdata.append("price_discount",data?.price_discount||null);
     formdata.append("multiple_price",data?.multiple_price||null);
     formdata.append("multiple_price_discount",data?.multiple_price_discount||null);
     formdata.append("min_multiple_count",data?.min_multiple_count||null);
    formdata.append("bar_code", data?.bar_code||null);
    formdata.append("currency", data?.currency||null);
     formdata.append("is_active",data?.is_active||null);
     formdata.append("evaluation",data?.evaluation??4);
     formdata.append("main_image_id", data?.main_image_id||0);
     imageToSend.forEach((element, index)=> {
     formdata.append(`image${index}`, element);

 })
 try {
    Product = await UseAxios({
         method: "POST",
   api:`createProduct`,
         data:formdata
    })
 setOpen(true)
   setMessage(Product.data.message)
   setTimeout(() => {
     window.location.reload();
   }, 5000);
  
 } catch (error) {
  setMessage(error.message);
 buttonRef.current.style.display = 'block';
 setTimeout(() => {
   setOpen(true)
 }, 2000);
   setOpen(false)
 }
   
   
   }
 return  <>

  
    
  <div style={{marginBottom:"10%",display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
   <div style={{textAlign:"center"}}>
        <TextField
        color={open?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="QR Code"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,bar_code:e.target.value})}}
    />
     <QRCode style={{width:'360px',height:"360px",marginTop:"10%"}} value={data?.bar_code||null} />
   </div>
   <div>
    <div className='displayDialogContent'>
     
           <Box
      component="form"
    sx={{
       minWidth:"100%",
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="name"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,name:e.target.value})}}
     />
    
      </div>
       <div style={{display:"flex",justifyContent:"center"}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">category</InputLabel>
              <Select
                onChange={(e)=>{setData({data,product_category_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
        <MenuItem value="">
                </MenuItem>
                {Product?.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })}
       
      </Select>
            </FormControl>
    
      </div>
           <div style={{display:"flex",justifyContent:"center"}}>
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
    
       <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="price"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,price:e.target.value})}}
     />
    
      </div>
         <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="multiple price"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,multiple_price:e.target.value})}}
     />
    
      </div>
          <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="price discount"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,price_discount:e.target.value})}}
     />
    
      </div>
         <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="multiple price discount"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,multiple_price_discount:e.target.value})}}
     />
    
      </div>
      
        <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="minimum spend for discount"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,min_multiple_count:e.target.value})}}
     />
    
      </div>
      <div style={{ display: "flex", justifyContent: "space-around",alignItems:"center" }}>
       <p>Product Active?</p>
       <Switch
        color="warning"
  defaultChecked
  onChange={(e) => {
    setData({ ...data, is_active: e.target.checked });
  }}
  inputProps={{ 'aria-label': 'controlled' }}
/>
    
      </div>
         <div style={{ display: "flex", justifyContent: "space-around",alignItems:"center" }}>
       <p>Product Rating?</p>
       <Rating
        size="large"
      onChange={(e)=>{setData({...data,evaluation:e.target.value})}}
        name="half-rating" defaultValue={4} precision={0.5} />
    
      </div>
  
      
   </Box>
   
    </div>
    
   </div>
   
  </div>
    <div style={{display:"flex",justifyContent:"center"}}>
 <TextField
  multiline
  color={open ? "error" : "warning"}
  id="outlined-multiline-flexible"
  label="Description"
  placeholder="description"
  fullWidth
  onChange={(e) => { setData({ ...data, description: e.target.value }) }}
/>
    
      </div>
  <div style={{display:"flex",justifyContent:"center",margin:"2%"}}>
   <div className='chosseImage' onClick={() => { document.getElementById("image").click() }}>
        <p>Attach a personal photo</p>
        <input accept="image/*" type="file" onChange={(e) => { handleImage(e) }} hidden id='image' />
      </div>
  </div>
  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
   {image?.map((item,key) => {
    return <img className={data?.main_image_id==key&&"avatarMainImage"} onClick={()=>{setData({...data,main_image_id:key})}} title="click to be main image and double click to remove" onDoubleClick={()=>{handelRemoveImage(item)}} style={{width:"300px",height:"300px",margin:"1%"}} key={key} src={item } />
   })}
  </div>
   <div className="addDialogFormAction">
      <button ref={buttonRef} onClick={handelAdd} type="submit" className="button smallRad buttonAdd">ADD</button>
      <button onClick={()=>{nav("/Product")}} type="button" className="buttonCansel smallRad">Close</button>
    </div>
    <Snackbar
     anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
     message={message}
     open={open}
     key={"bottom" + "left"}
    />
  </>

}

export default CreateProduct
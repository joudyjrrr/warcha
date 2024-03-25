import { useEffect, useState } from "react"

import Loading from "../../Component/Loading";
import { UseAxios, imageUrl } from "../../store/constant/url";
import {  InputLabel,FormControl, MenuItem, Select, TextField, Button, Box, Rating, Switch, Snackbar } from "@mui/material";
import OneProductForBranch from "./OneProductForBranch";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";


const ProductBranch = ({branch}) => {
 const [pagenate, setPagenate] = useState(9);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [filter, setFillter] = useState();
  const [Product, setProduct] = useState([]);
  const [LastChangeTime, setLastChangeTime] = useState(5);
  const [total, setTotal] = useState(2);
  const [enter, setEnter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProduct, setCurrentProduct] = useState();
  const [ProductDescription, setProductDescription] = useState([]);
  const money = useSelector((state) => state.money);
  const [openNot, setopenNot] = useState(false);
  
  const [update, setUpdate] = useState([]);
  const handleUpdate = async() => {
  
    await UseAxios({ api: `updateProductBranch/${currentProduct?.id}`,method: "post",data:update })
    setopenNot(true)
    setTimeout(() => {
      setopenNot(false)
    }, 4000);
  }
  useEffect(() => {
    const getdata = async() => {
    var responce =await UseAxios({ api: `getProductDescription/${currentProduct?.product_for_admin?.id}`,method: "get" })
      setProductDescription(responce?.data?.data);
    
    }
    if (currentProduct?.product_for_admin?.id) {
      getdata();
    }
  
  }, [currentProduct])
  const returnProduct = () => {
   return  <>

  <div style={{marginBottom:"10%",display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>

       <div >
         <div className="productInBranch">
           <div style={{textAlign:"center"}}>
             <div style={{minWidth:"100%"}}>
             <img 
  src={
    currentProduct?.product_for_admin?.main_image ?
    `${imageUrl}${currentProduct?.product_for_admin?.main_image?.id}/${currentProduct?.product_for_admin?.main_image?.file_name}` :
    "/HTCcolo.png"
  }
  alt=""
/>
             </div>
 <QRCode style={{width:'200px',height:"200px",marginTop:"10%"}} value={currentProduct?.product_for_admin?.bar_code||null} />
           </div>
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
                   value={currentProduct?.product_for_admin?.name}
                  fullWidth
                 InputProps={{ readOnly: true }} 
     />
    
      </div>
       <div style={{display:"flex",justifyContent:"center"}}>
                 <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="category"
                   type='text'
                   value={currentProduct?.product_for_admin?.product_category?.name}
                  fullWidth
                 InputProps={{ readOnly: true }} 
     />
    
      </div>
           <div style={{ display: "flex", justifyContent: "center" }}>
                     <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="cost"
                   type='text'
                   value={`${currentProduct?.product_for_admin?.cost||0}$`}
                  fullWidth
                 InputProps={{ readOnly: true }} 
     />
         
    
      </div>
               <div style={{ display: "flex", justifyContent: "center" }}>
                     <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="price"
                   type='text'
                   value={`${currentProduct?.product_for_admin?.price}$`}
                  fullWidth
                 InputProps={{ readOnly: true }} 
     />
         
    
      </div>
         <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="multiple price"
          type='text'
                   fullWidth
                    InputProps={{ readOnly: true }}
            value={`${currentProduct?.product_for_admin?.multiple_price}$`}

     />
    
      </div>
          <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="price discount"
          type='text'
                   fullWidth
                    InputProps={{ readOnly: true }}
            value={`${currentProduct?.product_for_admin?.price_discount}$`}
                   
     />
    
      </div>
         <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="multiple price discount"
          type='text'
                   fullWidth
                    InputProps={{ readOnly: true }}
            value={`${currentProduct?.product_for_admin?.multiple_price_discount}$`}
                   
     />
    
      </div>
      
        <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="minimum spend for discount"
          type='text'
                   fullWidth
                    InputProps={{ readOnly: true }}
            value={`${currentProduct?.product_for_admin?.min_multiple_count}`}
     />
    
      </div>
      <div style={{ display: "flex", justifyContent: "space-around",alignItems:"center" }}>
       <p>Product Active?</p>
       <Switch
        color="warning"
            checked={`${currentProduct?.product_for_admin?.is_active}`}
                   
                    InputProps={{ readOnly: true }}
                   
 
  inputProps={{ 'aria-label': 'controlled' }}
/>
    
      </div>
         <div style={{ display: "flex", justifyContent: "space-around",alignItems:"center" }}>
       <p>Product Rating?</p>
                 <Rating
                   readOnly
                   value={currentProduct?.product_for_admin?.evaluation}
        size="large"
     
        name="half-rating" defaultValue={4} precision={0.5} />
    
      </div>
  
      
   </Box>
   
    </div>
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
               <h3 style={{justifyContent:"center",alignItems:"center",display:"flex"}}>Product In Branch</h3>
      <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="quantity"
                   type='number'
                   defaultValue={currentProduct?.quantity}
                   onChange={(e)=>{setUpdate({...update,quantity:e.target.value})}}
                  fullWidth
                 
     />
    
               </div>
                   <div style={{display:"flex",justifyContent:"center"}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">Currency</InputLabel>
              <Select
               onChange={(e) => { setUpdate({ ...update, currency: e.target.value }) }}
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
          label="price discount"
                   type='number'
                   defaultValue={currentProduct?.price_discount}
                   onChange={(e)=>{setUpdate({...update,price_discount:e.target.value})}}
                  fullWidth
                 
     />
               </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="multiple price discount"
                   type='number'
                   defaultValue={currentProduct?.multiple_price_discount}
                   onChange={(e)=>{setUpdate({...update,multiple_price_discount:e.target.value})}}
                  fullWidth
     />
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
                  <TextField
        color={open?"error" : "warning"}
          id="outlined-multiline-flexible"
          label="min multiple notification"
                   type='number'
                   defaultValue={currentProduct?.min_multiple_notification}
                   onChange={(e)=>{setUpdate({...update,min_multiple_notification:e.target.value})}}
                  fullWidth
     />
      </div>
      <button  onClick={handleUpdate} type="button" className="button smallRad buttonAdd">UPDATE</button>
      <button onClick={()=>{setCurrentProduct(false)}} type="button" className="buttonCansel smallRad">Close</button>
   
             </Box>
   
    </div>
         </div>
    
   </div>
    <Snackbar
     anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
     message={"product updated"}
     open={openNot}
     key={"bottom" + "left"}
    />
  </div>
       <h3>Description</h3>
     <div style={{ display: "flex", justifyContent: "center" }}>
 <TextField
  multiline
  color={open ? "error" : "warning"}
  
         fullWidth
         value={ProductDescription.description}
         InputProps={{ readOnly: true }} 
          id="outlined-multiline-flexible"
                   type='text'
/>
    
      </div>
  
  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
   {ProductDescription?.images?.map((item,key) => {
    return <img     style={{width:"300px",height:"300px",margin:"1%"}} key={key} src={`${imageUrl}${item?.id}/${item?.file_name}` } />
   })}
  </div>
   
 
  </>
  
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
  
  
    useEffect(() => {
    // عندما يتغير الفلتر، قم بتحديث زمن آخر تغيير
    setLastChangeTime(Date.now());
  }, [filter]);
      

  useEffect(() => {
  const getData = async () => {
    try {
       const Product = await UseAxios({
        method: "GET",
        api: `getProductCategory`
      })
      const response = await UseAxios({
        method: "GET",
        api: `getProductBranch/${branch}?${filter?.search ? `?search=${filter.search}&` : ""}
page=${currentPage}&
${pagenate ? `paginate=${pagenate}&` : ""}
${filter?.category_id ? `product_category_id=${filter.category_id}` : ""}`
      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        
         setProduct(Product.data.data);
        setData(response?.data?.data?.data);
        setTotal(response.data?.data?.last_page ?? total)
   setLoading(true)
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
   if (LastChangeTime) {
  const elapsedTime = Date.now() - LastChangeTime;
  const delay = elapsedTime > 5000&&LastChangeTime==5 ? 2000 : 5000 - elapsedTime;
  
  setTimeout(() => {
    getData();
    
  }, delay);
}
}, [pagenate,filter?.category_id, enter,currentPage]); // هنا نقوم بتتبع تغييرات قيمة data

  return (
    <>
      {loading ?
        <>
          {currentProduct?
            returnProduct() :

  <>
          <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel color="warning" id="demo-select-small-label">category</InputLabel>
              <Select
                onChange={(e)=>{setFillter({...filter,category_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
        <MenuItem value="">
    <MenuItem color="warning" >ALL</MenuItem>
                </MenuItem>
                {Product.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })}
       
      </Select>
            </FormControl>
            <TextField onChange={(e)=>{setFillter({...filter,search:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
        
          </div>
          <div  style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
      {data?.map((item, key) => {
        return <div onClick={()=>{setCurrentProduct(item)}}  style={{margin:"3%"}} key={key}>
        <OneProductForBranch product={item}/>
        </div>
      })}
          </div>
            <div className="pagenate">
     <div className="pagenateContent">
      <h6 style={{color:"gray"}}>Showing</h6>
      <select onChange={(e)=>{setPagenate(e.target.value)}} name="" id="">
       <option value="" hidden>rows</option>
      <option value="5">5</option>
      <option value="15">15</option>
      <option value="40">40</option>
        </select>
      <h6 style={{color:"gray"}}> <span style={{marginLeft:"10px"}}>item</span></h6>
        
     </div>
     <button disabled={currentPage<=1? true : false} onClick={() => { setCurrentPage(currentPage - 1)}}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4L6 8L10 12" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
       {currentPage != 1?<button onClick={() => { setCurrentPage(1) }} className={currentPage == 1 ? "pagenateFlex" : null}>{1 }</button> :null}
       <button className="pagenateFlex">{currentPage}</button>
       {currentPage !=total&&<button onClick={() => { setCurrentPage(total) }}>{total }</button>}
       <button 
  disabled={currentPage >= total?true:false}
  onClick={() => {
   setCurrentPage(currentPage + 1);
  }}
><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 4L10 8L6 12" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
     </button>
    
     
    </div>
        </>
}
          </>
          
        
:<Loading/>}
 

    </>

  )
}

export default ProductBranch
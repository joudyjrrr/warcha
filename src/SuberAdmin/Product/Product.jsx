import { useEffect, useState } from "react"

import Loading from "../../Component/Loading";
import { UseAxios } from "../../store/constant/url";
import {  InputLabel,FormControl, MenuItem, Select, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OneProduct from "./OneProduct";


const Product = ({ currentCar }) => {
  
 const [pagenate, setPagenate] = useState(9);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [filter, setFillter] = useState();
  const [Product, setProduct] = useState([]);
  const [LastChangeTime, setLastChangeTime] = useState(5);
  const [total, setTotal] = useState(2);
  const [enter, setEnter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
  
  const nav = useNavigate();
  
    useEffect(() => {
    // عندما يتغير الفلتر، قم بتحديث زمن آخر تغيير
    setLastChangeTime(Date.now());
  }, [filter]);
      
  const handleDelete = async (product_id) => {
  await UseAxios({method:"post", api:"deleteProductRef",data:{"car_id":currentCar[0]?.car_id,"product_id":product_id}})
    
   
     location.reload()
  
  }
  const handleAdd = async (product_id) => {
  await UseAxios({method:"post", api:"createOneProductRef",data:{"car_id":currentCar[0]?.car_id,"product_id":product_id}})
    location.reload()
  }
  useEffect(() => {
  const getData = async () => {
    try {
       const Product = await UseAxios({
        method: "GET",
        api: `getProductCategory`
       })
      
      const response = await UseAxios({
        method: "GET",
        api: `getProduct?${filter?.search ? `?search=${filter.search}&` : ""}
page=${currentPage}&
${pagenate ? `paginate=${pagenate}&` : ""}
${filter?.category_id ? `product_category_id=${filter.category_id}` : ""}`
      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        
         setProduct(Product.data.data);
        setData(response.data.data.data);
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
          <Button sx={{display:"inline",width:"20%", boxSizing:"border-box", color:"white",border:"1px solid white",bgcolor:"#f5c02e"}}  onClick={()=>{nav("/createProduct")}}>
        Add Product
      </Button>
          </div>
          <div  style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
      {data?.map((item, key) => {
        return <div key={key+"tt"}>
        <div onClick={() => { nav("/ProductDetails", { state: { Product: item.id } }); }} style={{margin:"3%"}} key={key}>
            <OneProduct product={item} />
       
          </div>
{currentCar&&<div className="addDialogFormAction">
       {currentCar.find(toFind => toFind?.product_id === item?.id)  ? (
    <button onClick={() => { handleDelete(item?.id) }} type="button" className="buttonCansel smallRad">Delete</button>
) : (
    <button onClick={() => { handleAdd(item?.id) }} type="button" className="button smallRad buttonAdd">ADD</button>
)}
        </div>}
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

:<Loading/>}
 

    </>

  )
}

export default Product
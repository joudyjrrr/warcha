import { useEffect, useState } from "react"

import { FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { UseAxios, imageUrl } from "../store/constant/url";
import Loading from "../Component/Loading";
import WorkShopOrderDialog from "./WorkShopOrderDialog";


const ProductInFormBranch = ({workshop}) => {
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [filter, setFillter] = useState();
 const [pagenate, setPagenate] = useState(9);
  const [total, setTotal] = useState(2);
  const [enter, setEnter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [Product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
  const handelAdd = async () => {
     await UseAxios({method:"post", api: "createWorkShopMonyInfo", data:{"order":order,workshop:workshop} });
    setOpenMessage(true)
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
 const handleAppendItem = (item) => {
    const updatedOrder = [...order];
    
    const objectUpdate = { "id": item?.product_for_admin.id, "quantity":1 ,"image":item?.product_for_admin?.main_image,"name":item?.product_for_admin?.name};
    const index = updatedOrder.findIndex((element) => element.id === item?.product_for_admin.id);

    if (index !== -1) {
        // If the item already exists in the order, update its quantity
        updatedOrder[index].quantity += 1;
    } else {
        // If the item does not exist in the order, add it
        updatedOrder.push(objectUpdate);
    }

    setOrder(updatedOrder);
};


  useEffect(() => {
  const getData = async () => {
    try {
       const Products = await UseAxios({
        method: "GET",
        api: `getProductCategory`
       })
      const response = await UseAxios({
        method: "GET",
        api: `getProductBranch/${workshop}?${filter?.search ? `?product_name=${filter.search}&` : ""}
page=${currentPage}&
${pagenate ? `paginate=${pagenate}&` : ""}
${filter?.category_id ? `product_category_id=${filter.category_id}` : ""}`


      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        setProduct(Products.data.data)
        setData(response.data.data.data);
        setTotal(response.data?.data?.last_page ?? total)
   setLoading(true)
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    getData();
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
       <div style={{display:"flex",width:"180px"}}>
       
        <WorkShopOrderDialog/></div>
          </div>
          <div className="productOrder">
           <div  style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
      {data?.map((item, key) => {
        return <div onClick={() => {handleAppendItem(item) }} key={key+"tt"}>
        <div  style={{margin:"3%"}} key={key}>
            <div className="oneProduct">
      <h3 style={{ textAlign: "center" }}>{item?.product_for_admin?.name}</h3>
      <div >
        <img style={{width:"150px"}} src={item?.product_for_admin?.main_image?`${imageUrl}${item?.product_for_admin?.main_image?.id}/${item?.product_for_admin?.main_image?.file_name}`:"HTCcolo.png"} alt={item?.product_name} />
    </div>
    <div style={{ display:"flex",justifyContent:"space-around"}}>
                <p style={{ color: "gray" }}>quantity in Branch</p>
                <p>{item?.quantity }</p>
     
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price</p>
                <p style={{textDecoration:"line-through"}}>{item?.product_for_admin?.price}$</p>
               <p>{item?.product_for_admin?.price - item?.product_for_admin?.price_discount}$</p>

                
    </div>
    </div>
       
          </div>

    </div>
      })}
            </div>
            <div className="listProduct">
              <div className="onItem">
                <p>image</p>
                <p>quantity</p>
                <p style={{width:"40%"}}>name</p>
              </div>
              {order?.map((element, key) => {
                return <div className="onItem" key={key + "22rwqa"}>
        <img style={{width:"50px"}}  src={element?.image?`${imageUrl}${element?.image?.id}/${element?.image?.file_name}`:"HTCcolo.png"} alt={element?.product_name} />
               <h3> {element?.quantity}</h3>   
               <h6 style={{width:"40%"}}> {element?.name}</h6>   
               
                </div>
              })}
              <div className="buttonList ">
                {order.length>0 && <button onClick={handelAdd} className="button smallRad buttonAdd">send</button>
                }</div>
            </div>
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
            <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message="order created"
      open={openMessage}
      key={"bottom" + "left"}
    />
        </>

:<Loading/>}
 

    </>

  )
}

export default ProductInFormBranch
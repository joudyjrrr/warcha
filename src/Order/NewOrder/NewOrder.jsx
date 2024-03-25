import { useEffect, useState } from "react"

import {  InputLabel,FormControl, MenuItem, Select, TextField, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { UseAxios, imageUrl } from "../../store/constant/url";
import SupplierDialog from "../../publicData/Supplier/SupplierDialog";
import Loading from "../../Component/Loading";
import AddBuyExper from "./AddBuyExper";


const NewOrder = ({branch}) => {
 const [pagenate, setPagenate] = useState(9);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [filter, setFillter] = useState();
  const [Product, setProduct] = useState([]);
  const [LastChangeTime, setLastChangeTime] = useState(5);
  const [total, setTotal] = useState(2);
  const [enter, setEnter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [supplier, setsupplier] = useState();
 const [order, setOrder] = useState([]);
 const [information, setInformation] = useState([]);
 const money = useSelector((state) => state.money);
 const [totalPrice, setTotalPrice] = useState(0);
 const [message, setMessage] = useState("success");
  const [open, setOpen] = useState(false);
  const [buyExpence, setbuyExpence] = useState([]);
  const handleAddExperience = (experience) => {
     setbuyExpence([...buyExpence, experience]);
  };
  console.log(order);
 const handelAdd = async () => {
   try {
    //  "supplier_id" => "required",
    //         "title" => "required",
    //         "description" => "required",
    //         "buy_info*product_id" => "required",
    //         "buy_info*one_price" => "required",
    //         "buy_info*count" => "required",
    //         "buy_expence*title" => "required",
    //         "buy_expence*cost" => "required",
    //         "currency" => "required"
   await UseAxios({
   method: "post", api: "createBuy",
     data: {
       "buy_info": order,
        "supplier_id":information?.supplier_id,
       "title": information?.title,
       "description": information?.description,
       "currency":information?.currency,
       "branch_id": branch,
       "buy_expence":buyExpence,
     }
  });
  setMessage("success")
  setOpen(true)
  setTimeout(() => {
   location.reload()
  }, 4000);
 } catch (error) {
  setMessage(error.message)
  setOpen(true)
  setTimeout(() => {
   setOpen(false);
  }, 3000);
 }
 }
  const handleAppendItem = (item) => {
    // Clone the current order array
    const updatedOrder = [...order];

    // Create an object to represent the item being added or updated in the order
    const objectUpdate = {
        "id": item?.product_for_admin?.id,
        "count": 1,
        "image": item?.product_for_admin?.main_image,
        "name": item?.product_for_admin?.name,
        "one_price": 0
    };
console.log(objectUpdate.price);
    // Find the index of the item in the updated order array
    const index = updatedOrder.findIndex((element) => element.id === item?.product_for_admin?.id);

    // If the item already exists in the order, update its count
    if (index !== -1) {
        updatedOrder[index].count += 1;
    } else {
        // If the item does not exist in the order, add it to the order array
        updatedOrder.push(objectUpdate);
    }

    // Update the total price by adding the price of the added or updated item
    setTotalPrice(totalPrice + objectUpdate.one_price);

    // Update the order state with the updated order array
    setOrder(updatedOrder);

    // Log the updated total price to the console
    console.log(totalPrice);
};

  useEffect(() => {
    const getdata = async() => {
    var suppliers =await UseAxios({ api: `getSupplierName`,method: "get" })
   
     setsupplier(suppliers.data.data);
    
    }
   
      getdata();
    
  
  }, [branch])

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
      
  <>
        
       <div style={{ display: "flex",flexWrap:"wrap" }}>
         <div style={{width:"70%",minWidth:"360px"}}>
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
         <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
           {data?.map((item, key) => {
       return <div onClick={()=>{handleAppendItem(item)}} style={{ margin: "3%"}} key={key}>
         <div className="oneProductInFast">
      <p style={{ textAlign: "center" }}>{item.product_for_admin?.name}</p>
      <div >
        <img style={{width:"70px"}} src={item.product_for_admin?.main_image?`${imageUrl}${item.product_for_admin?.main_image?.id}/${item?.product_for_admin?.main_image?.file_name}`:"HTCcolo.png"} alt={item?.name} />
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>count</p>
     <p>{item?.count }</p>
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price</p>
     <p>{item?.product_for_admin?.price-item?.price_discount }$</p>
    </div>
    </div>
        </div>
      })}
         </div>
          </div>
              <div style={{width:"30%"}}>
        <div className="listProduct">
          <div style={{minWidth:"100%",display:"flex",marginBottom:"2%"}}>
<SupplierDialog/>
    </div>
                <div  >
                       <TextField
        color="warning"
          id="outlined-multiline-flexible"
          label="Title"
          type='text'
                  fullWidth
                    onChange={(e)=>{setInformation({...information,title:e.target.value})}}
                  />
                  <TextField
                    sx={{marginTop:"2%",marginBottom:"2%"}}
        color="warning"
          id="outlined-multiline-flexible"
          label="description"
          type='text'
                    fullWidth
                    multiline
                    onChange={(e)=>{setInformation({...information,description:e.target.value})}}
        />
           <FormControl style={{marginBottom:"2%"}} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">supplier</InputLabel>
              <Select
                onChange={(e)=>{setInformation({...information,supplier_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="supplier"
       
      >
        <MenuItem value="">
    <MenuItem color="warning" >ALL</MenuItem>
                </MenuItem>
                {supplier.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })}
       
      </Select>
            </FormControl>
           
          <div style={{display:"flex"}}>
           <FormControl fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">currency</InputLabel>
              <Select
                onChange={(e)=>{setInformation({...information,currency:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="currency"
       
      >
                {money?.money.map((element,index) => {
                  return <MenuItem color="warning"  title={element.dollar_price} value={element.currency}  key={index}>{element.currency }</MenuItem>
               })}
       
      </Select>
        </FormControl>
  
        
          </div>
          </div>
     <div className="onItem">
            
                <p>image</p>
                <p>count</p>
                <p >name</p>
                <p >price</p>
              </div>
              {order?.map((element, key) => {
const handleIncrement = () => {
  setOrder(prevOrder => {
    const newOrder = [...prevOrder];
    newOrder[key].count += 1;
    
    // Update total price
    const totalPrice = newOrder.reduce((acc, item) => acc + item.one_price * item.count, 0);
    setTotalPrice(totalPrice);

    return newOrder;
  });
};


 const handleDecrement = () => {
  setOrder(prevOrder => {
    const newOrder = [...prevOrder];
    if (newOrder[key].count > 1) {
      newOrder[key].count -= 1;
    } else {
      // Remove the item if the count is 0
      newOrder.splice(key, 1);
   }
    const totalPrice = newOrder.reduce((acc, item) => acc + item.one_price * item.count, 0);
    setTotalPrice(totalPrice);
    return newOrder;
  });
  
  
};
      const handelPrice = (price) => {
                setOrder(prevOrder => {
    const newOrder = [...prevOrder];
  
      newOrder[key].one_price = price;
    const totalPrice = newOrder.reduce((acc, item) => acc + item.one_price * item.count, 0);
    setTotalPrice(totalPrice);
    return newOrder;
  });
                }
  return (
    <div style={{ display: "flex", justifyContent: "space-between", minWidth: "100%" }} className="onItem" key={key + "22rwqa"}>
      <img style={{ width: "50px" }} src={element?.image ? `${imageUrl}${element?.image?.id}/${element?.image?.file_name}` : "HTCcolo.png"} alt={element?.product_name} />
      <h6 style={{ margin: "0" }}>
        <svg style={{ cursor: "pointer" }} onClick={handleIncrement} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.0001 14.4445C9.69748 14.4445 11.3253 13.7702 12.5256 12.57C13.7258 11.3698 14.4001 9.74192 14.4001 8.04453C14.4001 6.34715 13.7258 4.71928 12.5256 3.51905C11.3253 2.31882 9.69748 1.64453 8.0001 1.64453C6.30271 1.64453 4.67485 2.31882 3.47461 3.51905C2.27438 4.71928 1.6001 6.34715 1.6001 8.04453C1.6001 9.74192 2.27438 11.3698 3.47461 12.57C4.67485 13.7702 6.30271 14.4445 8.0001 14.4445ZM8.8001 5.64453C8.8001 5.43236 8.71581 5.22887 8.56578 5.07885C8.41575 4.92882 8.21227 4.84453 8.0001 4.84453C7.78792 4.84453 7.58444 4.92882 7.43441 5.07885C7.28438 5.22887 7.2001 5.43236 7.2001 5.64453V7.24453H5.6001C5.38792 7.24453 5.18444 7.32882 5.03441 7.47885C4.88438 7.62887 4.8001 7.83236 4.8001 8.04453C4.8001 8.2567 4.88438 8.46019 5.03441 8.61022C5.18444 8.76025 5.38792 8.84453 5.6001 8.84453H7.2001V10.4445C7.2001 10.6567 7.28438 10.8602 7.43441 11.0102C7.58444 11.1602 7.78792 11.2445 8.0001 11.2445C8.21227 11.2445 8.41575 11.1602 8.56578 11.0102C8.71581 10.8602 8.8001 10.6567 8.8001 10.4445V8.84453H10.4001C10.6123 8.84453 10.8158 8.76025 10.9658 8.61022C11.1158 8.46019 11.2001 8.2567 11.2001 8.04453C11.2001 7.83236 11.1158 7.62887 10.9658 7.47885C10.8158 7.32882 10.6123 7.24453 10.4001 7.24453H8.8001V5.64453Z" fill="#FFD154"/>
        </svg>

        {element?.count}

        <svg onClick={handleDecrement} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.0001 14.4445C9.69748 14.4445 11.3253 13.7702 12.5256 12.57C13.7258 11.3698 14.4001 9.74192 14.4001 8.04453C14.4001 6.34715 13.7258 4.71928 12.5256 3.51905C11.3253 2.31882 9.69748 1.64453 8.0001 1.64453C6.30271 1.64453 4.67485 2.31882 3.47461 3.51905C2.27438 4.71928 1.6001 6.34715 1.6001 8.04453C1.6001 9.74192 2.27438 11.3698 3.47461 12.57C4.67485 13.7702 6.30271 14.4445 8.0001 14.4445ZM5.6001 7.24453C5.38792 7.24453 5.18444 7.32882 5.03441 7.47885C4.88438 7.62887 4.8001 7.83236 4.8001 8.04453C4.8001 8.2567 4.88438 8.46019 5.03441 8.61022C5.18444 8.76025 5.38792 8.84453 5.6001 8.84453H10.4001C10.6123 8.84453 10.8158 8.76025 10.9658 8.61022C11.1158 8.46019 11.2001 8.2567 11.2001 8.04453C11.2001 7.83236 11.1158 7.62887 10.9658 7.47885C10.8158 7.32882 10.6123 7.24453 10.4001 7.24453H5.6001Z" fill="#FFD154"/>
          </g>
        </svg>

      </h6>
      <h6>{element?.name}</h6>
      <h6>
           <TextField
        color='warning'
          id="outlined-multiline-flexible"
          label="one price"
          type='number'
          size="small"    
          sx={{ width: "100px" }}   
          onChange={(e) => {
         handelPrice(e.target.value)
          }}          
        />
      </h6>
    </div>
  );
})}
                <h6 >total ={totalPrice}{information?.currency }</h6>

              <div style={{display:"flex",justifyContent:"center"}}>
                {order.length>0 && <button onClick={handelAdd} className="button smallRad buttonAdd">send</button>
                }</div>
              </div>
               <div style={{marginTop:"2%"}} className="listProduct">
                  <h3>buy Expence <AddBuyExper addExperience={handleAddExperience} /></h3>     
                  {buyExpence?.map((item, key) => {
                    return <div className="border" style={{padding:"1%"}} key={key + "geageag"}>
                      <h6>title:{item?.title }</h6>
                      <h6>cost:{item?.cost}{information?.currency }</h6>
                      <h6>description:{item?.description }</h6>
                    </div>
                  })}                  
              </div>
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
        </>
  <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={message}
      open={open}
      key={"bottom" + "left"}
    />
          </>
          
        
:<Loading/>}
 

    </>

  )
}

export default NewOrder
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
// import Loading from "../Component/Loading";
import { UseAxios, imageUrl } from "../store/constant/url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductUnitDialog from "./ProductUnitDialog";
import CustomerCarDialog from "../Page/Customers/CustomerCarDialog";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loading from "../Component/Loading";
import CustomerDialog from "../Page/Customers/CustomerDialog";
import CustomerDialogCompany from "../Page/Customers/CustomerDialogCompany";

const WorkShopFastSell = () => {
  const [Product, setProduct] = useState();
  const [Service, setService] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("created");
 const [filter, setFilter] = useState();
  const [pagenate, setPagenate] = useState(9);
  const [total, setTotal] = useState(2);
  const [totalService, setTotalService] = useState(2);
 const [currentPage, setCurrentPage] = useState(1);
 const [currentPageService, setCurrentPageService] = useState(1);
 const [order, setOrder] = useState([]);
 const [orderService, setOrderService] = useState([]);
  const [employee, setEmployee] = useState();
  const [ServiceType, setServiceType] = useState();
  const [PayType, setPayType] = useState();
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalPriceService, setTotalPriceService] = useState(0)
  const [information,setInformation]=useState([])
  const money = useSelector((state) => state.money);
 const [enter, setEnter] = useState(false);
 const [car, setCar] = useState();
 const [cureentCar, setCureentCar] = useState(false);
 const [WorkShopSelected, setWorkShopSelected] = useState(false);
 const [allWorkShop, setAllWorkShop] = useState([]);
 const [customer, setCustomer] = useState([]);
  
 const handelAdd = async() => {
   try {
      await UseAxios({
     method: "post",
     api: "createWorkShopSales",
     data: {
       title: information?.title || null,
       pay_type_id: information?.pay_type_id || null,
       total_price: parseInt(totalPrice + totalPriceService)||null,
       currency: information?.currency || null,
       work_shop_id: WorkShopSelected,
       order: order,
       service: orderService,
       car_id:cureentCar
       
     }
      })
     setMessage("created")
     setOpen(true)
     setTimeout(() => {
       location.reload();
     }, 3000);
   } catch (error) {
     setMessage(error.message);
     setOpen(true)
     setTimeout(() => {
      setOpen(false)
     }, 3000);
   }
  
 }
const handleUnit = (item) => {
   const updatedOrder = [...order];
   const objectUpdate = {
     "id": item?.id,
     "quantity": 1,
     "image":  item?.image,
     "name": item.name,
     "price": item?.price ,
     "type": "unit",
     "product_id":item?.product_id
   };
   const index = updatedOrder.findIndex((element) => element.id === item?.id && element.type === "unit");

   if (index !== -1) {
      updatedOrder[index].quantity += 1;
   } else {
      updatedOrder.push(objectUpdate);
   }
 const totalPrice = updatedOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
   setOrder(updatedOrder);
};
const handleAppendItemService = (item) => {
    const updatedOrder = [...orderService];
    const objectUpdate = {
        "id": item?.id,
        "image": item?.image,
        "name": item?.name,
        "price": item?.price,
    };
    const index = updatedOrder.findIndex((element) => element.id === item?.id);

    if (index !== -1) {
        updatedOrder.splice(index, 1); // Remove the item at the found index
    } else {
        updatedOrder.push(objectUpdate);
    }

    const TotalPriceService = updatedOrder.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotalPriceService(TotalPriceService);
    setOrderService(updatedOrder);
};
const handleAppendItem = (item) => {
    const updatedOrder = [...order];
    const product = item.product || {}; // Fallback to an empty object if product is not defined
    
    const objectUpdate = {
        "id": item?.id,
        "quantity": 1,
        "image": product?.main_image || item?.image,
        "name": product?.name || item?.product_name,
        "price": (product?.price_discount) ? (product?.price - product?.price_discount) : (item?.product_price || 0),
        "type": "product"
    };
    const index = updatedOrder.findIndex((element) => element.id === item?.id && element.type === "product");

    if (index !== -1) {
        updatedOrder[index].quantity += 1;
    } else {
        updatedOrder.push(objectUpdate);
    }
 const totalPrice = updatedOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
    setOrder(updatedOrder);
 };
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
 };
 useEffect(() => {
  const getData = async () => {
  const res=await UseAxios({method:"get",api:"getWorkShopName"})
   setAllWorkShop(res.data.data);
  }
  if (!WorkShopSelected) {
   getData();
  }
 }, [WorkShopSelected])
 useEffect(() => {
    const getdata = async() => {
    var customers =await UseAxios({ api: `getCustomerName`,method: "get" })
    var payTypes =await UseAxios({ api: `getPayType`,method: "get" })
   
     setCustomer( customers.data.data);
     setPayType(payTypes.data.data);
    }
   
    
      getdata();
    
  
  }, [WorkShopSelected])
  useEffect(() => {
    const getData = async () => {
 const employee=await UseAxios({method:"get",api:`getEmployeeForWorkShop?work_shope_id=${WorkShopSelected}`})    
 const byType=await UseAxios({method:"get",api:`getPayType`})    
      setEmployee(employee.data.data);
      setPayType(byType.data.data)
    }
    getData();
  }, [WorkShopSelected])
  useEffect(() => {
    const getData = async () => {
      const services = await UseAxios({
        method: "get", api: `getService
?${filter?.searchService ? `?search=${filter.searchService}&` : ""}
page=${currentPageService}&
paginate=${6}

${filter?.service_type_id ? `&service_department_id=${filter?.service_type_id}` : ""}

`})
      setService(services?.data?.data.data);
        setTotalService(services.data?.data?.last_page ?? total)
      
    }
    getData();
  }, [WorkShopSelected, enter,  filter?.service_type_id]) 
 
 useEffect(() => {
  const getData = async () => {
   const employees = await UseAxios({ method: "get", api: `getEmployeeForWorkShop?work_shop_id=${WorkShopSelected}` })
   const ServicesTypes = await UseAxios({ method: "get", api: `getServiceDepartmentName` })
  console.log(ServicesTypes);
   const WorkShops = await UseAxios({  method: "GET",
        api: `getWorkShopStoreProduct/${WorkShopSelected}?${filter?.search ? `?search=${filter.search}&` : ""}
page=${currentPage}&
${pagenate ? `paginate=${pagenate}` : ""}
` })
   setProduct(WorkShops.data?.data?.data);
    setEmployee(employees?.data?.data);
    setServiceType(ServicesTypes?.data?.data);
        setTotal(WorkShops.data?.data?.last_page ?? total)
  }
  if (WorkShopSelected) {
  getData()
  }
 }, [pagenate, WorkShopSelected, enter])
 useEffect(() => {
  const getData = async () => {
   const res =await UseAxios({ method: "get", api: `getCarName/${information?.customer_id}` })
   setCar(res.data.data);
  }
  if (information?.customer_id) {
  getData();
  }
 },[information?.customer_id])
 return <>
  
     
 <>
    
     <div style={{overflowX:"auto"}}>
       <div style={{display:"flex",justifyContent:"start",alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",width:"100%"}}>
  <Autocomplete
    id="grouped-demo"
    options={allWorkShop}
    getOptionLabel={(option) => option.name}
    onChange={(e, selectedOption) => {
      if (selectedOption) {
        setWorkShopSelected(selectedOption.id);
      } else {
        setWorkShopSelected(null); // handle case when no option is selected
      }
    }}
                    sx={{width:"50%"}}
    color="warning"
    renderInput={(params) => (
      <TextField  {...params} color="warning" label="WorkShop" />
    )}
  />
  <Autocomplete
    id="grouped-demo"
    options={customer}
    getOptionLabel={(option) => option.name}
                    color="warning"
                    sx={{width:"50%"}}
    onChange={(e, selectedOption) => {
      if (selectedOption) {
        setInformation({...information,"customer_id":selectedOption.id});
      } 
    }}
    renderInput={(params,index) => <TextField  color="warning" key={index+"branch"} {...params} label="Customer" />}
      />
    {information?.customer_id&&  <> <Autocomplete
    id="grouped-demo"
    options={car}
    getOptionLabel={(option) => option.name}
                    color="warning"
                    sx={{width:"50%"}}
    onChange={(e, selectedOption) => {
      if (selectedOption) {
        setCureentCar(selectedOption.id);
      } 
    }}
    renderInput={(params,index) => <TextField  color="warning" key={index+"car"} {...params} label="Customer Car" />}
           />
                <FormControl sx={{width:"300px"}}>
      <InputLabel  color="warning" id="demo-select-small-label">مشرف الصيانة</InputLabel>
              <Select
                
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="مشرف الصيانة"
       
           >
             <MenuItem color="warning"   value={null}  >ALL</MenuItem>
                {employee?.map((element,index) => {
                  return <MenuItem color="warning"   value={element.id}  key={index+"gaegeag"}>{element.first_name } {element.last_name }</MenuItem>
               })}
       
      </Select>
        </FormControl>
            
             <div style={{ width: "40%", display: "flex",padding:"0",margin:"0",justifyContent:"center" }}>
               <CustomerCarDialog customer={information?.customer_id} />    
                  <CustomerDialog />
                  <CustomerDialogCompany/>
      </div></>}
</div>
         
    </div>
    <div style={{marginTop:"10px", overflowX: "auto" ,display:"flex",width:"70%"}}>
     <h3 style={{ margin: "0 10%" }}>service</h3>
            <FormControl sx={{width:"150px"}} size='small'>
      <InputLabel color="warning" id="demo-select-small-label">SERVICE TYPE</InputLabel>
              <Select
                onChange={(e)=>{setFilter({...filter,"service_type_id":e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="SERVICE TYPE"
       
           >
             <MenuItem color="warning"   value={null}  >ALL</MenuItem>
                {ServiceType?.map((element,index) => {
                  return <MenuItem color="warning"   value={element.id}  key={index+"gaegeag"}>{element.name }</MenuItem>
               })}
       
      </Select>
        </FormControl>
            <TextField onChange={(e)=>{setFilter({...filter,"searchService":e.target.value})}} onKeyPress={handleKeyPress}    color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
      
     <div style={{ display: "flex", width: "180px" }}>
        {/* <TextField onChange={(e)=>{setFilter({...filter,search:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" /> */}
       
      {/* <WorkShopOrderDialog workShop={WorkShopSelected} /> */}
     </div>
    </div>
    
    <div style={{ minWidth: "360px" }} className="productOrder">
     
     <div style={{marginLeft:"5%",width:"50%"}}>
         <div style={{ width:"100%",minWidth:"360px", display:"flex",justifyContent:"space-between",alignItems:"center"}}>

       <ArrowBackIosIcon disabled={currentPageService <= 1 ? true : false}
        onClick={() => { setCurrentPageService(currentPageService - 1) }}
          sx={{ color: currentPageService <= totalService ? "gray" : "#FFD154" }}
 /> 
         
       <div style={{flexWrap:"wrap",margin:"0 10%",minWidth:"100%", display: "flex", justifyContent: "center" }}>
          {Service?.map((item, key) => {
        return <div onClick={()=>{handleAppendItemService(item)}} style={{display:"flex"}}  key={key+"tt"}>
        <div style={{margin:"3%"}} key={key}>
            <div  className="oneProductInFast">
      <p style={{ textAlign: "center" }}>{item?.name}</p>
      <div >
       <img
  style={{ width: "50px" }}
  src={`${imageUrl}${item.image?.id}/${item?.image?.file_name}`}
  alt={item?.product_name}
/>

    </div>
    
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price</p>
     <p>{item?.price}$</p>
    </div>
             
    </div>
       
          </div>
    </div>
      })}
       </div>
     <ArrowForwardIosIcon
  disabled={currentPageService >= totalService ? true : false}
  sx={{ color: currentPageService >= totalService ? "gray" : "#FFD154" }}
  onClick={() => {
    setCurrentPageService(currentPageService + 1);
  }}
/>

</div>
 
        <div style={{marginTop:"10px", overflowX: "auto" ,display:"flex",width:"70%"}}>
     <h3 style={{ margin: "0 10%" }}>product</h3>
        
      
        <TextField onChange={(e)=>{setFilter({...filter,search:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
       
      
    </div>
      
     <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
      {Product?Product?.map((item, key) => {
        return <div onClick={()=>{handleAppendItem(item)}}  key={key+"tt"}>
        <div style={{margin:"3%"}} key={key}>
            <div  className="oneProductInFast">
      <p style={{ textAlign: "center" }}>{item?.product_name||item?.product?.name}</p>
      <div >
       <img
  style={{ width: "50px" }}
  src={`${imageUrl}${item.image?.id||item.product.main_image?.id}/${item?.image?.file_name || item?.product.main_image?.file_name}`}
  alt={item?.product_name}
/>

    </div>
    <div style={{ display:"flex",justifyContent:"space-around"}}>
                <p style={{ color: "gray" }}>quantity</p>
                <p>{item?.quantity }</p>
     
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price</p>
     <p>{item?.product_price||item?.product?.price }$</p>
    </div>
              <div onClick={(e) => e.stopPropagation()} style={{display:"flex",justifyContent:"center"}}>
                <ProductUnitDialog  handelUnit={handleUnit} workshop={WorkShopSelected} product_id={item?.product?.id}/>
              </div>
    </div>
       
          </div>
    </div>
      }):<Loading/>}
       
            </div>
     </div>   
    
     <div className="listProduct">
 
         <div  >
              {order.length > 0 && 
               <div style={{display:"flex",width:"100%",justifyContent:"center",height:"40px"}}>
                <button onClick={handelAdd} className="button  buttonAdd">send</button>
               </div>
                }
               <TextField onChange={(e)=>{setInformation({...information,title:e.target.value})}} color="warning" fullWidth id="outlined-basic" label="Title" variant="outlined" />
             <div style={{ display: "flex" }}>
       <div style={{display:"flex",width:"180px"}}></div>
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
        <FormControl fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">Pay Type</InputLabel>
              <Select
                onChange={(e)=>{setInformation({...information,pay_type_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Pay Type"
       
      >
                {PayType?.map((element,index) => {
                  return <MenuItem color="warning" title={element.dollar_price} value={element.id} key={index +"aegaegeag"}>{element.name}</MenuItem>
               })}
       
      </Select>
        </FormControl>    
        
          </div>
          </div>
     <div className="onItem">
            
                <p>image</p>
                <p>quantity</p>
                <p >name</p>
                <p >price</p>
      </div>
      {order?.length>0 &&<> <h3>products</h3>
              {order?.map((element, key) => {
const handleIncrement = () => {
  setOrder(prevOrder => {
    const newOrder = [...prevOrder];
    newOrder[key].quantity += 1;
    
    // Update total price
    const totalPrice = newOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);

    return newOrder;
  });
};


 const handleDecrement = () => {
  setOrder(prevOrder => {
    const newOrder = [...prevOrder];
    if (newOrder[key].quantity > 1) {
      newOrder[key].quantity -= 1;
    } else {
      // Remove the item if the quantity is 0
      newOrder.splice(key, 1);
   }
    const totalPrice = newOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
    return newOrder;
  });
    
  
};

  return (
    <div style={{ display: "flex", justifyContent: "space-between", minWidth: "100%" }} className="onItem" key={key + "22rwqa"}>
   <img style={{ width: "50px",height:"50px" }} src={ `${imageUrl}${element?.image?.id}/${element?.image?.file_name}`} alt={element?.product_name} />
 <h6 style={{ margin: "0" }}>
    <svg style={{ cursor: "pointer" }} onClick={handleIncrement} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path fillRule="evenodd" clipRule="evenodd" d="M8.0001 14.4445C9.69748 14.4445 11.3253 13.7702 12.5256 12.57C13.7258 11.3698 14.4001 9.74192 14.4001 8.04453C14.4001 6.34715 13.7258 4.71928 12.5256 3.51905C11.3253 2.31882 9.69748 1.64453 8.0001 1.64453C6.30271 1.64453 4.67485 2.31882 3.47461 3.51905C2.27438 4.71928 1.6001 6.34715 1.6001 8.04453C1.6001 9.74192 2.27438 11.3698 3.47461 12.57C4.67485 13.7702 6.30271 14.4445 8.0001 14.4445ZM8.8001 5.64453C8.8001 5.43236 8.71581 5.22887 8.56578 5.07885C8.41575 4.92882 8.21227 4.84453 8.0001 4.84453C7.78792 4.84453 7.58444 4.92882 7.43441 5.07885C7.28438 5.22887 7.2001 5.43236 7.2001 5.64453V7.24453H5.6001C5.38792 7.24453 5.18444 7.32882 5.03441 7.47885C4.88438 7.62887 4.8001 7.83236 4.8001 8.04453C4.8001 8.2567 4.88438 8.46019 5.03441 8.61022C5.18444 8.76025 5.38792 8.84453 5.6001 8.84453H7.2001V10.4445C7.2001 10.6567 7.28438 10.8602 7.43441 11.0102C7.58444 11.1602 7.78792 11.2445 8.0001 11.2445C8.21227 11.2445 8.41575 11.1602 8.56578 11.0102C8.71581 10.8602 8.8001 10.6567 8.8001 10.4445V8.84453H10.4001C10.6123 8.84453 10.8158 8.76025 10.9658 8.61022C11.1158 8.46019 11.2001 8.2567 11.2001 8.04453C11.2001 7.83236 11.1158 7.62887 10.9658 7.47885C10.8158 7.32882 10.6123 7.24453 10.4001 7.24453H8.8001V5.64453Z" fill="#FFD154"/>
        </svg>

        {element?.quantity}

        <svg onClick={handleDecrement} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.0001 14.4445C9.69748 14.4445 11.3253 13.7702 12.5256 12.57C13.7258 11.3698 14.4001 9.74192 14.4001 8.04453C14.4001 6.34715 13.7258 4.71928 12.5256 3.51905C11.3253 2.31882 9.69748 1.64453 8.0001 1.64453C6.30271 1.64453 4.67485 2.31882 3.47461 3.51905C2.27438 4.71928 1.6001 6.34715 1.6001 8.04453C1.6001 9.74192 2.27438 11.3698 3.47461 12.57C4.67485 13.7702 6.30271 14.4445 8.0001 14.4445ZM5.6001 7.24453C5.38792 7.24453 5.18444 7.32882 5.03441 7.47885C4.88438 7.62887 4.8001 7.83236 4.8001 8.04453C4.8001 8.2567 4.88438 8.46019 5.03441 8.61022C5.18444 8.76025 5.38792 8.84453 5.6001 8.84453H10.4001C10.6123 8.84453 10.8158 8.76025 10.9658 8.61022C11.1158 8.46019 11.2001 8.2567 11.2001 8.04453C11.2001 7.83236 11.1158 7.62887 10.9658 7.47885C10.8158 7.32882 10.6123 7.24453 10.4001 7.24453H5.6001Z" fill="#FFD154"/>
          </g>
        </svg>

      </h6>
      <h6 style={{width:"23%"}}>{element?.name}</h6>
    <h6>{element?.price}$</h6>
    </div>
  );
              })}</>}
      {orderService?.length > 0 &&
      <><h3>services</h3>
 
        
     <div className="onItem">
                <p>image</p>
                <p >name</p>
             <p >price</p>
             <p>Employee</p>
              </div>
           {orderService?.map((element, key) => {
             const handelAddEmploee = (data) => {
  setOrderService(prevOrder => {
    const newOrder = [...prevOrder];
    newOrder[key].employee_id= data;
    return newOrder;
  });
             }
  return (
    <div style={{ display: "flex", justifyContent: "space-between", minWidth: "100%" }} className="onItem" key={key + "22rwqa"}>
   <img onClick={()=>{handleAppendItemService(element)}} style={{cursor:"pointer", width: "50px",height:"50px" }} src={ `${imageUrl}${element?.image?.id}/${element?.image?.file_name}`} alt={element?.product_name} />

      <h6 style={{width:"23%"}}>{element?.name}</h6>
      <h6>{element?.price}$</h6>
       <div style={{width:"50px"}}>
          <FormControl sx={{width:"50px"}} size='small'>
      <InputLabel color="warning" id="demo-select-small-label">Employee</InputLabel>
              <Select
                onChange={(e)=>{handelAddEmploee(e.target.value)}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Employee"
       
           >
             <MenuItem color="warning"   value={null}  >ALL</MenuItem>
                {employee?.map((element,index) => {
                  return <MenuItem color="warning"   value={element.id}  key={index+"gaegeag"}>{element.first_name } {element.last_name }</MenuItem>
               })}
       
      </Select>
        </FormControl>
       <div style={{display:"flex",width:"180px"}}>
       
       </div>
          </div>
    </div>
  );
})}
    <h6 >total ={totalPriceService }$</h6>

              
      </>
       }
  
    <h6 >total Pruduct Price ={totalPrice  }$</h6>
    <h6 >total Service Price ={totalPriceService }$</h6>
        <h6>total: {parseInt(totalPrice + totalPriceService)}$</h6>
  
              
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
     
   </div>
   
    
    
 
     </>
      <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={message}
      open={open}
      key={"bottom" + "left"}
    />
 </>
}
export default WorkShopFastSell;

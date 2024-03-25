import { useEffect, useState } from "react";
import moment from 'moment';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { UseAxios, imageUrl } from "../store/constant/url";
import Loading from "../Component/Loading";


function ReserverOrder() {
 const [pagenate, setPagenate] = useState(5);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
 const [sender, setSender] = useState();
 const [filter, setFillter] = useState();
 const [reserver, setReserver] = useState();
 const [Product, setProduct] = useState([]);
 const [total, setTotal] = useState(2);
 const [currentPage, setCurrentPage] = useState(1);
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState("");
  const [enter, setEnter] = useState(false);
 
 useEffect(() => {
  const getData = async () => {
   const Product = await UseAxios({
        method: "GET",
        api: `getProductCategory`
   })
   setProduct(Product.data.data);
  }
  getData();
 }, [])
  useEffect(() => {
    const getData = async () => {
      const res =await UseAxios({ method: "get", api: "getBranchName" });
      setBranches(res.data.data)
    }
    if (!sender) {
      getData();
      
    }
  }, [sender])
   useEffect(() => {
  var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getBranchMonyInfo?
page=${currentPage}&
${pagenate ? `paginate=${pagenate}&` : ""}
${sender ? `&sender_id=${sender}` : ""}
${reserver ? `&reverse_id=${reserver}` : ""}
${filter?.search ? `&search=${filter?.search}` : ""}
${filter?.category_id ? `&category_id=${filter?.category_id}` : ""}


`
   });
   setData(responce.data.data.data);
   setTotal(responce.data?.data?.last_page ?? total)
  setLoading(true) 
    }
    if (sender&&reserver) {
     
   getData()
    }
   }, [pagenate,  currentPage,sender,reserver,filter?.category_id])
 
 const handleChangeStatus = async(status,id) => {
  UseAxios({
   method: "post",
   api: `accebtBranchOrders/${id}`,
   data:{is_completed:status}
  })
 setMessage("order " + status)
  setOpen(true)
setTimeout(() => {
 setOpen(false)
}, 3000);
 };
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
 return (
  <>
      <div style={{display:"flex",width:"100%"}}>
  <Autocomplete
    id="grouped-demo"
    options={branches}
    getOptionLabel={(option) => option.name}
    onChange={(e, selectedOption) => {
      if (selectedOption) {
        setSender(selectedOption.id);
      } else {
        setSender(null); // handle case when no option is selected
      }
    }}
                    sx={{width:"50%"}}
    color="warning"
    renderInput={(params) => (
      <TextField  {...params} color="warning" label="Sender" />
    )}
         />
         <Autocomplete
    id="grouped-demo"
    options={branches}
    getOptionLabel={(option) => option.name}
    onChange={(e, selectedOption) => {
      if (selectedOption) {
        setReserver(selectedOption.id);
      } else {
        setReserver(null); // handle case when no option is selected
      }
    }}
                    sx={{width:"50%"}}
    color="warning"
    renderInput={(params) => (
      <TextField  {...params} color="warning" label="Reception" />
    )}
  />
 
               
</div>

  {
       loading ?
         <>
        
                 <div  style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                
            <TextField onChange={(e)=>{setFillter({...filter,search:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
                    
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
                {Product?.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })}
       
      </Select>
                </FormControl>
                
                  </div>

     <div className="filterContent">
  
    <hr />

    <div className="tableContent">
      <table>
  <thead>
    <tr>
      <th>image</th>
           <th>Product</th>
      <th>Created</th>   
      <th>quantity</th>
       <th>Accebt</th>
       <th>{null}</th>
      </tr>
  </thead>
  <tbody>
  
       {data?.map((item, key) => {
        return <><tr key={key}>
        <td><img style={{width:"50px"}} src={`${imageUrl}${item?.product_name?.main_image.id}/${item?.product_name?.main_image.file_name}`} alt="" /></td>
        <td>{item?.product_name?.name}</td>
        <td>{moment(item?.created_at).format("YYYY:MM:DD")}
            
            <span style={{fontSize:"15px",color:"gold"}}>{moment(item?.created_at).format("HH:mm")}</span></td>
        <td>{item?.count}</td>
         
          <td className="status">
                <FormControl sx={{ m: 1, minWidth: 120 }} >
      <InputLabel color="warning" id="demo-select-small-label">{item?.is_completed==0?"binding":"accebted"}</InputLabel>
              <Select
               onChange={(e)=>{handleChangeStatus(e.target.value,item?.id)}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       disabled={item?.is_completed}
      >
    
     <MenuItem  value={"1"}  >Accebt</MenuItem>
     <MenuItem  value={"0"}  >reject</MenuItem>
 
            
      </Select>
            </FormControl>
      
         </td>
    
         
        </tr>
        </>
       })}
       
    
        
  </tbody>
    </table>
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
    :<Loading/>}
   <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    message={message}
    open={open}
    key={"bottom" + "left"}
   />
  </>
  )
}

export default ReserverOrder

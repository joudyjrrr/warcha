import { useEffect, useState } from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import { UseAxios, imageUrl } from "../store/constant/url";
import Loading from "../Component/Loading";


function WorkShopOrders({branch}) {
 const [pagenate, setPagenate] = useState(5);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [leng, setLeng] = useState(-1);
 const [total, setTotal] = useState(2);
 const [currentPage, setCurrentPage] = useState(1);
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState("");
 const handleChangeStatus = async(status,id) => {
  UseAxios({
   method: "post",
   api: `updateWorkShopMonyInfo/${id}`,
   data:{is_completed:status}
  })
 setMessage("order " + status)
  setOpen(true)
setTimeout(() => {
 setOpen(false)
}, 3000);
 };
   useEffect(() => {
  var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getWorkShopMonyInfo?
page=${currentPage}&
${pagenate ? `&paginate=${pagenate}` : ""}&
${branch ? `&branch=${branch}` : ""}


`
   });
   setData(responce.data.data.data);
   setTotal(responce.data?.data?.last_page ?? total)
  setLoading(true) 
  }
   getData()
   }, [pagenate,  currentPage])
 
 return (
    <>
  {
       loading ?
         <>
        
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
        <td><img style={{width:"50px"}} src={`${imageUrl}${item?.product?.main_image.id}/${item?.product?.main_image.file_name}`} alt="" /></td>
        <td>{item?.product?.name}</td>
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

export default WorkShopOrders

WorkShopOrders.prototype = {
customer_id:PropTypes.string.isRequired
}
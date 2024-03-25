import { useEffect, useState } from "react";
import { UseAxios, imageUrl} from "../../store/constant/url";
import moment from 'moment';
import PropTypes from 'prop-types';
import Loading from "../../Component/Loading";
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
const ShowMore = ({api}) => {
 const [data, setData] = useState();
 useEffect(() => {
  var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
     api:api
   });
    setData(responce.data.data);
  }
   getData()
 }, [api])
 
 return <>
   <tr >
     <td style={{color:"gray"}}>image</td>
  <td style={{color:"gray"}}>name</td>
   <td style={{color:"gray"}}>price one</td>
  <td style={{color:"gray"}}>QTY</td>
   <td style={{color:"gray"}}>Total</td>
  </tr>
  {data?.sell_item_info?.map((item, key) => {
  
    return <tr key={key}>
      <td><img style={{width:"75px"}} src={item?.product?.main_image ? `${imageUrl}${item?.product?.main_image?.id}/${item?.product?.main_image?.file_name}`:"HTCcolo.png"} alt="" /></td>
    <td>{item?.product?.name }</td>
    <td>${item?.price_one }</td>
    <td>x{item?.count }</td>
    <td>${item?.count*item?.price_one }</td>
   </tr>
  }
)}
   <tr>
   <td></td>
   <td></td>
   <td></td>
   <td></td>
   <td>pritnt</td>
   </tr>
  </>
}

function OrderMangment({customer_id,branch}) {
 const [pagenate, setPagenate] = useState(5);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [leng, setLeng] = useState(-1);
 const [current, setCurrent] = useState("All");
 const [total, setTotal] = useState(2);
 const [name, setName] = useState();
 const [enter, setEnter] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState("");
 const handleChangeStatus = async(status,id) => {
  UseAxios({
   method: "post",
   api: `updateSellItem/${id}`,
   data:{status:status}
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
    api: `getSellItem?
page=${currentPage}&
${current != "All" ? `status=${current}` : ""}
${pagenate ? `&paginate=${pagenate}` : ""}&
${customer_id ? `&customer_id=${customer_id}` : ""}&
${pagenate ? `&paginate=${pagenate}` : ""}&
${name ? `&search=${name}` : ""}&
${branch ? `&branch_id=${branch}` : ""}


`
   });
   setData(responce.data.data.data);
   setTotal(responce.data?.data?.last_page ?? total)
  setLoading(true) 
  }
   getData()
   }, [pagenate, current, enter,currentPage])
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
 return (
    <>
  {
       loading ?
         <>
        
     <div className="filterContent">
     <ul className="selectElement" style={{justifyContent:"start"}}>
     <li onClick={()=>setCurrent("All")} className={current=="All"?"underLine":null} style={{ marginRight: "20px" }}>All</li>
     <li onClick={()=>setCurrent("waiting")} className={current=="waiting"?"underLine":null} style={{marginRight:"20px"}}>waiting</li>
     <li onClick={()=>setCurrent("approved")} className={current=="approved"?"underLine":null} style={{marginRight:"20px"}}>approved</li>
     <li onClick={()=>setCurrent("prepared")} className={current=="prepared"?"underLine":null} style={{marginRight:"20px"}}>prepared</li>
     <li onClick={()=>setCurrent("on_way")} className={current=="on_way"?"underLine":null} style={{marginRight:"20px"}}>on_way</li>
     <li onClick={()=>setCurrent("delivered")} className={current=="delivered"?"underLine":null} style={{marginRight:"20px"}}>delivered</li>
     <li onClick={()=>setCurrent("paymented")} className={current=="paymented"?"underLine":null} style={{marginRight:"20px"}}>paymented</li>
     <li onClick={()=>setCurrent("reject")} className={current=="reject"?"underLine":null} style={{marginRight:"20px"}}>reject</li>
     
    </ul>
    <hr />
    <div className="filterContent">
     <ul style={{justifyContent:"start"}}>
     <li><input placeholder="Search" onKeyPress={handleKeyPress}  onChange={(e) => {
setName(e.target.value)
        }} type="text" className="filter smallRad" /></li>
   
     
     </ul>
    </div>
    <div className="tableContent">
      <table>
  <thead>
    <tr>
      <th>#Order ID</th>
      <th>Created</th>
      <th>CUSTOMER</th>
      <th>BRANCH</th>
       <th>TOTAL</th>
       <th>STATUS</th>
       <th>{null}</th>
      </tr>
  </thead>
  <tbody>
  
       {data?.map((item, key) => {
        return <><tr key={key}>
        <td>#{item?.id}</td>
        <td>{moment(item?.created_at).format("YYYY:MM:DD")}
            
            <span style={{fontSize:"15px",color:"gold"}}>{moment(item?.created_at).format("HH:mm")}</span></td>
        <td>{item?.customer?.name}</td>
        <td>{item?.branch?.name}</td>
          <td>${item?.total_price}</td>
         
          <td className="status">
                <FormControl sx={{ m: 1, minWidth: 120 }} >
      <InputLabel color="warning" id="demo-select-small-label">{item?.status}</InputLabel>
              <Select
               onChange={(e)=>{handleChangeStatus(e.target.value,item?.id)}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
    
     <MenuItem  value={"approved"}  >approved</MenuItem>
     <MenuItem  value={"prepared"}  >prepared</MenuItem>
     <MenuItem  value={"on_way"}  >on way</MenuItem>
     <MenuItem  value={"delivered"}  >delivered</MenuItem>
     <MenuItem  value={"paymented"}  >paymented</MenuItem>
     <MenuItem  value={"reject"}  >reject</MenuItem>
 
            
      </Select>
            </FormControl>
      
         </td>
         <td>
            {leng==key?<svg onClick={()=>{setLeng(-1)}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.35 9.35C12.25 9.25 12.1333 9.2 12 9.2C11.8667 9.2 11.75 9.25 11.65 9.35L8.85 12.15C8.68333 12.3167 8.64167 12.5 8.725 12.7C8.80833 12.9 8.96667 13 9.2 13L14.8 13C15.0333 13 15.1917 12.9 15.275 12.7C15.3583 12.5 15.3167 12.3167 15.15 12.15L12.35 9.35ZM12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02566 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7367 9.31667 21.9993 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7367 13.3833 21.9993 12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31233 17.1167 2.787 15.9C2.26167 14.6833 1.99933 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26167 10.6167 1.99933 12 2ZM12 4C9.78333 4 7.89567 4.779 6.337 6.337C4.77833 7.895 3.99933 9.78267 4 12C4 14.2167 4.779 16.1043 6.337 17.663C7.895 19.2217 9.78267 20.0007 12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.2217 16.105 20.0007 14.2173 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.105 4.77833 14.2173 3.99933 12 4Z" fill="#1D1F1F"/>
<path d="M12.35 9.35C12.25 9.25 12.1333 9.2 12 9.2C11.8667 9.2 11.75 9.25 11.65 9.35L8.85 12.15C8.68333 12.3167 8.64167 12.5 8.725 12.7C8.80833 12.9 8.96667 13 9.2 13L14.8 13C15.0333 13 15.1917 12.9 15.275 12.7C15.3583 12.5 15.3167 12.3167 15.15 12.15L12.35 9.35ZM12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02566 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7367 9.31667 21.9993 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7367 13.3833 21.9993 12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31233 17.1167 2.787 15.9C2.26167 14.6833 1.99933 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26167 10.6167 1.99933 12 2ZM12 4C9.78333 4 7.89567 4.779 6.337 6.337C4.77833 7.895 3.99933 9.78267 4 12C4 14.2167 4.779 16.1043 6.337 17.663C7.895 19.2217 9.78267 20.0007 12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.2217 16.105 20.0007 14.2173 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.105 4.77833 14.2173 3.99933 12 4Z" fill="black" fillOpacity="0.2"/>
</svg>
:<svg onClick={()=>{setLeng(key)}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.65 14.65C11.75 14.75 11.8667 14.8 12 14.8C12.1333 14.8 12.25 14.75 12.35 14.65L15.15 11.85C15.3167 11.6833 15.3583 11.5 15.275 11.3C15.1917 11.1 15.0333 11 14.8 11H9.2C8.96667 11 8.80833 11.1 8.725 11.3C8.64167 11.5 8.68333 11.6833 8.85 11.85L11.65 14.65ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22ZM12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.2217 16.105 20.0007 14.2173 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.105 4.77833 14.2173 3.99933 12 4C9.78333 4 7.89567 4.779 6.337 6.337C4.77833 7.895 3.99933 9.78267 4 12C4 14.2167 4.779 16.1043 6.337 17.663C7.895 19.2217 9.78267 20.0007 12 20Z" fill="#969AA0"/>
</svg>
}
         </td>
         
        </tr>
         {leng == key && <ShowMore api={`getSellItemById/${item?.id}`} />}</>
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
     <button disabled={currentPage<=1? true : false} onClick={() => { setCurrentPage(pagenate - 1)}}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default OrderMangment
ShowMore.propTypes = {
  api: PropTypes.string.isRequired,
};
OrderMangment.prototype = {
customer_id:PropTypes.string.isRequired
}
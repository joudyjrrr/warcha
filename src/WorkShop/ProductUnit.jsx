import { useEffect, useState } from "react"

import { TextField } from "@mui/material";
import { UseAxios, imageUrl } from "../store/constant/url";
import Loading from "../Component/Loading";
import WorkShopOrderDialog from "./WorkShopOrderDialog";


const ProductUnit = ({workshop}) => {
  
 const [pagenate, setPagenate] = useState(9);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [filter, setFillter] = useState();
  const [total, setTotal] = useState(2);
  const [enter, setEnter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
  


  useEffect(() => {
  const getData = async () => {
    try {
      const response = await UseAxios({
        method: "GET",
        api: `getUnit/${workshop}?${filter?.search ? `?product_name=${filter.search}&` : ""}
page=${currentPage}&
${pagenate ? `paginate=${pagenate}&` : ""}
`
      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        
        setData(response.data.data.data);
        setTotal(response.data?.data?.last_page ?? total)
   setLoading(true)
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    getData();
}, [pagenate, enter,currentPage]); // هنا نقوم بتتبع تغييرات قيمة data

  return (
    <>
      {loading ?
        <>
          <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
     
            <TextField onChange={(e)=>{setFillter({...filter,search:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
       <div style={{display:"flex",width:"180px"}}>
       
        <WorkShopOrderDialog workShop={workshop}/></div>
          </div>
          <div  style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
      {data?.map((item, key) => {
        return <div key={key+"tt"}>
        <div  style={{margin:"3%"}} key={key}>
            <div className="oneProduct">
      <h3 style={{ textAlign: "center" }}>{item?.product_name||item?.product?.name}</h3>
      <div >
       <img
  style={{ width: "150px" }}
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
    </div>
       
          </div>

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

export default ProductUnit
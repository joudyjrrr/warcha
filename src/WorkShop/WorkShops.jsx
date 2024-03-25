import { useEffect, useState } from "react"
import { FormControl, InputLabel, MenuItem, Select,  Switch, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import  {UseAxios, imageUrl } from "../store/constant/url"
import Loading from "../Component/Loading"
import WorkShopDialog from "./WorkShopDialog";
const WorkShops = () => {
 const [pagenate, setPagenate] = useState(5);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [filter, setFillter] = useState();
  const [page, setPage] = useState(1);
  const [admin, setAdmin] = useState([]);
    const [total, setTotal] = useState(2);
  const nav = useNavigate();
  const [enter, setEnter] = useState(false);
  
   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
  useEffect(() => {
  const getData = async () => {
    try {
       const admin = await UseAxios({
        method: "GET",
        api: `getWorkShopCurrentManger`
      })
      const response = await UseAxios({
        method: "GET",
        api: `getWorkShop?${filter?.name ? `?name=${filter.name}` : ""}
${pagenate ? `&paginate=${pagenate}` : ""}
${page ? `&page=${page}` : ""}
${filter?.admin_id ? `&manger_id=${filter.admin_id}` : ""}`
      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        
         setAdmin(admin.data.data);
        setData(response.data.data.data);
         setTotal(response.data?.data?.last_page ?? total)
   setLoading(true)
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    getData();
}, [filter?.admin_id,enter,page]);
  return (
   <div className="tableContent">
      <div className="filterContent">
         <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel color="warning" id="demo-select-small-label">MANGER</InputLabel>
              <Select
                onChange={(e)=>{setFillter({...filter,admin_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
        <MenuItem value="">
    <MenuItem color="warning" >ALL</MenuItem>
                </MenuItem>
                {admin.map((item,index) => {
                  return <MenuItem color="warning"  value={item?.manger?.work_shop_admin?.user_id} key={index}>{item?.manger?.work_shop_admin?.first_name } {item?.manger?.work_shop_admin?.last_name }</MenuItem>
               })}
       
      </Select>
            </FormControl>
            <TextField onChange={(e)=>{setFillter({...filter,name:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
          <div style={{display:"flex",justifyContent:"center",minWidth:"150px"}}>
            <WorkShopDialog/>
          </div>
          </div>
 
    </div>
      {loading ?
        <table>
  <thead>
            <tr>
              <th>image</th>
      <th>Name</th>
      <th>Manger</th>
      <th>creditor</th>
      <th>debtor</th>
      <th>Active</th>
      <th>action</th>
      </tr>
  </thead>
  <tbody>
        {data?.map((item, index) => {
            return <>
              <tr key={index}>
                <th><img src={item?.image?`${imageUrl}${item?.image?.id}/${item?.image?.file_name}`:"HTCcolo.png" } alt="" /></th>
                <th>{item?.name }</th>
                <th>{item?.manger?.work_shop_admin?.first_name } {item?.manger?.work_shop_admin?.last_name }</th>
                <th>{item?.creditor }</th>
                <th>{item?.debtor }</th>
                <th>
                  <Switch
                    color="warning"
                    checked={item?.is_active}
                    readOnly
  inputProps={{ 'aria-label': 'controlled' }}
/>
                  </th>
      <th>
<svg onClick={() => { nav("/WorkShop", { state: { workshop: item.id } }); }} width="40" height="40" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6503 9.99993C13.6503 11.6499 12.3169 12.9833 10.6669 12.9833C9.01693 12.9833 7.68359 11.6499 7.68359 9.99993C7.68359 8.34993 9.01693 7.0166 10.6669 7.0166C12.3169 7.0166 13.6503 8.34993 13.6503 9.99993Z" stroke="#f5c02e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.6669 16.892C13.6085 16.892 16.3502 15.1587 18.2585 12.1587C19.0085 10.9837 19.0085 9.00867 18.2585 7.83367C16.3502 4.83367 13.6085 3.10034 10.6669 3.10034C7.7252 3.10034 4.98353 4.83367 3.0752 7.83367C2.3252 9.00867 2.3252 10.9837 3.0752 12.1587C4.98353 15.1587 7.7252 16.892 10.6669 16.892Z" stroke="#f5c02e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</th>
          </tr >
         </>
          })}
  </tbody>
    </table>:<div style={{maxWidth:"400px",margin:"0 auto"}}><Loading/></div>}
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
     <button disabled={page<=1? true : false} onClick={() => { setPage(page- 1)}}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4L6 8L10 12" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
       {page != 1?<button onClick={() => { setPage(1) }} className={page == 1 ? "pagenateFlex" : null}>{1 }</button> :null}
       <button className="pagenateFlex">{page}</button>
       {page !=total&&<button onClick={() => { setPage(total) }}>{total }</button>}
       <button 
  disabled={page >= total?true:false}
  onClick={() => {
   setPage(page + 1);
  }}
><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 4L10 8L6 12" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
     </button>
    
     
    </div>
  
   </div>
  )
}

export default WorkShops
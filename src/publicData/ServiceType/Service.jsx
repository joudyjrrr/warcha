import { useLocation } from 'react-router-dom';
import { UseAxios, imageUrl } from '../../store/constant/url';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ServiceDialog from './ServiceDialog';
import ServiceInWorkShop from './ServiceInWorkShop';

function Service() {
 const location = useLocation();
  const [pagenate, setPagenate] = useState(5);
 const [filter, setFillter] = useState();
  const [page, setPage] = useState(1);
    const [total, setTotal] = useState(2);
 var serviceType = location.state && location.state.serviceType;
 const [data, setData] = useState([]);
 const [update, setUpdate] = useState();
  const [enter, setEnter] = useState(false);
   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
 useEffect(() => {
  const getData = async () => {
 const res= await UseAxios({
    api: `getService?service_department_id=${serviceType?.id}
${pagenate ? `&paginate=${pagenate}` : ""}
${page ? `&page=${page}` : ""}
${filter?.name ? `&name=${filter.name}&description=${filter.description}` : ""}
`, method: "get"
   })
   setData(res.data.data.data)
         setTotal(res.data?.data?.last_page ?? total)
  }
  getData();
 }, [location,enter,page,pagenate])
  return (
   <div>
    <div style={{marginBottom:"4%", display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
       <h3 style={{height:"auto"}} className='RelateCard  padding'>{serviceType?.name }</h3>
                   <h5 style={{height:"auto"}} className='RelateCard padding'>
  <img style={{width:"150px",borderRadius:"50%"}}
    src={
      serviceType?.image
        ? `${imageUrl}${serviceType?.image?.id}/${serviceType?.image?.file_name}`
        : "/149071.png"
    }
    alt=""
  />
</h5>
    </div>
    <h3 style={{ width: "90%", height: "auto", margin: "0 auto" }} className='RelateCard  padding'>
     description:
    <br />
     {serviceType?.description}</h3>
      <div style={{marginTop:"10vh"}} className="tableContent">
      <div className="filterContent">
         <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
         
            <TextField onChange={(e)=>{setFillter({...filter,name:e.target.value})}} onKeyPress={handleKeyPress}  fullWidth  color="warning" size="small" id="outlined-basic" label="search" variant="outlined" />
          <div style={{display:"flex",justifyContent:"center",minWidth:"180px"}}>
 <ServiceDialog togelClose={()=>{setUpdate(null)}} update={update} serviceType={serviceType?.id}/>
          </div>
          </div>
    </div>
        <table>
  <thead>
            <tr>
              <th>image</th>
      <th>Name</th>
      <th>description</th>
      <th>price</th>
      <th>action</th>
      </tr>
  </thead>
  <tbody>
        {data?.map((item, index) => {
            return <>
              <tr key={index}>
                <th><img style={{width:"75px"}} src={item?.image?`${imageUrl}${item?.image?.id}/${item?.image?.file_name}`:"HTCcolo.png" } alt="" /></th>
                <th>{item?.name }</th>
              <th style={{width:"40%"}}>{item?.description}</th>
                <th>{item?.price }$</th>
              
      <th>
               {/* <ServiceInWorkShop service={ item?.id} /> */}
     

               <svg onClick={() => {
                setUpdate(item)
                document.getElementById("createService").click()
               }} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.83398 7H6.83398C5.72941 7 4.83398 7.89543 4.83398 9V18C4.83398 19.1046 5.72941 20 6.83398 20H15.834C16.9386 20 17.834 19.1046 17.834 18V15" stroke="#969AA0" stroke-width="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.83398 15.0002H12.834L21.334 6.50023C22.1624 5.6718 22.1624 4.32865 21.334 3.50023C20.5056 2.6718 19.1624 2.6718 18.334 3.50023L9.83398 12.0002V15.0002" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.834 5L19.834 8" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

</th>
          </tr >
         </>
          })}
  </tbody>
    </table>
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
   </div>
  )
}

export default Service
import moment from 'moment';
import  { useEffect, useState } from 'react'
import { UseAxios } from '../../store/constant/url';
import { FormControlLabel, Switch } from '@mui/material';
import DiscountsDialog from './DiscountsDialog';

function Discounts({employee}) {
 const [data, setData] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [total, setTotal] = useState(2);
 const [pagenate, setPagenate] = useState(5);
 const [loading, setLoading] = useState(false);
 const handlebaid = async(id) => {
  await UseAxios({ api: `updateEmployeeMony/${id}`, method: "post", data: { "is_baid": 1 } });
 setData(prevData => prevData.map(item => {
  if (!item.is_baid) {
    return {...item, is_baid: 1};
  } else {
    return item;
  }
}));

  alert("salary paid")
 
 }
  useEffect(() => {
     var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getEmployeeMony?
page=${currentPage}&
${pagenate ? `paginate=${pagenate}&` : ""}
employee_id=${employee}`

   });
   setData(responce.data.data.data);
   setTotal(responce.data?.data?.last_page ?? total)
  setLoading(true) 
     }
    
   getData()
   }, [pagenate, currentPage])
  return (
   <div>
    <div className="tableContent">
     <DiscountsDialog employee={employee } />
      <table>
  <thead>
    <tr>

      <th>amount</th>
      <th>description</th>
      <th>time</th>
          <th>baid</th>
      </tr>
  </thead>
  <tbody>
  
       {data?.map((item, key) => {
        return <><tr key={key}>
     
          <td>{item?.descount}$</td>
          <td>{item?.description}</td>
          
          <td>{moment(item?.start).format("YYYY:MM:DD")}
            ::{moment(item?.end).format("YYYY:MM:DD")}
         </td>
         <td>
            <FormControlLabel control={
                  <Switch
onChange={()=>{!item.is_baid&&handlebaid(item?.id)}}
 checked={item?.is_baid ? true : false} color='warning' sx={{ m: 1 }} />}  />
         
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
  )
}

export default Discounts
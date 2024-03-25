import { useEffect, useState } from "react";
import { UseAxios, imageUrl} from "../../store/constant/url";
import moment from 'moment';
import PropTypes from 'prop-types';
import Loading from "../../Component/Loading";

function CustomersList({togelCustomer}) {
 const [pagenate, setPagenate] = useState(5);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [current, setCurrent] = useState("All");
 const [total, setTotal] = useState(2);
 const [name, setName] = useState();
 const [enter, setEnter] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
  var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getCustomer?
page=${currentPage}&
${current != "All" ? `is_company=${current}` : ""}
${pagenate ? `paginate=${pagenate}` : ""}&
${name ? `search=${name}` : ""}
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
   loading?
         <>
           <div className="filterContent">
     <ul className="selectElement" style={{justifyContent:"start"}}>
     <li onClick={()=>setCurrent("All")} className={current=="All"?"underLine":null} style={{ marginRight: "20px" }}>All</li>
     <li onClick={()=>setCurrent(0)} className={current==0?"underLine":null} style={{marginRight:"20px"}}>Customers</li>
     <li onClick={()=>setCurrent(1)} className={current==1?"underLine":null} style={{marginRight:"20px"}}>Company customer details</li>
     
           </ul>
       
    <hr />
    <div className="filterContent">
     <ul style={{justifyContent:"start"}}>
        <li style={{ marginRight: "20px" }}><input onKeyPress={handleKeyPress} onChange={(e) => {
setName(e.target.value)
        }} type="text" placeholder="Filter By Name" className="filter smallRad" /></li>
     <li><input placeholder="Search" onKeyPress={handleKeyPress}  onChange={(e) => {
setName(e.target.value)
        }} type="text" className="filter smallRad" /></li>
   
     
     </ul>
           </div>
               </div>
    <div className="tableContent">
      <table>
  <thead>
    <tr>
      <th style={{maxWidth:"200px"}}>CUSTOMER</th>
      <th>Phone</th>
      <th>Created</th>
          <th>Actions</th>
      </tr>
  </thead>
  <tbody>
  
       {data?.map((item, key) => {
        return <><tr key={key}>
         <td  >
          <div className="divInsideTable">
        <img style={{width:"50px",height:"50px"}} src={item?.image ? `${imageUrl}${item.image.id}/${item.image.file_name}` : "HTCcolo.png"} alt="" />
           <div>
            <p>{item?.name}</p>
            <p>{item?.user?.email}</p>
           </div>
          </div>
         </td>
         <td>{item?.phone }</td>
        <td>{moment(item?.created_at).format("YYYY:MM:DD")}
         </td>
         <td style={{cursor:"pointer"}} onClick={()=>{togelCustomer(item?.id)}}>
         action
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
         </>
    :<Loading/>}
  
  </>
  )
}
CustomersList.propTypes = {
  togelCustomer: PropTypes.func.isRequired
};
export default CustomersList


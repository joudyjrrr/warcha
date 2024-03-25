import { useEffect, useState } from "react"
import BranchExpensesDialog from "./BranchExpensesDialog";
import { UseAxios } from "../store/constant/url";
import moment from "moment";
function BranchExpenses({branch}) {
 const [data, setData] = useState();
 const [name, setName] = useState("");
 const [pagenate, setPagenate] = useState(5);
 const [currentPage, setCurrentPage] = useState(1);
 const [total, setTotal] = useState(2);
 const [enter, setEnter] = useState(false);
 
   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEnter(!enter);
    }
  };
      useEffect(() => {
  var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getBranchExpens?branch_id=${branch}
${name ? `&description=${name}` : ""}
${pagenate ? `&pagenate=${pagenate}` : ""}

`
   });
   setData(responce.data.data.data);
   setTotal(responce.data?.data?.last_page ?? total)
          }
          
            
   getData()
      
   }, [branch,enter])
  return (
   <div>
    <BranchExpensesDialog branch={branch } />
    
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
      <th style={{maxWidth:"200px"}}>title</th>
      <th>description</th>
      <th>amount</th>
          <th>date</th>
      </tr>
  </thead>
  <tbody>
  
       {data?.map((item, key) => {
        return <><tr key={key}>
       
         <td>{item?.title }</td>
         <td style={{maxWidth:"200px"}}>{item?.description }</td>
         <td>{item?.total_price }$</td>
        <td>{moment(item?.date).format("YYYY:MM:DD")}
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
  )
}

export default BranchExpenses
import { useEffect, useState } from "react";
import { UseAxios, imageUrl} from "../../store/constant/url";
import moment from 'moment';
import PropTypes from 'prop-types';
import Loading from "../../Component/Loading";
import EmployeeDialog from "./EmployeeDialog";
import ShowEmployee from "./ShowEmployee";

function Employees({ branch, workshop }) {

 const [pagenate, setPagenate] = useState(5);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [current, setCurrent] = useState("All");
 const [total, setTotal] = useState(2);
 const [name, setName] = useState();
 const [enter, setEnter] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
  const [employeeType, setEmployeeType] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(false);
   useEffect(() => {
     var responce;
     var employee;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getEmployee?
page=${currentPage}&
${current != "All" ? `employee_type_id=${current}` : ""}
${pagenate ? `paginate=${pagenate}` : ""}&
${name ? `search=${name}` : ""}
${!workshop&&branch ? `branch_id=${branch}` : ""}
${workshop ? `work_shop_id=${workshop}` : ""}
`
   });
   setData(responce.data.data.data);
   setTotal(responce.data?.data?.last_page ?? total)
  setLoading(true) 
     }
     const getEmployee = async () => {
     employee=await UseAxios({
    method: "get", 
       api: `getEmployeeType`
     })
       setEmployeeType(employee.data.data);
     }
     if (employeeType.length==0) {
       getEmployee();
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
       {  currentEmployee!=false?
           <ShowEmployee employee={currentEmployee} togelEmployee={()=>{setCurrentEmployee(false)}} />
: <>
          <div className="filterContent">
     <ul className="selectElement" style={{justifyContent:"start"}}>
     <li onClick={()=>setCurrent("All")} className={current=="All"?"underLine":null} style={{ marginRight: "20px" }}>All</li>
             {employeeType?.map((item, key)=>{
               return <li key={"fsat" + key} onClick={() => setCurrent(key)} className={current == key ? "underLine" : null} style={{ marginRight: "20px" }}>{item?.name }</li>
             
             })}  
          
           </ul>
                 <EmployeeDialog workshop={workshop} branchChose={branch } />
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
    <div className="tableContent">
      <table>
  <thead>
    <tr>
      <th style={{maxWidth:"200px"}}>Employee</th>
      <th>salary</th>
      <th>Address</th>
      <th>shift</th>
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
            <p>{item?.first_name} {item?.last_name}</p>
            <p>{item?.user?.email}</p>
           </div>
          </div>
         </td>
          <td>{item?.salary}{item?.currency?.currency }</td>
         <td>{item?.address }</td>
         <td>{item?.shift?.name }</td>
          
        <td>{moment(item?.created_at).format("YYYY:MM:DD")}
         </td>
         <td style={{cursor:"pointer"}} onClick={()=>{setCurrentEmployee(item?.id);}}>
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
           }</>
    :<Loading/>}
  
  </>
  )
}
Employees.propTypes = {
  togelEmployee: PropTypes.func.isRequired
};
export default Employees


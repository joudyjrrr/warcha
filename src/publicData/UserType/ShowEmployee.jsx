import { useEffect, useState } from "react"
import { UseAxios, imageUrl } from "../../store/constant/url"
import moment from "moment";
import Salary from "./Salary";
import Award from "./Award";
import Discounts from "./Discounts";

function ShowEmployee({employee}) {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(0);
 useEffect(() => {
  const getData = async () => {
  var res=await UseAxios({api:`getEmployeeById/${employee}`,method:"get"})
   setData(res.data.data);
  };
  getData()
 }, [employee])
  return (
   <div>
     <div className="customerInformation">
                      <div className="RightBorder divInsideTable">
         
                    <img src={data?.image?imageUrl+data?.image?.id+"/"+data?.image?.file_name:"HTCcolo.png"} alt="" />
                          <div>
                           <p style={{color:"gray"}}>{data?.first_name} {data?.last_name}</p>
            <p style={{color:"gray"}}>{data?.user?.email}</p>
            <p style={{color:"gray"}}>shift {data?.shift?.name}</p>
                          </div>
       
                      </div>
                      <div className="RightBorder">
                          <p style={{color:"gray"}}>Employee INFORMATION</p>
                          <p style={{color:"gray"}}> &nbsp;{data?.address }</p> 
                          <p style={{color:"gray"}}> &nbsp;{data?.phone }</p> 
                          <p style={{color:"gray"}}>CREATED &nbsp; {moment(data?.created_at).format("YYYY:MM:DD")}</p>
                      </div>
                      <div className="RightBorder">
                          <p style={{color:"gray"}}>Public Information</p>
                    {data?.branch_name?<p style={{color:"gray"}}>Branch &nbsp;{data?.branch_name?.name }</p>:<p style={{color:"gray"}}>Work Shop &nbsp;{data?.work_shop?.name }</p>}  
                      
                      <p style={{color:"gray"}}> type &nbsp;{data?.employee_type?.name }</p>
          <p style={{ color: "gray" }}>salary  &nbsp;{data?.salary}{data?.currency?.currency }</p>
                      </div>
                      
                  </div>
                
      <hr className="hr" />
        <div className="filterContent">
        <ul className="selectElement" style={{ justifyContent: "start" }}>
          <li  onClick={() => setCurrent(0)} className={current == 0 ? "underLine" : null} style={{ marginRight: "20px" }}>salary</li>
          <li  onClick={() => setCurrent(1)} className={current == 1 ? "underLine" : null} style={{ marginRight: "20px" }}>Award</li>
          <li  onClick={() => setCurrent(2)} className={current == 2 ? "underLine" : null} style={{ marginRight: "20px" }}>Discounts and vacations</li>
        </ul>
      </div>
      {current == 0 && <Salary employee={employee} />}
      {current == 1 && <Award employee={employee} />}
      {current == 2 && <Discounts employee={employee} />}
    </div>
    
  )
}

export default ShowEmployee
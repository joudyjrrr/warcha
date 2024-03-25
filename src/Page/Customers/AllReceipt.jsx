import { useEffect, useState } from "react"

import Loading from "../../Component/Loading";
import { UseAxios, imageUrl } from "../../store/constant/url";
import CustomerCarDialog from "./CustomerCarDialog";
import QRCode from "qrcode.react";
import moment from "moment";


const AllReceipt = ({customer}) => {
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const getData = async () => {
    try {
    
      const response = await UseAxios({
        method: "GET",
        api: `getReceipt?customer_id=${customer}`
      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        setData(response.data.data.data);
   setLoading(true)
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    getData();
}, [setData]); // هنا نقوم بتتبع تغييرات قيمة data

  return (
    <div className="tableContent">
      <CustomerCarDialog customer={customer} />
    <div >
      </div>
      
      {loading ?
        <table>
  <thead>
            <tr>
      <th>branch</th>
      <th>amount</th>
      <th>bar_code</th>
      <th>date</th>
      <th>node</th>
      </tr>
  </thead>
  <tbody>
        {data.map((item, index) => {
            return <>
              <tr key={index}>
                <th>{item?.branch?.name }</th> 
                <th>{item?.amount }$</th> 
                <th> <QRCode  value={item?.bar_code}/></th> 
                <th>{moment(item?.created_at).format("YYYY:MM:DD")}
            
            <span style={{fontSize:"15px",color:"gold"}}>{moment(item?.created_at).format("HH:mm")}</span></th>
              <th>{item?.node }</th> 
      
              </tr >
         </>
          })}
  </tbody>
    </table>:<div style={{maxWidth:"400px",margin:"0 auto"}}><Loading/></div>}
   
   
   </div>
  )
}

export default AllReceipt
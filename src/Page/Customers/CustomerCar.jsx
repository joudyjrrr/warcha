import { useEffect, useState } from "react"

import Loading from "../../Component/Loading";
import { UseAxios, imageUrl, target } from "../../store/constant/url";
import CustomerCarDialog from "./CustomerCarDialog";
import CryptoJS from 'crypto-js';

const CustomerCar = ({customer}) => {
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
const secretKey ="mhdnourmnini";

  const getLink = (id) => {
  return  encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), secretKey).toString())
};
  useEffect(() => {
  const getData = async () => {
    try {
    
      const response = await UseAxios({
        method: "GET",
        api: `getCar?customer_id=${customer}`
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
      <th>image</th>
      <th>Name</th>
      <th>type</th>
      <th>model</th>
      <th>color</th>
      <th>car_number</th>
      <th>vin</th>
      <th>meter_number</th>
      <th>first_cheack</th>
      <th >action</th>
      </tr>
  </thead>
  <tbody>
        {data.map((item, index) => {
            return <>
              <tr key={index}>
                <th><img style={{width:"50px"}} src={imageUrl+ item?.image?.id+"/"+item?.image?.file_name } alt="" /></th>
                <th>{item?.name }</th> 
                <th>{item?.type }</th> 
                <th>{item?.model }</th> 
                <th><input type="color" value={item?.color } readOnly  disabled/></th> 
                <th>{item?.car_number }</th> 
                <th>{item?.vin }</th> 
                <th>{item?.meter_number }</th> 
                <th style={{width:"300px"}}>{item?.first_cheack }</th> 
                <th style={{ cursor: "pointer" }} ><a title="more information" name="more" target="_blank" href={`${target}carInformation/car/${getLink(item?.id)}`}>more</a></th> 
      
              </tr >
         </>
          })}
  </tbody>
    </table>:<div style={{maxWidth:"400px",margin:"0 auto"}}><Loading/></div>}
   
   
   </div>
  )
}

export default CustomerCar
import { useEffect, useState } from "react"

import Loading from "../../Component/Loading";
import { UseAxios, imageUrl } from "../../store/constant/url";
import { useNavigate } from "react-router-dom";
import CarCollectionDialog from "./CarCollectionDialog";

const CarCollection = () => {
 const [openAdd, setOpenAdd] = useState(false);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [CarCompany, setCarCompany] = useState([]);
  
  const nav = useNavigate();
  
 
  useEffect(() => {
  const getData = async () => {
    try {
    
      const response = await UseAxios({
        method: "GET",
        api: `getCarCollection`
      })
      console.log('Response status code:', response.status);

      if (response.status === 200) {
        setData(response.data.data);
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
    <CarCollectionDialog/>
    <div >
      </div>
      
      {loading ?
        <table>
  <thead>
            <tr>
      <th>image</th>
      <th>Name</th>
      <th>company</th>
      <th>model</th>
      <th>motor_cc</th>
      <th>horsepower</th>
              
      <th >action</th>
      </tr>
  </thead>
  <tbody>
        {data.map((item, index) => {
            return <>
              <tr key={index}>
                               <th><img style={{width:"100px"}} src={item?.image?`${imageUrl}${item?.image?.id}/${item?.image?.file_name}`:"HTCcolo.png" } alt="" /></th>
                <th>{item?.name }</th> 
                <th>{item?.car_company?.name }</th> 
                <th>{item?.model }</th> 
                <th>{item?.motor_cc }</th> 
                <th>{item?.horsepower }</th> 
                <th style={{cursor:"pointer"}} onClick={()=>{nav("/ProductRef", { state: { CarCollection: item.id } })}}>handle</th> 
          </tr >
         </>
          })}
  </tbody>
    </table>:<div style={{maxWidth:"400px",margin:"0 auto"}}><Loading/></div>}
   
   
   </div>
  )
}

export default CarCollection
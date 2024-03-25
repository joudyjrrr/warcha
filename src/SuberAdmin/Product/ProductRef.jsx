import { useLocation } from 'react-router-dom';
import { UseAxios, imageUrl } from "../../store/constant/url";
import moment from 'moment';
import Product from './Product';
import { useEffect, useState } from 'react';


function ProductRef() {
    const location = useLocation();
  var CarCollection= useState(location.state && location.state.CarCollection)
    const [oldCar, setOldCar] = useState([]);
    const [loading, setLoading] = useState();
    useEffect(() => {
        const getData = async () => {
            const responce =await UseAxios({api:
`getProductRefSelected/${CarCollection}`,method:"get"});
            setOldCar(responce.data.data);
            setLoading(true)
        }
        getData();
    }, [location])
  return (
   <div>
    <div className="customerInformation">
                      <div className="RightBorder divInsideTable">
         
                    <img src={CarCollection?.image?imageUrl+CarCollection?.image?.id+"/"+CarCollection?.image?.file_name:"HTCcolo.png"} alt="" />
                          <div>
                           <p style={{color:"gray"}}>{CarCollection?.name}</p>
                           <p style={{color:"gray"}}>model:{CarCollection?.model}</p>
                           <p style={{color:"gray"}}>motor_cc:{CarCollection?.motor_cc}</p>
       <p style={{ color: "gray" }}>horsepower:{CarCollection?.horsepower}</p>
                          <p style={{color:"gray"}}>CREATED &nbsp; {moment(CarCollection?.created_at).format("YYYY:MM:DD")}</p>
       
                          </div>
       
                      </div>
                      <div className="RightBorder">
      <p style={{ color: "gray" }}>COMPANY INFORMATION</p>
         
      <img style={{width:"75px",height:"75px"}} src={CarCollection?.car_company?.image ?
       `${imageUrl}${CarCollection?.car_company?.image?.id}/${CarCollection?.car_company?.image?.file_name}` : "HTCcolo.png"} alt="" />

                          <p style={{color:"gray"}}>name &nbsp;{CarCollection?.car_company?.name }</p> 
                          <p style={{color:"gray"}}>country &nbsp;{CarCollection?.car_company?.country }</p> 
                      </div>
                      <div className="RightBorder">
                          <p style={{color:"gray"}}>CAR TYPE INFORMATION</p>
                          <p style={{color:"gray"}}>gear &nbsp;{CarCollection?.car_type?.gear }</p> 
                          <p style={{color:"gray"}}>fuel &nbsp;{CarCollection?.car_type?.fuel }</p> 
                      </div>
                   
                  </div>
   {loading&& <Product currentCar={oldCar}   />}
   </div>
  )
}

export default ProductRef
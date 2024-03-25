import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UseAxios, imageUrl } from '../store/constant/url';
import Loading from '../Component/Loading';
import Chat from '../Component/Chat';
import Employees from '../publicData/UserType/Employees';
import ProductInStore from './ProductInStore';
import ProductInFormBranch from './ProductInFormBranch';
import WorkShopExpenses from './WorkShopExpenses';


function WorkShop() {
    const location = useLocation();
 var workshop = location.state && location.state.workshop;
 console.log(workshop);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [relate, setRelate] = useState([]);
    const [current, setCurrent] = useState("All");
    useEffect(() => {
        if (workshop) {
               const fetchData = async () => {
            try {
                const charts = await UseAxios({
                    method: "GET",
                    api: `getWorkshopRelate/${workshop}`
                });
                
                const response = await UseAxios({
                    method: "GET",
                    api: `getWorkShopById/${workshop}`
                });
                
                console.log('Response status code:', response.status);
                
                if (response.status === 200) {
                    setData(response.data.data);
                    setRelate(charts.data.data);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        } else {
           const fetchData = async () => {
            try {
              
                
                const response = await UseAxios({
                    method: "GET",
                    api: `getworkshop`
                });
                
               
                
                if (response.status === 200) {
                   
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        }
     
    }, [workshop]);

    return (
        <>
            {loading ? (
                <>
                    <div className="filterContent">
                     <ul className="selectElement" style={{justifyContent:"center"}}>
     <li onClick={()=>setCurrent("All")} className={current=="All"?"underLine":null} style={{ marginRight: "20px" }}>GENERAL</li>
     <li onClick={()=>setCurrent(0)} className={current==0?"underLine":null} style={{marginRight:"20px"}}>EMPLOYEES</li>
     <li onClick={()=>setCurrent(1)} className={current==1?"underLine":null} style={{marginRight:"20px"}}>PRODUCTS</li>
     <li onClick={()=>setCurrent(2)} className={current==2?"underLine":null} style={{marginRight:"20px"}}>ORDERS FROM BRANCH</li>
     {/* <li onClick={() => setCurrent(3)} className={current == 3 ? "underLine" : null} style={{ marginRight: "20px" }}>INTER workshop TRANSACTIONS</li> */}
     <li onClick={()=>setCurrent(6)} className={current==6?"underLine":null} style={{marginRight:"20px"}}>workshop EXPENSES</li>                   
                        </ul>
                        </div>
                    {current == "All" &&<>
 <div style={{marginBottom:"4%", display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
         <h3 className='RelateCard   padding'>{data?.location?.name }</h3>
         <h3 className='RelateCard  padding'>{data?.name }</h3>
                   <h5 className='RelateCard padding'>
  {data?.get_admin?.workshop_admin?.first_name} {data?.get_admin?.workshop_admin?.last_name}
  <img style={{width:"75px",borderRadius:"50%"}}
    src={
      data?.get_admin?.workshop_admin?.image
        ? `${imageUrl}${data?.get_admin?.workshop_admin?.image?.id}/${data?.get_admin?.workshop_admin?.image?.file_name}`
        : "/149071.png"
    }
    alt=""
  />
</h5>

                    </div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <img style={{ width: "30%" }}
                             src={
      data?.image
        ? `${imageUrl}${data?.image?.id}/${data?.image?.file_name}`
        : "/HTCcolo.png"
    }
                     alt="" />
                    </div>
                    <div  className="dateRegection">
                        <h3>Sales Analytic</h3>
                        <div>
                            <h5>start <input  type="date" className='filterSmall smallRad' /></h5>
                            <h5>End <input  type="date" className='filterSmall smallRad' /></h5>
                        </div>
                    </div>
                    {/* <OrdarState  
                        accebted={relate.filter(item => item.status === "approved")} 
                        waiting={relate.filter(item => item.status === "waiting")} 
                        rejected={relate.filter(item => item.status === "reject")} 
                    /> */}
                 
                    <Chat api={`getWorkshopChart/${workshop}`} />
                        </>
        }
        {current == 0 &&
                        <Employees branch={data?.branch_id} workshop={workshop } />
                    }   
                    {current == 1 &&
                        <ProductInStore workshop={workshop } />
                    }         
                    {current == 2 &&
                        <ProductInFormBranch workshop={workshop } />
                    } 
               {current == 6 &&
                        <WorkShopExpenses workshop={workshop } />
                     }                      
                </> 
            ) : (
                <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>
            )}
        </>
    );
}

export default WorkShop;

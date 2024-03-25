import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UseAxios, imageUrl } from '../store/constant/url';
import Loading from '../Component/Loading';
import Chat from '../Component/Chat';
import OrdarState from '../Component/OrdarState/OrdarState';
import ProductBranch from '../SuberAdmin/Product/ProductBranch';
import OrderMangment from '../Page/OrderMangment/OrderMangment';
import Employees from '../publicData/UserType/Employees';
import BranchExpenses from './BranchExpenses';
import FastSell from './FastSell';
import NewOrder from '../Order/NewOrder/NewOrder';
import WorkShopOrders from './WorkShopOrders';

function Branch() {
    const location = useLocation();
    var branch=location.state && location.state.branch;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [relate, setRelate] = useState([]);
    const [current, setCurrent] = useState("All");
    useEffect(() => {
        if (branch) {
               const fetchData = async () => {
            try {
                const charts = await UseAxios({
                    method: "GET",
                    api: `getBranchRelate/${branch}`
                });
                
                const response = await UseAxios({
                    method: "GET",
                    api: `getBranchById/${branch}`
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
                    api: `getBranch`
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
     
    }, [branch]);

    return (
        <>
            {loading ? (
                <>
                    <div className="filterContent">
                     <ul className="selectElement" style={{justifyContent:"center"}}>
     <li onClick={()=>setCurrent("All")} className={current=="All"?"underLine":null} style={{ marginRight: "20px" }}>GENERAL</li>
     <li onClick={()=>setCurrent(0)} className={current==0?"underLine":null} style={{marginRight:"20px"}}>EMPLOYEES</li>
     <li onClick={()=>setCurrent(1)} className={current==1?"underLine":null} style={{marginRight:"20px"}}>PRODUCTS</li>
     <li onClick={()=>setCurrent(2)} className={current==2?"underLine":null} style={{marginRight:"20px"}}>ORDERS</li>
     <li onClick={() => setCurrent(3)} className={current == 3 ? "underLine" : null} style={{ marginRight: "20px" }}>Order From Supplier</li>
     <li onClick={() => setCurrent(4)} className={current == 4 ? "underLine" : null} style={{ marginRight: "20px" }}>WorkShop Orders</li>
    
                            <li onClick={() => setCurrent(6)} className={current == 6 ? "underLine" : null} style={{ marginRight: "20px" }}>BRANCH EXPENSES</li>                   
     <li onClick={()=>setCurrent(7)} className={current==7?"underLine":null} style={{marginRight:"20px"}}>FAST SELL</li>                   
      
                        </ul>
                        </div>
                    {current == "All" &&<>
 <div style={{marginBottom:"4%", display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
         <h3 className='RelateCard   padding'>{data?.location?.name }</h3>
         <h3 className='RelateCard  padding'>{data?.name }</h3>
                   <h5 className='RelateCard padding'>
  {data?.get_admin?.branch_admin?.first_name} {data?.get_admin?.branch_admin?.last_name}
  <img style={{width:"75px",borderRadius:"50%"}}
    src={
      data?.get_admin?.branch_admin?.image
        ? `${imageUrl}${data?.get_admin?.branch_admin?.image?.id}/${data?.get_admin?.branch_admin?.image?.file_name}`
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
                    <OrdarState  
                        accebted={relate.filter(item => item.status === "approved")} 
                        waiting={relate.filter(item => item.status === "waiting")} 
                        rejected={relate.filter(item => item.status === "reject")} 
                    />
                 
                    <Chat api={`getBranchChart/${branch}`} />
                        </>
} {current == 0 &&
                        <Employees branch={branch } />
                    }   
                    {current == 1 &&
                        <ProductBranch branch={branch } />
                    }         
                    {current == 2 &&
                        <OrderMangment branch={branch } />
                    } 
                    {/* WorkShopMonyInfo */}
                       {current == 3&&
                        <NewOrder branch={branch } />
                    } 
                       {current == 4&&
                        <WorkShopOrders branch={branch } />
                    } 
               {current == 6 &&
                        <BranchExpenses branch={branch } />
                    } 
 {current == 7 &&
                        <FastSell branch={branch } />
                    }  
                    
                </> 
            ) : (
                <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>
            )}
        </>
    );
}

export default Branch;

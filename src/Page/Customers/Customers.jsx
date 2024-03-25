import { useEffect, useState } from "react"
import OrderMangment from "../OrderMangment/OrderMangment"
import CustomersList from "./CustomersList";
import CustomerDialog from "./CustomerDialog";
import CustomerDialogCompany from "./CustomerDialogCompany";
import { UseAxios, imageUrl } from "../../store/constant/url";
import moment from "moment";
import CustomerCar from "./CustomerCar";
import ReceiptDialog from "./ReceiptDialog";
import AllReceipt from "./AllReceipt";
function Customers() {
    const [data, setData] = useState();
    const [customer, setCustomer] = useState(0);
    const [customerPage, setCustomerPage] = useState(0);
      useEffect(() => {
  var responce;
  const getData = async () => {
   responce = await UseAxios({
    method: "get", 
    api: `getCustomerInformation/${customer}?
`
   });
   setData(responce.data.data);
          }
          if (customer!=0) {
            
   getData()
          }
   }, [customer])
  return (
   <div>
    {customer == 0 ? 
     <>
                  <CustomerDialog />
                  <CustomerDialogCompany/>
      <CustomersList togelCustomer={setCustomer} />
     </>
 :
     <>
                  <div className="customerInformation">
                      <div className="RightBorder divInsideTable">
         
                    <img src={data?.image?imageUrl+data?.image?.id+"/"+data?.image?.file_name:"HTCcolo.png"} alt="" />
                          <div>
                           <p style={{color:"gray"}}>{data?.name}</p>
            <p style={{color:"gray"}}>{data?.user?.email}</p>
                          </div>
       
                      </div>
                      <div className="RightBorder">
                          <p style={{color:"gray"}}>CUSTOMER INFORMATION</p>
                          <p style={{color:"gray"}}>LOCATION &nbsp;{data?.address }</p> 
                          <p style={{color:"gray"}}>PHONE &nbsp;{data?.phone }</p> 
                          <p style={{color:"gray"}}>Financial account &nbsp;{data?.money}$</p> 
                          <p style={{color:"gray"}}>CREATED &nbsp; {moment(data?.created_at).format("YYYY:MM:DD")}</p>
                      </div>
                      {data?.driver_name && <div className="RightBorder">
                          <p style={{color:"gray"}}>DRIVER INFORMATION</p>
                      <p style={{color:"gray"}}>DRIVER NAME &nbsp;{data?.driver_name }</p>
                      <p style={{color:"gray"}}>DRIVER PHONE &nbsp;{data?.driver_phone }</p>
                      <p style={{color:"gray"}}>DRIVER ADDRESS &nbsp;{data?.driver_address }</p>
                      </div>}
                      <div>
                          <div>
                              <h6 style={{color:"gold"}}>total orders</h6>
                              <p style={{color:"gray"}}>{data?.total_order[0]?.total_orders||0 }</p>
                          </div>
                          <div>
                             <h6 style={{color:"gold"}}>CREATED</h6>
                              <p style={{color:"gray"}}>
                            {data?.total_order[0]?.total_orders-data?.total_order[0]?.rejected_orders||0 }  
                              </p>
                          </div>
                          <div>
                             <h6 style={{color:"gold"}}>REJECTED</h6>
                               <p style={{color:"gray"}}>{data?.total_order[0]?.rejected_orders||0 }</p>
                          </div>
                      </div>
                  </div>
                   <div className="filterContent">
               <ul className="selectElement" style={{justifyContent:"start"}}>
     <li onClick={()=>setCustomerPage(0)} className={customerPage==0?"underLine":null} style={{ marginRight: "20px" }}>Order Mangment</li>
     <li onClick={()=>setCustomerPage(1)} className={customerPage==1?"underLine":null} style={{ marginRight: "20px" }}>Customer Cars</li>
     <li onClick={()=>setCustomerPage(2)} className={customerPage==2?"underLine":null} style={{ marginRight: "20px" }}>ALL Receipt</li>
     
                  <ReceiptDialog customer={customer}/>
                      </ul>  
                      </div>
                  <hr className="hr" />
                  {customerPage == 0 && <OrderMangment customer_id={customer} />}
                  {customerPage == 1 && <CustomerCar customer={customer} />}
                  {customerPage == 2 && <AllReceipt customer={customer} />}
</>
     
    }
 
   </div>
  )
}

export default Customers
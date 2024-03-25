import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UseAxios, imageUrl } from '../store/constant/url';
import { useSelector } from 'react-redux';
import { Button, Col, FormSelect, Row } from 'react-bootstrap';
import Loading from '../Component/Loading';
import moment from 'moment';
import { Snackbar } from '@mui/material';
function OrderDetails() {
    const location = useLocation();
 const nav = useNavigate();
 var order = location.state.order
   const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
  const money = useSelector((state) => state.money);
  const [open, setOpen] = useState();
  const [select, setSelect] = useState(1);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [deleteThis, setDeleteThis] = useState(false);
  const sendDelete = async () => {
    await UseAxios({ method: "Delete", api: `deleteOrder/${order}` });
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    nav("/")
  }, 3000);
  }
  const sendOrder = async () => {
    await UseAxios({ method: "Post", api: `accebtBuyOrder/${order}` });
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    nav("/")
  }, 3000);
  }
  const handelDelete = () => {
    console.log(deleteThis);
    return <div  className='addDialogContent'>
      <div style={{ minWidth: "300px",padding:"3%" }} className="smallRad addDialog">
        {deleteThis ?
        <h3 style={{marginBottom:"8vh"}}>There is no undo option for deleting the order</h3>
          :
          <h3 style={{ marginBottom: "8vh" }}>Send Order At Supplier :{data?.supplier?.name}</h3>
          
}
        {deleteThis ? <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0" }}>
     <Button onClick={()=>{setDeleteOrder(!deleteOrder)}} disabled={!loading} className="buttonHover" style={{ width: "40%",  background: "#f5c02e", border: "none", padding: "1%" }}>{!loading?"loading..":"Cansel" }</Button>
     <Button onClick={()=>{sendDelete()}} disabled={!loading} className="deleteHover" style={{ width: "40%",  background: "red", border: "none", padding: "1%" }}>{!loading?"loading..":"Delete Order" }</Button>
      
        </div> :
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"0"}}>
     <Button onClick={()=>{setDeleteOrder(!deleteOrder)}} disabled={!loading} className="buttonHover" style={{ width: "40%",  background: "#f5c02e", border: "none", padding: "1%" }}>{!loading?"loading..":"Cansel" }</Button>
     <Button onClick={()=>{sendOrder()}} disabled={!loading} className="buttonHover" style={{ width: "40%",  background: "gray", border: "none", padding: "1%" }}>{!loading?"loading..":"Send Order" }</Button>
      
        </div>
}
      </div>
    </div>
  
  }
 useEffect(() => {
 const feachData = async () => {
  
   const res =await UseAxios({ method: "get", api: `getBuyById/${order}` });
   setData(res.data.data);
   setLoading(true);
  }
  feachData();
 }, [loading])
  return (
    <div>
       <Row style={{display:"flex",alignItems:"center", width:"50%",margin:"20px auto"}}>
           
              <Col >
                          <FormSelect onChange={(e) => {setSelect(e.target.value) }} >
  {money?.money?.map((element, index) => (
    <option title={element.dollar_price} value={element.dollar_price}  key={index}>{element.currency }</option>
  ))}
</FormSelect>
            </Col>
             <Col>
            <h6> أختر العملة</h6>
            </Col>
      </Row>
       <h3 style={{marginLeft:"25px"}} className="selectedCardFont">Order Details</h3>
      
     <div key={"252fa"} style={{width:"80%",textAlign:"center",margin:"5% auto"}} className='RelateCardGrop '>
       <div style={{display:"flex",justifyContent:"space-around"}}>
       <h3 className="selectedCardFont">{data?.title}</h3>
       <h5 className="selectedCardFont">{data?.supplier?.name}</h5>
       </div>
                     <p className="longText" style={{maxWidth:"90%"}} key={"gaegea"} >{ data?.description}</p>
       <p  >{data?.name}</p>
       <div className="contentGroup">
        <div className="RelateCard">
         <p>total price</p>
         <h3>{(data?.total_price*select).toFixed() }</h3>
        </div>
          <h5 className="selectedCardFont">{moment(data.created_at).format("YYYY:MM:DD")}
            
            <span style={{fontSize:"12px",color:"gray"}}>{moment(data.created_at).format("HH:mm")}</span></h5>
       
        <div className="RelateCard">
        <p>total expence</p>
        
         <h3>{(data?.total_expence*select).toFixed()}</h3>
        </div>
         
        
       </div>
      </div>
       <h3 style={{marginLeft:"25px"}} className="selectedCardFont">Order Content</h3>
      
      {
      loading ?
        data?.buy_by_id.map((item, index) => {
          return  <div key={index} style={{width:"80%",textAlign:"center",margin:"5% auto"}} className='RelateCardGrop '>
       <div style={{display:"flex",justifyContent:"space-around"}}>
              <h5 className="selectedCardFont">{item?.product_name.name}</h5>
              <img style={{width:"100px"}} src={item?.product_name?.main_image?`${imageUrl}${item?.product_name?.main_image?.id}/${item?.product_name?.main_image?.file_name}`:"HTCcolo.png"} alt="" />
       </div>
        <p className="longText" style={{maxWidth:"90%"}} key={"gaegea"} ><span className="selectedCardFont">Node:</span>{ item?.node??"no node"}</p>
      
       <div className="contentGroup">
        <div className="RelateCard">
        <p>Count:</p>
        
         <h3>{(item?.count)}</h3>
        </div>
         <h3 style={{fontSize:"18px"}}> Overall Price with added costs</h3>
              
       <div className="RelateCard">
         <p>one price</p>
         <h3>{(item?.one_price*select).toFixed(2) }</h3>
              </div>
        
         
        
       </div>
                 </div>
          
        })
          
:
                <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>
        
      }
     <h3 style={{marginLeft:"25px"}} className="selectedCardFont">Order Expense</h3>
      {
      loading &&
        data?.buy_expense.map((item, index) => {
          return  <div key={index} style={{width:"80%",textAlign:"center",margin:"5% auto"}} className='RelateCardGrop '>
       <div style={{display:"flex",justifyContent:"space-around"}}>
       <h5 className="selectedCardFont">{item?.title}</h5>
       </div>
                
                     <p className="longText" style={{maxWidth:"90%"}} key={"gaegea"} >{ item?.description??"no description"}</p>
            
       <div className="contentGroup">
        <div className="RelateCard">
        <p>cost:</p>
        
         <h3>{(item?.cost)*select}</h3>
        </div>
         
        
       </div>
                 </div>
          
        })
          

        
      }
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <Button onClick={() => { setDeleteOrder(!deleteOrder); setDeleteThis(false)}} disabled={!loading} className="buttonHover" style={{ width: "40%", marginBottom: "4vh", background: "#f5c02e", border: "none", padding: "1%" }}>{!loading?"loading..":"Send Order" }</Button>
     <Button onClick={()=>{setDeleteOrder(!deleteOrder); setDeleteThis(true)}} disabled={!loading} className="deleteHover" style={{ width: "40%", marginBottom: "4vh", background: "red", border: "none", padding: "1%" }}>{!loading?"loading..":"Delete Order" }</Button>
      
      </div>
      {deleteOrder && handelDelete()}
        <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    message={deleteThis?"Order Deleted":"Order Sended"}
    open={open}
    key={"bottom" + "left"}
   />
    </div>
      
  )
}

export default OrderDetails
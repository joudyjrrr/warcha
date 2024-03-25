import { useEffect, useState } from "react"
import { UseAxios } from "../store/constant/url";
import Loading from "../Component/Loading";
import { Button, Col, FormSelect, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

function AccebtOrder() {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(false);
  const money = useSelector((state) => state.money);
  const [select, setSelect] = useState(1);
  const [open, setOpen] = useState();
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [order, setOrder] = useState();
 const nav = useNavigate();
 const [page, setPage] = useState(1);
 var lastpage=1
 const handelMore = async () => {
  setLoading(false);
  setPage(page+1)
  console.log(page);
  console.log(lastpage);
  }
   const sendOrder = async () => {
    await UseAxios({ method: "Post", api: `addToStore/${order}` });
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    nav("/")
  }, 3000);
  }
   const handelAccebt = () => {
    return <div  className='addDialogContent'>
      <div style={{ minWidth: "300px",padding:"3%" }} className="smallRad addDialog">
        <h3 style={{marginBottom:"8vh"}}>Add Order To Store</h3>
         <h5>The invoice total will be added to the supplier account</h5>
         <h5>The products will be added to the inventory.</h5>
       
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"0"}}>
     <Button onClick={()=>{setDeleteOrder(!deleteOrder)}} disabled={!loading} className="buttonHover" style={{ width: "40%",  background: "#f5c02e", border: "none", padding: "1%" }}>{!loading?"loading..":"Cansel" }</Button>
     <Button onClick={()=>{sendOrder()}} disabled={!loading} className="buttonHover" style={{ width: "40%",  background: "gray", border: "none", padding: "1%" }}>{!loading?"loading..":" Add To Store" }</Button>
      
        </div>
      </div>
    </div>
  
  }
 useEffect(() => {
  const feachData = async () => {
  
   const res =await UseAxios({ method: "get", api: `getBuyAccebted?page=${page}` });
   setData(res.data.data.data);
   lastpage = res.data.data.last_page??lastpage;
   setLoading(true);
  }
  feachData();
 }, [page])
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
     {loading?data.map((item, index) => {
      return <div key={index} style={{width:"80%",textAlign:"center",margin:"5% auto"}} className='RelateCardGrop '>
       <div style={{display:"flex",justifyContent:"space-around"}}>
       <h3 className="selectedCardFont">{item?.title}</h3>
       <h5 className="selectedCardFont">{item?.supplier?.name}</h5>
       </div>
                     <p className="longText" style={{maxWidth:"90%"}} key={index} >{ item?.description}</p>
       <p  >{item?.name}</p>
       <div className="contentGroup">
        <div className="RelateCard">
         <p>total price</p>
         <h3>{(item?.total_price*select).toFixed() }</h3>
        </div>
          <Button
            set
            onClick={() => { setOrder(item?.id);setDeleteOrder(true) }}
         className="buttonHover" style={{ background: "#f5c02e", border: "none", padding: "1%" }}>Add To Store</Button>
        <div className="RelateCard">
        <p>total expence</p>
        
         <h3>{(item?.total_expence*select).toFixed()}</h3>
        </div>
         
        
       </div>
                 </div>
     }) :
                <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>

    }
    {lastpage > page &&
     <Button onClick={handelMore} disabled={!loading} className="buttonHover" style={{ width: "100%", marginBottom: "4vh", background: "#f5c02e", border: "none", padding: "1%" }}>{!loading?"loading..":"More Result" }</Button>
      }
       <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    message={"Order Added To Store"}
    open={open}
    key={"bottom" + "left"}
      />
      {deleteOrder&&handelAccebt()}
   </div>
  )
}

export default AccebtOrder
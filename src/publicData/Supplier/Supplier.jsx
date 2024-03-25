import { useEffect, useRef, useState } from "react"
import {  FormControl, } from "react-bootstrap"
import { UseAxios, imageUrl } from "../../store/constant/url"
import { Snackbar } from "@mui/material"
import Loading from "../../Component/Loading"
import SupplierDialog from "./SupplierDialog"


function Supplier() {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState();
 const [open, setOpen] = useState(false);
 const [index, setIndex] = useState(-1)
  const refs = useRef(null);
  const [LastChangeTime, setLastChangeTime] = useState(5);
 const [filter, setFillter] = useState();
    useEffect(() => {
    // عندما يتغير الفلتر، قم بتحديث زمن آخر تغيير
    setLastChangeTime(Date.now());
  }, [filter]);
 
 useEffect(() => {
    const handleClickOutside = (event) => {
      if (refs.current && !refs.current.contains(event.target)) {
        setIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 const handleUpdate = (e) => {
   e.preventDefault();
   console.log();
   UseAxios({ method: "post", api: `updateSupplier/${data[index].id}`, data: { name: data[index].name,phone:data[index].phone,address:data[index].address } })
  setOpen(true)   
  setTimeout(() => {
      location.reload();
     }, 2000);     
 }
 useEffect(() => {
   const feachDate = async () => {
    console.log(filter);
try {
  const res = await UseAxios({
    method: "get", api: `getSupplier
?${filter?.name ? `?name=${filter.name}` : ""}
${filter?.phone ? `&phone=${filter.phone}` : ""}
${filter?.address ? `&address=${filter.address}` : ""}
` })

 setData(res.data.data.data);
 setLoading(true);
} catch (error) {
 console.log(error);
}  
   }
   if (LastChangeTime) {
     const elapsedTime = Date.now() - LastChangeTime;
     const delay = elapsedTime > 5000 && LastChangeTime == 5 ? 2000 : 5000 - elapsedTime;
  
     setTimeout(() => {
       feachDate();
    
     }, delay);
   }
 }, [loading,filter])
  return (
   <>
    <SupplierDialog />
    {loading ?
        <div className="tableContent">
        
           <div className="filterContent">
     <ul>
     <li style={{marginRight:"2%"}}><h6>Name</h6><input onChange={(e)=>{setFillter({...filter,name:e.target.value})}} type="text" className="filter smallRad" /></li>
        
         
     </ul>
    </div>
      <table ref={refs} style={{textAlign:"center"}}>
  <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>phone</th>
                <th>Address</th>
                <th>Opening Balance</th>
                <th>Current balance</th>
                <th>action</th>
         
      </tr>
  </thead>
  <tbody >
        {data.map((item, indexof) => {
            return <>
              <tr key={indexof}>
                <th><img style={{width:"50px"}} src={item?.image?`${imageUrl}${item?.image?.id}/${item?.image?.file_name}`:"149071.png"} alt="" /></th>
              <th>
               {index == indexof ?
     <FormControl onChange={(e)=>{data[index].name=e.target.value}}  style={{textAlign:"center"}} defaultValue={item?.name} type="text" required/>
       :item?.name
 }
                </th>
                 <th>
               {index == indexof ?
     <FormControl onChange={(e)=>{data[index].phone=e.target.value}}  style={{textAlign:"center"}} defaultValue={item?.phone} type="number" required/>
       :item?.phone
 }
                </th>
                   <th>
               {index == indexof ?
     <FormControl onChange={(e)=>{data[index].address=e.target.value}}  style={{textAlign:"center"}} defaultValue={item?.address} type="text" required/>
       :item?.address
 }
                </th>
                   <th>
               {index == indexof ?
                    <>
             <FormControl readOnly value={item?.opening_balance}   type="number" required/>
                    </>
     
                    : (item?.opening_balance+"$")
 }
                </th>
                     <th>
               {index == indexof ?
                    <>
             <FormControl readOnly value={item?.money}   type="number" required/>
                    </>
     
                    : item?.money+"$"
 }
               </th>
      <th>
        
                  <svg onClick={(e)=>{index==indexof?handleUpdate(e):setIndex(indexof)}}  width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 7H6.25C5.14543 7 4.25 7.89543 4.25 9V18C4.25 19.1046 5.14543 20 6.25 20H15.25C16.3546 20 17.25 19.1046 17.25 18V15" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.25 15H12.25L20.75 6.49998C21.5784 5.67156 21.5784 4.32841 20.75 3.49998C19.9216 2.67156 18.5784 2.67156 17.75 3.49998L9.25 12V15" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.25 5L19.25 8" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

</th>
          </tr >
         </>
          })}
  </tbody>
      </table>
      </div>
     : <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>}
     <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    message="success"
    open={open}
    key={"bottom" + "left"}
   />
   </>
  )
}

export default Supplier
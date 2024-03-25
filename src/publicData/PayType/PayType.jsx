import { useEffect, useRef, useState } from "react"
import {  FormControl} from "react-bootstrap"
import { UseAxios } from "../../store/constant/url"
import { Snackbar } from "@mui/material"
import Loading from "../../Component/Loading"
import CreatePayType from "./PayTypeDialog"


function PayType() {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState();
 const [open, setOpen] = useState(false);
 const [index, setIndex] = useState(-1)
 const refs = useRef(null);
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
   UseAxios({ method: "post", api: `updatePayType/${data[index].id}`, data: { name: data[index].name } })
  setOpen(true)   
  setTimeout(() => {
      location.reload();
     }, 2000);     
 }
 useEffect(() => {
  const feachDate = async() => {
try {
  const res =await UseAxios({ method: "get", api: "getPayType" })
 setData(res.data.data);
 console.log(data);
 setLoading(true);
} catch (error) {
 console.log(error);
}  
  }
  feachDate();
 }, [loading])
  return (
   <>
    <CreatePayType />
    {loading ?
     <div className="tableContent">
      <table ref={refs} style={{textAlign:"center"}}>
  <thead>
    <tr>
         <th>Name</th>
      <th>action</th>
         
      </tr>
  </thead>
  <tbody >
        {data.map((item, indexof) => {
            return <>
             <tr key={indexof}>
              <th>
               {index == indexof ?
     <FormControl onChange={(e)=>{data[index].name=e.target.value}} style={{textAlign:"center"}} defaultValue={item?.name} type="text" required/>
       :item?.name
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

export default PayType
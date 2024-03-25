import { useEffect, useRef, useState } from "react"
import {  FormControl} from "react-bootstrap"
import { UseAxios, imageUrl } from "../../store/constant/url"
import { Snackbar } from "@mui/material"
import Loading from "../../Component/Loading"
import { useNavigate } from "react-router-dom"
import ServiceDepartmentDialog from "./ServiceDepartmentDialog"


function ServiceDepartment() {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState();
 const [open, setOpen] = useState(false);
 const [index, setIndex] = useState(-1)
  const refs = useRef(null);
  const nav = useNavigate();
        const [image,setImage] =useState("");
  const [imageToSend, setImageToSend] = useState(null);
  const [message, setMessage] = useState("Accebt Only Image")
   const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith('image/')) {
      setMessage("Accebt Only Image")
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setImageToSend(file);
    console.log(image);
  }
};
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
    const formData = new FormData();
   formData.append("name",data[index].name)   
   formData.append("company",data[index].company)   
   formData.append("image",imageToSend)
   UseAxios({ method: "post", api: `updateServiceDepartment/${data[index].id}`, data:formData })
   setOpen(true)   
   setMessage("updated")
  setTimeout(() => {
      location.reload();
     }, 2000);     
 }
 useEffect(() => {
  const feachDate = async() => {
try {
  const res =await UseAxios({ method: "get", api: "getServiceDepartment" })
 setData(res.data.data);
 setLoading(true);
} catch (error) {
 console.log(error);
}  
  }
  feachDate();
 }, [loading])
  return (
   <>
    <ServiceDepartmentDialog />
    {loading ?
     <div className="tableContent">
      <table ref={refs} style={{textAlign:"center"}}>
  <thead>
              <tr>
                <th>image</th>
                
                <th>Name</th>
                <th>Description</th>
      <th>action</th>
         
      </tr>
  </thead>
  <tbody >
        {data.map((item, indexof) => {
            return <>
              <tr key={indexof}>
                   <th>
                {index == indexof ?
                <div className='chosseImage' onClick={() => { document.getElementById("image1").click() }}>
        {image ? <img src={image} /> :
          <p>Attach a personal photo</p>
        }
        <input accept="image/*" type="file" onChange={(e) => { handleImage(e) }} hidden id='image1' />
                </div>                 
                  :
               <img style={{width:"140px",height:"140px"}} src={item?.image?`${imageUrl}${item?.image?.id}/${item?.image?.file_name}`:"HTCcolo.png"} alt="" />
}
             
              </th>
              <th>
               {index == indexof ?
     <FormControl onChange={(e)=>{data[index].name=e.target.value}} style={{textAlign:"center"}} defaultValue={item?.name} type="text" required/>
       :item?.name
 }
                </th>
                 <th style={{width:"40%"}} >
               {index == indexof ?
     <FormControl as={"textarea"} onChange={(e)=>{data[index].description=e.target.value}} style={{textAlign:"center"}} defaultValue={item?.description} type="text" required/>
       :item?.description
 }
               </th>
      <th>
        
                  <svg onClick={(e)=>{index==indexof?handleUpdate(e):setIndex(indexof)}}  width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 7H6.25C5.14543 7 4.25 7.89543 4.25 9V18C4.25 19.1046 5.14543 20 6.25 20H15.25C16.3546 20 17.25 19.1046 17.25 18V15" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.25 15H12.25L20.75 6.49998C21.5784 5.67156 21.5784 4.32841 20.75 3.49998C19.9216 2.67156 18.5784 2.67156 17.75 3.49998L9.25 12V15" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.25 5L19.25 8" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<svg onClick={()=>{nav("/service", { state: { serviceType: item } });}} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8182 9.99993C13.8182 11.6499 12.4849 12.9833 10.8349 12.9833C9.1849 12.9833 7.85156 11.6499 7.85156 9.99993C7.85156 8.34993 9.1849 7.0166 10.8349 7.0166C12.4849 7.0166 13.8182 8.34993 13.8182 9.99993Z" stroke="#969AA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.8339 16.8923C13.7755 16.8923 16.5172 15.1589 18.4255 12.1589C19.1755 10.9839 19.1755 9.00892 18.4255 7.83392C16.5172 4.83392 13.7755 3.10059 10.8339 3.10059C7.89219 3.10059 5.15052 4.83392 3.24219 7.83392C2.49219 9.00892 2.49219 10.9839 3.24219 12.1589C5.15052 15.1589 7.89219 16.8923 10.8339 16.8923Z" stroke="#969AA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    message={message}
    open={open}
    key={"bottom" + "left"}
   />
   </>
  )
}

export default ServiceDepartment
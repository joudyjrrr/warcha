import React, { useEffect, useState } from "react"
import { UseAxios } from "../../store/constant/url"
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle } from "@mui/material";
function ProductInformation({ children, product_id }) 
{
  const [data,setData]=useState([])
  useEffect(() => {
    const getData =async ()=> {
    const res=UseAxios({method:"get",api:`getUnit?product_id=${product_id}`})
      setData(res.data.data);
    }
    getData()
  }, [product_id])
 return (
  <>
     
       <React.Fragment>
      {children}
      <Dialog
        maxWidth={"lg"}
        open={true}
      >
        
        <DialogTitle>ADD CUSTOMER</DialogTitle>
        <DialogContent>
        
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  </>
    
  )
}

export default ProductInformation
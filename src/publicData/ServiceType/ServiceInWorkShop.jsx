import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {   Snackbar} from '@mui/material';
import { UseAxios, imageUrl } from '../../store/constant/url';

export default function ServiceDialog({ service }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
  
  const [workShop, setWorkShop] = React.useState();
  
  const handleClickOpen = () => {
  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
      const getData = async () => {
      const res = await UseAxios({ api: `getServiceWorkShop?service_id=${service}`, method: "get" })
      setData(res.data.data);
    }
    getData();
  
  }, [open, openMessage])
  const handleDelete = async (id) => {
  UseAxios({api:"deleteServiceWorkShop",method:"post",data:{"work_shop_id":id,"service_id":service}})
    setOpenMessage(true)
    setMessage("deleted")
    setTimeout(() => {
      setOpenMessage(false)
    }, 3000);
  }
  React.useEffect(() => {
    const getData = async () => {
      const res = await UseAxios({ api: "getWorkShopName", method: "get" })
      setWorkShop(res.data.data);
    }
    getData();
  }, [open])
 
  return (
    <React.Fragment>
      <svg  onClick={handleClickOpen} width="30" height="30" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6503 9.99993C13.6503 11.6499 12.3169 12.9833 10.6669 12.9833C9.01693 12.9833 7.68359 11.6499 7.68359 9.99993C7.68359 8.34993 9.01693 7.0166 10.6669 7.0166C12.3169 7.0166 13.6503 8.34993 13.6503 9.99993Z" stroke="#f5c02e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.6669 16.892C13.6085 16.892 16.3502 15.1587 18.2585 12.1587C19.0085 10.9837 19.0085 9.00867 18.2585 7.83367C16.3502 4.83367 13.6085 3.10034 10.6669 3.10034C7.7252 3.10034 4.98353 4.83367 3.0752 7.83367C2.3252 9.00867 2.3252 10.9837 3.0752 12.1587C4.98353 15.1587 7.7252 16.892 10.6669 16.892Z" stroke="#f5c02e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
    
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>Service In Each WorkShop</DialogTitle>
        <DialogContent>
        <div className='changeWorkShopServices'>
  <div className='LeftWorkShop'>
    <h3>Service Not In WorkSHop</h3>
    {workShop && (data && data.length > 0 ? 
      workShop.map((item, key) => {
        return !data.find(element => element.work_shop_id === item.id) && (
          <div className='addService' key={key}>
            <p>{item?.name}</p>
            <button className="button smallRad buttonAdd">Add</button>
          </div>
        );
      }) : 
      workShop.map((item, key) => (
        <div className='addService' key={key}>
          <p>{item?.name}</p>
          <button className="button smallRad buttonAdd">Add</button>
        </div>
      ))
    )}
  </div>
  <div className='rightWorkShop'>
    <h3>Service  In WorkSHop</h3>
    {workShop && (data && data.length > 0 ? 
      workShop.map((item, key) => {
        return data.find(element => element.work_shop_id === item.id) && (
          <div className='addService' key={key+"tt"}>
            <p>{item?.name}</p>
            <button onClick={()=>{handleDelete(item?.work_shop_id)}} className="buttonCansel smallRad">DELETE</button>
          </div>
        );
      }) :
      null
    )}
  </div>
</div>

             <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={message}
      open={openMessage}
      key={"bottom" + "left"}
    />
    <div className="addDialogFormAction">
      <button onClick={handleClose} type="button" className="buttonCansel smallRad">Close</button>
    </div>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  );
}
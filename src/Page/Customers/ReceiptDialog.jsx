import React from 'react'
import { UseAxios } from '../../store/constant/url';
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

function ReceiptDialog({customer}) {
 const [branch, setBranch] = React.useState([])
 const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("Accebt Only Image")
 const [openMessage, setOpenMessage] = React.useState(false);
 const [open, setOpen] = React.useState(false);
 const money = useSelector((state) => state.money);
 
  React.useEffect(() => {
    const getdata = async() => {
     const response = await UseAxios({
        method: "GET",
        api: `getBranchName?`
      })
     setBranch(response.data.data);
    }
   
      getdata();
    
  
  }, [])
 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
 };
 const handleAdd =async () => {
  try {
   const formData = new FormData();
 formData.append("customer_id",customer)
  data?.amount&& formData.append("amount",data?.amount)
  data?.branch_id&& formData.append("branch_id",data?.branch_id)
   data?.node && formData.append("node", data?.node)
   data?.currency && formData.append("currency", data?.currency)
   
   await UseAxios({ method: "post", api: "createReceipt", data: formData })
setMessage("success") 
   setOpenMessage(true)
   setTimeout(() => {
    setOpen(false)
    setOpenMessage(false)
   }, 3000);
 } catch (error) {
  setMessage(error.message) 
   setOpenMessage(true)
   setTimeout(() => {
    setOpenMessage(false)
   }, 3000);
 }
 }
  return (
    <React.Fragment>
      <Button sx={{float:"right",marginRight:"4%",color:"white",border:"1px solid white",bgcolor:"#f5c02e"}}  onClick={handleClickOpen}>
        Add Receipt
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle> Add Receipt</DialogTitle>
        <DialogContent>
    <div className='displayDialogContent'>
     
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
    
     
      <div >
                  <FormControl fullWidth >
      <InputLabel color="warning" id="demo-select-small-label">BRANCH</InputLabel>
              <Select
               onChange={(e)=>{setData({...data,"branch_id":e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
           {branch?.map((item, key) =>
           {
            return <MenuItem key={key} value={item?.id}  >{item?.name }</MenuItem>
           })}
 
 
            
      </Select>
            </FormControl>
         
        </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",minWidth:"360px"}}>
       <FormControl fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">currency</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,currency:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="currency"
       
      >
                {money?.money.map((element,index) => {
                  return <MenuItem color="warning"  title={element.dollar_price} value={element.currency}  key={index}>{element.currency }</MenuItem>
               })}
       
      </Select>
        </FormControl>
         <TextField
          
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="amount"
          type='number'
                  fullWidth
                    onChange={(e)=>{setData({...data,amount:e.target.value})}}
        />        
        </div>
          <TextField
          
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="node"
          type='text'
                  fullWidth
                    onChange={(e)=>{setData({...data,node:e.target.value})}}
        />        
    </Box>
          </div>
             <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={message}
      open={openMessage}
      key={"bottom" + "left"}
    />
    <div className="addDialogFormAction">
      <button onClick={handleAdd} type="submit" className="button smallRad buttonAdd">ADD</button>
      <button onClick={handleClose} type="button" className="buttonCansel smallRad">Close</button>
    </div>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  )
}

export default ReceiptDialog
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DialogTitle from '@mui/material/DialogTitle';
import { FilledInput, FormControl, FormControlLabel, IconButton,  InputAdornment, InputLabel, MenuItem, Select, Snackbar, Switch, TextField } from '@mui/material';
import { UseAxios } from '../../store/constant/url';
import { useSelector } from 'react-redux';

export default function EmployeeDialog({branchChose}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
   const [image,setImage] = React.useState("");
  const [imageToSend, setImageToSend] = React.useState(null);
  const [message, setMessage] = React.useState("Accebt Only Image")
  const [openMessage, setOpenMessage] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [branch, setBranch] = React.useState([]);
  const [workShop, setWorkShop] = React.useState([]);
  const [shift, setShift] = React.useState([]);
  const [employeeType, setEmployeeType] = React.useState([]);
  const money = useSelector((state) => state.money);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith('image/')) {
      setMessage("Accebt Only Image")
      setOpenMessage(true);
      setTimeout(() => {
        setOpenMessage(false);
      }, 2000);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setImageToSend(file);
    console.log(image);
  }
};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
  try {
    const formData = new FormData();
    if (imageToSend) formData.append("image", imageToSend);
    data?.driver && formData.append("is_delivery", data.driver);
    data?.first_name && formData.append("first_name", data.first_name);
    data?.shift_id && formData.append("shift_id", data.shift_id);
     data?.email&&formData.append("email", data.email);
     data?.last_name&&formData.append("last_name", data.last_name);
   data?.branch_id? formData.append("branch_id", data.branch_id):formData.append("work_shop_id", data.work_shop_id);
   data?.password&&formData.append("password", data.password);
     data?.phone&&formData.append("phone", data.phone);
     data?.id_number&&formData.append("id_number", data.id_number);
     data?.salary&&formData.append("salary", data.salary);
   data.start_day&&formData.append("start_day", data.start_day);
     data?.address&&formData.append("address", data.address);
    data.role =="branch_admin"&&formData.append("role", data.role);
    data.role =="work_shop_admin"&&formData.append("role", data.role);
     data?.employee_type_id&&formData.append("employee_type_id", data.employee_type_id);
     data?.currency_id&&formData.append("currency_id", data.currency_id);
    const response = await UseAxios({ method: "post", api: "createEmployee", data: formData });

    if (response.status === 200) {
      setMessage("success");
      setOpenMessage(true);
    
      setTimeout(() => {
        setOpenMessage(false);
          setOpen(false);
      }, 3000);
    } 
  } catch (error) {
    setMessage(error.message || "An error occurred while submitting the form.");
    setOpenMessage(true);
    setTimeout(() => {
      setOpenMessage(false);
    }, 3000);
  }
};
  React.useEffect(() => {
    const getworkShop = async () => {
      var workShop = await UseAxios({ method: "get", api: `getWorkShopName${branchChose ? `?branch_id=${branchChose}` : ""}` })
      setWorkShop(workShop.data.data);
    
    }
    const getBranch = async () => {
    var branch = await UseAxios({
  method: "get",
  api: `getBranchName${branchChose ? `?branch_id=${branchChose}` : ""}`
});

      setBranch(branch.data.data);
    }
     const getShiftName = async () => {
      var shifts = await UseAxios({ method: "get", api: "getShiftName" })
      setShift(shifts.data.data);
    }
      const getEmployeeType = async () => {
      var shifts = await UseAxios({ method: "get", api: "getEmployeeType" })
      setEmployeeType(shifts.data.data);
    }
    
    open && getworkShop();
    open && getBranch();
    open && getShiftName();
    open && getEmployeeType();
    
    
  },[open])
 
  return (
    <React.Fragment>
      <Button sx={{float:"right",marginRight:"4%",color:"white",border:"1px solid white",bgcolor:"#f5c02e"}}  onClick={handleClickOpen}>
       ADD Employee
      </Button>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        
        <DialogTitle>ADD Employee</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => { handleAdd(e) }}>
             <div className='displayDialogContent'>
              <div>
                getEmployeeDelivery
      <div className='chosseImage' onClick={() => { document.getElementById("image").click() }}>
        {image ? <img src={image} /> :
          <p>Attach a personal photo</p>
        }
        <input accept="image/*" type="file" onChange={(e) => { handleImage(e) }} hidden id='image' />
                </div>
                <h6>can Be Branch Manger</h6>
                <FormControlLabel control={
                  <Switch
 onChange={(event) => {
    setData({...data, role: event.target.checked ? "branch_admin" : "work_shop_admin"});

  }} 
                    checked={data?.role == "branch_admin" ? true : false} color='warning' sx={{ m: 1 }} />} label="Branch Manger" />
     <h6>can Be Work Shop Manger</h6>
                <FormControlLabel control={
                  <Switch
                     onChange={(event) => {
    setData({...data, role: event.target.checked ? "work_shop_admin" : "branch_admin"});
    
  }} 
                    checked={data?.role == "work_shop_admin"?true:false} color='warning' sx={{ m: 1 }} />} label="Work Shop Manger" />
            
                  <h6>Driver Employee</h6>
                <FormControlLabel control={
                  <Switch
                     onChange={(event) => {
    setData({...data, driver: event.target.checked ? 1 : 0});
    
  }} 
                    color='warning'
                    sx={{ m: 1 }} />} label="Driver Employee" />
            
              </div>
   
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{marginRight:"4%"}}>
                  <TextField
        color={openMessage?"error" : "warning"}

                   
          id="outlined-multiline-flexible"
          label="Email"
          type='email'
                  fullWidth
                    onChange={(e)=>{setData({...data,email:e.target.value})}}
        />
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                          color={openMessage?"error" : "warning"}

                    
                    onChange={(e)=>{setData({...data,first_name:e.target.value})}}
          id="outlined-multiline-flexible"
                  label="first name"
                  fullWidth
        />
   <TextField
                          color={openMessage?"error" : "warning"}

                    
                    onChange={(e)=>{setData({...data,last_name:e.target.value})}}
          id="outlined-multiline-flexible"
                  label="last name"
                  fullWidth
        />
                </div>
                 <FormControl fullWidth   color={openMessage?"error" : "warning"}
>
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                    required
                    onChange={(e)=>{setData({...data,password:e.target.value})}}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
                </FormControl>
                 <div style={{display:"flex"}}>
                           <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} >
      <InputLabel  color="warning" id="demo-select-small-label">Branch</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,branch_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Branch"
      >
        <MenuItem value="">
                </MenuItem>
                {branch.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })} 
                </Select>
                  </FormControl>
                          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} >
      <InputLabel  color="warning" id="demo-select-small-label">Work Shop</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,work_shop_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Branch"
      >
        <MenuItem value="">
                </MenuItem>
                {workShop.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })} 
                </Select>
             </FormControl>
                </div>
                  <div style={{display:"flex"}}>
                           <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} >
      <InputLabel  color="warning" id="demo-select-small-label">shift</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,shift_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Branch"
      >
        <MenuItem value="">
                </MenuItem>
                {shift.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })} 
                </Select>
                  </FormControl>
                          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} >
      <InputLabel  color="warning" id="demo-select-small-label">Employee Type</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,employee_type_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="employeeType"
      >
        <MenuItem value="">
                </MenuItem>
                {employeeType.map((item,index) => {
                  return <MenuItem color="warning" value={item?.id} key={"t"+index}>{item?.name}</MenuItem>
               })} 
                </Select>
             </FormControl>
                </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,phone:e.target.value})}}
                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
                  label="Phone"
                  fullWidth
        />
                  <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,address:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="Address"
         fullWidth
        />
                </div>
                       <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,id_number:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="id_number"
         fullWidth
                />
                   <TextField
                    required
                    type='number'
                    defaultValue={1}
                    onChange={(e)=>{setData({...data,start_day:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="start_day"
         fullWidth
        />
              </div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
               
                 <TextField
                    required
                    
                    onChange={(e)=>{setData({...data,salary:e.target.value})}}
                                   color={openMessage?"error" : "warning"}

          id="outlined-multiline-flexible"
          label="salary"
                    fullWidth
                    type='number'
                />
                      <FormControl  sx={{ m: 1, minWidth: 120 }} >
      <InputLabel  color="warning" id="demo-select-small-label">currency</InputLabel>
              <Select
                onChange={(e)=>{setData({...data,currency_id:e.target.value})}}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="Branch"
      >
        <MenuItem value="">
                </MenuItem>
                {money?.money?.map((item,index) => {
                  return <MenuItem color="warning" value={item?.currency} key={"ht"+index}>{item?.currency}</MenuItem>
               })} 
                </Select>
             </FormControl>
              </div>
              </Box>
       
          </div>
             <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={message}
      open={openMessage}
      key={"bottom" + "left"}
    />
    <div className="addDialogFormAction">
      <button type="submit" className="button smallRad buttonAdd">ADD</button>
      <button onClick={handleClose} type="button" className="buttonCansel smallRad">Close</button>
    </div>
  </form>
</DialogContent>
       
      
      </Dialog>
    </React.Fragment>
  );
}




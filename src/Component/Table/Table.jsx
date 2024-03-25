import { useEffect, useState } from "react"
import "./Table.css"
import Loading from "../Loading";
import {useAxios} from "../../store/constant/url"
const AddDialog = (props) => {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(false);
return  <>
<div className="addDialogContent">
  <div className="addDialog largeRad">
   <h1 style={{textAlign:"center"}}>add</h1>
   <form action="">
    {loading ? <ul className="addDialogForm">
    
    <li className="addName"><label htmlFor="name">Name:</label>
      <input className="filterAdd smallRad" id="name" type="text" />
     </li>
     <li><label htmlFor="name">Name:</label>
      <input className="filterAdd smallRad" id="name" type="text" />
     </li>
      <li><label htmlFor="name">Name:</label>
      <input className="filterAdd smallRad" id="name" type="text" />
     </li>
      <li><label htmlFor="name">Name:</label>
      <input className="filterAdd smallRad" id="name" type="text" />
     </li>
      <li><label htmlFor="name">Name:</label>
      <input className="filterAdd smallRad" id="name" type="text" />
     </li>
      <li><label htmlFor="name">Name:</label>
      <input className="filterAdd smallRad" id="name" type="text" />
     </li>
    </ul>
    : <Loading />}
    <div className="addDialogFormAction">
     <button type="submit" className="button smallRad buttonAdd">add</button>
     <button  onClick={props.toggleAdd} type="reset" className="buttonCansel smallRad ">cansel</button>
    </div>
   </form>
  </div>
 </div>
 </>
 

}

const Table = () => {
 const [openAdd, setOpenAdd] = useState(false);
 const [pagenate, setPagenate] = useState(0);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
 useEffect(() => {
  var responce;
  const getData = async () => {
    responce = await useAxios();
    setData(responce.data);
  setLoading(true) 
  }
   
 }, [])
  return (
   <div className="tableContent">
    <div className="filterContent">
     <ul>
     <li><h6>filter</h6><input type="text" className="filter smallRad" /></li>
     <li><h6>filter</h6><input type="text" className="filter smallRad" /></li>
     <li><h6>filter</h6><input type="text" className="filter smallRad" /></li>
     <li><h6>filter</h6><input type="text" className="filter smallRad" /></li>
      <li style={{display:"flex"}} ><button onClick={()=>{setOpenAdd(!openAdd)}} className="buttonAddInTable ">
       <svg width="22" height="22" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 8H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.5 15L8.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg> 
       </button></li>
     </ul>
    </div>
    <table>
  <thead>
    <tr>
      <th>FFD154wawgwagawgaw</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>action</th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
       <td>
       <svg onClick={()=>{setOpenAdd(!openAdd)}} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 7H6.25C5.14543 7 4.25 7.89543 4.25 9V18C4.25 19.1046 5.14543 20 6.25 20H15.25C16.3546 20 17.25 19.1046 17.25 18V15" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.25 15H12.25L20.75 6.49998C21.5784 5.67156 21.5784 4.32841 20.75 3.49998C19.9216 2.67156 18.5784 2.67156 17.75 3.49998L9.25 12V15" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.25 5L19.25 8" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6503 9.99993C13.6503 11.6499 12.3169 12.9833 10.6669 12.9833C9.01693 12.9833 7.68359 11.6499 7.68359 9.99993C7.68359 8.34993 9.01693 7.0166 10.6669 7.0166C12.3169 7.0166 13.6503 8.34993 13.6503 9.99993Z" stroke="#969AA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.6669 16.892C13.6085 16.892 16.3502 15.1587 18.2585 12.1587C19.0085 10.9837 19.0085 9.00867 18.2585 7.83367C16.3502 4.83367 13.6085 3.10034 10.6669 3.10034C7.7252 3.10034 4.98353 4.83367 3.0752 7.83367C2.3252 9.00867 2.3252 10.9837 3.0752 12.1587C4.98353 15.1587 7.7252 16.892 10.6669 16.892Z" stroke="#969AA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

       </td>
   </tr>
  </tbody>
    </table>
    <div className="pagenate">
     <div className="pagenateContent">
      <h2>Showing</h2>
      <select name="" id="">
       <option value="" hidden>rows</option>
      <option value="">5</option>
      <option value="">15</option>
      <option value="">40</option>
      </select>
     </div>
     <button onClick={() => { setPagenate(pagenate - 1)}}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4L6 8L10 12" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
     <button onClick={() => { setPagenate(1)}} className={pagenate==1?"pagenateFlex":null}>1</button>
     <button onClick={()=>{setPagenate(2)}}  className={pagenate==2?"pagenateFlex":null}>2</button>
     <button onClick={()=>{setPagenate(3)}}  className={pagenate==3?"pagenateFlex":null}>3</button>
     <button onClick={()=>{setPagenate(4)}} className={pagenate==4?"pagenateFlex":null}>4</button>
     <button onClick={()=>{setPagenate(5)}} className={pagenate==5?"pagenateFlex":null}>5</button>
     <button onClick={()=>{setPagenate(pagenate+1)}} ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 4L10 8L6 12" stroke="#969AA0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
     </button>
    
     
    </div>
    {openAdd &&
    <AddDialog toggleAdd={()=>{setOpenAdd(!openAdd)}} />
     
}    
   </div>
  )
}

export default Table
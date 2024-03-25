import { useEffect, useState } from "react"
import "./Table.css"
import Loading from "../Loading";
import { useAxios } from "../../store/constant/url"
const ShowMore = () => {

  return <>
   <tr>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
    </tr>
    <tr>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
    </tr>
    <tr>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
       </tr>
  </>
}
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

const TableTow = () => {
 const [openAdd, setOpenAdd] = useState(false);
 const [pagenate, setPagenate] = useState(0);
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leng, setLeng] = useState(0);
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
            {leng==1?<svg onClick={()=>{setLeng(-1)}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.35 9.35C12.25 9.25 12.1333 9.2 12 9.2C11.8667 9.2 11.75 9.25 11.65 9.35L8.85 12.15C8.68333 12.3167 8.64167 12.5 8.725 12.7C8.80833 12.9 8.96667 13 9.2 13L14.8 13C15.0333 13 15.1917 12.9 15.275 12.7C15.3583 12.5 15.3167 12.3167 15.15 12.15L12.35 9.35ZM12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02566 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7367 9.31667 21.9993 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7367 13.3833 21.9993 12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31233 17.1167 2.787 15.9C2.26167 14.6833 1.99933 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26167 10.6167 1.99933 12 2ZM12 4C9.78333 4 7.89567 4.779 6.337 6.337C4.77833 7.895 3.99933 9.78267 4 12C4 14.2167 4.779 16.1043 6.337 17.663C7.895 19.2217 9.78267 20.0007 12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.2217 16.105 20.0007 14.2173 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.105 4.77833 14.2173 3.99933 12 4Z" fill="#1D1F1F"/>
<path d="M12.35 9.35C12.25 9.25 12.1333 9.2 12 9.2C11.8667 9.2 11.75 9.25 11.65 9.35L8.85 12.15C8.68333 12.3167 8.64167 12.5 8.725 12.7C8.80833 12.9 8.96667 13 9.2 13L14.8 13C15.0333 13 15.1917 12.9 15.275 12.7C15.3583 12.5 15.3167 12.3167 15.15 12.15L12.35 9.35ZM12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02566 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7367 9.31667 21.9993 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7367 13.3833 21.9993 12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31233 17.1167 2.787 15.9C2.26167 14.6833 1.99933 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26167 10.6167 1.99933 12 2ZM12 4C9.78333 4 7.89567 4.779 6.337 6.337C4.77833 7.895 3.99933 9.78267 4 12C4 14.2167 4.779 16.1043 6.337 17.663C7.895 19.2217 9.78267 20.0007 12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.2217 16.105 20.0007 14.2173 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.105 4.77833 14.2173 3.99933 12 4Z" fill="black" fill-opacity="0.2"/>
</svg>
:<svg onClick={()=>{setLeng(1)}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.65 14.65C11.75 14.75 11.8667 14.8 12 14.8C12.1333 14.8 12.25 14.75 12.35 14.65L15.15 11.85C15.3167 11.6833 15.3583 11.5 15.275 11.3C15.1917 11.1 15.0333 11 14.8 11H9.2C8.96667 11 8.80833 11.1 8.725 11.3C8.64167 11.5 8.68333 11.6833 8.85 11.85L11.65 14.65ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22ZM12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.2217 16.105 20.0007 14.2173 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.105 4.77833 14.2173 3.99933 12 4C9.78333 4 7.89567 4.779 6.337 6.337C4.77833 7.895 3.99933 9.78267 4 12C4 14.2167 4.779 16.1043 6.337 17.663C7.895 19.2217 9.78267 20.0007 12 20Z" fill="#969AA0"/>
</svg>
}
            </td>
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
         {leng==1&& <ShowMore/>}
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

export default TableTow
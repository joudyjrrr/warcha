import { useDispatch, useSelector } from "react-redux";
import "./SideBarLayout.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeSideBarFlex } from "../../store/Slices/languageSlice";
function SideBarLayout() {
  const language = useSelector((state) => state.language);
  const [flexElement, setFeexedElement] = useState(0);
 const dispatch = useDispatch();
const nav = useNavigate();

const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
});

useEffect(() => {
  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWindowSize({ width: newWidth });
    
    // Update sidebar flex based on window width
    if (newWidth < 1000) {
      dispatch(changeSideBarFlex(false));
    } else {
      dispatch(changeSideBarFlex(true));
    }
  };
  
  // Add event listener for window resize
  window.addEventListener('resize', handleResize);
  
  // Remove event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
useEffect(() => {
  const index = language?.sideBar?.findIndex(item => item?.goTo == location.pathname);
  
  setFeexedElement(index);
  }, [language,location.pathname])
  var icons = [
  <><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.48699 0.85931C6.33366 0.186643 7.52033 0.159977 8.39299 0.77931L8.50033 0.85931L12.5597 4.10664C13.0063 4.45264 13.2803 4.96664 13.327 5.52598L13.3337 5.65998V11.066C13.3337 12.4593 12.233 13.5926 10.8537 13.666H9.52699C8.89299 13.6533 8.38032 13.16 8.33366 12.54L8.32699 12.446V10.54C8.32699 10.3326 8.17299 10.16 7.96699 10.126L7.90699 10.1193H6.12633C5.91366 10.126 5.74033 10.2793 5.71366 10.4793L5.70699 10.54V12.44C5.70699 12.4793 5.69966 12.526 5.69366 12.5593L5.68699 12.5733L5.67966 12.6193C5.60033 13.1866 5.13366 13.6193 4.55366 13.66L4.46699 13.666H3.27366C1.88033 13.666 0.740326 12.5733 0.666992 11.1993V5.65998C0.672992 5.09264 0.920325 4.56598 1.33366 4.19931L5.48699 0.85931ZM7.92033 1.58598C7.41366 1.17931 6.69366 1.15998 6.16033 1.51264L6.05966 1.58598L2.00633 4.85331C1.77366 5.02598 1.63366 5.28598 1.60033 5.55931L1.59299 5.66598V11.066C1.59299 11.9526 2.28633 12.6793 3.16699 12.7326H4.46699C4.61366 12.7326 4.74033 12.6333 4.75966 12.4933L4.77366 12.3733L4.78033 12.3393V10.54C4.78033 9.82664 5.32699 9.24664 6.02699 9.19264H7.90699C8.61966 9.19264 9.19966 9.73998 9.25366 10.44V12.446C9.25366 12.586 9.35366 12.7066 9.48699 12.7326H10.7263C11.6197 12.7326 12.3463 12.0466 12.3997 11.1726L12.407 11.066V5.66598C12.3997 5.37998 12.2803 5.11264 12.0737 4.91331L11.987 4.83931L7.92033 1.58598Z"
        fill="white" />
</svg>
    </>,
    <>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="3.99984" cy="12.6663" rx="1.33333" ry="1.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<circle cx="11.3333" cy="12.6663" r="1.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.3332 11.3333H3.99984V2H2.6665" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 3.33301L13.3333 3.99967L12.6667 8.66634H4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
    </>,
    <>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 4.77301C11.9602 4.76634 11.9135 4.76634 11.8735 4.77301C10.9535 4.73968 10.2202 3.98634 10.2202 3.05301C10.2202 2.09968 10.9869 1.33301 11.9402 1.33301C12.8935 1.33301 13.6602 2.10634 13.6602 3.05301C13.6535 3.98634 12.9202 4.73968 12.0002 4.77301Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.3135 9.62645C12.2268 9.77978 13.2335 9.61978 13.9401 9.14645C14.8801 8.51978 14.8801 7.49312 13.9401 6.86645C13.2268 6.39312 12.2068 6.23311 11.2935 6.39311" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.97983 4.77301C4.01983 4.76634 4.06649 4.76634 4.10649 4.77301C5.02649 4.73968 5.75982 3.98634 5.75982 3.05301C5.75982 2.09968 4.99316 1.33301 4.03983 1.33301C3.08649 1.33301 2.31982 2.10634 2.31982 3.05301C2.32649 3.98634 3.05983 4.73968 3.97983 4.77301Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.66663 9.62645C3.75329 9.77978 2.74663 9.61978 2.03996 9.14645C1.09996 8.51978 1.09996 7.49312 2.03996 6.86645C2.75329 6.39312 3.77329 6.23311 4.68663 6.39311" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.00021 9.75348C7.96021 9.74681 7.91355 9.74681 7.87355 9.75348C6.95355 9.72015 6.22021 8.96681 6.22021 8.03348C6.22021 7.08014 6.98688 6.31348 7.94021 6.31348C8.89355 6.31348 9.66021 7.08681 9.66021 8.03348C9.65355 8.96681 8.92021 9.72681 8.00021 9.75348Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.05998 11.8532C5.11998 12.4799 5.11998 13.5066 6.05998 14.1332C7.12665 14.8466 8.87331 14.8466 9.93998 14.1332C10.88 13.5066 10.88 12.4799 9.93998 11.8532C8.87998 11.1466 7.12665 11.1466 6.05998 11.8532Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

    </>
  ];
  
  return (
   <div hidden={!language.sideBarFlex} style={{position:windowSize.width<1000?"absolute":null,minWidth:"180px",zIndex:"200"}} className='divBackground sideBarSize'>
    <div style={{minWidth:"180px"}} className="divBackground sideBarSizeFlex">
        <div style={{ marginTop: "10%" ,overflow:"hidden"}} className="textCenter" >
          <img src="/HTCcolo.png" alt="" />
     {/* <svg width="20%" height="20%" viewBox="0 0 65 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.4996 51.1792C28.1231 51.1792 23.8421 49.7107 20.4448 47.0441L5.16893 35.0535C-1.01651 30.3717 -1.01564 20.7779 5.16893 16.0967L20.4448 4.10617C27.2207 -1.36886 37.7787 -1.36858 44.5544 4.10617L59.8303 16.0967C63.734 19.1609 65.3849 24.1713 64.0364 28.8613C63.6059 30.3583 62.003 31.2348 60.4542 30.8182C58.9063 30.4019 58.0005 28.8508 58.4311 27.3536C59.1589 24.8221 58.2692 22.1186 56.1639 20.4662L40.888 8.47546C36.0275 4.66032 28.9718 4.66032 24.1113 8.47546L8.83539 20.4662C5.50042 22.9905 5.50085 28.1603 8.83539 30.6843L24.1113 42.6748C28.9633 46.4833 36.0033 46.4901 40.8631 42.6942L43.4148 40.5951C44.6385 39.5884 46.4744 39.7315 47.5155 40.9153C48.5563 42.099 48.4082 43.8747 47.1844 44.8814L44.6059 47.0026C44.5889 47.0167 44.5718 47.0305 44.5544 47.0441C41.1574 49.7107 36.8762 51.1792 32.4996 51.1792ZM44.5544 67.865L59.8303 55.8744C66.0158 51.1925 66.0149 41.5988 59.8303 36.9176L44.5544 24.927C37.7786 19.452 27.2205 19.4523 20.4448 24.927L18.2912 26.6355C15.4041 29.1176 18.9024 33.2383 21.9807 30.9864L24.1161 29.2926C28.9767 25.4816 36.0292 25.4827 40.888 29.2964L56.1639 41.287C59.4988 43.8114 59.4984 48.9811 56.1639 51.5051L40.888 63.4957C36.0275 67.3108 28.9718 67.3108 24.1113 63.4957L8.83539 51.5051C6.90667 49.9911 5.9842 47.5787 6.42798 45.2095C6.71438 43.6804 5.66493 42.2163 4.08413 41.9393C2.50421 41.6628 0.98959 42.6772 0.703046 44.2063C-0.119062 48.5957 1.59206 53.0667 5.16893 55.8744L20.4448 67.865C23.8419 70.5314 28.1231 72 32.4996 72C36.8762 72 41.1574 70.5316 44.5544 67.865Z" fill="white"/>
</svg> */}
          <h3 className="sideColor h1None">Admin
         
          
          </h3>
        </div>
      
        <ul className="ulList" style={{ minWidth: "180px" }}>
         
  {language?.sideBar?.map((element, index) => (
    <>
      <li onClick={() => {
       window.innerWidth<1000&&dispatch(changeSideBarFlex(false))
        setFeexedElement(index), nav(element.goTo)
      }}
        style={{minWidth:"90%"}}
        className={`sideColor ${flexElement === index && "sideBarHoverFlex svgSelected"}`}
       
        key={index}>
        <span style={{marginRight:"3%"}}>{icons[index]}</span>
        {element.item}
      </li>
    <hr />
    </>
  ))}
</ul>
     </div>
   </div>
  )
}

export default SideBarLayout

import SideBarLayout from '../../Component/SideBarLayout/SideBarLayout'
import "./Defult.css"
import AppBar from '../../Component/AppBar/AppBar';
import PropTypes from 'prop-types';
const Defult =(props)=> {
  return (

   <div className='defult'>
       <SideBarLayout key={2}/>
      <div className="content">
      <AppBar/>
     {props.children}
      </div>
   </div>
  )
}
Defult.propTypes = {
  children: PropTypes.node.isRequired
};
export default Defult
 
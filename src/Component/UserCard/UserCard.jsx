import "./UserCard.css"
function UserCard() {
  return (
   <div className='UserCard'>
    <div className="UserInside">
     <img className='avatar' src="/vite.svg" alt="" />
     <div>
      <h5>Hassan Mohamed</h5>
      <p>+96432684218</p>
     </div>
    </div>
    <h4>50 Order</h4>
   </div>
  )
}

export default UserCard
import { useMemo } from 'react';
import './RelateCard.css'
function NumberCard({ total, relate, month, count }) {
  const monthNames = useMemo(() => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], []);
      
  return (
   <div className='RelateNumber'>
    <div>
                    <p>{total?"remaining quantity":monthNames[month]??"total Sell" }</p>
                    <h4>{ relate}</h4>
              </div>
              {count?
      count>0 ? <div className='up'>
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.00004 15.1667H10C13.3334 15.1667 14.6667 13.8334 14.6667 10.5V6.50004C14.6667 3.16671 13.3334 1.83337 10 1.83337H6.00004C2.66671 1.83337 1.33337 3.16671 1.33337 6.50004V10.5C1.33337 13.8334 2.66671 15.1667 6.00004 15.1667Z" stroke="#16E32B" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.64661 9.47338L7.99994 7.12671L10.3533 9.47338" stroke="#16E32B" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
{count+"%"}
      </div> : <div className='down'>
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99992 1.83329H9.99992C13.3333 1.83329 14.6666 3.16663 14.6666 6.49996V10.5C14.6666 13.8333 13.3333 15.1666 9.99992 15.1666H5.99992C2.66659 15.1666 1.33325 13.8333 1.33325 10.5V6.49996C1.33325 3.16663 2.66659 1.83329 5.99992 1.83329Z" stroke="#FF9C40" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.64673 7.52662L8.00006 9.87329L10.3534 7.52662" stroke="#FF9C40" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
{count+"%"??null}

      </div>:null}
   
   </div>
  )
}

export default NumberCard
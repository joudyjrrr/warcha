import { Rating } from "@mui/material";
import { imageUrl } from "../../store/constant/url";
import PropTypes from 'prop-types';


function OneProductForBranch({ product }) {
  // Check if product exists and has required properties
 
  return (
    <div style={{height:"auto"}} className="oneProduct">
      <h3 style={{ textAlign: "center" }}>{product?.product_for_admin?.name}</h3>
      <div >
        <img style={{width:"150px"}} src={product?.product_for_admin.main_image?`${imageUrl}${product?.product_for_admin.main_image?.id}/${product?.product_for_admin?.main_image?.file_name}`:"HTCcolo.png"} alt={product?.name} />
    </div>
    <div style={{ display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>evaluation</p>
     <Rating
      readOnly
        name="hover-feedback"
        value={product?.product_for_admin?.evaluation??4}
        precision={0.5}
                size="large"
      />
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>quantity</p>
     <p>{product?.quantity }</p>
      </div>
      
        <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>cost</p>
     <p>{product?.product_for_admin?.cost }$</p>
    </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price</p>
     <p>{product?.product_for_admin?.price }$</p>
    </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price discount in  branch</p>
     <p>{product?.price_discount||0 }$</p>
      </div>
       <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>multiple price</p>
     <p>{product?.product_for_admin?.multiple_price||0 }$</p>
      </div>
       <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>multiple price discount in  branch</p>
     <p>{product?.multiple_price_discount||0 }$</p>
      </div>
      <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>min multiple count in  branch</p>
     <p>{product?.min_multiple_count }</p>
      </div>
     <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>min multiple notification in  branch</p>
     <p>{product?.min_multiple_notification }</p>
      </div>
     
    </div>
  );
}


export default OneProductForBranch;

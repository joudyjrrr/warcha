import { Rating } from "@mui/material";
import { imageUrl } from "../../store/constant/url";
import PropTypes from 'prop-types';

function OneProduct({ product }) {
  // Check if product exists and has required properties
  
  return (
    <div className="oneProduct">
      <h3 style={{ textAlign: "center" }}>{product?.name}</h3>
      <div >
        <img style={{width:"150px"}} src={product.main_image?`${imageUrl}${product.main_image?.id}/${product?.main_image?.file_name}`:"HTCcolo.png"} alt={product?.name} />
    </div>
    <div style={{ display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>evaluation</p>
     <Rating
      readOnly
        name="hover-feedback"
        value={product?.evaluation??4}
        precision={0.5}
                size="large"
      />
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
     <p style={{color:"gray"}}>price</p>
     <p>{product?.price }$</p>
    </div>
    </div>
  );
}

OneProduct.propTypes = {
  product: PropTypes.shape({
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
    main_image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      file_name: PropTypes.string.isRequired
    }).isRequired,
    evaluation: PropTypes.number
  }).isRequired
};

export default OneProduct;

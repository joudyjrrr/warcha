import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UseAxios, imageUrl } from '../store/constant/url';
import NumberCard from '../Component/NumberCard/NumberCard';
import Loading from '../Component/Loading';
import Chat from '../Component/Chat';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TableShow = ({ data }) => {
 
    if (data?.length === 0) return <h4 style={{textAlign:"center",color:"gray"}}>No data available</h4>;
    
    return (
        <div className='tableContent'> 
            <table>
                <thead>
        <tr>
                        <th>branch_name</th>
                        <th>quantity</th>
                        <th>one price discount</th>
                        <th>multiple pric discount</th>
                        <th>min multiple notification</th>
                        
                    </tr>
                </thead>
                <tbody>
                  {data.map((item,index)=>{return   <tr key={index}>
                   <td>{item?.branch_name?.name||null}</td>
                   <td>{item?.quantity}</td>
                   <td>{item?.price_discount}</td>
                   <td>{item?.multiple_price_discount}</td>
                   <td>{item?.min_multiple_notification}</td>
                    </tr>})}
                </tbody>
            </table>
        </div>
    );
}
const BuyProductDetails = ({ data, money }) => {

    if (data?.length === 0) return <h4 style={{textAlign:"center",color:"gray"}}>No data available</h4>;
    
    return (
        <div style={{marginBottom:"10%"}} className='tableContent'> 
            <table>
                <thead>
        <tr>
                        <th>Branch</th>
                        <th>Quantity</th>
                        <th>supplier</th>
                        <th>one_price</th>
                        <th>node</th>
                        <th>date</th>
         
                    </tr>
                </thead>
                <tbody>
                  {data?.buy?.map((item,index)=>{return   <tr key={index}>
                   <td>{item?.buy_product?.branch?.name}</td>
                   <td>{item?.count}</td>
                      <td>{item?.buy_product?.supplier?.name}</td>
                   <td>{(item?.one_price*money).toFixed(2)}</td>
                   <td>{item?.node||null}</td>
                   <td>{moment(item?.created_at).format('YYYY-MM-DD')}</td>
                    </tr>})}
                </tbody>
            </table>
          
        </div>
    );
}
function ProductDetails() {
    const location = useLocation();
    const  [Product,setProduct] = useState(location.state && location.state.Product);
    const [relate, setRelate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const money = useSelector((state) => state.money);
  const [select, setSelect] = useState(1);
    const [upDown, setUpDown] = useState();
    const [productWeHave, setproductWeHave] = useState(0);
    const [ProductInEachBranch, setProductInEachBranch] = useState([]);
    const [buyProductDetails, setbuyProductDetails] = useState([]);
    const [getProduct, setGetProduct] = useState([]);
    var mainImage="motor.png"
    useEffect(() => {
        if (Product) {
              const fetchData = async () => {
            try {
                const Relates = await UseAxios({
                    method: "GET",
                    api: `getProductRelate/${Product}`
                });
                
                const response = await UseAxios({
                    method: "GET",
                    api: `getProductById/${Product}`
                });
                const upDowns= await UseAxios({
                    method: "GET",
                    api: `getProductUpDown/${Product}`
                });
                  const productWeHaves= await UseAxios({
                    method: "GET",
                    api: `productWeHave/${Product}`
                  });
                const ProductInEachBrancts=await UseAxios({
                    method: "GET",
                    api: `getProductInEachBranch/${Product}`
                }); 
                 const GetbuyProductDetails=await UseAxios({
                    method: "GET",
                    api: `buyProductDetails/${Product}`
                  }); 
                
                if (response.status === 200) {
                    setData(response.data.data);
                    setRelate(Relates.data.data);
                    setUpDown(upDowns.data.data);
                    setproductWeHave(productWeHaves.data.data);
                    setProductInEachBranch(ProductInEachBrancts.data.data)
                    setbuyProductDetails(GetbuyProductDetails.data.data);
                    console.log(mainImage);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        }
        else {
          const fetchData = async () => {
            try {
                const response = await UseAxios({
                    method: "GET",
                    api: `getProduct`
                });
                if (response.status === 200) {
                    setGetProduct(response.data.data.data);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        
        }
        console.log(upDown);
    }, [Product]);
    mainImage = data?.images?.find(i => i.id == data.main_image_id) ?? mainImage
    console.log(mainImage);
if (!Product) {
     return <>
         {loading ? (<>
           
                 <h4 style={{width:"90%",margin:"0 auto",textAlign:"center",color:"gray"}}>Chose Branch</h4>
            {getProduct.map((item, index) => {
                 return <div onClick={() => { setProduct(item?.id) }} className='RelateCardGrop'  style={{ display: "flex", justifyContent: "space-around",alignItems:"center", width: "90%", margin: "2% auto", color: "gray" }}  key={index}>
                     <p  onClick={() => { setProduct(item?.id) }}  >{ item?.name}</p>
                 <div className="otherImage">
             <img className={data?.main_image_id==index?"avatarMainImage":null}   key={index} src={imageUrl+item?.main_image?.id+"/"+item?.main_image?.file_name} />
          
        </div>
                 </div>
             })}
           
         </>)
              : (
                <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>
            )}      
     </>
 }
    return (
        <>
            {loading ? (
                <>

                    <div style={{display:"flex",justifyContent:"center"}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel color="warning" id="demo-select-small-label">Currency</InputLabel>
              <Select
               onChange={(e) => {setSelect(e.target.value) }}
        labelId="demo-select-small-label"
        id="demo-select-small"
       color="warning"
        label="category"
       
      >
            {money?.money?.map((element, index) => (
     <MenuItem title={element.dollar_price} value={element.dollar_price}  key={index}>{element.currency }</MenuItem>
   ))}
            
      </Select>
            </FormControl>
    
      </div>     
                   
                     <div className="mainImage">
             <img src={`${imageUrl+mainImage.id+"/"+mainImage.file_name}`??"/motor.png"}  />
                    </div>      
        <div style={{marginBottom:"4%", display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
      
         <h5 style={{color:"#f5c02e",width:"auto"}} className='RelateCard  padding'>{data?.name }</h5>
                        <h5 style={{color:"gray"}} className='RelateCard  padding'>Price:{(data?.price * select).toFixed(2)} </h5>
                        <h5 style={{color:"gray"}} className='RelateCard  padding'>Cost:{(data?.cost * select).toFixed(2)} </h5>
                        <h5 style={{color:"gray"}} className='RelateCard   padding'>{data?.product_category?.name}</h5>
                    </div>
                
                    <div className="otherImage">
                        {data?.images?.map((item, index) => {
                            return item.id !=data.main_image_id?<img key={index} src={imageUrl + item.id + "/"+item.file_name} alt="gwg" />:<></>
                        })}
             
             </div>
                    <h4 style={{width:"90%",margin:"0 auto",textAlign:"center",color:"gray"}}>description</h4>
                        <p style={{width:"90%",margin:"2% auto",textAlign:"center",color:"gray"}} className='RelateCard   padding'>{data?.description}</p>
                    
                    <div  className="dateRegection">
                        <h3>Sales Analytic</h3>
                     
                    </div>
                 
                    <div style={{ marginBottom: "2%", display: "flex", justifyContent: "flex-start", "flexWrap": "wrap" }}>
                        <NumberCard relate={relate}/>
                        <NumberCard month={upDown&&upDown[0]?.month}  relate={upDown&&upDown[0]?.count}  />
                        <NumberCard month={upDown&&upDown[1]?.month} count={upDown&&((upDown[1]?.count-upDown[0]?.count)/upDown[0]?.count*100) }  relate={upDown&&upDown[1]?.count} />
                        <NumberCard total={true} relate={productWeHave} />
                    </div>
                    
                    <Chat api={`getProductChart/${Product}`} />
                    <h3 style={{marginLeft:"5%",color:"#23272E"}}>Remaining Quantity in Each Branch</h3>
        <TableShow data={ProductInEachBranch} />
          <h3 style={{marginLeft:"5%",color:"#23272E"}}>Purchase record</h3>
                    <BuyProductDetails data={buyProductDetails} money={select} />
                </> 
            ) : (
                <div style={{ maxWidth: "400px", margin: "0 auto" }}><Loading /></div>
            )}
        </>
    );
}

export default ProductDetails;

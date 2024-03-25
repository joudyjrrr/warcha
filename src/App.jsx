import { useEffect } from 'react'
import Defult from './Page/Defult/Defult'
import { useDispatch} from 'react-redux'
import { changeDir } from './store/Slices/languageSlice';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Page/Home/Home';
import BranchMangment from './SuberAdmin/BranchMangment/BranchMangment';
import Branch from './Branch/Branch';
import ProductCategory from './publicData/ProductCategory/ProductCategory';
import PayType from './publicData/PayType/PayType';
import Role from './publicData/Role/Role';
import UserType from './publicData/UserType/UserType';
import ServiceType from './publicData/ServiceType/ServiceType';
import Money from './publicData/Money/Money';
import Supplier from './publicData/Supplier/Supplier';
import { UseAxios } from './store/constant/url';
import { changeMony } from './store/Slices/money';
import Shift from './publicData/Shift/ServiceType';
import Product from './SuberAdmin/Product/Product';
import ProductDetails from './ProductDetails/ProductDetails';
import NewOrder from './Order/NewOrder/NewOrder';
import Order from './Order/Order';
import OrderDetails from './Order/OrderDetails';
import AccebtOrder from './Order/AccebtOrder';
import OrderInStore from './Order/OrderInStore';
import CarCompany from './Page/CarCollection/CarCompany';
import CarType from './Page/CarCollection/CarType';
import CarCollection from './SuberAdmin/Product/CarCollection';
import OrderMangment from './Page/OrderMangment/OrderMangment';
import Customers from './Page/Customers/Customers';
import CreateProduct from './SuberAdmin/Product/CreateProduct';
import Employees from './publicData/UserType/Employees';
import ProductRef from './SuberAdmin/Product/ProductRef';
import WorkShops from './WorkShop/WorkShops';
import WorkShop from './WorkShop/WorkShop';
import ProductInStore from './WorkShop/ProductInStore';
import ProductInFormBranch from './WorkShop/ProductInFormBranch';
import Service from './publicData/ServiceType/Service';
import CarInformation from './Page/Customers/CarInformation';
import CarColor from './publicData/CarColor/CarColor';
import FirstCeack from './publicData/FirstCeack/FirstCeack';
import CarModel from './publicData/CarModel/CarModel';
import FastSell from './Branch/FastSell';
import WorkShopFastSell from './WorkShop/WorkShopFastSell';
import OrderBetweenBranches from './Branch/OrderBetweenBranches';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UseAxios({ method: "get", api: "getPublicData" });
        res?.data?.data?.data?.forEach((item) => {
          dispatch(changeMony({ currency: item.currency, dollar_price: item.dollar_price }));
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [dispatch]); 
  useEffect(() => {
  dispatch(changeDir("AR"))
  }, [dispatch])
  return (
    <>
      <Routes>
         <Route path="/" element={<Defult >
          <Home />
        </Defult>}>
        </Route>   
 <Route path="/BranchMangment" element={<Defult >
          <BranchMangment />
        </Defult>}>
        </Route>  
<Route path="/Branch" element={<Defult >
          <Branch />
        </Defult>}>
          </Route> 
          <Route path="/ProductCategory" element={<Defult >
          <ProductCategory />
        </Defult>}></Route>
          <Route path="/Product" element={<Defult >
          <Product />
        </Defult>}></Route>
        
          <Route path="/PayType" element={<Defult >
          <PayType />
        </Defult>}></Route>
            <Route path="/Role" element={<Defult >
          <Role />
        </Defult>}></Route>  
   <Route path="/EmployeeType" element={<Defult >
          <UserType />
        </Defult>}></Route>          
   <Route path="/ServiceType" element={<Defult >
          <ServiceType />
        </Defult>}></Route>    
  <Route path="/Money" element={<Defult >
          <Money />
        </Defult>}></Route>    
  <Route path="/Supplier" element={<Defult >
          <Supplier />
        </Defult>}></Route>  
  <Route path="/Shift" element={<Defult >
          <Shift />
        </Defult>}></Route>  
  <Route path="/ProductDetails" element={<Defult >
          <ProductDetails />
        </Defult>}></Route>   
<Route path="/NewOrder" element={<Defult >
          <NewOrder />
        </Defult>}></Route>      
<Route path="/Order" element={<Defult >
          <Order />
        </Defult>}></Route>   
        
        <Route path="/OrderDetails" element={<Defult >
          {location.state? <OrderDetails />:<Order />}
         
        </Defult>}></Route> 
<Route path="/AccebtOrder" element={<Defult >
          <AccebtOrder />
        </Defult>}></Route>    
<Route path="/OrderInStore" element={<Defult >
          <OrderInStore />
        </Defult>}></Route>  
<Route path="/CarCompany" element={<Defult >
          <CarCompany />
        </Defult>}></Route>       
<Route path="/CarType" element={<Defult >
          <CarType />
        </Defult>}></Route>    
<Route path="/CarCollection" element={<Defult >
          <CarCollection />
        </Defult>}></Route> 
        {/* here */}
<Route path="/OrderMangment" element={<Defult >
          <OrderMangment />
        </Defult>}></Route>         
       <Route path="/Customers" element={<Defult >
          <Customers />
        </Defult>}></Route> 
<Route path="/createProduct" element={<Defult >
          <CreateProduct />
        </Defult>}></Route>  
        <Route path="/Employees" element={<Defult >
          <Employees />
        </Defult>}></Route>  
             <Route path="/ProductRef" element={<Defult >
          <ProductRef />
        </Defult>}></Route>  
             <Route path="/WorkShops" element={<Defult >
          <WorkShops />
        </Defult>}></Route>  
           <Route path="/WorkShop" element={<Defult >
          <WorkShop />
        </Defult>}></Route>  
               <Route path="/ProductInStore" element={<Defult >
          <ProductInStore />
        </Defult>}></Route> 
              <Route path="/ProductInFormBranch" element={<Defult >
          <ProductInFormBranch />
        </Defult>}></Route>  
           <Route path="/Service" element={<Defult >
          <Service />
        </Defult>}></Route>  
       <Route path="/carInformation/car/:car" element={<Defult >
  <CarInformation />
        </Defult>}></Route>
          <Route path="/CarColor" element={<Defult >
  <CarColor />
        </Defult>}></Route>
          <Route path="/FirstCeack" element={<Defult >
  <FirstCeack />
        </Defult>}></Route>
           <Route path="/CarModel" element={<Defult >
  <CarModel />
        </Defult>}></Route>
            <Route path="/FastSell" element={<Defult >
  <FastSell />
        </Defult>}></Route> 
           <Route path="/WorkShopFastSelltt" element={
  <WorkShopFastSell />
        }></Route>         
         <Route path="/WorkShopFastSell" element={<Defult >
  <WorkShopFastSell />
        </Defult>}></Route>  
         <Route path="/OrderBetweenBranches" element={<Defult >
  <OrderBetweenBranches />
        </Defult>}></Route>         
        
      </Routes>
     
    </>
  )
}

export default App
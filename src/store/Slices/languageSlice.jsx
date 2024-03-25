import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sideBar: [],
  sideBarFlex: window.innerWidth>1000?true:false,
  sizeBarHover: window.innerWidth>1000?false:true,
  lan: "ar"
 
}
export const languageSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.showSideBar = !state.showSideBar
    },
    changeSideBarFlex: (state,action) => { state.sideBarFlex = action.payload; },
    changeSideBarHover: (state,action) => { state.sizeBarHover = action.payload },
    changeDir: (state, action) => {
    
  switch (action.payload) {
    case "ar":
      return {
  ...state,
  sideBar: [{ item: "home" }],
};
    case "en":
     return {
       ...state,
       lan:"en",
       sideBar: [
         { item: "home", goTo: "/" },
         { item: "Fast Sell Branch", goTo: "/FastSell" },
         { item: "WorkShop Fast Sell", goTo: "/WorkShopFastSell" },
         { item: "Order Between Branches", goTo: "/OrderBetweenBranches" },
         { item: "Branch Mangment",goTo:"/BranchMangment" },
         { item: "WorkShops", goTo: "/WorkShops" },
         { item: "Customers", goTo: "/Customers" },
         { item: "CarModel", goTo: "/CarModel" },
         { item: "CarColor", goTo: "/CarColor" },
         { item: "FirstCeack", goTo: "/FirstCeack" },
         { item: "Car Company", goTo: "/CarCompany" },
         { item: "Car Type", goTo: "/CarType" },
         { item: "Car Collection", goTo: "/CarCollection" },
         { item: "Product Category", goTo: "/ProductCategory" },
         { item: "Order Received", goTo: "/AccebtOrder" },
         { item: "Products", goTo: "/Product" },
         { item: "Pay Type", goTo: "/PayType" },
         { item: "Employee Type", goTo: "/EmployeeType" },
         { item: "Service Type", goTo: "/ServiceType" },
         { item: "Currency", goTo: "/Money" },
         { item: "Supplier", goTo: "/Supplier" },
         { item: "Order Mangment", goTo: "/Order" },
         { item: "Order In Store", goTo: "/OrderInStore" },
         { item: "Shift", goTo: "/Shift" },
         { item: "Employees", goTo: "/Employees" },
       ],
      };
     case "AR":
     return {
       ...state,
       lan:"ar",
       sideBar: [
         { item: "الصفحة الرئيسية", goTo: "/" },
          { item: "البيع السريع فرع", goTo: "/FastSell" },
         { item: "البيع السريع ورشة", goTo: "/WorkShopFastSell" },
         { item: "نقل البضائع بين الافرع", goTo: "/OrderBetweenBranches" },
         { item: "أدارة الافرع",goTo:"/BranchMangment" },
         { item: "ادارة الورشات", goTo: "/WorkShops" },
         { item: "العملاء", goTo: "/Customers" },
         { item: "مديل السيارات", goTo: "/CarModel" },
         { item: "الوان السيارات", goTo: "/CarColor" },
         { item: "التشخيص الاولي", goTo: "/FirstCeack" },
         { item: "شركات السيارات", goTo: "/CarCompany" },
         { item: "انواع السيارات", goTo: "/CarType" },
         { item: "مجموعة السيارات", goTo: "/CarCollection" },
         { item: "تصنيف المنتجات", goTo: "/ProductCategory" },
         { item: " المنتجات", goTo: "/Product" },
         { item: "طرق البيع", goTo: "/PayType" },
         { item: "انواع الموظفين", goTo: "/EmployeeType" },
         { item: "انواع الخدمات", goTo: "/ServiceType" },
         { item: "العملات", goTo: "/Money" },
         { item: "الموردون", goTo: "/Supplier" },
         { item: "وصول الشحنة من المورد", goTo: "/AccebtOrder" },
         { item: " الطلبات من الموردون", goTo: "/Order" },
         { item: "الطلبات في المخازن", goTo: "/OrderInStore" },
         { item: "Shift", goTo: "/Shift" },
         { item: "الموظفون", goTo: "/Employees" },
       ],
};
  
    default:
      return state;
  }
}
  }
})
export const { changeDir, openSideBar, changeSideBarFlex, changeSideBarHover } = languageSlice.actions
export default languageSlice.reducer
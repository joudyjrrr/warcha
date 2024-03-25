import RelateCard from '../../Component/RelateCard/RelateCard'
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import "./Home.css"
import NumberCard from '../../Component/NumberCard/NumberCard';
import UserCard from '../../Component/UserCard/UserCard';

function Home() {
 const [lineChartWidth, setlineChartWidth] = React.useState(1200);
 return (
   <>
   <div style={{ padding: "2%", marginBottom: "2%", display: "flex", justifyContent: "space-around", "flexWrap": "wrap" }}><RelateCard /><RelateCard /><RelateCard /><RelateCard /></div>
   <div className="dateRegection">
    <h3>Sales Analytic</h3>
    <div>
   <h5>start <input  type="date" className='filterSmall smallRad' /></h5>
   <h5>End <input  type="date" className='filterSmall smallRad' /></h5>
    </div>
   
   </div>
    <div style={{ marginBottom: "2%", display: "flex", justifyContent: "flex-start", "flexWrap": "wrap" }}>
    <NumberCard up={true}/>
    <NumberCard />
     <NumberCard up={true} />
    </div>
 <LineChart
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ]}
  width={lineChartWidth}
 sx={{backgroundImage: "linear-gradient(rgba(170, 170, 170, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(170, 170, 170, 0.3) 1px, transparent 1px)",
    backgroundSize: "75px 35px"}}
    height={300}
   />
   <h3 style={{marginLeft:"5%",color:"#23272E"}}>Best Selling Products</h3>
   <div className='tableContent'> 
    <table>
  <thead>
    <tr>
      <th>FFD154wawgwagawgaw</th>
      <th>2</th>
      <th>3</th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/vite.svg" alt="" /></td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
    
      </tr>
      <tr>
      <td><img src="/vite.svg" alt="" /></td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
    
      </tr>
       <tr>
      <td><img src="/vite.svg" alt="" /></td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
    
      </tr>
       <tr>
      <td><img src="/vite.svg" alt="" /></td>
      <td>FFD154wawgwagawgaw</td>
      <td>FFD154wawgwagawgaw</td>
    
      </tr>
      
  </tbody>
    </table>
   </div>
   <div style={{padding:"4%", width:"100%", display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
    <div className='homeTop' style={{minWidth:"300px", width: "45%" }}>
     <h5 style={{marginLeft:"10%"}}>Top Branches </h5>
     <div style={{ display: "flex", flexWrap:"wrap"}}><img src="/vite.svg" alt="" /><NumberCard /><NumberCard up={ true} /></div>
     <div style={{ display: "flex" }}><img src="/vite.svg" alt="" /><NumberCard /><NumberCard up={ true} /></div>
     <div style={{ display: "flex" }}><img src="/vite.svg" alt="" /><NumberCard /><NumberCard up={ true} /></div>
    </div>
    <div className='homeTop' style={{minWidth:"300px", width: "50%" }}>
     <h5  style={{marginLeft:"10%"}}>Top Branches </h5>
     
     <UserCard />
     <UserCard />
     <UserCard />
     <UserCard />
     <UserCard />
     
    </div>
   </div>
</>  )
}

export default Home
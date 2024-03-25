import { useEffect, useState, useMemo } from 'react';
import { UseAxios } from '../store/constant/url';
import Loading from './Loading';
import { LineChart } from '@mui/x-charts';

function Chat({api}) {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const monthNames = useMemo(() => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UseAxios({ method: "GET", api: api });
        setChartData(response.data.data);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., display an error message
      }
    };
    fetchData();
  }, [api]);

  const renderChart = () => {
    if (!loading) return<div style={{maxWidth:"400px",margin:"0 auto"}}><Loading/></div>;
    if (chartData.length === 0) return <h1 style={{textAlign:"center",color:"gray"}}>No data available</h1>;

    const totalPriceData = chartData.map(item => item.total_price??item.count);
    const months = chartData.map(item => monthNames[item.month -1]);

    return (
    <LineChart
  xAxis={[{ scaleType: 'point', data: months }]}
  series={[{ data: totalPriceData }]}
  width={1200}
  orientation="vertical-reversed"
  height={300}
  sx={{
    backgroundImage: "linear-gradient(rgba(170, 170, 170, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(170, 170, 170, 0.3) 1px, transparent 1px)",
    backgroundSize: "75px 35px"
  }}
/>
    );
  };

  return (
    <div>
      {renderChart()}
    </div>
  );
}

export default Chat;
